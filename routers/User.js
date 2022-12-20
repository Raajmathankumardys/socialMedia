const  router=require('express').Router()
const userCOntroller=require('../Controller/user')
router.get('/get/:id',userCOntroller.getUser)
module.exports=router