const nodemailer = require("nodemailer");

// Підключення до поштового сервера замовника ukr.net
const { UKR_NET_EMAIL, UKR_NET_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 465, 
  secure: true,
  auth: {
    user: UKR_NET_EMAIL,
    pass: UKR_NET_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

// const data = {
//   to: "malina.bodnar@meta.ua",
//   subject: "Verify email",
//   html: "<p>Verify email</p>",
// };

const sendEmail = async (data) => {
  const email = {...data, from: UKR_NET_EMAIL};
  await transport.sendMail(email);
  return true;
}

  module.exports = sendEmail;