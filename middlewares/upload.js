const multer = require("multer");
const path = require("path");
const Jimp = require('jimp');

const tmpDir = path.join(__dirname, '../',  'tmp');  // Users/alinka/Desktop/NODE/HW/nodejs-rest-api/tmp

Jimp.read(`${tmpDir}/avatar.jpg`, (err, avatar) => {
  if (err) throw err;
  avatar
    .resize(250, 250) // resize
    .write(`${tmpDir}/avatar.jpg`); // save
});

// налаштовуємо об'єкт налаштувань для multer
const multerConfig = multer.diskStorage({
  destination: tmpDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

// мідлвара
const upload = multer({
  storage: multerConfig,
});

module.exports = upload;