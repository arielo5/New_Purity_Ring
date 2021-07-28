const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Team, Player, Coach, Fan } = require('../models');

router.get('/', (req, res) => {
    if (!req.session.is_coach) {
      res.render('homepage', {
      loggedIn: req.session.loggedIn,
      is_coach: req.session.is_coach
    })
  } else {
  Coach.findOne({
    where: {
      user_id: req.session.user_id
    },
    attributes: [
      'id',
      'team_name',
    ],
    // include: [ 
    //   {
    //     model: User,
    //     attributes: ['id', 'team_name', 'user_id']
    //   }
    // ]
  })
    .then(dbCoachData => {
      // if (!dbCoachData) {
      //   res.status(404).json({ message: 'No user found with this id' });
      //   return;
      // }

      // serialize the data
      const coach = dbCoachData.get({ plain: true });

      res.render('homepage', {
          coach,
          loggedIn: req.session.loggedIn,
          is_coach: req.session.is_coach
          });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  };
  });


    
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/profile');
      return;
    }
  
    res.render('login');
  });

  router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/profile');
      return;
    }
  
    res.render('signup');
  });

  router.get('/signup-2', async (req, res) => {
    try{
      const coachData = await Coach.findAll({
        include: [
          {
            model: User,
            attributes: ['id', 'first_name', 'last_name']

          },
        ],
      });
      const coaches = coachData.map((coach) => coach.get({plain: true}));
    
      res.render('signup-2', {
        coaches,
        loggedIn: req.session.loggedIn,
        is_coach: req.session.is_coach
      });
    } catch (err) {
        res.status(500).json(err)
      }
  });

  router.get('/player', (req, res) => {
      Player.findAll({
        attributes: [
          'id',
          'jersey_num',
          'user_id',
          'coach_id',
          'fav_player',
          'fav_team',
          'goals',
          'assists',
          'penalty_minutes',
        ],
        include: [
          {
            model: Coach,
            attributes: ['id', 'user_id', 'team_name'],
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
        .then(dbPlayerData => {
          // serialize data before passing to template
          const players = dbPlayerData.map(Player => Player.get({ plain: true }));
          res.render('player', {
            players, loggedIn: req.session.loggedIn,
            is_coach: req.session.is_coach,
        })
      })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    });

module.exports = router;