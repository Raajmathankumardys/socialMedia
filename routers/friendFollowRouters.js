const express=require('express').Router()
const friendController=require('../Controller/friendController')

express.post('/friendsRequest/:id',friendController.followAndfollower)
module.exports=express