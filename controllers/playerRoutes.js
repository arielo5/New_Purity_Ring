const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Team, Player, Coach, Fan } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    Player.findAll({
      where: {
        // use the ID from the session
        user_id: req.session.user_id
      },
      attributes: [
        'id',
        'name',
        'last_name',
        'role_id',
        'jersey',
        'team_id',
        'coach_id'
      ],
      include: [
        {
          model: Team,
          attributes: ['id', 'name', 'player_id', 'user_id'],
          include: {
            model: User,
            attributes: ['name', 'last_name'] 
          }
        },
        {
          model: Coach,
          attributes: ['id', 'name', 'last_name', 'user_id'],
          include: {
            model: User,
            attributes: ['name', 'last_name']
          }
        },  
        {
          model: User,
          attributes: ['name', 'last_name']
        }
      ]
    })
      .then(dbPlayerData => {
        // serialize data before passing to template
        const player = dbPlayerData.map(player => player.get({ plain: true }));
        res.render('player', { player, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/edit/:id', (req, res) => {
    player.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'name',
        'last_name',
        'role_id',
        'jersey',
        'team_id',
        'coach_id'
      ],
      include: [
        {
          model: Team,
          attributes: ['id', 'name', 'player_id', 'user_id'],
          include: {
            model: User,
            attributes: ['name', 'last_name'] 
          }
        },
        {
          model: Coach,
          attributes: ['id', 'name', 'last_name', 'user_id'],
          include: {
            model: User,
            attributes: ['name', 'last_name']
          }
        },  
        {
          model: User,
          attributes: ['name', 'last_name']
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

        res.render('edit-player', {
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