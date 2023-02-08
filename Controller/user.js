const User=require('../Schema/profileSchema')

async function getUser(req, res)  {
    try {
      const user = await User.findById(req.params.id);
      const { password, updatedAt, ...other } = user._doc;
      res.status(200).json(other);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  async function uploadProfilePics(req, res)  {
    try {
      console.log(req.file.buffer);
      console.log(req.User);
      req.User.profilePicture=req.file.buffer
      await req.User.save()
      res.status(200).json({message:'success'+req.User})
    } catch (err) {
      res.status(500).json(err);
    }
  }

  module.exports={getUser,uploadProfilePics}