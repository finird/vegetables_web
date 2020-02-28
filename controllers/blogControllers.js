exports.getAllPosts = (req, res, next) => {
  res.json({
    status: 'successful',
    data: {
      ok: 'OK you catched home blog'
    }
  });
};

exports.getPostById = (req, res, next) => {
  res.status(404).json({
    status: 'successful',
    data: {
      ok: 'Post ID'
    }
  });
};

exports.search = (req, res, next) => {
  const reqTime = new Date().toISOString();
  return res.json({
    status: 'success',
    message: 'Looking for data...',
    requestTime: reqTime,
    data: {
      xxx: null
    },
    query: req.query
  });
};

exports.getPostsByUser = (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: {
      ok: 'get <posts> by User'
    }
  });
};

exports.getPostByUser = (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: {
      ok: 'get post by User'
    }
  });
};

exports.getPostsByCategory = (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: {
      ok: 'get posts by category'
    }
  });
};
