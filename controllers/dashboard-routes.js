const router = require('express').Router();
const sequelize = require('../config/connection.js');
const { Post, User, Comment } = require('../models');

//protecting this route only allowing access to logged in users
//but if I just type /dashboard into the browser I can still 
// get to the page without even logging in. hmmm
// we need to validate with the request.session
router.get('/', (req, res) => {
  console.log(`
  `);
  console.log("\x1b[33m", "client request to get to the dashboard", "\x1b[00m");
  console.log(`
  `);
  //checking if the user requesting this page is logged in
  console.log(req.session);
  //if not logged in deny access
  if (!req.session.user_id) {
    res.status(401).json({error: 'Unauthorized access without logging in to your account'});
    //res.status(401).end();
    return;
  } else {
    Post.findAll(
      {
        where: {
          //use the ID from the session
          user_id: req.session.user_id
        },
        attributes: [
          'id',
          'post_url',
          'title',
          'created_at',
          [sequelize.literal(
            '(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'
          ), 'vote_count']
        ],
        include: [
          {
            model: Comment,
            attributes: [
              'id',
              'comment_text',
              'post_id',
              'user_id',
              'created_at'
            ],
            include: [
              {
                model: User,
                attributes: ['username']
              }
            ]
          },
          {
            model: User,
            attributes: ['username']
          }
        ]
      }
    )
    .then(dbPostData => {
      console.log(dbPostData);
      //serialize data before passing to template
      const posts = dbPostData.map(post => post.get({ plain: true }));
      console.log(posts);
      res.render('dashboard', { posts, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
  }
});

module.exports = router;