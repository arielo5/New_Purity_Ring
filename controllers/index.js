const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const profileRoutes = require('./profileRoutes');
const coachRoutes = require('./coachRoutes');
const teamRoutes = require('./teamRoutes');
// const fanRoutes = require('./fanRoutes'); 
// const teamRoutes = require('./teamRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/profile', profileRoutes);
router.use('/cprofile', coachRoutes);
router.use('/team', teamRoutes);
// router.use('/fan', fanRoutes);
// router.use('/team', teamRoutes);

router.use((req, res) => {
    res.status(404).end();
  });

module.exports = router;
