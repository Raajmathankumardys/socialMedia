var mongoose = require('mongoose')
Schema = mongoose.Schema;

var profileSchema = new Schema({
    profilePicture: {
        type: 'String',
        required: false,
    },
    userName: {
        type: String,
        required: true,
        min: 3,
      max: 20,
      unique: true,
    },
    age: {
        type: Number,
        require: [true, 'Please Give Age']
    },
    password: {
        type: String,
        required: true,
        min: 8,
    },
    bio: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true,
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
    premiere: {
        type: Boolean,
        require: false
    },
    followers: {
        type: Array,
        required: false
    },
    following: {
        type: Array,
        required: false
    }
},{timestamps:true});

const user = mongoose.model('user', profileSchema)
module.exports = user