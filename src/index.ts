import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';

const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT)
});
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});