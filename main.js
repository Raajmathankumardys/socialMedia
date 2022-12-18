require('./mongoose/mongoose')
const express=require('express')
const userRouter=require('./routers/UserSignUpRouter')
var app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const PORT=process.env.PORT || 2000
app.use('/user',userRouter)
app.listen(PORT,function(){console.log('service Started')})
