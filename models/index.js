const User = require ('./User');
const Player = require ('./Player');
const Coach = require ('./Coach');

Player.belongsTo(User, {
    foreignKey: 'user_id',
});
User.hasOne(Player, {
   foreignKey: 'user_id' 
});
Coach.belongsTo(User, {
    foreignKey: 'user_id',
});
User.hasOne(Coach, {
    foreignKey: 'user_id' 
});

Player.belongsTo(Coach, {
    foreignKey: 'coach_id',
});

 Coach.hasMany(Player, {
    foreignKey: 'coach_id',
});

module.exports = {
    User,
    Player,
    Coach
};