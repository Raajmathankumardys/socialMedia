const { default: mongoose } = require('mongoose');
const Post = require('../Schema/instraPost')
async function getAllPost(req, res) {
try {
  const post=await Post.find()
  res.status(200).json(post);
} catch (error) {
  res.status(500).json(err);
}
}
async function createPost(req, res) {
  console.log(req.body);
  const newPost = new Post(req.body);
  console.log(newPost)
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
}
async function updatePost(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    console.log(post)
    if (post) {
      await post.updateOne({ $set: req.body });
      res.status(200).json({ message: 'Update Successfully' });
      return
    }
    res.status(200).json({ message: 'Update Failed' });

  } catch (err) {
    res.status(500).json(err);
  }
}
async function deletePost(req, res) {

  //const newPost = new Post(req.body);
  try {
    const post = await Post.findById(req.params.id);
    console.log(post)
    await post.deleteOne();
    res.status(200).json({ message: 'deleted Successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
}
async function likeOrDislike(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    console.log(post);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      //await post.updateOne( {likecount: post.likes.length });
      res.status(200).json(post.likes.length);
    } else 
    {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      //await post.updateOne( {likecount: post.likes.length });
      res.status(200).json(post.likes.length);
    }
  } catch (err) {
    res.status(500).json(err);
  }
}
 async function getPost(req, res)  {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function commentPost(req,res){
  try {
    const post = await Post.findById(req.params.id);
    if(!post){
      res.status(200).json({message:'invalid userId'})
      return

    }
    console.log(post);
    await post.updateOne({ $push: {comment_post:req.body.comment_post }});
    
    res.status(200).json({message:"Comment added Successfully"})
  } catch (error) {
    res.status(400).json({message:error})
  }
 
}

module.exports = { createPost, deletePost, updatePost, likeOrDislike,getPost,getAllPost,commentPost }