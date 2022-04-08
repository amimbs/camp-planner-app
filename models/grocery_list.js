'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class grocery_list extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.camp_plan=grocery_list.belongsTo(models.camp_plan, {
        foreignKey: "camp_plan_id",
      })
    }
  }
  grocery_list.init({
    grocery_item: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    camp_plan_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'grocery_list',
  });
  return grocery_list;
};