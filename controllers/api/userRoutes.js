const router = require('express').Router();
const { User, Team, Player, Coach, Fan } = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');

// GET /api/users
router.get('/', (req, res) => {
    // Access our User model and run .findAll() method
    User.findAll({
        attributes: { exclude: ['password'] }
    })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// GET /api/users/1
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password']},
        where: {
          id: req.params.id
        },
        include: [
            {
                model: Team,
                attributes: ['id', 'name']
            },
            {
                model: Player,
                attributes: ['id', 'first_name', 'last_name', 'jersey_num', 'coach_id', 'user_id'],
            },
            {
                model: Coach,
                attributes: ['id', 'first_name', 'last_name', 'user_id'],
            },
            {
                model: Fan,
                attributes: ['id', 'first_name', 'last_name', 'user_id'],
            },
          ]

    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// POST /api/users
router.post('/', (req, res) => {
  console.log("WOO", req.body);
    User.create({
      email: req.body.email,
      password: req.body.password,
      // username: req.body.username,
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      is_coach: req.body.is_coach 
    })
    .then(dbUserData => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.first_name = dbUserData.first_name;
        req.session.last_name = dbUserData.last_name;
        req.session.is_coach = dbUserData.is_coach;
        req.session.loggedIn = true;

        res.json(dbUserData);
      });
    });
  });

  // LOGIN
  router.post('/login', (req, res) => {
    console.log("Request: ", req.body);
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(dbUserData => {
      if (!dbUserData) {
        res.status(400).json({ message: 'No user with that email address!' });
        return;
      }
  
      const validPassword = dbUserData.passwordCheck(req.body.password);
  
      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect password!' });
        return;
      }
  
      console.log("HMM");
      req.session.save(() => {
        // declare session variables
        req.session.user_id = dbUserData.id;
        req.session.first_name = dbUserData.first_name;
        req.session.last_name = dbUserData.last_name;
        req.session.is_coach = dbUserData.is_coach;
        req.session.loggedIn = true;
  
        //res.json({ user: dbUserData, message: 'You are now logged in!' });

        if (dbUserData.is_coach) { res.redirect("/cprofile"); }
      else { res.redirect("/profile"); }
      });

      
    });
  });


  router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    }
    else {
      res.status(404).end();
    }
  });

// PUT /api/users/1
router.put('/:id', withAuth, (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
      }
    })
      .then(dbUserData => {
        if (!dbUserData[0]) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// DELETE /api/users/1
router.delete('/:id', withAuth, (req, res) => {
    User.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;
