module.exports = function(sequelize, DataTypes) {
  var EventList = sequelize.define("EventList", {
    eventName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contactName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    eventDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    additionalInfo: {
      type: DataTypes.STRING,
      allowNull: true
     },
     status: {
       type: DATATypes.BOOLEAn,
       allowNull: false,
       default: false
     }
  });

  EventList.associate = function(models) {
    EventList.hasMany(models.FoodList, {
      onDelete: "cascade"
    });
  };

  return EventList;
};
