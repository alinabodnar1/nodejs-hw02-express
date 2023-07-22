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

    // Якщо нема якогось поля взагалі
    if (error.details[0].type === "any.required") {
      res.status(400).json({
        message: `${error.details[0].message}`,
      });
      return;
    }

    // Якщо в полі порожній рядок
    if (error.details[0].type === "string.empty") {
      res.status(400).json({
        message: `${error.details[0].message}`,
      });
      return;
    }
    // Якщо ввели кількість символів  > 12
    if (error.details[0].type === "string.max") {
      res.status(400).json({
        message: `${error.details[0].message}`,
      });
      return;
    }

    // Якщо вели кількість символів  < 3
    if (error.details[0].type === "string.min") {
      res.status(400).json({
        message: `Name should have a minimum length of 3`,
      });
      return;
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
