const router = require('express').Router();
const { User, Player, Coach, } = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');

router.put('/:id', withAuth, async (req, res) => {
    try {
      const stats = await Player.update(
        {  
          goals: req.body.goals,
          assists: req.body.assists,
          penalty_minutes: req.body.penaltyMinutes,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).json(stats);
    } catch (err) {
      res.status(500).json(err);
    }
  });



module.exports = router;