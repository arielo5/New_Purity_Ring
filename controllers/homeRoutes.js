const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Team, Player, Coach, Fan } = require('../models');

router.get('/', (req, res) => {
    res.render('homepage', {
      loggedIn: req.session.loggedIn,
      is_coach: req.session.is_coach
    })
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



module.exports = router;