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
    console.log("Error from schema:", error);

    const typeError = error.details[0].type;

    const errorMessage = res.status(400).json({
      message: `${error.details[0].message}`,
    });

    if (!error) return;

    if (
      typeError === "any.required" ||
      typeError === "string.empty" ||
      typeError === "string.max" ||
      typeError === "string.min"
    ) {
      return errorMessage;
    } 

    next();
}
  return func;
};

const validateBodyFavorite = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({
        message: `missing field ${error.details[0].context.key} `,
      });
      return;
    }
    next();
  };
  return func;
};

module.exports = {
  validateBody,
  validateBodyFavorite,
};
