const express = require("express");

const {register, login, getCurrent, logout, updateAvatar, verify, resendVerify} = require('../../controllers/auth');

const {schemas} = require('../../models/user');

const {validateBody, authentication, upload, validateEmailVerify} = require('../../middlewares');

const router = express.Router();

// signup
router.post('/register', validateBody(schemas.registerSchema), register);

router.get("/verify/:verificationToken", verify);

router.post("/verify", validateEmailVerify(schemas.verifySchema), resendVerify);

// signin
router.post('/login', validateBody(schemas.loginSchema), login);

router.get("/current", authentication, getCurrent);

router.post("/logout", authentication, logout);

// add avatar
router.patch("/avatars", authentication, upload.single("avatar"), updateAvatar);

module.exports = router;