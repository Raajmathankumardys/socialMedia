const userSchema = require('../Schema/profileSchema')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");

async function signUp(req, res) {

  const paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
  if (!req.body.password.match(paswd)) {
    res.status(400).json({ message: "Password should be mixed letter" })
    return
  }
  const userExit = await userSchema.findOne({ userName: req.body.userName });
  console.log(userExit);
  if (userExit) {
    res.status(400).json({ message: "User Already Exist. Please Login" })
    return
  }
  try {
    req.body.password=bcrypt.hashSync(req.body.password, 8)
    const user = new userSchema(req.body);
    await user.save()
    res.status(200).json({ message: user})
  } catch (error) {
    res.status(400).json({ message: error.message })
    return
  }
}

async function signIn(req, res) {
  var userName = await userSchema.findOne({ userName: req.body.userName })
  try {
    !userName && res.send({ accessToken: null, message: "Invalid Gmail" })
    !await bcrypt.compare(req.body.password, userName.password) && res.send({ accessToken: null, message: "Invalid Password" })
          //signing token with user id
      let jwtSecretKey = process.env.JWT_SECRET_KEY;
      var token = jwt.sign(
        { "userId":userName._id,"premiere":userName.premiere},
         jwtSecretKey,{
        expiresIn: 86400
      });
      console.log(typeof token);
        //responding to client request with user profile success message and  access token .
      res.status(200)
        .send({
          user: userName,
          message: "Login successfull",
          accessToken: token,
        });

      
    

  } catch (error) {

  }
};

module.exports = {
    signUp,signIn
}