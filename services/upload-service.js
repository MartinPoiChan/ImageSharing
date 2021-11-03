const multer  = require('multer')

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/"); //important this is a direct path fron our current file to storage location
  },
  filename: (req, file, cb) => {
    cb(null,file.originalname);
  },
});

const maxSize = 50 * 1024 * 1024; // for 50MB?

const upload = multer({
  storage: fileStorageEngine,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
  limits: { fileSize: maxSize },
})

const imageUpload = (meta, tags)=>{
  
}
module.exports={upload};



// multer({
//   dest    : './uploads/',
//   onError : function(err, next) {
//     console.log('error', err);
//     next(err);
//   }
// }),
// function(req, res) {
//   res.status(204).end();
// }