var mongoose = require('mongoose')
Schema = mongoose.Schema;

var profileSchema = new Schema({
    profilePicture: {
        type: String,
        required:true
    }, 
    userName: {
        type: String,
        required: true
    },
    age:{
        type:Number,
        require:[true,'Please Give Age']
    },
    password:{
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    friends: {
        type: Array,
        required: false,
    },
    post: {
        type: Array,
        required: false
    },
    premiere:{
        type:Boolean,
        require:false
    }
});

const user= mongoose.model('user', profileSchema)
module.exports =user