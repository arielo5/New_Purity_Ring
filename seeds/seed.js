const sequelize = require('../config/connection');
const seedUsers = require('./userData.js');
const seedCoaches = require('./coachData.js');
const seedPlayers = require('./playerData.js');

const seedAll = async () => {
    await sequelize.sync({ force: true });

    await seedUsers();

    await seedCoaches();

    await seedPlayers();

    process.exit(0);

};

seedAll();
