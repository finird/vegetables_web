const router = require('express').Router();

router.route('/').get();
router.route('/:id').get();
router.route('/:userId/:id').get();
router.route('/:userId/:id/:productId').get();

module.exports = router;
