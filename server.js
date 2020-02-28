const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({
  path: `${__dirname}/.env`
});

const app = require('./app');

const db = process.env.DB.replace('<DB_NAME>', process.env.DB_NAME);
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(_ => console.log('Database connection successful. 👌'))
  .catch(err => console.log('Database connection failed! 💥\n', err));

const port = process.env.HOST_PORT || 3000;
const host = process.env.HOST_HOST || '127.0.0.1';
app.listen(port, host, _ => console.log(`👉 http://${host}:${port}`));
