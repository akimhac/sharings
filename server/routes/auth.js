import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default function authRoutes(prisma) {
  const router = Router();

  router.post('/register', async (req, res) => {
    try {
      const { email, password, role } = req.body;
      const hash = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: { email, password: hash, role }
      });
      res.json({ id: user.id, email: user.email, role: user.role });
    } catch (err) {
      res.status(400).json({ error: 'Registration failed' });
    }
  });

  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: 'JWT_SECRET not configured' });
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );
    res.json({ token });
  });

  return router;
}
