const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// The "api/comments" endpoint

//Create New Comment
router.post('/', withAuth, async (req, res) => {
  try {
    console.log(req.body)
    console.log(req.session.user_id)

    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    console.log(newComment)
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

//GET ALL Comments by Post ROUTE
router.get('/', async (req, res) => {
  try {
    // Find all Comments and include associated Post
    const comments = await Comment.findAll({
      include: [
        {
          model: Post,
          attributes: ['body'],
        },
      ],
    });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


//CREATE UPDATE Comment ROUTE
router.put('/:id', async (req, res) => {
  try {
    const commentData = await Comment.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!commentData[0]) {
      res.status(404).json({ message: 'No comment with this id!' });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete Comment 
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;