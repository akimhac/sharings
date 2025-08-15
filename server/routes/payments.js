import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';

export default function paymentRoutes(prisma) {
  const router = Router();

  router.post('/access', authMiddleware, async (req, res) => {
    await prisma.payment.create({
      data: { userId: req.user.userId, amount: 4.99, type: 'access' }
    });
    await prisma.user.update({
      where: { id: req.user.userId },
      data: { paidAccess: true }
    });
    res.json({ success: true });
  });

  return router;
}
