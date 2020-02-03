const express = require("express");
const userController = require("./users");
// const multer = require('multer')
const { authenticate, authorize } = require("../../../middlewares/auth");
const { uploadImage } = require("../../../middlewares/uploadImage");
const {
  validatePostUser
} = require("../../../validations/users/validate.post.user");
const router = express.Router();

router.post("/", validatePostUser, userController.createUser);
router.get("/", userController.getUsers);
// router.get('/:id', userController.getUserById)
// router.put('/:id', userController.updateUserById)
router.delete("/:id", userController.deteteUserById);
router.post("/login", userController.login);

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads')
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + "_" + file.originalname)
//     }
// })

// const upload = multer({ storage })

router.get(
  "/test-private",
  authenticate,
  authorize(["admin"]),
  (req, res, next) => {
    res.status(200).json({ message: "Ban da thay dieu ko nen thay" });
  }
);
router.post(
  "/upload-avatar",
  authenticate,
  uploadImage("avatar"),
  userController.uploadAvatar
);

module.exports = router;
