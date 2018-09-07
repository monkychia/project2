module.exports = function(sequelize, DataTypes) {
  var FoodList = sequelize.define("FoodList", {
    itemName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    costPer: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING
    },
    vegan: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    glutenFree: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
     }
   }
);
  return FoodList;
};
