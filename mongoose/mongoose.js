const mongoose = require('mongoose')
mongoose.set('strictQuery', false);
const url = 'mongodb://0.0.0.0:27017/instragram'
  mongoose.connect(url,{useNewUrlParser: true}).then(() => { console.log('connected') }).catch((err) => { console.log(err); })

