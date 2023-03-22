const multer = require("multer");
const path = require("path");
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, "Images");
    },
    filename: function (req, file, callback) {
      callback(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      );
    },
  }),

  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i)) {
      req.fileValidationError = "Only JPG OR PNG allowed!";
      return cb("Only .png and .jpg are allowed! ", false);
    } else if (file.size >= 1048576) {
      req.fileValidationError = "file size should be 10mb";
      return cb("file size should be 10mb", false);
    }
    cb(null, true);
  },
});

module.exports = upload;
