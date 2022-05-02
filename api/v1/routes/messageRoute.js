const router = require('express').Router();

const {
  getMessage,
  getAllMessages,
  saveMessages,
} = require('../controllers/messageControllers');

router.route('/').get(getAllMessages).post(saveMessages);
router.route('/:id').get(getMessage);

module.exports = router;
