const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers'); 
const Joi = require("joi");

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
}, { versionKey: false, timestamps: true });

contactSchema.post("save", handleMongooseError);


const addSchema = Joi.object({
  name: Joi.string().min(3).max(12).required().messages({
    'string.min': `Name should have a minimum length of 3`,
    'string.max': `Name should have a maximum length of 12`,
    'any.required': ` Missing required name field`,
    'string.empty': ` String is empty. Enter name`,
  }),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});


const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
})

const schemas = {
  addSchema,
  updateFavoriteSchema,
}

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
}
