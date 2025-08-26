import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validate } from '../middleware/validate.js';

export default function authRoutes(prisma) {
  const router = Router();

  const registerSchema = {
    email: 'string',
    password: 'string',
    role: 'string'
  };
  router.post('/register', validate(registerSchema), async (req, res) => {
    try {
      const { email, password, role } = req.body;
      const hash = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: { email, password: hash, role }
      });
      res.json({ id: user.id, email: user.email, role: user.role });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  const loginSchema = {
    email: 'string',
    password: 'string'
  };
  router.post('/login', validate(loginSchema), async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) return res.status(401).json({ error: 'Invalid credentials' });
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
      const token = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET || 'SECRET',
        { expiresIn: '30d' }
      );
      res.json({ token });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  return router;
}
