//import the sequelize constructor from the library
const Sequelize = require('sequelize');

require('dotenv').config();

// create connection to database pass mysql info 
// for user and password
let sequelize;
//when the app is depoyed, it will have access to heroku's process.env.JAWSDB_URL
// environment variable and use that value to connect.
// otherwise it iwll continue using the local host config

//now if deployed to heroku i can still hit endpoints with insomnia core
// just with the new URL https://just-tech-news-djviking.herokuapp.com/ 
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME
    , 
    process.env.DB_USER
    ,
    process.env.DB_PW
    ,
    {
      host: "localhost",
      dialect: "mysql",
      port: 3306
    }
  );
}

module.exports = sequelize;