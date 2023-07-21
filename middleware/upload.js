const multer = require('multer'); 
const moment=require('moment')
const path = require('path');


const storage=multer.diskStorage({
    destination(req,file,cb){
      cb(null,'uploads/')
    },
    filename(req, file, cb) {
      const date = moment().format('DDMMYYYY-HHmmssSSS');
      const filename = `${date}-${file.originalname}`;
      cb(null, filename);
      req.uploadedFileName = filename;
    }
  });
  
  const fileFilter = (req, file, cb) => {
    const allowedExtensions = ['.png', '.jpg'];
    const fileExtension = path.extname(file.originalname);
  
    if (allowedExtensions.includes(fileExtension)) {
      cb(null, true); 
    } else {
      cb(new Error('Недопустимое расширение файла')); 
    }
  };
  
  const limits={
    fileSize:1024*1024*5
  }
  
  module.exports=multer({storage,fileFilter,limits})