const dotenv = require('dotenv');

dotenv.config({
  path: `${__dirname}/.env`
});

const app = require('./app');
//Require Database
const { DbServer } = require('./config');

DbServer.start({
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});


const port = process.env.HOST_PORT || 3000;
const host = process.env.HOST_HOST || '127.0.0.1';
app.listen(port, host, _ => console.log(`👉 http://${host}:${port}`));
