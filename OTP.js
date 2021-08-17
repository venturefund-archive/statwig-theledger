const EmployeeModel = require('../models/EmployeeModel');
const WarehouseModel = require('../models/WarehouseModel');
const { body, validationResult} = require('express-validator');
const { sanitizeBody } = require('express-validator');
//helper file to prepare responses.
const apiResponse = require('../helpers/apiResponse');
const utility = require('../helpers/utility');
const jwt = require('jsonwebtoken');
const mailer = require('../helpers/mailer');
const { constants } = require('../helpers/constants');
const auth = require('../middlewares/jwt');
const axios = require('axios');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio_service_id = process.env.TWILIO_SERVICE_ID;
const client = require('twilio')(accountSid, authToken, {
  lazyLoading: true
});
const moveFile = require("move-file");
const blockchain_service_url = process.env.URL;
const init = require('../logging/init');
const logger = init.getLog();
const EmailContent = require('../components/EmailContent');
const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRgex = /^\d{12}$/;

const { uploadFile , getFileStream } = require("../helpers/s3");
const util = require('util');
const fs = require('fs');
const unlinkFile = util.promisify(fs.unlink);


exports.sendOtp = [
  body('emailId')
    .isLength({ min: 10 })
    .trim()
    .withMessage('Email/Mobile must be specified.')
  //   .isEmail()
  // .withMessage('Email must be a valid email address.')
  ,
  sanitizeBody('emailId').escape(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      /* EmployeeModel.collection.dropIndexes(function(){
         EmployeeModel.collection.reIndex(function(finished){
                  console.log("finished re indexing")
                })
              })*/
      //EmployeeModel.createIndexes();
      if (!errors.isEmpty()) {
        logger.log(
          'info',
          '<<<<< UserService < AuthController < login : Validation Error while login',
        );
        return apiResponse.validationErrorWithData(
          res,
          'Validation Error.',
          errors.array(),
        );
      } else {
        const emailId = req.body.emailId.toLowerCase();
        let user;
        let phone = '';
        if (emailId.indexOf('@') > -1)
          user = await EmployeeModel.findOne({ emailId });
        else {
          phone = '+' + emailId;
          user = await EmployeeModel.findOne({ phoneNumber: phone });
        }
        if (user) {
          if (user.accountStatus === 'ACTIVE') {
            logger.log(
              'info',
              '<<<<< UserService < AuthController < login : user is active',
            );
            let otp = utility.randomNumber(4);
            if (process.env.EMAIL_APPSTORE.includes(user.emailId) && user.emailId != '')
              otp = process.env.OTP_APPSTORE;

            await EmployeeModel.updateOne({ id: user.id }, { otp });

            axios.post(process.env.OTP_ENDPOINT, {
              subject: "OTP request for Vaccine Ledger",
              email: user.emailId,
              phone: user.phoneNumber ? user.phoneNumber : '',
              otp: otp.toString(),
              message: "Please Send the OTP",
              source: process.env.SOURCE
            })
              .then((response) => {
                if (response.status === 200) {
                  return apiResponse.successResponseWithData(
                    res,
                    'OTP Sent Success.',
                    { email: user.emailId }
                  );
                }
                else {
                  return apiResponse.ErrorResponse(res, response.statusText);
                }
              }, (error) => {
                console.log(error);
              });

            //   let html = EmailContent({
            //     name: user.firstName,
            //     origin: req.headers.origin,
            //     otp,
            //   });
            // // Send confirmation email
            //   try {
            //     await mailer
            //         .send(
            //             constants.confirmEmails.from,
            //             user.emailId,
            //             constants.confirmEmails.subject,
            //             html,
            //         );
            //     return apiResponse.successResponseWithData(
            //         res,
            //         'OTP Sent Success.'
            //     );
            //   }catch(err) {
            //     return apiResponse.ErrorResponse(res, err);
            //   }

            /* let userData = {
               id: user.id,
               firstName: user.firstName,
               emailId: user.emailId,
               role: user.role,
               warehouseId:user.warehouseId,
             };
             //Prepare JWT token for authentication
             const jwtPayload = userData;
             const jwtData = {
               expiresIn: process.env.JWT_TIMEOUT_DURATION,
             };
             const secret = process.env.JWT_SECRET;
             //Generated JWT token with Payload and secret.
             userData.token = jwt.sign(jwtPayload, secret, jwtData);
             logger.log(
                 'info',
                 '<<<<< UserService < AuthController < login : user login success',
             );*/

          } else {
            logger.log(
              'warn',
              '<<<<< UserService < AuthController < login : account is not approved.',
            );
            return apiResponse.unauthorizedResponse(
              res,
              'Account is not Approved. Please contact admin.',
            );
          }
        } else {
          return apiResponse.ErrorResponse(res, 'User not registered');
        }
      }
    } catch (err) {
      logger.log(
        'error',
        '<<<<< UserService < AuthController < login : error in login (catch block)',
      );
      return apiResponse.ErrorResponse(res, 'Email already registered. Check Email for verifying the account');
    }
  },
];

/**
 * Verify Confirm otp.
 *
 * @param {string}      email
 * @param {string}      otp
 *
 * @returns {Object}
 */

exports.verifyOtp = [
  body('emailId')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Email/Mobile must be specified.')
  // .isEmail()
  // .withMessage('Email must be a valid email address.'),
  , body('otp')
    .isLength({ min: 1 })
    .trim()
    .withMessage('OTP must be specified.'),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        logger.log(
          'error',
          '<<<<< UserService < AuthController < verifyConfirm : validation error',
        );
        return apiResponse.validationErrorWithData(
          res,
          'Validation Error.',
          errors.array(),
        );
      } else {
        const emailId = req.body.emailId.toLowerCase();
        var query = { emailId };
        if (emailId.indexOf('@') === -1) {
          let phone = '+' + emailId;
          query = { phoneNumber: phone };
        }
        const user = await EmployeeModel.findOne(query);

        if (user && user.otp == req.body.otp) {

          var address;

          if (user.walletAddress == null || user.walletAddress == "wallet12345address") {
            const response = await axios.get(
              `${blockchain_service_url}/createUserAddress`,
            );
            address = response.data.items;
            const userData = {
              address,
            };
            logger.log(
              'info',
              '<<<<< UserService < AuthController < verifyConfirm : granting permission to user',
            );
            await axios.post(
              `${blockchain_service_url}/grantPermission`,
              userData,
            );
            await EmployeeModel.update(query, { otp: null, walletAddress: address });
          }
          else {
            address = user.walletAddress
          }

	  const activeWarehouse = await WarehouseModel.findOne( {$and: [ {"id": {$in: user.warehouseId }},{"status": "ACTIVE" }]})
    var userData ;
    if(activeWarehouse) {
      userData = {
        id: user.id,
        firstName: user.firstName,
        emailId: user.emailId,
        role: user.role,
        warehouseId: activeWarehouse.id,
        organisationId: user.organisationId,
        walletAddress: address,
        phoneNumber: user.phoneNumber
      };
    }
    else{
      userData = {
        id: user.id,
        firstName: user.firstName,
        emailId: user.emailId,
        role: user.role,
        warehouseId: [],
        organisationId: user.organisationId,
        walletAddress: address,
        phoneNumber: user.phoneNumber
      };
    }
          //Prepare JWT token for authentication
          const jwtPayload = userData;
          const jwtData = {
            expiresIn: process.env.JWT_TIMEOUT_DURATION,
            //expiresIn: "12 hours"
          };
          const secret = process.env.JWT_SECRET;
          //Generated JWT token with Payload and secret.
          userData.token = jwt.sign(jwtPayload, secret, jwtData);
          logger.log(
            'info',
            '<<<<< UserService < AuthController < login : user login success',
          );
          return apiResponse.successResponseWithData(res, 'Login Success', userData);
        } else {
          return apiResponse.ErrorResponse(res, `OTP doesn't match`);
        }
      }
    } catch (err) {
      console.log(err);
	logger.log(
        'error',
        '<<<<< UserService < AuthController < verifyConfirm : Error (catch block)',
      );
      return apiResponse.ErrorResponse(res,err);
    }
  },
];
