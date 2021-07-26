const router = require('express').Router();

const userRoutes = require('./userRoutes');
const coachProfileRoutes = require('./coachProfileRoutes');
const profileRoutes = require('./profileRoutes');

router.use('/users', userRoutes);
router.use('/couch-profile', coachProfileRoutes);
router.use('/profile', profileRoutes);

module.exports = router;
