const dotenv = require('dotenv');
const mysql = require('mysql');

dotenv.config({
  path: `${__dirname}/.env`
});

const app = require('./app');

const con = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || undefined,
  database: process.env.DB || 'test'
});

con.connect(function(err) {
  if (err) throw err;
  console.log('👌 Database Server connected');
});

const port = process.env.HOST_PORT || 3000;
const host = process.env.HOST_HOST || '127.0.0.1';
app.listen(port, host, _ => console.log(`👉 http://${host}:${port}`));
