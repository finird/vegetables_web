const router = require('express').Router();

router.route('/').get();
router.route('/:id').get();

module.exports = router;
