const profileSchema = require('../Schema/profileSchema')

async function followAndfollower(req, res) {
    try {
        if(req.params.id!==req.body.userId){
            const user = await profileSchema.findById(req.params.id);
            console.log(user);
            const currentUser = await profileSchema.findById(req.body.userId)
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push:{followers :req.body.userId}})
                await currentUser.updateOne({$push:{following:req.params.id}})
                res.status(200).json({message:'Friend added succefully'})
            } else {
                await user.updateOne({$pull:{followers:req.body.userId}})
                await currentUser.updateOne({$pull:{following:req.params.id}})
                res.status(200).json({message:'Friend remove succefully'})
            }
        }else{
            res.status(200).json({message:'You cannot follow yourself'})
        }
        
        
    } catch (error) {
        res.status(400).json({message:error})
    }
  
    //params friends oid
    //body.user ouer id

}
//...................................................

    

module.exports = { followAndfollower }