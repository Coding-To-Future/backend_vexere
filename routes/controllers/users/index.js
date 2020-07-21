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
router.delete('/me', authenticate, userController.deleteUserById);
router.post('/login', userController.login);
router.post('/logout', authenticate, userController.logout);
router.post('/logout-all', authenticate, userController.logoutAll);

router.post(
  '/me/avatar',
  authenticate,
  uploadImage('avatar'),
  userController.uploadAvatar,
  (error, req, res, next) => {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
);

router.delete('/me/avatar', authenticate, userController.deleteAvatar);
router.get('/me/:id/avatar', userController.getAvatarById);

module.exports = router;
