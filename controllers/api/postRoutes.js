const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// The "/api/posts" endpoint

// Get all Posts with Comments
router.get('/', async (req, res) => {
    try {
      // Find all Posts and include associated Comments
      const posts = await Post.findAll({
        include: [
          {
            model: Comment,
            attributes: ['body', 'whenCreated'],
          },
        ],
      });
  
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
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
router.post('/', async (req, res) => {
    try {
      const postData = await Post.create(req.body);
      res.status(200).json(postData);
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