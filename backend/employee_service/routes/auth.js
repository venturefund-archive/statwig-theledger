const express = require("express");
const AuthController = require("../controllers/AuthController");
const OrganisationController = require("../controllers/OrganisationController");
const cuid = require("cuid");
const multer = require("multer");

// const upload = multer({ dest: "uploads/" }); // for single file with same name as uploaded file
const Storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "uploads/");
  },
  filename(req, file, callback) {
    callback(null, cuid() + Date.now() + ".jpg");
  },
});
const upload = multer({ storage: Storage });

const router = express.Router();

// routes/auth.js
/**
 * @openapi
 * /usermanagement/api/auth/check:
 *  post:
 *    summary: Check Validity 
 *    tags:
 *      - Employee Service
 *    description: Check Validity of Email provided by User
 *    parameters:
 *      - name: firstName
 *        in: body
 *        description: first name of the user
 *        schema:
 *         example: 
 *          value: John
 *      - name: lastName
 *        in: body
 *        description: last name of the user
 *        schema:
 *         example: 
 *          value: Doe
 *      - name: organisationId
 *        in: body
 *        description: OrganisationId of the user
 *        schema:
 *         example:
 *          value: 1234
 *      - name: EmailID
 *        in: body
 *        description: email id of user
 *        schema: 
 *         example: 
 *          value: johndoe@gmail.com
 *    produces:
 *      - application/json
 *    responses:
 *        '200':
 *          description: Email is valid
 * 
*/
router.post("/check", AuthController.checkEmail);
// routes/auth.js
/**
 * @openapi
 * /usermanagement/api/auth/register:
 *  post:
 *    summary: Register new user
 *    tags:
 *      - Employee Service
 *    description: Register new user with corresponding name, org ID, email ID.
 *    parameters:
 *      - name: firstName
 *        in: body
 *        description: first name of the user
 *        schema:
 *         example: 
 *          value: John
 *      - name: lastName
 *        in: body
 *        description: last name of the user
 *        schema:
 *         example: 
 *          value: Doe
 *      - name: organisationId
 *        in: body
 *        description: OrganisationId of the user
 *        schema:
 *         example:
 *          value: 1234
 *      - name: EmailID
 *        in: body
 *        description: email id of user
 *        schema: 
 *         example: 
 *          value: johndoe@gmail.com
 *    produces:
 *      - application/json
 *    responses:
 *        '200':
 *          description: User Registered Successfully
*/

router.post("/register", AuthController.register);
// routes/auth.js
/**
 * @openapi
 * /usermanagement/api/auth/sendOtp:
 *  post:
 *    summary: Send otp to user
 *    tags:
 *      - Employee Service
 *    description: Send OTP to the registered emailId of user
 *    parameters:
 *      - name: EmailID
 *        in: body
 *        description: email id of user
 *        schema:
 *         example: 
 *          value: johndoe@gmail.com
 *    produces:
 *      - application/json
 *    responses:
 *        '200':
 *          description: OTP sent successfully
*/
router.post("/sendOtp", AuthController.sendOtp);

// routes/auth.js
/**
 * @openapi
 * /usermanagement/api/auth/verifyOtp:
 *  post:
 *    summary: Verify OTP 
 *    tags:
 *      - Employee Service
 *    description: Verify OTP entered by user while login
 *    parameters:
 *      - name: emailID
 *        in: body
 *        description: EMAILID of the user
 *        schema:
 *         example: 
 *          value: johndoe@gmail.com
 *      - name: otp
 *        in: body
 *        description: otp sent to the user
 *        schema:
 *         example: 
 *          value: 458621(sample otp)
 *    produces:
 *      - application/json
 *    responses:
 *        '200':
 *          description: Loggedin succesfully
*/

router.post("/verifyOtp", AuthController.verifyOtp);

// routes/auth.js
/**
 * @openapi
 * /usermanagement/api/auth/userInfo:
 *  get:
 *    summary: Fetches user information 
 *    tags:
 *      - Employee Service
 *    description: Fetch user info corresponding to logged in user.
 *    responses:
 *        '200':
 *          description: User Information
*/

router.get("/userInfo", AuthController.userInfo);
// routes/auth.js
/**
 * @openapi
 *  /usermanagement/api/auth/getAllUsers:
 *  get:
 *    summary: Fetches user information of all users
 *    tags:
 *      - Employee Service
 *    description: Fetch firstName, walletAddress and emailId corresponding to logged in user
 *    responses:
 *        '200':
 *          description: All users
*/
router.get("/getAllUsers", AuthController.getAllUsers);

// routes/auth.js
/**
 * @openapi
 *  /usermanagement/api/auth/verifyauth:
 *   post:
 *     tags:
 *       - Employee Service
 *     summary: Verify authenication 
 *     description: Verify authentication of user using emailID.
 *     parameters:
 *      - name: EmailID
 *        in: body
 *        description: EmailID of user
 *        schema:
 *         example: 
 *          value: johndoe@gmail.com
 * 
*/
router.post("/verifyAuth", AuthController.verifyAuthentication);
// routes/auth.js
/**
 * @openapi
 *  /usermanagement/api/auth/UpdateProfile:
 *  post:
 *    summary: Update profile of user
 *    tags:
 *      - Employee Service
 *    description: Update profile of logged in user
 *    parameters:
 *      - name: firstName
 *        in: body
 *        description: first name of the user
 *        schema:
 *         example: 
 *          value: John
 *      - name: lastName
 *        in: body
 *        description: last name of the user
 *        schema:
 *         example: 
 *          value: Doe
 *      - name: organisationId
 *        in: body
 *        description: OrganisationId of the user
 *        schema:
 *         example: 
 *          value: 1234
 *      - name: EmailID
 *        in: body
 *        description: email id of user
 *        schema:
 *         example: 
 *          value: johndoe@gmail.com
 *      - name: warehouseId
 *        in: body
 *        description: warehouseId of the user
 *        schema:
 *         example: 
 *          value: #345
 *    produces:
 *      - application/json
 *    responses:
 *        '200':
 *          description: Updated profile of user
*/ 
router.post("/updateProfile", AuthController.updateProfile);
// routes/auth.js
/**
 * @openapi
 *  /usermanagement/api/auth/deleteProfilePicture:
 *   post:
 *     tags:
 *       - Employee Service
 *     summary: Delete profile pic 
 *     description: Delete profile pic of corresponding user
 *     produces:
 *       - application/json
 *     responses:
 *        '200':
 *          description: Deleted Profile Picture of user
*/

router.post("/deleteProfilePicture", AuthController.deleteProfilePicture);
// routes/auth.js
/**
 * @openapi
 *  /usermanagement/api/auth/upload:
 *  post:
 *    summary: Upload the profile profile picture
 *    tags:
 *      - Employee Service
 *    description: Update profile of logged in user
 *    parameters:
 *      - name: file
 *        description: New profile photo of the user
 *    produces:
 *      - application/json
 *    responses:
 *        '200':
 *          description: Image uploaded successfully
*/ 
router.post("/upload", upload.single("profile"), AuthController.uploadImage);

// routes/auth.js
/**
 * @openapi
 *  /usermanagement/api/auth/addWarehouse:
 *   post:
 *     tags:
 *       - Employee Service
 *     description: Add warehouse corresponding to logged-in user
 *     parameters:
 *       - name: id
 *         in: body
 *         description: id of the warehouse to be added
 *         schema:
 *          example: 
 *           value: 2344
 *     produces:
 *       - application/json
 *     responses:
 *         '200':
 *           description: Warehouse added successfully
*/ 

router.post("/addWarehouse", AuthController.addWarehouse);
// routes/auth.js
/**
 * @openapi
 *  /usermanagement/api/auth/pushWarehouse:
 *   post:
 *     tags:
 *       - Employee Service
 *     description: Add pending warehouse corresponding to logged-in user
 *     parameters:
 *       - name: warehouseId
 *         in: body
 *         description: id of the pending warehouse to be added
 *         schema:
 *          example: 
 *           value: 2345
 *     produces:
 *       - application/json
 *     responses:
 *         '200':
 *           description: Warehouse added successfully
*/  
router.post("/pushWarehouse", AuthController.pushWarehouse);
// routes/auth.js
/**
 * @openapi
 *  /usermanagement/api/auth/updateWarehouse:
 *   post:
 *     tags:
 *       - Employee Service
 *     description: Update warehouse address corresponding to logged-in user
 *     parameters:
 *       - name: warehouseId
 *         in: body
 *         description: id of the warehouse to be updated
 *         schema:
 *          example: 
 *           value: 2353
 *     produces:
 *       - application/json
 *     responses:
 *         '200':
 *           description: Warehouse address updated successfully
*/ 
router.post("/updateWarehouse", AuthController.updateWarehouseAddress);
// routes/auth.js
/**
 * @openapi
 *  /usermanagement/api/auth/switchLocation:
 *   post:
 *     tags:
 *       - Employee Service
 *     description: Add pending warehouse corresponding to logged-in user
 *     parameters:
 *       - name: warehouseId
 *         in: body
 *         description: Updated Address of warehouse in JSON format
 *         schema:
 *          example: 
 *           value: 2345
 *     produces:
 *       - application/json
 *     responses:
 *         '200':
 *           description: Location Changed Successfully
*/  
router.post("/switchLocation", AuthController.switchLocation);
// routes/auth.js
/**
 * @openapi
 *  /usermanagement/api/auth/getAllRegisteredUsers:
 *   get:
 *     tags:
 *       - Employee Service
 *     responses:
 *         '200':
 *           description: All Users
*/ 
router.get("/getAllRegisteredUsers", AuthController.getAllRegisteredUsers);

// routes/auth.js
/**
 * @openapi
 *  /usermanagement/api/auth/getAllRegisteredUsers/:organisationId:
 *   get:
 *     tags:
 *       - Employee Service
 *     description: Fetch all the registered users corresponding to organisationId
 *     responses:
 *         '200':
 *           description: All Users
*/ 

router.get(
  "/getAllUsersByOrganisation/:organisationId",
  AuthController.getAllUsersByOrganisation
);
// routes/auth.js
/**
 * @openapi
 *  /usermanagement/api/auth/getAllRegisteredUsers/:warehouseId:
 *   get:
 *     tags:
 *       - Employee Service
 *     description: Fetch all the registered users corresponding to warehouseId
 *     responses:
 *         '200':
 *           description: All Users
*/ 

router.get(
  "/getAllUsersByWarehouse/:warehouseId",
  AuthController.getAllUsersByWarehouse
);
// routes/auth.js
/**
 * @openapi
 *  /usermanagement/api/auth/uploadImage:
 *   post:
 *     tags:
 *       - Employee Service
 *     responses:
 *         '200':
 *           description: Image uploaded successfully
*/

router.post("/uploadImage", upload.single("photo"), AuthController.uploadImage);
// routes/auth.js
/**
 * @openapi
 *  /usermanagement/api/auth/fetchImage:
 *   get:
 *     tags:
 *       - Employee Service
 *     decription: Fetch profile image of logged-in user
 *     responses:
 *         '200':
 *           description: Image 
*/
router.get("/fetchImage", AuthController.fetchImage);
// routes/auth.js
/**
 * @openapi
 *  /usermanagement/api/auth/getUserWarehouses:
 *   get:
 *     tags:
 *       - Employee Service
 *     description: Fetch warehouse of logged-in user
 *     responses:
 *         '200':
 *           description: User Warehouse Details
*/ 
router.get("/getUserWarehouses", AuthController.getUserWarehouses);
// routes/auth.js
/**
 * @openapi
 *  /usermanagement/api/auth/getOrganizationsByType:
 *   get:
 *     tags:
 *       - Employee Service
 *     description: Fetch organisation of user by type for abinbev
 *     responses:
 *         '200':
 *           description: Organization by Type
*/ 
router.get(
  "/abinbev/getOrganizationsByType",
  AuthController.getOrganizationsByTypeForAbInBev
);
// routes/auth.js
/**
 * @openapi
 *  /usermanagement/api/auth/getOrganizationsByType:
 *   get:
 *     tags:
 *       - Employee Service
 *     description: Fetch organisation of user by type
 *     responses:
 *         '200':
 *           description: Organization by Type
*/ 
router.get("/getOrganizationsByType", AuthController.getOrganizationsByType);
// routes/auth.js
/**
 * @openapi
 *  /usermanagement/api/auth/getwarehouseByType:
 *   get:
 *     tags:
 *       - Employee Service
 *     description: Fetch warehouses of user by type
 *     responses:
 *         '200':
 *           description: List of Warehouse Types
*/
router.get("/getwarehouseByType", AuthController.getwarehouseByType);
// routes/auth.js
/**
 * @openapi
 *  /usermanagement/api/auth/getwarehouseinfo:
 *   get:
 *     tags:
 *       - Employee Service
 *     description: Fetch warehouse info of user corresponding to warehouseId given in query
 *     responses:
 *         '200':
 *           description: Warehouse Information
*/
router.get("/getwarehouseinfo", AuthController.getwarehouseinfo);
// routes/auth.js
/**
 * @openapi
 *  /usermanagement/api/auth/getOrganizationsByTypewithauth:
 *   get:
 *     tags:
 *       - Employee Service
 *     description: Fetch organisation of user corresponding to organisationId given in query
 *     responses:
 *         '200':
 *           description: List of Organization Types
*/
router.get(
  "/getOrganizationsTypewithauth",
  AuthController.getOrganizationsTypewithauth
);
// routes/auth.js
/**
 * @openapi
 *  /usermanagement/api/auth/emailverify:
 *   get:
 *     tags:
 *       - Employee Service
 *     description: Verify email with corresponding emailID and Phone Number
 *     parameters:
 *       - name: emailID
 *         in: body
 *         description: EmailID of corresponding user 
 *         schema:
 *          example: 
 *           value: johndoe@gmail.com
 *       - name: phone number
 *         in: body
 *         description: phone number of corresponding user 
 *         schema:
 *          example: 
 *           value: 9123098712
 *     produces:
 *       - application/json
 *     responses:
 *         '200':
 *           description: Email verified successfully
*/
router.get("/emailverify", AuthController.emailverify);
// routes/auth.js
/**
 * @openapi
 *  /usermanagement/api/auth/images/:key:
 *   get:
 *     tags:
 *       - Employee Service
 *     produces:
 *       - application/json
 *     responses:
 *         '200':
 *           description:
*/ 
router.get("/images/:key", AuthController.Image);
// routes/auth.js
/**
 * @openapi
 *  /usermanagement/api/auth/googleLogin:
 *   post:
 *     tags:
 *       - Employee Service
 *     produces:
 *       - application/json
 *     responses:
 *         '200':
 *           description: Loggedin through google
*/ 
router.post("/googleLogin", AuthController.googleLogIn);
// routes/auth.js
/**
 * @openapi
 *  /usermanagement/api/auth/deleteProfile:
 *   delete:
 *     tags:
 *       - Employee Service
 *     produces:
 *       - application/json
 *     responses:
 *         '200':
 *           description: User account deleted successfully!
*/ 
router.delete("/deleteProfile", AuthController.deleteProfile);
router.post(
  "/addUsersFromExcel",
  upload.single("excel"),
  AuthController.addUsersFromExcel
);
router.post(
  "/addOrgsFromExcel",
  upload.single("excel"),
  OrganisationController.addOrgsFromExcel
);
router.get("/getAllUsers", AuthController.getAllUsers);
router.get("/getOrgUsers", AuthController.getOrgUsers);
router.get("/getWarehouseUsers", AuthController.getWarehouseUsers);
router.get("/getOrgUserAnalytics", AuthController.getOrgUserAnalytics);

router.get("/getOrgActiveUsers", AuthController.getOrgActiveUsers);
router.get("/getUsers", AuthController.getUsers);
module.exports = router;
