module.exports = function(sequelize, DataTypes) {
  // var Contact = sequelize.define("Contact", {
  //   name1: {
  //     type: DataTypes.STRING,
  //     allowNull: false,
  //   },
  //   phone1: {
  //     type: DataTypes.STRING,
  //     allowNull: false,
  //   },
  //   name2: {
  //     type: DataTypes.STRING,
  //     allowNull: false,
  //   },
  //   phone2: {
  //     type: DataTypes.STRING,
  //     allowNull: false,
  //   },
  //   name3: {
  //     type: DataTypes.STRING,
  //     allowNull: false,
  //   },
  //   phone3: {
  //     type: DataTypes.STRING,
  //     allowNull: false,
  //   }
  // });

  var Contact = sequelize.define("Contact", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Contact.associate = function(models) {
    // We're saying that a Contact should belong to a User
    // A contact can't be created without an User due to the foreign key constraint
    Contact.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Contact;
};
