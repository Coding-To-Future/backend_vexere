const express = require('express');
const userController = require('./users');
const { authenticate, authorize } = require('../../../middlewares/auth');
const { uploadImage } = require('../../../middlewares/uploadImage');
const {
  validatePostUser,
} = require('../../../validations/users/validate.post.user');
const router = express.Router();

router.post('/', userController.createUser);
router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.patch('/:id', userController.updateUserById);
router.patch(
  '/change-password/:id',
  authenticate,
  userController.updatePasswordUser
);
router.delete('/:id', userController.deteteUserById);
router.post('/login', userController.login);

router.get(
  '/test-private',
  authenticate,
  authorize(['admin']),
  (req, res, next) => {
    res.status(200).json({ message: 'Ban da thay dieu ko nen thay' });
  }
);
router.post(
  '/upload-avatar',
  authenticate,
  uploadImage,
  // userController.uploadAvatar,
  (req, res, next) => {
    console.log(req.files);
    // res.json('done');
    // res.status(400).send({ message: err.message });
  }
);

router.delete('/me/avatar', authenticate, userController.deleteAvatar);
router.get('/me/:id/avatar', userController.getAvatarById);

module.exports = router;
