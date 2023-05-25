const jwt = require("jsonwebtoken");
const apiResponse = require("../helpers/apiResponse");
const RewardConfigModel = require("../models/RewardConfigModel");
const JWT_SECRET = process.env.JWT_SECRET;
const REWARDS_AUTH = process.env.REWARDS_AUTH || false;

// Middleware to handle user authentication and authorization
const authUser = (req, res, next) => {
  try {
    if (REWARDS_AUTH) {
      next();
    } else {
      const { authorization } = req.headers;
      if (!authorization) {
        return apiResponse.unauthorizedResponse(
          res,
          "Authorization token is not found"
        );
      }
      const token = authorization.replace("Bearer ", "");
      jwt.verify(token, JWT_SECRET, (err, payload) => {
        if (err) {
          console.log(err);
          if (err.name === "TokenExpiredError") {
            return apiResponse.unauthorizedResponse(res, "Token expired");
          }
          return apiResponse.unauthorizedResponse(res, "Invalid token");
        }
        req.user = payload;
        next();
      });
    }
  } catch (err) {
    console.log(err);
    return apiResponse.errorResponse(res, "Auth Error");
  }
};

const apiKeyAuth = (req, res, next) => {
  try {
    if (REWARDS_AUTH) {
      next();
    } else {
      const { appId, apiKey } = req.body;
      const keyExists = RewardConfigModel.findOne({ appId, apiKeys: { $in: [apiKey] } });
      if (keyExists) next();
      else return new Error({ message: "API Key not found" })
    }
  } catch (err) {
    console.log(err);
    return apiResponse.errorResponse(res, err?.message || "API Key Error");
  }

};

module.exports = {
  authUser,
  apiKeyAuth
};
