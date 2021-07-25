const { Coach } = require('../models');

const coachdata = [
    {
        team_name: 'Puckheads',
        user_id: 2,
        
    },
    {
        team_name: 'Shooters',
        user_id: 4,
        
    },
    
];

const seedCoaches = () => Coach.bulkCreate(coachdata);

module.exports = seedCoaches;