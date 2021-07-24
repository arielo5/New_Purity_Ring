const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Team, Player, Coach, Fan } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    Coach.findAll({
      where: {
        // use the ID from the session
        user_id: req.session.user_id
      },
      attributes: [
        'id',
        'first_name',
        'last_name',
        'user_id'
      ],
      include: [
        {
          model: Team,
          attributes: ['id', 'team_name', 'player_id', 'user_id', 'coach_id'],
          include: {
            model: User,
            attributes: ['first_name', 'last_name'] 
          }
        },
        {
          model: Player,
          attributes: ['id', 'first_name', 'last_name', 'jersey_num', 'user_id', 'coach_id'],
          include: {
            model: User,
            attributes: ['first_name', 'last_name']
          }
        },  
        {
          model: User,
          attributes: ['first_name', 'last_name']
        }
      ]
    })
      .then(dbCoachData => {
        // serialize data before passing to template
        const coach = dbCoachData.map(coach => coach.get({ plain: true }));
        res.render('coach', { coach, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/edit/:id', (req, res) => {
    coach.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'first_name',
        'last_name',
        'user_id'
      ],
      include: [
        {
          model: Team,
          attributes: ['id', 'team_name', 'player_id', 'user_id', 'coach_id'],
          include: {
            model: User,
            attributes: ['first_name', 'last_name'] 
          }
        },
        {
          model: Player,
          attributes: ['id', 'first_name', 'last_name', 'jersey_num', 'user_id', 'coach_id'],
          include: {
            model: User,
            attributes: ['first_name', 'last_name']
          }
        },  
        {
          model: User,
          attributes: ['first_name', 'last_name']
        }
      ]
    })
      .then(dbCoachData => {
        if (!dbCoachData) {
          res.status(404).json({ message: 'No player found with this id' });
          return;
        }
  
        // serialize the data
        const coach = dbCoachData.get({ plain: true });

        res.render('edit-coach', {
            player,
            loggedIn: true
            });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});


module.exports = router;