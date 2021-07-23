const User = require ('./User');
const Player = require ('./Player');
const Coach = require ('./Coach');

Player.belongsTo(User, {
    foreignKey: 'user_id',
});

Coach.belongsTo(User, {
    foreignKey: 'user_id',
});

Player.hasOne(Coach, {
    foreignKey: 'coach_id',
});

Coach.hasMany(Player, {
    foreignKey: 'player_id',
});

module.exports = {
    User,
    Player,
    Coach
};