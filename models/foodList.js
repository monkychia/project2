module.exports = function(sequelize, DataTypes) {
  var FoodList = sequelize.define("foodLists", {
    // id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   primaryKey: true
    // },
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
   },
   {
     tableName: "foodList"
   });
  return FoodList;
};
