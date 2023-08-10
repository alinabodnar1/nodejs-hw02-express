const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {nanoid}=require("nanoid");

const { HttpError, decorator, sendEmail } = require("../helpers");

const { SECRET_KEY, BASE_URL } = process.env;

const register = async (req, res) => {
  // перевірка на унікальність email при реєстрації/409 Conflict
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const verificationToken = nanoid(5);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  const verifyEmail = {
      to: email,
      subject: "Verify email",
      html: `<a target="_blanc" href="${BASE_URL}/users/verify/${verificationToken}">Click to verify email</a>`,
  }

  await sendEmail(verifyEmail);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      verificationToken: newUser.verificationToken,
    },
  });
};

const verify = async (req, res) => {
  const {verificationToken} = req.params;
  const user = await User.findOne({verificationToken});

  if(!user){
    throw HttpError(404, "User not found");
  }

  await User.findByIdAndUpdate(user._id, {verify: true, verificationToken: null});

  res.status(200).json({
    message: 'Verification successful', 
  })
}


const login = async (req, res) => {
  // перевірка чи є користувач з таким email/401 Unauthorized
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  if (!user.verify) {
    throw HttpError(401, "Not authorized");
  }
  // якщо є користувач з таким email - перевіряємо пароль
  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  // якщо є користувач і його пароль валідний - створюємо токен і відправляємо
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = async (req, res) => {
  // вся інформація про user вже є в req.user
  const { email, subscription } = req.user;
  res.status(200).json({
    email,
    subscription,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json({
    message: "No Content",
  });
};

module.exports = {
  register: decorator(register),
  verify: decorator(verify),
  login: decorator(login),
  getCurrent: decorator(getCurrent),
  logout: decorator(logout),
};
