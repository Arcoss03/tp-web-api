// index.ts
import express from 'express';
import { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import adminRouter from './routes/admin';
import loginRouter from './routes/login';
import { extractToken, extractTokenAdmin } from './middleware/authMiddleware';
import studentRouter from './routes/student';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();
app.use(bodyParser.json());

app.use('/admin', extractTokenAdmin,  adminRouter);
app.use('/student', extractToken, studentRouter);
app.use('/login', loginRouter);


app.use((err:Error, req:Request, res:Response, next:NextFunction) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ message: 'Aucun token d\'autorisation n\'a été trouvé' });
  } else {
    next(err);
  }
});


//route for say hello world
app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});