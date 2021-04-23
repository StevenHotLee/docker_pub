var multer = require("multer");
//var upload = multer({ dest: "public/uploads/" });
const path = require("path");

const express = require("express");
const router = express.Router();

let storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, "public/uploads/");
  },
  filename: function(req, file, callback) {
    let extension = path.extname(file.originalname);
    let basename = path.basename(file.originalname, extension);
    callback(null, basename + "-" + Date.now() + extension);
  }
});

let upload = multer({
  storage: storage
});

router.post("/image", upload.single("file"), function(req, res, next) {
  let file = req.file;
  console.log(file);
  res.json({ url: `/uploads/${file.filename}` });
});

module.exports = router;
