import { Router } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';
import { comparePassword, hashPassword } from '../utils/hash';

const prisma = new PrismaClient();
const router = Router();

const adminBoolean = true;
const studentBoolean = false;

//================ POST ROUTES ===================

router.post('/admin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const newUser = await prisma.users.create({
            data: {
                email,
                password,
                role: adminBoolean,
            },
        });

        res.json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the new admin.' });
    }
});

router.post('/student', async (req, res) => {
    let { email, password } = req.body;
    password = await hashPassword(password);
  
    try {
      const newUser = await prisma.users.create({
        data: {
          email,
          password,
          role: studentBoolean,
        },
      });
  
      res.json(newUser);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        res.status(400).json({ error: 'A user with this email already exists.' });
      } else {
        res.status(500).json({ error: 'An error occurred while creating the student.' });
      }
    }
  });

//================ GET ROUTES ===================

//route for get all admins
router.get('/admin', async (req, res) => {
    try {
        const admins = await prisma.users.findMany({
            where: {
                role: adminBoolean,
            },
        });

        res.json(admins);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving admins.' });
    }
});

//route for get all students
router.get('/student', async (req, res) => {
    try {
        const students = await prisma.users.findMany({
            where: {
                role: studentBoolean,
            },
        });

        res.json(students);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving students.' });
    }
}   );

//route for get one user by id

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await prisma.users.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving the user.' });
    }
});

//route for get all users

router.get('/user', async (req, res) => {
    try {
        const users = await prisma.users.findMany();

        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving users.' });
    }
}
);


export default router;