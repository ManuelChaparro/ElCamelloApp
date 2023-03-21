'use strict'

const router = require('express').Router();
const {verifyToken, loginUser, registerUser, modifyUser, deleteUser, getUsersList, recoverPassword} = require('../controllers/users.controller.js')

router.post('/user/register', registerUser);
router.post('/user/login', loginUser);
router.put('/user/modify', verifyToken, modifyUser);
router.delete('/user/delete', verifyToken, deleteUser);
router.get('/user/list', verifyToken, getUsersList);
router.post('/user/recovery', recoverPassword);

module.exports = router;