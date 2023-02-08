const express =require('express')
var router=express.Router()
var userSignupController=require('../Controller/UserSignUp')
var upload=require('../MiddleWare/upload')
router.post('/signup',upload.single('pic'),userSignupController.signUp)
router.post('/signIn',userSignupController.signIn)
module.exports=router