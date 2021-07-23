const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Team, Player, Coach, Fan } = require('../models');

router.get('/', (req, res) => {
    res.render('homepage');
    console.log(req.session);
    
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/player');
      return;
    }
  
    res.render('login');
  });

  router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/player');
      return;
    }
  
    res.render('signup');
  });

});

module.exports = router;