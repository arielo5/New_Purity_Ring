const sequelize = require('../config/connection');
const {User, Player} = require('../models');

const playerData = require('./userData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const players = await User.bulkCreate(playerData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
