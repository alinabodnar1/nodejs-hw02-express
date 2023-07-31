const  {validateBody, validateBodyFavorite} = require('./validateBody');
const isValidId = require('./isValidId');
const authentication = require('./authentication');

module.exports = {
  validateBody,
  isValidId,
  validateBodyFavorite,
  authentication,
}