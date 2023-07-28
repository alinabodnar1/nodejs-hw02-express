const express = require("express");

const {register, login} = require('../../controllers/auth');

const {schemas} = require('../../models/user');

const {validateBody} = require('../../middlewares');

const router = express.Router();

// signup
router.post('/register', validateBody(schemas.registerSchema), register);

// signin
router.post('/login', validateBody(schemas.loginSchema), login);

module.exports = router;