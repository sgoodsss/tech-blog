const router = require('express').Router();
const { Post, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

// The "/api/posts" endpoint

// Get all Posts with Comments
router.get('/', (req, res) => {
  Post.findAll({
    include: {
      model: [Comment],
    },
  }).then((postData) => {
    res.json(postData);
  });
});

//Get one Post by ID with Comments
router.get('/:id', async (req, res) => {
    // find one Post by its `id` value
    // be sure to include its associated Comments
    try {
      const postData = await Post.findOne({
        where: {
          id: req.params.id,
        },
        include: [Comment],
      });
      if (!postData) {
        res.status(404).json({ message: 'No post with this id!' });
        return;
      }
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//Create New Post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Update a Post
router.put('/:id', async (req, res) => {
    try {
      const postData = await Post.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      if (!postData[0]) {
        res.status(404).json({ message: 'No post with this id!' });
        return;
      }
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//Delete Post 
router.delete('/:id', async (req, res) => {
    try {
      const postData = await Post.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (!postData) {
        res.status(404).json({ message: 'No post with this id!' });
        return;
      }
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

module.exports = router;