const express = require('express');


const { SignUp, logIn, veriFyOtp, forgotPassword, logout } = require('../Controller/user.controller');
const { getAllUsers, getUser, updateUser, deleteUser } = require('../Controller/admin.controller');
const { access } = require('../middleware/rolebased.middleware');
const auth = require('../middleware/auth.middleare');

const userRouter = express.Router();

userRouter.post('/signup', SignUp);
userRouter.post('/login', logIn);
userRouter.post('/verifyOtp', auth, veriFyOtp); // auth should be defined
userRouter.post('/forgotPassword', auth, forgotPassword);
userRouter.post('/logout', auth, logout);

// Admin routes - require auth and admin role
userRouter.get('/admin/users', auth, access('admin'), getAllUsers);
userRouter.get('/admin/users/:id', auth, access('admin'), getUser);
userRouter.put('/admin/users/:id', auth, access('admin'), updateUser); 
userRouter.delete('/admin/users/:id', auth, access('admin'), deleteUser); 

module.exports = { userRouter };
