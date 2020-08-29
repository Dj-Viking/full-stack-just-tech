const express = require('express');
const exphbars = require('express-handlebars');
const hbars = exphbars.create({});
const path = require('path');
const routes = require('./controllers');
const sequelize = require('./config/connection.js');

const app = express();
const PORT = process.env.PORT || 3001;


app.engine('handlebars', hbars.engine);
app.set('view engine', 'handlebars');

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
    // great for maching changes to the Sequelize models, as the database
    // would need a way to understand that something has changed.
    // might need to do a few times but set to false for now.
    //** we set this true now because if its false the we might get
    // a foreign key constraint error 
    // this actually resets the database to be empty, false keeps the
    // old data there after the node instance disconnects.
    force: true  
  }
)
.then(() => {
  console.log('\x1b[33m', `Connecting Database...`, '\x1b[00m');
  app.listen(PORT, () => {
    console.log('\x1b[33m', `Now Listening on port ${PORT}!`, '\x1b[00m');
  })
});