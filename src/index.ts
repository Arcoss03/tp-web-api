// index.ts
import express from 'express';
import bodyParser from 'body-parser';
import adminRouter from './routes/admin';
// import studentRouter from './routes/student';
// import { authMiddleware } from './middlewares/authMiddleware';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();
app.use(bodyParser.json());

// Utilisez le middleware d'authentification sur les routes que vous souhaitez protéger
// app.use('/admin', authMiddleware, adminRouter);
app.use('/admin', adminRouter);

// // Les routes /student ne sont pas protégées par le middleware d'authentification
// app.use('/student', studentRouter);

//route for say hello world
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});