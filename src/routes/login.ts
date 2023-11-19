import express from 'express';
import jwt from 'jsonwebtoken';
import { comparePassword } from '../utils/hash';
import { PrismaClient } from '@prisma/client';
import { UserSchema } from '../validators/validation';

const prisma = new PrismaClient();
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        let { email, password } = req.body;

        // Validate request body
        await UserSchema.validate({ email, password });

        // Check if the user exists 
        const user = await prisma.users.findUnique({ where: { email } });
        if (!user || !(await comparePassword(password, user.password))) {
            return res.status(400).json({ error: 'user or password incorrect' });
        }

        // Create a token
        const role = user.role ? "admin" : "student";
        const token = jwt.sign({ id: user.id, role: role}, process.env.JWT_SECRET ?? 'default-secret', { expiresIn: '15d' });
        res.status(200).json({ message: 'user connected', token, role: user.role });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Something went wrong' });
        }
    }
});

export default router;