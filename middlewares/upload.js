const multer = require("multer");
const path = require("path");
const Jimp = require("jimp");
const fs = require("fs");

const tmpDir = path.join(__dirname, "../", "tmp"); // Users/alinka/Desktop/NODE/HW/nodejs-rest-api/tmp

fs.readdir(tmpDir, (err, files) => {
  if (err) {
    console.log("Помилка при читанні папки:", err);
    return;
  }
  files.forEach((file) => {
    if (
      file.endsWith(".jpg") ||
      file.endsWith(".png") ||
      file.endsWith(".jpeg")
    ) {
      const filePath = `${tmpDir}/${file}`;
      Jimp.read(filePath, (err, image) => {
        if (err) {
          console.log(`Помилка при обробці файлу ${file}`);
          return;
        }
        image.resize(250, 250).write(`${tmpDir}/${file}`);
        console.log(`Файл ${file} був успішно оброблений і збережений`);
      });
    }
  });
});

// налаштовуємо об'єкт налаштувань для multer
const multerConfig = multer.diskStorage({
  destination: tmpDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// мідлвара
const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
