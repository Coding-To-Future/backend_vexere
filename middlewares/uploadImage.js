const multer = require('multer');
const mkdirp = require('mkdirp');
// const multerS3 = require("multer-s3");
// const aws = require("aws-sdk");
// ./uploads/avatar
// ./uploads/trip
// ./uploads/coach

// module.exports.uploadImage = (type) => {
//   // mkdirp(`./uploads/${type}`).catch(err => console.log(err));
//   // const storage = multer.diskStorage({
//   //   destination: function(req, file, cb) {
//   //     cb(null, `./uploads/${type}`);
//   //   },
//   //   filename: function(req, file, cb) {
//   //     cb(null, Date.now() + "_" + file.originalname);
//   //   },
//   //   limits: {
//   //     fileSize: 1000000
//   //   }
//   // });

//   // const storage = multer({

//   // });

//   const upload = multer({
//     // dest: type,
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

//   // const upload = multer({ storage: storage });
//   return upload.single(type); //key de nhap vao test tu pocman
// };

//CLOUDINARY
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: 'dtnws8uep',
  api_key: '788583878192165',
  api_secret: 'yqScod8cqOtMYijLTQ6V1DN8TCw',
});

module.exports.uploadImage = () => {
  const upload = multer({
    storage: cloudinaryStorage({
      cloudinary: cloudinary,
      folder: 'vexere',
      // allowedFormats: ["jpg", "png"],
      filename: function (req, file, cb) {
        cb(undefined, 'my-file-name');
      },
    }),
  });
  return upload.aray('images', 10);
};

//AWS S3
// module.exports.uploadImage = type => {
//   const upload = multer({
//     storage: multerS3({
//       s3: new aws.S3(),
//       bucket: "upload-xedike",
//       acl: "public-read",
//       metadata: function(req, file, cb) {
//         cb(undefined, { fieldName: "META_DATA" });
//       },
//       key: function(req, file, cb) {
//         if (file.mimetype === "application/octet-stream") type = ".jpg";
//         cb(null, type + "/" + Date.now() + "-" + file.originalname);
//       }
//     })
//   });
//   return upload.single(type);
// };
