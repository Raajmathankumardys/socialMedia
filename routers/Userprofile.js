const router = require('express').Router()


const multer = require('multer')
const upload = multer({
    dest: 'images', limits: { fieldSize: 1000000 }, fileFilter(req, file, cb) {
        if (!file.originalname.endsWith('.jpg')) {
            return cb(new Error('Please Upload only .JPG'))
        }
        cb(undefined, true)
    }
})

const userCOntroller = require('../Controller/user')
router.get('/get/:id', userCOntroller.getUser)
router.post('/uploadprofilepicture', upload.single('upload'), 
userCOntroller.uploadProfilePics, 
(error, req, res, next) => { res.status(400).send({ error: error.message }) })
module.exports = router