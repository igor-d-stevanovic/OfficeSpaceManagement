const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Location = sequelize.define('Location', {
  name: { type: DataTypes.STRING, allowNull: false },
});

const Office = sequelize.define('Office', {
  name: { type: DataTypes.STRING, allowNull: false },
});

const Desk = sequelize.define('Desk', {
  number: { type: DataTypes.STRING, allowNull: false },
});

const Chair = sequelize.define('Chair', {
  number: { type: DataTypes.STRING, allowNull: false },
});

const User = sequelize.define('User', {
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  role: { type: DataTypes.STRING, allowNull: false }, // User, OfficeManager, Admin
});

const Reservation = sequelize.define('Reservation', {
  date: { type: DataTypes.DATEONLY, allowNull: false },
});

// Associations
Location.hasMany(Office);
Office.belongsTo(Location);

Office.hasMany(Desk);
Desk.belongsTo(Office);

Desk.hasMany(Chair);
Chair.belongsTo(Desk);

User.hasMany(Reservation);
Reservation.belongsTo(User);

Chair.hasMany(Reservation);
Reservation.belongsTo(Chair);

module.exports = {
  sequelize,
  Location,
  Office,
  Desk,
  Chair,
  User,
  Reservation,
};
