// routes/student.ts
import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send('Student route');
});

export default router;