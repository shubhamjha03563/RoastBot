const router = require('express').Router();

const { getSummary } = require('../controllers/summaryController');

router.route('/').get(getSummary);

module.exports = router;
