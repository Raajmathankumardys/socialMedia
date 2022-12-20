const router=require('express').Router()
const postController=require('../Controller/postController')
router.post('/create',postController.createPost)
router.delete('/delete/:id',postController.deletePost)
router.put('/update/:id',postController.updatePost)
router.put("/:id/like",postController.likeOrDislike)
router.get("/getAllPost",postController.getAllPost)
router.get("/:id",postController.getPost)
module.exports=router