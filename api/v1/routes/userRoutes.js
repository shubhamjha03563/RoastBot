const router = require('express').Router();

const { updateUser } = require('../controllers/userController');

router.route('/update').post(updateUser);

module.exports = router;
