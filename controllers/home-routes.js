const router = require('express').Router();
const sequelize = require('../config/connection.js');
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
  //this is so this route has access to the user's session
  //
  console.log(`
  `);
  console.log("\x1b[33m", "checking the request session property object values", "\x1b[00m");
  console.log(req.session);
  Post.findAll(
    {
      attributes: [
        'id',
        'post_url',
        'title',
        'created_at',
        [
          sequelize.literal(
            '(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'
          ), 'vote_count'
        ]
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
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    }
  )
  .then(dbPostData => {
    console.log(`
    `);
    console.log("\x1b[33m", "testing homepage render", "\x1b[00m");
    console.log(`
    `);
    //console.log(dbPostData[0]);
    //pass a single post object into the homepage template
    //   res.render('homepage', 
    //     dbPostData[0].get(
    //       { 
    //         plain: true 
    //       }
    //     )
    //   );
    // })

  
    // res.render('homepage', 
    //   {
      //     id: 1,
      //     post_url: 'https://handlebars.js.com/guide/',
      //     title: 'Handlebars Docs',
      //     created_at: new Date(),
      //     vote_count: 10,
      //     comments: [{}, {}],
      //     user: {
        //       username: 'test-user'
        //     }
        //   }
        // );
    const posts = dbPostData.map(post => post.get({ plain: true }));
    res.render('homepage', { 
      posts,
      loggedIn: req.session.loggedIn
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/login', (req, res) => {
  console.log(`
  `);
  console.log("\x1b[33m", "testing loginpage render", "\x1b[00m");
  console.log(`
  `);
  //if we have the session id from a user and verified they are logged in
  // redirect them to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

//hard coded test comment
// const post = {
//   id: 1,
//   post_url: 'https://handlebarsjs.com/guide/',
//   title: 'handlebars docs',
//   created_at: new Date(),
//   vote_count: 10,
//   comments: [{}, {}],
//   user: {
//     username: 'test_user'
//   }
// };
router.get('/post/:id', (req, res) => {
  Post.findOne(
    {
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'post_url',
        'title',
        'created_at',
        [ sequelize.literal(
          '(SELECT COUNT (*) FROM vote WHERE post.id = vote.post_id)'
        ), 'vote_count']
      ],
      include: [
        {
          model: Comment,
          attributes: [ 'id', 'comment_text', 'post_id', 'user_id', 'created_at' ],
          include: {
            model: User,
            attributes: [ 'username' ]
          }
        },
        {
          model: User,
          attributes: [ 'username' ]
        }
      ]
    }
  )
  .then(dbPostData => {
    if (!dbPostData) {
      res.status(404).json(
        {
          message: 'No post found with this id'
        }
      );
      return;
    }
    //serialize the data
    const post = dbPostData.get({ plain: true });
    //pass data to template
    res.render('single-post', { 
      post,
      loggedIn: req.session.loggedIn
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});
module.exports = router;