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
          teams, loggedIn: req.session.loggedIn,
          is_coach: req.session.is_coach,
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// route to public team roster based on coach_id
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
        loggedIn: req.session.loggedIn,
        is_coach: req.session.is_coach,
      });
    })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// route to private roster for coach to update stats.  based on coach_id
 router.get('/stats/:id', withAuth, (req, res) => {
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
      res.render('team-stats', {
        players,
        loggedIn: req.session.loggedIn,
        is_coach: req.session.is_coach,
      });
    })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// route for coach to edit player stats based on player_id
router.get('/edit/:id', withAuth, (req, res) => {
  Player.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'jersey_num',
      'goals',
      'assists',
      'penalty_minutes',
      'coach_id'
    ],
    include: [  
      {
        model: User,
        attributes: ['first_name', 'last_name']
      }
    ]
  })
    .then(dbPlayerData => {
      const playerStats = dbPlayerData.get({ plain: true });
      res.render('player-stats', {
        playerStats,
        loggedIn: req.session.loggedIn,
        is_coach: req.session.is_coach,
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;