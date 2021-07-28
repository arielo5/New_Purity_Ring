const router = require('express').Router();

const userRoutes = require('./userRoutes');
const coachProfileRoutes = require('./coachProfileRoutes');
const profileRoutes = require('./profileRoutes');
const statsRoutes = require('./statsRoutes');

router.use('/users', userRoutes);
router.use('/coach-profile', coachProfileRoutes);
router.use('/profile', profileRoutes);
router.use('/stats', statsRoutes);

module.exports = router;
