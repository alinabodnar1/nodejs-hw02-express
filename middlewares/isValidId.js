const { isValidObjectId } = require('mongoose');

const isValidId = (req, res, next) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    res.status(404).json({
      message: "Not found",
    });
    return;
  }
  next();
}

module.exports = isValidId;