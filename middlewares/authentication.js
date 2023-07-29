const { HttpError } = require("../helpers");
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

// Перевірка токена
const authentication = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(HttpError(401));
  }
  // Перевіряємо чи токен валідний
  try {
    const { id } = jwt.verify(token, SECRET_KEY);

    // Перевіряємо чи email, який вводить користувач, є в базі
    const user = await User.findById(id);

    if (!user || !user.token || user.token !== token) {
      next(HttpError(401));
    }
    req.user = user;
    next();
  } 
  catch {
    next(HttpError(401));
  }
};

module.exports = authentication;
