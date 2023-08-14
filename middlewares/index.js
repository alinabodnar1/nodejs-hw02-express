const  {validateBody, validateBodyFavorite, validateEmailVerify} = require('./validateBody');
const isValidId = require('./isValidId');
const authentication = require('./authentication');
const upload = require('./upload');

module.exports = {
  validateBody,
  isValidId,
  validateBodyFavorite,
  validateEmailVerify,
  authentication,
  upload,
}