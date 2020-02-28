const router = require('express').Router();

const blogRouter = require('./blogRouter.js');
const aboutRouter = require('./aboutRouter.js');
const cartRouter = require('./cartRouter.js');
const contactRouter = require('./contactRouter.js');
const productRouter = require('./productRouter.js');

router.use('/blog', blogRouter);

module.exports = router;
