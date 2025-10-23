const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST, // e.g., localhost
  user: process.env.DB_USER, // your DB username
  password: process.env.DB_PASS, // your DB password
  database: process.env.DB_NAME, // your database name
});

db.connect((err) => {
  if (err) throw err;
  console.log('✅ Database connected');
});

module.exports = db;
