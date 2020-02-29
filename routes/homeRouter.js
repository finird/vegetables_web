const router = require('express').Router();

const blogRouter = require('./blogRouter.js');
const aboutRouter = require('./aboutRouter.js');
const cartRouter = require('./cartRouter.js');
const contactRouter = require('./contactRouter.js');
const productRouter = require('./productRouter.js');
const authRouter = require('./authRouter');

router.use('/blog', blogRouter);
router.use('/auth', authRouter);

module.exports = router;
