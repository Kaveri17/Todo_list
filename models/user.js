'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Todolist}) {
      // define association here
      this.hasMany(Todolist, {foreignKey:'userId', as: 'todolist'})
    }
    // toJSON(){
    //   return{ ...this.get(), id:undefined}  // hides the id attribute of the table users
    // }
  }
  User.init(
    {
      id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
    name: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{msg:"User must have a name"},
        notEmpty:{msg: "Name must not be empty"}
      }
    },
    email: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        isEmail:{msg: "Enter a valid email address"},
        notNull:{msg:"User must have a email"},
        notEmpty:{msg: "Email must not be empty"},
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{msg:"User must have a password"},
        notEmpty:{msg: "Password must not be empty"}
      }
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName:'users'
  });
  return User;
};