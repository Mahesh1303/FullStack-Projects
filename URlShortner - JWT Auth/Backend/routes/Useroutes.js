const express=require('express')
const { HandleSignUp,HandleUserLogin,HandleUserLogout } = require('../controllers/Usercontrol')
const { VerifyCookie } = require('../middlewares/UserAuth')

const userrouter=express.Router()

userrouter.post('/',HandleSignUp)
userrouter.post('/login',HandleUserLogin)
userrouter.get('/logout',VerifyCookie,HandleUserLogout)








module.exports=userrouter