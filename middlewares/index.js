const  {validateBody, validateBodyFavorite, validateEmailVerify} = require('./validateBody');
const isValidId = require('./isValidId');
const authentication = require('./authentication');

module.exports = {
  validateBody,
  isValidId,
  validateBodyFavorite,
  validateEmailVerify,
  authentication,
}