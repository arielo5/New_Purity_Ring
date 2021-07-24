const User = require('./User');
const Player = require('./Player');
const Coach = require('./Coach');
const Team = require('./Team');

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

Player.belongsTo(Team, {
    foreignKey: 'team_id',
});

Coach.hasMany(Player, {
    foreignKey: 'coach_id',
});

Coach.belongsTo(Team, {
    foreignKey: 'team_id',
});

Team.hasMany(Player, {
    foreignKey: 'team_id',
});

Team.hasOne(Coach, {
    foreignKey: 'team_id',
});

module.exports = {
    User,
    Player,
    Coach,
    Team
};