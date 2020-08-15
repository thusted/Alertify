module.exports = function(sequelize, DataTypes) {
  var Contact = sequelize.define("Contact", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false,
    }
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