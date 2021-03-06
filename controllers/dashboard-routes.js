const router = require('express').Router();
const sequelize = require('../config/connection.js');
const { Post, User, Comment } = require('../models');
const { withAuth } = require('../utils/auth.js');

//protecting this route only allowing access to logged in users
//but if I just type /dashboard into the browser I can still 
// get to the page without even logging in. hmmm
// we need to validate with the request.session

//we can import our own middleware to do this validation
router.get('/', withAuth, (req, res) => {
  console.log(`
  `);
  console.log("\x1b[33m", "client request to get to the dashboard", "\x1b[00m");
  console.log(`
  `);
  //checking if the user requesting this page is logged in
  //console.log(req.session);
  //if not logged in deny access
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
      //console.log(dbPostData);
      //serialize data before passing to template
      const posts = dbPostData.map(post => post.get({ plain: true }));
      console.log(posts);
      res.render('dashboard', { posts, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

router.get('/edit/:id', withAuth, (req, res) => {
  console.log(`
  `);
  console.log("\x1b[33m", "client request to get to edit-post page", "\x1b[00m");
  console.log(`
  `);
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
          '(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'
        ), 'vote_count']
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
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
  .then(editPostData => {
    //console.log(editPostData);
    const post = editPostData.get({ plain: true });

    res.render('edit-post', 
      {
        post,
        loggedIn: true
      }
    );
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/edit/:id', withAuth, (req, res) => {
  console.log(`
  
  `)
  console.log('\x1b[33m', 'client request to update a post title by id ', '\x1b[00m');
  Post.update(
    {
      title: req.body.title
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(dbPostData => {
    if (dbPostData[0] === 0 || !dbPostData) {
      res.status(404).json(
        {
          message: `No post found with the id of ${req.params.id}`
        }
      );
      return;
    } else {
      //console.log(dbPostData);
      res.json(dbPostData);
      const post = dbPostData.get({ plain: true });

      res.render('edit-post', 
        {
          post,
          loggedIn: true
        }
      );
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//delete a post by id
router.delete('/edit/:id', withAuth, (req, res) => {
  console.log(`
  
  `)
  console.log('\x1b[33m', 'client request to delete a post', '\x1b[00m');
  Post.destroy(
    {
      where: {
        id: req.params.id
      }
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
    } else {
      //console.log(dbPostData);
      res.json(dbPostData);
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;