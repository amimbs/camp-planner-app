'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class camp_plan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.user = camp_plan.belongsTo(models.user, {
        foreignKey: "user_id",
      })
      this.grocery_lists = camp_plan.hasMany(models.grocery_list, {
        foreignKey: "camp_plan_id",
      })
      this.gear_lists = camp_plan.hasMany(models.gear_list, {
        foreignKey: "camp_plan_id",
      })
      
    }
  }
  camp_plan.init({
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    date: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'camp_plan',
  });
  return camp_plan;
};