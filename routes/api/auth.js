const express = require("express");

const {register, login, getCurrent, logout} = require('../../controllers/auth');

const {schemas} = require('../../models/user');

const {validateBody, authentication} = require('../../middlewares');

const router = express.Router();

// signup
router.post('/register', validateBody(schemas.registerSchema), register);

// signin
router.post('/login', validateBody(schemas.loginSchema), login);

router.get("/current", authentication, getCurrent);

router.post("/logout", authentication, logout);

module.exports = router;