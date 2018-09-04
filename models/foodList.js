module.exports = function(sequelize, DataTypes) {
  var FoodList = sequelize.define("FoodLists", {
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
      allowNull: false
    },
    glutenFree: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
  },
  {
      freezeFoodLists: true
  });
  return FoodList;
};
