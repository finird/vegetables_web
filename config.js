const mongoose = require('mongoose');
const defaultOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
};
module.exports.DbServer = {
  start(options = defaultOptions){
    this._options = options;
    const db = process.env.DB.replace('<DB_NAME>', process.env.DB_NAME);

    mongoose
      .connect(db, this._options)
      .then(_ => console.log('Database connection successful.👌'))
      .catch(err => console.log('Database connection failed! 💥\n', err));
  }
};

