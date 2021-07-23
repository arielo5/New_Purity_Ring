const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const playerRoutes = require('./playerRoutes');
// const coachRoutes = require('./coachRoutes');
// const fanRoutes = require('./fanRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/player', playerRoutes);
// router.use('/coach', coachRoutes);
// router.use('/fan', fanRoutes);

router.use((req, res) => {
    res.status(404).end();
  });

module.exports = router;
