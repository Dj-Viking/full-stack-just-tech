const router = require('express').Router();
const { User, Post, Vote, Comment } = require('../../models');

// get all users
router.get('/', (req, res) => {
  console.log(`
  
  `)
  console.log('\x1b[33m', 'client request to get all users', '\x1b[00m');
  User.findAll({
    attributes: { exclude: ['password'] }
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  console.log(`
  
  `)
  console.log('\x1b[33m', 'client request to get a user by id', '\x1b[00m');
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Post,
        attributes: ['id', 'title', 'post_url', 'created_at']
      },
      {
        model: Post,
        attributes: ['title'],
        through: Vote,
        as: 'voted_posts'
      },
      //adding comment model
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'created_at'],
        include: {
          model: Post,
          attributes: ['title']
        }
      }
    ]
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  console.log(`
  
  `)
  console.log('\x1b[33m', 'client request to post a user', '\x1b[00m');
  // expects {username: 'name', email: 'email@gmail.com', password: 'password1234'}
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/login', (req, res) => {
  console.log(`
  
  `)
  console.log('\x1b[33m', 'client request user login', '\x1b[00m');
  // expects {email: 'email@gmail.com', password: 'password1234'}
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(dbUserData => {
    if (!dbUserData) {
      res.status(400).json({ message: 'No user with that email address!' });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    res.json({ user: dbUserData, message: 'You are now logged in!' });
  });
});

router.put('/:id', (req, res) => {
  console.log(`
  
  `)
  console.log('\x1b[33m', 'client request to update a user', '\x1b[00m');
  // expects {username: 'name', email: 'email@gmail.com', password: 'password1234'}

  // pass in req.body instead to only update what's passed through
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData[0]) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  console.log(`
  
  `)
  console.log('\x1b[33m', 'client request to delete a user by id', '\x1b[00m');
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;














//not using /users in any routes here because in this file we take routes
// and implement them into another router instance,
// prefixing them with the path /users at that time