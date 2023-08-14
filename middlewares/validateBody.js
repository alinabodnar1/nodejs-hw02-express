const validateBody = (schema) => {
  const func = (req, res, next) => {
    // Якщо нема цілого боді
    if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
      res.status(400).json({
        message: "missing fields",
      });
      return;
    }

    const { error } = schema.validate(req.body);

    if (error) {
      console.log("Error from schema:", error);

      const errorMessage = res.status(400).json({
        message: `${error.details[0].message}`,
      });

        return errorMessage;
    }
    next();
  };
  return func;
};

const validateBodyFavorite = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({
        message: `missing field ${error.details[0].context.key}`,
      });
      return;
    }
    next();
  };
  return func;
};

const validateEmailVerify = (schema) => {
  const func = (req, res, next) => {
    // Якщо нема email
    if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
      res.status(400).json({
        message: "missing required field email",
      });
      return;
    }

    const { error } = schema.validate(req.body);

    if (error) {
      console.log("Error from schema:", error);

      const errorMessage = res.status(400).json({
        message: `${error.details[0].message}`,
      });

        return errorMessage;
    }
    next();
  };
  return func;
};

module.exports = {
  validateBody,
  validateBodyFavorite,
  validateEmailVerify,
};
