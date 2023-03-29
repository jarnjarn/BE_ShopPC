
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img/') // Thư mục lưu ảnh trên server
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname) // Tên file gồm thời gian và tên file gốc
  }
})

const upload = multer({ storage: storage });

const uploadImage = (req, res, next) => {
    const uploadSingle = upload.array('images') // Field name trên form
    uploadSingle(req, res, function (err) {
      if (err) {
        console.log("a");
        return res.status(400).json({ error: err.message }); // Trả về lỗi chi tiết
      }
      // req.files là mảng các file đã upload
      req.body.images = req.files.map(file => file.filename);
      next();
    })
  }
module.exports = uploadImage;