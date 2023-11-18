import { Router } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';
import { comparePassword, hashPassword } from '../utils/hash';
import { courseSchema, students_coursesSchema } from '../validators/validation';

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

//route for create a new student
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

//route for create a new course
router.post('/course', async (req, res) => {
    const { title, userIds, date } = req.body;
  
    try {
      // Validate the request body
      await courseSchema.validate({ title, userIds, date });
  
      // Check if all users exist
      for (let userId of userIds) {
        const user = await prisma.users.findUnique({ where: { id: userId } });
        if (!user) {
          return res.status(400).json({ error: `User with ID ${userId} does not exist.` });
        }
      }
  
      // Créer le cours
      const newCourse = await prisma.courses.create({
        data: {
          title,
          date,
        },
      });
  
      // Créer les students_courses pour chaque userId
      const studentsCourses = userIds.map((userId: number) => {
        return prisma.students_course.create({
          data: {
            userId,
            courseId: newCourse.id,
          },
        });
      });
  
      await Promise.all(studentsCourses);
  
      res.json(newCourse);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred.' });
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