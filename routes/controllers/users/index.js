const express = require('express');
const userController = require('./users');
const { authenticate, authorize } = require('../../../middlewares/auth');
const { uploadImage } = require('../../../middlewares/uploadImage');
const {
  validatePostUser,
} = require('../../../validations/users/validate.post.user');
const router = express.Router();

router.post('/', userController.createUser);
router.get('/', authenticate, userController.getUsers);
router.get('/me', authenticate, userController.getUserById);
router.patch('/:id', authenticate, userController.updateUserById);
router.patch(
  '/change-password/:id',
  authenticate,
  userController.updatePasswordUser
);
router.delete('/:id', authenticate, userController.deteteUserById);
router.post('/login', userController.login);
router.post('/logout', authenticate, userController.logout);
router.post('/logout-all', authenticate, userController.logoutAll);
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
