const express = require('express');
const router = express.Router()
const userController = require('./../controllers/userController')
const authController = require('./../controllers/authController');
router.post('/register-page', authController.register);
router.post('/login-page', authController.login);
// router.post('/forgotPassword', authController.forgotPassword);
// router.patch('/resetPassword/:token', authController.resetPassword);

router.patch(
'/updateMyPassword',
authController.protect,
authController.updatePassword
);

router.patch('/updateMe', authController.protect, userController.updateMe);
router.delete('/deleteMe', authController.protect, userController.deleteMe);
router.get('/logout', authController.logout);

router
.route('/')
.get(userController.getAllUsers)
.post(userController.createUser);


router
.route('/:id')
.get(userController.getUser)
.patch(userController.updateUser)
.delete(userController.deleteUser);

module.exports = router;