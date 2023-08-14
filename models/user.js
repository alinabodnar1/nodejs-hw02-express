const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: emailRegexp,
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
    avatarURL: String,
  },
  { versionKey: false, timestamps: true }
);

// Якщо валідація не пройдена, викидаємо помилку зі статусом 400
userSchema.post("save", handleMongooseError);

// схема для перевірки тіла запиту на реєстрацію
const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": ` Missing required email field`,
    "string.empty": ` String is empty. Enter email`,
    "string.pattern.base": "Email is not valid",
  }),
  password: Joi.string().min(5).max(20).required().messages({
    "string.min": `Password should have a minimum length of 5`,
    "string.max": `Password should have a maximum length of 20`,
    "any.required": ` Missing required password field`,
    "string.empty": ` String is empty. Enter password`,
  }),
  subscription: Joi.string().messages({
    "string.empty": ` String is empty. Choose one option from: starter/pro/business`,
  }),
});

// схема для перевірки тіла запиту на логін
const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": ` Missing required email field`,
    "string.empty": ` String is empty. Enter email`,
    "string.pattern.base": "Email is not valid",
  }),
  password: Joi.string().min(5).max(20).required().messages({
    "string.min": `Password should have a minimum length of 5`,
    "string.max": `Password should have a maximum length of 20`,
    "any.required": ` Missing required password field`,
    "string.empty": ` String is empty. Enter password`,
  }),
});

// схема для перевірки email для верифікаці (повторна відправка email користувачу з посиланням)
const verifySchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": ` Missing required email field`,
    "string.empty": ` String is empty. Enter email`,
    "string.pattern.base": "Email is not valid",
  }),
});

const schemas = {
  registerSchema,
  loginSchema,
  verifySchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
