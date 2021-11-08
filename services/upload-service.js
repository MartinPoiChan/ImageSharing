const multer  = require('multer'),  
mime = require('mime-types')
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assets/uploads/"); //important this is a direct path fron our current file to storage location
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null,file.originalname + uniqueSuffix + '.' + mime.extension(file.mimetype));
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
    } 
    else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
  limits: { fileSize: maxSize },
})

const imageUpload = (meta, tags)=>{
  
}
module.exports={upload};