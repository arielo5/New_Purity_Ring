const router = require("../../controllers/api/playerProfileRoutes");

async function init() {
      
    const firstName = document.querySelector('#firstName-playerP');
    const lastName = document.querySelector('#lastName-playerP');
    const teamName = document.querySelector('#teamName-playerP');
    const jerseyNumber = document.querySelector('#jerseyNumber-playerP');
    const faveTeam = document.querySelector('#faveTeam-playerP');
    const favePlayer = document.querySelector('#favePlayer-playerP');
    const seasonGoals = document.querySelector('#seasonGoals');
    const seasonAssists = document.querySelector('#seasonAssists');
    const seasonPenaltyMins = document.querySelector('#seasonPenaltyMins');

    const response = await fetch('/api/users/:id', {
        method: 'GET',
        body: JSON.stringify({
            id,
            first_name,
            last_name,
            jersey_num,
            user_id,
            coach_id,
            team_id
        })
    })


};