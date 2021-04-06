const NotificationModel = require("../models/NotificationModel");
//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");
const auth = require("../middlewares/jwt");
const checkToken = require("../middlewares/middleware").checkToken;
const checkPermissions = require("../middlewares/rbac_middleware")
  .checkPermissions;
const requiredPermissions = require("./requiredPermissions.json");

exports.getNotifications = [
  auth,
  async (req, res) => {
    checkToken(req, res, async (result) => {
      if (result.success) {
        logger.log(
          "info",
          "<<<<< NotificationService < NotificationController < getNotifications  : token verified successfullly, querying data by key"
        );

        permission_request = {
          result: result,
          permissionRequired: requiredPermissions.getNotifications,
        };
        checkPermissions(permission_request, async (permissionResult) => {
          if (permissionResult.success) {
            try {
              const { address } = req.user;
              const notifications = await NotificationModel.find({
                owner: address,
              });
              return apiResponse.successResponseWithData(
                res,
                "Notifications",
                notifications
              );
            } catch (err) {
              return apiResponse.ErrorResponse(res, err);
            }
          } else {
            res.json("Sorry! User does not have enough Permissions");
          }
        });
      } else {
        logger.log(
          "warn",
          "<<<<< NotificationService < NotificationController < getNotifications  : refuted token"
        );
        res.status(403).json(result);
      }
    });
  },
];

exports.deleteNotification = [
  auth,
  async (req, res) => {
    checkToken(req, res, async (result) => {
      if (result.success) {
        logger.log(
          "info",
          "<<<<< NotificationService < NotificationController < deleteNotification  : token verified successfullly, querying data by key"
        );

        permission_request = {
          result: result,
          permissionRequired: requiredPermissions.deleteNotification,
        };
        checkPermissions(permission_request, async (permissionResult) => {
          if (permissionResult.success) {
            try {
              const { id } = req.body;
              const { address } = req.user;
              await NotificationModel.deleteOne({ _id: id });
              const notifications = await NotificationModel.find({
                owner: address,
              });
              return apiResponse.successResponseWithData(
                res,
                "Notifications",
                notifications
              );
            } catch (err) {
              return apiResponse.ErrorResponse(res, err);
            }
          } else {
            res.json("Sorry! User does not have enough Permissions");
          }
        });
      } else {
        logger.log(
          "warn",
          "<<<<< NotificationService < NotificationController < deleteNotification  : refuted token"
        );
        res.status(403).json(result);
      }
    });
  },
];
