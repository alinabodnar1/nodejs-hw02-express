const multer = require("multer");
const path = require("path");

const tmpDir = path.join(__dirname, " ../", 'tmp');

// налаштовуємо сховище multer
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