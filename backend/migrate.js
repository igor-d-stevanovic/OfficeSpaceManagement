const { sequelize } = require('./models/models');

(async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Baza i modeli su uspešno kreirani!');
    process.exit(0);
  } catch (err) {
    console.error('Greška pri kreiranju baze:', err);
    process.exit(1);
  }
})();
