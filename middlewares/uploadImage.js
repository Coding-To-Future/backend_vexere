const multer = require('multer');
const mkdirp = require('mkdirp');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
// ./uploads/avatar
// ./uploads/trip
// ./uploads/coach

// module.exports.uploadImage = (type) => {
//   const upload = multer({
//     limits: {
//       fileSize: 1000000,
//     },
//     fileFilter(req, file, cb) {
//       if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
//         return cb(new Error('Please upload an Image'));
//       }
//       cb(undefined, true); //neu la file pdf
//     },
//   });
//   return upload.single(type);
// };

// module.exports.uploadImage = (type) => {
//   const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './public/img');
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + '-' + file.originalname);
//     },
//   });
//   const upload = multer({ storage });
//   return upload.single(type);
// };

//CLOUDINARY
// const cloudinary = require('cloudinary');
// const cloudinaryStorage = require('multer-storage-cloudinary');

// cloudinary.config({
//   cloud_name: 'dtnws8uep',
//   api_key: '788583878192165',
//   api_secret: 'yqScod8cqOtMYijLTQ6V1DN8TCw',
// });

// module.exports.uploadImage = () => {
//   const upload = multer({
//     storage: cloudinaryStorage({
//       cloudinary: cloudinary,
//       folder: 'vexere',
//       // allowedFormats: ["jpg", "png"],
//       filename: function (req, file, cb) {
//         cb(undefined, 'my-file-name');
//       },
//     }),
//   });
//   return upload.aray('images', 10);
// };

//AWS S3

aws.config.update({
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  accessKeyId: process.env.ACCESS_KEY_ID,
  region: 'ap-southeast-1',
  signatureVersion: 'v4',
});

module.exports.uploadImage = (type) => {
  const upload = multer({
    storage: multerS3({
      s3: new aws.S3(),
      bucket: 'upload-vexere',
      acl: 'public-read',
      key: function (req, file, cb) {
        if (file.mimetype === 'application/octet-stream') type = '.jpg';
        cb(null, type + '/' + Date.now() + '-' + file.originalname);
      },
    }),
  });
  return upload.single(type);
};
