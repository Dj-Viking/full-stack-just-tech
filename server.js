const express = require('express');
const path = require('path');
const routes = require('./controllers');
const sequelize = require('./config/connection.js');


const app = express();
const PORT = process.env.PORT || 3001;

const helpers = require('./utils/helpers.js');
const exphbars = require('express-handlebars');
const hbars = exphbars.create({ helpers });
app.engine('handlebars', hbars.engine);
app.set('view engine', 'handlebars');

//creating session store
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
//session object creation here
/**
 * secret is a hash based message authentication code used to sign the session cookie
 * when the cookie is read by the server its going to compare this with the secret to make sure
 * that the cookie was not modified by the client.
 * 
 * cookie object used by the session starts empty
 * 
 * resave is set to a value of false, this forces the session to be saved back to the 
 * session store, even if the cookie hasnt been modified, the default is true, and is deprecated... recommended is false
 * 
 * saveuninitialize is set to true when a new session is made the session is saved as part
 * of the store
 * 
 * store: initialize the sequelize store pass a value of an object with db: sequelize
 * this will create the conection with the database, set up the session table
 * and save the session to the database.
 * 
 * session is made, and now we need to call the express session middleware
 * 
 *
 */
const sess = {
  secret: 'Here is my secret!',
  // default value of cookie is
  // { path: '/', httpOnly: true, secure: false, maxAge: null }.
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore(
    {
      db: sequelize
    }
  )
};
/**
 * here is the middleware which then we can now generate session tokens.
 * if there is a session id is generated and see if this is saved into the table
 * in the database.
 */
app.use(session(sess));


//middleware data interception and parsing
app.use(
  express.json()
);
app.use(
  express.urlencoded(
    { 
      extended: true 
    }
  )
);
// app.use(express.static('public'));
app.use(
  express.static(
    path.join(
      __dirname, 'public'
    )
  )
);
//turn on routes
app.use(routes);

//turn on connection to db and server
sequelize.sync(

  {//if this was true, it would drop and recreate databases on startup
    // great for making changes to the Sequelize models, as the database
    // would need a way to understand that something has changed.
    // might need to do a few times but set to false for now.
    //** we set this true now because if its false the we might get
    // a foreign key constraint error 
    // this actually resets the database to be empty, false keeps the
    // old data there after the node instance disconnects.
    force: false  
  }
)
.then(() => {
  console.log('\x1b[33m', `Connecting Database...`, '\x1b[00m');
  app.listen(PORT, () => {
    console.log('\x1b[33m', `Now Listening on port ${PORT}!`, '\x1b[00m');
  })
});