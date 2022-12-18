
var UserSchema = require("../Schema/profileSchema");
const jwt = require("jsonwebtoken");

async function verifyToken (req, res, next) {
  try {
    console.log(req.headers.authorization);
    const bearerToken =req.headers.authorization;
    console.log(bearerToken);
    if(bearerToken){
      console.log('Bearer kkdjoodsl;');
      var bearer=bearerToken.split(" ")
      var token=bearer[1]
    console.log(token);
    }
    
    if (!token) {
       res.status(403).json({message:"A token is required for authentication"});
       return
    }
  } catch (error) {
    res.status(401).json({message:"A token is required for authentication"});
    return

  }
  
    try {
      let jwtSecretKey = process.env.JWT_SECRET_KEY;
      console.log(jwtSecretKey);
      const decoded = jwt.verify(token, jwtSecretKey);
      console.log(decoded);
      const id = await UserSchema.findById(decoded._id);
     // console.log(id,'sdddddd');
      if(id){
        req._id=decoded._id
        console.log(req._id);
        next();
      }else{
        return res.status(200).json({message:"No user"});

      }
    
    } catch (err) {
      return res.status(401).json({message:"Invalid Token"});
    }
    
  };

  module.exports = {verifyToken }