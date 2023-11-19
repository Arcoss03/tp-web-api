import express from 'express';
import jwt from 'jsonwebtoken';
import { comparePassword } from '../utils/hash';
import { PrismaClient } from '@prisma/client';
import { SignSchema } from '../validators/validation';
import { getInfoFromToken } from '../middleware/authMiddleware';
import { get } from 'http';

const prisma = new PrismaClient();
const router = express.Router();

//route por sing in to a couses

//route for to sign in to a course
router.patch('/sign/:id_course', async (req, res) => {
    try {
        const tokenInfo = await getInfoFromToken(req, res);
        if (!tokenInfo) {
            return res.status(400).json({ error: 'user not found' });
        } else if (tokenInfo.role === 'admin') {
            return res.status(400).json({ error: 'user is admin and cannot sign' });
        } else if (tokenInfo.role === 'student') {
            const studentId = tokenInfo.id;
            const courseId = req.params.id_course;
            const date = new Date();

            // Check if the studentCourses entry exists
            const studentCourses = await prisma.students_course.findUnique({
                where: { 
                    userId_courseId: {
                        userId: parseInt(studentId),
                        courseId: parseInt(courseId)
                    }
                }
            });

            if (!studentCourses) {
                return res.status(400).json({ error: 'studentCourses entry not found' });
            }

            if (studentCourses.signedAt !== null) {
                return res.status(400).json({ error: 'student already signed' });
            }

            // Update the signedAt date
            await prisma.students_course.update({
                where: { 
                    userId_courseId: {
                        userId: parseInt(studentId),
                        courseId: parseInt(courseId)
                    }
                },
                data: { signedAt: date }
            });

            return res.status(200).json({ message: 'Course signed successfully' });
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Something went wrong' });
        }
    }
});

//route for get all student courses
router.get('/courses', async (req, res) => {
    try {
        const tokenInfo = await getInfoFromToken(req, res);
        if (!tokenInfo) {
            return res.status(400).json({ error: 'user not found' });
        } else if (tokenInfo.role === 'admin') {
            return res.status(400).json({ error: 'user is admin and cannot get student courses' });
        } else if (tokenInfo.role === 'student') {
            const studentId = tokenInfo.id;

            // Get the courses the student is enrolled in
            const studentCourses = await prisma.students_course.findMany({
                where: { 
                    userId: parseInt(studentId)
                },
                include: {
                    course: true
                }
            });

            return res.status(200).json(studentCourses.map(sc => sc.course));
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Something went wrong' });
        }
    }
});

//route for get courses not passed
router.get('/current-courses', async (req, res) => {
    try {
        const tokenInfo = await getInfoFromToken(req, res);
        if (!tokenInfo) {
            return res.status(400).json({ error: 'user not found' });
        } else if (tokenInfo.role === 'admin') {
            return res.status(400).json({ error: 'user is admin and cannot get student courses' });
        } else if (tokenInfo.role === 'student') {
            const studentId = tokenInfo.id;

            // Get the courses the student is enrolled in but not yet signed
            const studentCourses = await prisma.students_course.findMany({
                where: { 
                    userId: parseInt(studentId),
                    signedAt: null
                },
                include: {
                    course: true
                }
            });

            return res.status(200).json(studentCourses.map(sc => sc.course));
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Something went wrong' });
        }
    }
});
export default router;