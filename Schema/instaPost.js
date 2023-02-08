const mongoose = require('mongoose')
const Schema = mongoose.Schema
const CommentSchema = new Schema({
    userId: String,
    comment: String,
});
const myPost = new Schema({
    userId: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    like: {
        type: Array,
        require: false
    },
    tag: {
        type: Array,
        require: false
    },
    location: {
        type: String,
        require: false
    },
    comment_post: [CommentSchema],

})
module.exports = mongoose.model('post', myPost)
