const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Team, Player, Coach, Fan } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    Player.findOne({
      where: {
        // use the ID from the session
        user_id: req.session.user_id
      },
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
        const player = dbPlayerData.get({ plain: true });
        res.render('profile', { ...player,  loggedIn: req.session.loggedIn,
          is_coach: req.session.is_coach });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/edit/:id', (req, res) => {
    Player.findOne({
      where: {
        user_id: req.params.id
      },
      attributes: [
        'id',
        'jersey_num',
        'fav_team',
        'fav_player',
        'user_id',
        'coach_id',
      ],
      include: [
        {
          model: Coach,
          attributes: ['id', 'user_id', 'team_name'],
          include: {
            model: User,
            attributes: ['first_name', 'last_name']
          }
        },  
        {
          model: User,
          attributes: ['first_name', 'last_name', 'email']
        }
      ]
    })
      .then(dbPlayerData => {
        if (!dbPlayerData) {
          res.status(404).json({ message: 'No player found with this id' });
          return;
        }
  
        // serialize the data
        const player = dbPlayerData.get({ plain: true });

        res.render('edit-profile', {
            ...player, loggedIn:req.session.loggedIn,
            is_coach: req.session.is_coach });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// router.get('/profile', (req, res) => {
//   res.send("WOO! Player profile!!");
// })


module.exports = router;