const { sequelize, Location, Office, Desk, Chair, User, Reservation } = require('./models/models');

(async () => {
  try {
    await sequelize.sync({ force: true });

    // Lokacije
    const loc1 = await Location.create({ name: 'Beograd' });
    const loc2 = await Location.create({ name: 'Novi Sad' });

    // Kancelarije
    const off1 = await Office.create({ name: 'Kancelarija 1', LocationId: loc1.id });
    const off2 = await Office.create({ name: 'Kancelarija 2', LocationId: loc2.id });

    // Stolovi
    const desk1 = await Desk.create({ number: 'A1', OfficeId: off1.id });
    const desk2 = await Desk.create({ number: 'B1', OfficeId: off2.id });

    // Stolice
    const chair1 = await Chair.create({ number: 'A1-1', DeskId: desk1.id });
    const chair2 = await Chair.create({ number: 'B1-1', DeskId: desk2.id });

    // Korisnici
    const user1 = await User.create({ username: 'user1', email: 'user1@example.com', role: 'User' });
    const user2 = await User.create({ username: 'manager', email: 'manager@example.com', role: 'OfficeManager' });
    const admin = await User.create({ username: 'admin', email: 'admin@example.com', role: 'Admin' });

    // Rezervacije
    await Reservation.create({ date: '2025-12-25', UserId: user1.id, ChairId: chair1.id });
    await Reservation.create({ date: '2025-12-26', UserId: user2.id, ChairId: chair2.id });

    console.log('Test podaci su uspešno ubačeni!');
    process.exit(0);
  } catch (err) {
    console.error('Greška pri ubacivanju test podataka:', err);
    process.exit(1);
  }
})();
