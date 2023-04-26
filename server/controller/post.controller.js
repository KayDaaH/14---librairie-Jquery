const postModel = require("../model/post.model");
const PostModel = require("../model/post.model");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

module.exports.getPosts = async (req, res) => {
  const posts = await PostModel.find();
  res.status(200).json(posts);
};

module.exports.setPosts = async (req, res) => {
  if (!req.body.message) {
    res.status(400).json({ message: "Merci d'ajouter un message" });
  }

  const post = await PostModel.create({
    message: req.body.message,
    author: req.body.author,
  });
  res.status(200).json(post);
};

module.exports.editPost = async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const postId = await PostModel.findById(req.params.id);
    const updatePost = await PostModel.findByIdAndUpdate(postId, req.body, {
      new: true,
    });
    res.status(200).json(updatePost);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Erreur lors de la suppression du post. Id inexistant.",
    });
  }
};

module.exports.deletePost = async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const postId = await PostModel.findById(req.params.id);
    await PostModel.deleteOne({ _id: postId });
    res.status(200).json({ message: "Message supprimé" + req.params.id });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Erreur lors de la suppression du post. Id inexistant.",
    });
  }
};
