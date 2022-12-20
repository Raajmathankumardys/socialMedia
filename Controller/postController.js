const Post = require('../Schema/post')
async function getAllPost(req, res) {
try {
  const post=await Post.find()
  res.status(200).json(post);
} catch (error) {
  res.status(500).json(err);
}
}
async function createPost(req, res) {
  const newPost = new Post(req.body);
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
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
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
module.exports = { createPost, deletePost, updatePost, likeOrDislike,getPost,getAllPost }