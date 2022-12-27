const mongoose=require('mongoose')

const CommentSchema = mongoose.Schema({
  userId: String,
  comment: String,
});
Schema=mongoose.Schema
var commentPost=new Schema({
      CommentPost:[ CommentSchema
          ],
      })

      var post=mongoose.model('commentPost', commentPost)
module.exports=post