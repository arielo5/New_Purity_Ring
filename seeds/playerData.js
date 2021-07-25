const { Player } = require('../models');

const playerdata = [
    {
        jersey_num: 3,
        fav_team: 'Wild',
        fav_player: 'Bobby Orr',
        goals: 5,
        assists: 8,
        penalty_minutes: 4,
        user_id: 1,
        coach_id: 1,
    },
    {
        jersey_num: 7,
        fav_team: 'Maple Leafs',
        fav_player: 'Auston Matthews',
        goals: 15,
        assists: 18,
        penalty_minutes: 14,
        user_id: 3,
        coach_id: 2
    },
    
];

const seedPlayers = () => Player.bulkCreate(playerdata);

module.exports = seedPlayers;