var express = require('express');
var router = express.Router();
const {register,hasUser} = require('../controllers/register')
const {check,signin,signOut}  = require('../controllers/login')
const {mailBoom,setPassword} = require('../controllers/mail')
const {sendCode} = require('../controllers/changePassword')
router.post('/login',check);
router.post('/register', hasUser,mailBoom,register);
router.post('/mail',mailBoom)
router.post('/sendcode',sendCode)
router.post('/set',sendCode,setPassword)
router.get('/signin',signin)
router.get('/signOut',signOut)
module.exports = router;
