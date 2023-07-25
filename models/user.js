const {Schema, model} = require('mongoose');
const Joi = require("joi");

const {handleMongooseError} = require('../helpers');

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
 
const userSchema = new Schema({
  password: {
    type: String,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: emailRegexp,
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: String
}, {versionKey: false, timestamps: true});

// Якщо валідація не пройдена, викидаємо помилку зі статусом 400
userSchema.post("save", handleMongooseError);

// joi-схема на реєстрацію
const registerSchema = Joi.object({

})


// joi-схема на пароль