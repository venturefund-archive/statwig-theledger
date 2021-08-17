const EmployeeModel = require('../models/EmployeeModel');
const WarehouseModel = require('../models/WarehouseModel');
const OrganisationModel = require('../models/OrganisationModel');
const { body, validationResult} = require('express-validator');
const { sanitizeBody } = require('express-validator');
//helper file to prepare responses.
const apiResponse = require('../helpers/apiResponse');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mailer = require('../helpers/mailer');
const { constants } = require('../helpers/constants');
var base64Img = require('base64-img');
const auth = require('../middlewares/jwt');
const axios = require('axios');
const dotenv = require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio_service_id = process.env.TWILIO_SERVICE_ID;
const client = require('twilio')(accountSid, authToken, {
  lazyLoading: true
});
const moveFile = require("move-file");
const blockchain_service_url = process.env.URL;
const stream_name = process.env.INV_STREAM;
const checkToken = require('../middlewares/middleware').checkToken;
const init = require('../logging/init');
const logger = init.getLog();
const EmailContent = require('../components/EmailContent');
const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRgex = /^\d{12}$/;

const { uploadFile , getFileStream } = require("../helpers/s3");
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

exports.userInfo = [
  auth,
  (req, res) => {
    try {
      EmployeeModel.findOne({ id: req.user.id }).then(async user => {
        if (user) {
          logger.log(
            'info',
            '<<<<< UserService < AuthController < userInfo : user exist',
          );
          const {
            id,
            firstName,
            lastName,
            emailId,
            phoneNumber,
            walletAddress,
            affiliatedOrganisations,
            organisationId,
            warehouseId,
            accountStatus,
            role,
            photoId,
            postalAddress
          } = user;
          const org = await OrganisationModel.findOne({ id: organisationId }, 'name configuration_id type');
          const warehouse = await EmployeeModel.findOne({ id }, { _id: 0, warehouseId: 1 });
          const warehouseArray = await WarehouseModel.find({ id: { "$in": warehouse.warehouseId },$or:[{status: 'ACTIVE'}, {status: {$exists: false}}] })
          var user_data;
          if(org){
            user_data = {
              firstName,
              lastName,
              emailId,
              phoneNumber,
              walletAddress,
              affiliatedOrganisations,
              organisation: `${org.name}/${organisationId}`,
              warehouseId,
              accountStatus,
              role,
              photoId,
              configuration_id: org.configuration_id,
              type: org.type,
              location: postalAddress,
              warehouses: warehouseArray
            };
          }
          else{
            user_data = {
              firstName,
              lastName,
              emailId,
              phoneNumber,
              walletAddress,
              affiliatedOrganisations,
              organisation: `NOT_ASSIGNED`,
              warehouseId,
              accountStatus,
              role,
              photoId,
              configuration_id: null,
              type: null,
              location: postalAddress,
              warehouses: warehouseArray
            };
          }
          logger.log(
            'info',
            '<<<<< UserService < AuthController < userInfo : sending profile',
          );
          return apiResponse.successResponseWithData(
            res,
            'Sent Profile',
            user_data,
          );
        } else {
          logger.log(
            'error',
            '<<<<< UserService < AuthController < userInfo : error while sending user info',
          );
          return apiResponse.ErrorResponse(res);
        }
      });
    } catch (err) {
      logger.log(
        'error',
        '<<<<< UserService < AuthController < userInfo : error (catch block)',
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.updateProfile = [
  auth,
  async (req, res) => {
    try {
      const employee = await EmployeeModel.findOne({
        emailId: req.user.emailId,
      });
      // let phoneNumber = null
      // if(req.body?.phoneNumber)
      //    phoneNumber='+'+req.body?.phoneNumber;
      const {
        firstName,
        lastName,
        phoneNumber='',
        warehouseId,
        organisation
      } = req.body;

      const organisationId = organisation.split('/')[1];
      const organisationName = organisation.split('/')[0];

      employee.firstName = firstName;
      employee.lastName = lastName;
      //employee.phoneNumber = phoneNumber;
      employee.phoneNumber = phoneNumber?'+'+phoneNumber:null;
      employee.organisationId = organisationId;
      employee.warehouseId = warehouseId;
      await employee.save();

      const returnData = { isRefresh: false };
      if (warehouseId !== req.user.warehouseId) {
        let userData = {
          id: employee.id,
          firstName: firstName,
          emailId: employee.emailId,
          role: employee.role,
	  organisationId: employee.organisationId,
          warehouseId: warehouseId,
          phoneNumber: employee.phoneNumber
        };
        //Prepare JWT token for authentication
        const jwtPayload = userData;
        const jwtData = {
          expiresIn: process.env.JWT_TIMEOUT_DURATION,
        };
        const secret = process.env.JWT_SECRET;
        //Generated JWT token with Payload and secret.
        returnData.isRefresh = true;
        returnData.token = jwt.sign(jwtPayload, secret, jwtData);
      }
      return apiResponse.successResponseWithData(res, 'Employee Profile update Success', returnData);
    } catch (err) {
      logger.log(
        'error',
        '<<<<< UserService < AuthController < updateProfile : error (catch block)',
      );
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];
