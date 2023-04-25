const express = require("express");
const { setPosts } = require("../controller/post.controller");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "voici les donnéessss" });
});

router.post("/", setPosts);

router.put("/:id", (req, res) => {
  res.json({ messageId: req.params.id });
});

router.delete("/:id", (req, res) => {
  res.json({ message: "Post supprimé id : " + req.params.id });
});

module.exports = router;
