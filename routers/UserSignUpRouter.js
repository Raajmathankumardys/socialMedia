const express =require('express')
var router=express.Router()
var userSignupController=require('../Controller/UserSignUp')

router.post('/signup',userSignupController.signUp)
router.post('/signIn',userSignupController.signIn)
module.exports=router