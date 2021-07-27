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
    {
        jersey_num: 99,
        fav_team: 'Kings',
        fav_player: 'Wayne Gretzky',
        goals: 9,
        assists: 19,
        penalty_minutes: 2,
        user_id: 5,
        coach_id: 1
    },
    {
        jersey_num: 4,
        fav_team: 'Bruins',
        fav_player: 'Bobby Orr',
        goals: 0,
        assists: 2,
        penalty_minutes: 10,
        user_id: 6,
        coach_id: 2
    },
    
];

const seedPlayers = () => Player.bulkCreate(playerdata);

module.exports = seedPlayers;