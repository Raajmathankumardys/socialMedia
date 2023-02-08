const path =require('path')
const multer=require('multer')
var diskStorage=multer.diskStorage({destination:function(req,file,cb){
    cb(null,'uploads/')
},
filename:function(req,file,cb){
    let ext=path.extname(file.originalname)
    cb(null,Date.now() + ext)
}
})
const upload = multer({
    storage: diskStorage, limits: { fieldSize: 1000000 }, fileFilter(req, file, cb) {
        // if (!file.originalname.endsWith('.jpg')) {
        //     return cb(new Error('Please Upload only .JPG'))
        // }
        if(file.mimetype=="image/png"||file.mimetype=="image/jpg"){
            cb(null,true)
        }else{
            cb(null, false)
            return cb(new Error('Please Upload only .JPG'))
        }
      
    }
})
module.exports=upload
