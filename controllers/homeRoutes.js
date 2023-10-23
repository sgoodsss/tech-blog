const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Render the homepage
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({});

    // console.log(postData.get({plain:true}))
    const posts = postData.map((post)=> post.get({ plain:true }))

    console.log(posts)

    res.render('homepage', {
      posts,
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

// Render the signup page
router.get('/signup', async (req, res) => {
  try {
    res.render('signup');
  } catch (err) {
    res.status(500).json(err);
  }
});


// Use withAuth middleware to prevent access to route- Profile View
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    console.log(req.session)
    console.log(req.session.user_id)

    // const userData = await User.findByPk(req.session.user_id, {
    //   attributes: { exclude: ['password'] },
    //   include: [User, Post, Comment],
    // });
    
    const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ["password"]}
    });

    const user = userData.get({ plain:true })
    console.log(user)

    const postData = await Post.findAll({
      where:{
        user_id: req.session.user_id
      }
    });

    const posts = postData.map((post)=> {post.get({ plain:true })})
    console.log(posts)

    res.render('profile', {
      posts, 
      user,
      logged_in: true
    });

  } catch (err) {
    console.log("User", err)
    res.status(500).json(err);
  }
});

//   Use withAuth middleware to prevent access to route - New Post
router.get('/post', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      // include: [
      //   {
      //     model: Goals,
      //     attributes: ['name'],
      //   },
      // ],
    });

    const user = userData.get({ plain: true });

    res.render('post', {
      user,
      logged_in: true
    });
  } catch (err) {
    console.log("User", err)
    res.status(500).json(err);
  }
});

// If the user is already logged in, redirect the request to the user's profile page
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }
  res.render('login');
});

module.exports = router;