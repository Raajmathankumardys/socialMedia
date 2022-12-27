const { default: mongoose } = require('mongoose');
const Post = require('../Schema/instraPost')
const User = require('../Schema/profileSchema')
async function getAllPost(req, res) {
  try {
    const post = await Post.find()
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
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      //await post.updateOne( {likecount: post.likes.length });
      res.status(200).json(post.likes.length);
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

async function getPost(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function commentPost(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(200).json({ message: 'invalid userId' })
      return

    }
    console.log(post);
    await post.updateOne({ $push: { comment_post: req.body.comment_post } });

    res.status(200).json({ message: "Comment added Successfully" })
  } catch (error) {
    res.status(400).json({ message: error })
  }

}

async function deletecommentPost(req, res) {
  try {
    console.log(req.params);
    const post = await Post.findById(req.body.post_id);
    console.log(post);
    if (!post) {
      res.status(200).json({ message: 'invalid userId' })
      return
    }
    //const deletepost = await post.comment_post.findById(req.body.comment_post_id);
    //console.log(deletepost+"ggggggggggggggggggggggg");
    // console.log(post.comment_post[0]._id, req.body.comment_post_id, mongoose.Types.ObjectId(req.body.comment_post_id));
    for (const comment of post.comment_post) {
      console.log(comment, comment._id, post.comment_post, comment._id == req.body.comment_post_id);
      if (comment._id == req.body.comment_post_id) {
        try {
          await post.updateOne({ $pull: { comment_post: comment } });
          res.status(200).json({ message: 'COmment Deleted Successfully' })
          return
        } catch (error) {
          //res.status(400).json({ message: error })
        }

      }
      console.log(contents);
    }

  } catch (error) {
    res.status(400).json({ message: error })
  }

}

module.exports = { createPost, deletePost, updatePost, likeOrDislike, getPost, getAllPost, commentPost, deletecommentPost }