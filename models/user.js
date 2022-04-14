"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.camp_plans = user.hasMany(models.camp_plan, {
        foreignKey: "user_id",
      });
    }
  }
  user.init(
    {
      useremail: DataTypes.STRING,
      userpassword: DataTypes.STRING,
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
