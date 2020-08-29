const router = require('express').Router();
const sequelize = require('../config/connection.js');
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
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
    res.render('homepage', { posts });
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
  res.render('login');
});
module.exports = router;