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



module.exports = router;