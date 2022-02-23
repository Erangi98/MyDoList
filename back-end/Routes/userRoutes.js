const express = require("express");
const { signUpUser, authUser, updateUserProfile } = require("../Controller/userController");
const { protect } = require("../MiddleWare/authMiddleware");

const router = express.Router();

router.route("/").post(signUpUser);
router.route("/signIn").post(authUser);
router.route("/profile").post(protect, updateUserProfile);

module.exports = router;