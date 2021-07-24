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
        'jersey_num',
        'user_id',
        'coach_id',
        'team_id'
      ],
      include: [
        {
          model: Team,
          attributes: ['id', 'name'],
        },
        {
          model: Coach,
          attributes: ['id', 'user_id', 'team_id'],
          include: {
            model: User,
            attributes: ['first_Name', 'last_Name']
          }
        },  
        {
          model: User,
          attributes: ['first_Name', 'last_Name']
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
        'jersey_num',
        'user_id',
        'coach_id',
        'team_id'
      ],
      include: [
        {
          model: Team,
          attributes: ['id', 'name'],
        },
        {
          model: Coach,
          attributes: ['id', 'user_id', 'team_id'],
          include: {
            model: User,
            attributes: ['first_Name', 'last_Name']
          }
        },  
        {
          model: User,
          attributes: ['first_Name', 'last_Name']
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