import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import adminRouter from './routes/admins';
import studentRouter from './routes/students';
import db from './db';

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
}
);
dotenv.config();
const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/admin', adminRouter);
app.use('/student', studentRouter);

app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});