const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Team, Player, Coach, Fan } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    Team.findAll({
      attributes: [
        'id',
        'name',
      ],
    })
      .then(dbTeamData => {
        // serialize data before passing to template
        const teams = dbTeamData.map(team => team.get({ plain: true }));
        res.render('team-list', {
          teams,
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

//   router.get('/edit/:id', (req, res) => {
//     player.findOne({
//       where: {
//         id: req.params.id
//       },
//       attributes: [
//         'id',
//         'first_name',
//         'last_name',
//         'jersey_num',
//         'user_id',
//         'coach_id'
//       ],
//       include: [
//         {
//           model: Team,
//           attributes: ['id', 'team_name', 'player_id', 'user_id', 'coach_id'],
//           include: {
//             model: User,
//             attributes: ['name', 'last_name'] 
//           }
//         },
//         {
//           model: Coach,
//           attributes: ['id', 'first_name', 'last_name', 'user_id'],
//           include: {
//             model: User,
//             attributes: ['name', 'last_name']
//           }
//         },  
//         {
//           model: User,
//           attributes: ['name', 'last_name']
//         }
//       ]
//     })
//       .then(dbPlayerData => {
//         if (!dbPlayerData) {
//           res.status(404).json({ message: 'No player found with this id' });
//           return;
//         }
  
//         // serialize the data
//         const player = dbPlayerData.get({ plain: true });

//         res.render('edit-player', {
//             player,
//             loggedIn: true
//             });
//       })
//       .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//       });
// });


module.exports = router;