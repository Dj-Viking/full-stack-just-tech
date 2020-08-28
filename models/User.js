const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
const bcrypt = require('bcrypt');

//create our User model
class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password)
  }
}

//define table columns and configuration
User.init(
  {
    //table column defs go here
    id: {
      //👇 use special Sequelize DataTypes object provide what type of data it is
      type: DataTypes.INTEGER,
      //👇 equivalent to SQL's `NOT NULL` option
      allowNull: false,
      //👇 instruct that this is the Primary Key
      primaryKey: true,
      //👇 turn on auto increment
      autoIncrement: true,
      
    },
    // define a username column
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // define an email column
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      //there cannot be any duplicate email values in this table
      unique: true,
      // if allowNull is set to false, we can run our data through validators before creating the table data
      validate: {
        isEmail: true
      }
    },
    // define a password column
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        //👇 this means the password must be at least four characters long
        len: [4]
      }
    } 
  },
  {
    hooks: {
      // set up beforeCreate lifecycle "hook" functionality
      // beforeCreate(userData) {
      //   return bcrypt.hash(userData.password, 10)
      //   .then(newUserData => {
      //     return newUserData
      //   });
      // }
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      // set up beforeUpdate lifecycle "hook" functionality
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      }
    },
    //table configuration options go here (https://sequelize.org/v5/manual/models-definition.html#configuration)
    
    //👇 pass in our imported sequelize connection (the direct connection to the database)
    sequelize,
    //👇 dont automatically crate createdAt/updatedAt timestamp fields
    timestamps: false,
    //👇 dont pluralize name of database table..hmm
    freezeTableName: true,
    //👇 use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    underscored: true,
    //👇 make it so our model name stays lowercase in the database
    modelName: 'user' //'root'??
  }
);

module.exports = User;