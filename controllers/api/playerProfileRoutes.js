const router = require('express').Router();
const { User, Team, Player, Coach, Fan } = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');

router.get('/', (req, res) => {
    console.log('======================');
    Player.findAll({
      attributes: [
        'id',
        'first_name',
        'last_name',
        'jersey_num',
        'user_id',
        'coach_id'
      ],
      include: [
        {
          model: Team,
          attributes: ['id', 'team_name', 'player_id', 'user_id', 'coach_id'],
          include: {
            model: User,
            attributes: ['name', 'last_name'] 
          }
        },
        {
          model: Coach,
          attributes: ['id', 'first_name', 'last_name', 'user_id'],
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
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  player.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'first_name',
      'last_name',
      'jersey_num',
      'user_id',
      'coach_id'
    ],
    include: [
      {
        model: Team,
        attributes: ['id', 'team_name', 'player_id', 'user_id', 'coach_id'],
        include: {
          model: User,
          attributes: ['name', 'last_name'] 
        }
      },
      {
        model: Coach,
        attributes: ['id', 'first_name', 'last_name', 'user_id'],
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
      res.render(dbPlayerData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

outer.post('/', withAuth, (req, res) => {
  console.log(req.session);
    Player.create({
      jersey_num: req.body.jersey_num,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      user_id: req.session.user_id,
      coach_id: req.session.coach_id
    })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });   
});

router.put('/:id', withAuth, (req, res) => {
  Player.update({
    jersey_num: req.body.jersey_num,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    user_id: req.session.user_id,
    coach_id: req.session.coach_id
    },
    {
      where: {
        id: req.params.id
      }
    })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No player found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
  Player.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No player found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;