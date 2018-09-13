module.exports = function(sequelize, DataTypes) {
  var OrdersList = sequelize.define("OrdersList", {
    eventListId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    foodListId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    itemName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    costPer: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
    }
  });

  return OrdersList;
};