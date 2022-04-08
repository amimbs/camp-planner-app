'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class gear_list extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.camp_plan=gear_list.belongsTo(models.camp_plan, {
        foreignKey: "camp_plan_id",
      })
      
    }
  }
  gear_list.init({
    gear_item: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    camp_plan_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'gear_list',
  });
  return gear_list;
};