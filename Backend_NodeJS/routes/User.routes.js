const express = require("express");
const router = express.Router();
const userController = require("../controllers/User.controller");
const userValidation = require("../validations/userValidations");
const authController = require("../controllers/Authentification.controller");

router.post(
  "/create",
  userValidation.validationCreate,
  userController.CreateAdmin
);
router.get("/get_all", userController.GetAllAdmin);
router.get("/get_one/:_id", userController.GetOne);
router.get("/delete_one/:_id", userController.DeleteAdmin);
router.post("/change_password", userController.ChangePassword);
router.post("/forgot", userController.ForgotPassword);
router.post("/update_info", userController.UpdateGeneralInfos);

// Authentification
router.post("/login", authController.Login);

module.exports = router;
