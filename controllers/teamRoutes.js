const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Player, Coach } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    Coach.findAll({
      attributes: [
        'id',
        'team_name',
      ],
    })
      .then(dbTeamData => {
        // serialize data before passing to template
        const teams = dbTeamData.map(coach => coach.get({ plain: true }));
        res.render('team-list', {
          teams,
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

 router.get('/:id', (req, res) => {
    Player.findAll({
      where: {
        coach_id: req.params.id
      },
      attributes: [
        'id',
        'jersey_num',
        'goals',
        'assists',
        'penalty_minutes',
        'user_id',
        'coach_id'
      ],
      include: [
        {
          model: Coach,
          attributes: ['id', 'team_name', 'user_id'],
          include: {
            model: User,
            attributes: ['id', 'first_name', 'last_name']
          }
        },  
        {
          model: User,
          attributes: ['first_name', 'last_name']
        }
      ]
    })
    .then(dbRosterData => {
      // serialize data before passing to template
      const players = dbRosterData.map(player => player.get({ plain: true }));
      res.render('team-roster', {
        players,
      });
    })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});


module.exports = router;