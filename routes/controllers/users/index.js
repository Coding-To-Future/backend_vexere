const express = require('express');
const userController = require('./users');
const { authenticate, authorize } = require('../../../middlewares/auth');
const { uploadImage } = require('../../../middlewares/uploadImage');
const {
  validatePostUser,
} = require('../../../validations/users/validate.post.user');
const router = express.Router();

router.post('/', userController.createUser);
router.get('/', authenticate, authorize('admin'), userController.getUsers);
router.get('/me', authenticate, userController.getUserById);
router.patch('/me', authenticate, userController.updateUserById);
router.patch(
  '/change-password/me',
  authenticate,
  userController.updatePasswordUser
);
router.delete('/me', authenticate, userController.deteteUserById);
router.post('/login', userController.login);
router.post('/logout', authenticate, userController.logout);
router.post('/logout-all', authenticate, userController.logoutAll);

router.post(
  '/upload-avatar',
  authenticate,
  uploadImage('images'),
  userController.uploadAvatar
  // (req, res, next) => {
  //   console.log(req.files);
  // res.json('done');
  // res.status(400).send({ message: err.message });
);

router.delete('/me/avatar', authenticate, userController.deleteAvatar);
router.get('/me/:id/avatar', userController.getAvatarById);

module.exports = router;
