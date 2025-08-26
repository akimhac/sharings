import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';

export default function paymentRoutes(prisma) {
  const router = Router();

  router.post('/access', authMiddleware, async (req, res) => {
    try {
      await prisma.$transaction([
        prisma.payment.create({
          data: { userId: req.user.userId, amount: 4.99, type: 'access' }
        }),
        prisma.user.update({
          where: { id: req.user.userId },
          data: { paidAccess: true }
        })
      ]);
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'PAYMENT_ERROR' });
    }
  });

  router.post('/listing/:id', authMiddleware, async (req, res) => {
    const listingId = parseInt(req.params.id, 10);
    const activeUntil = new Date();
    activeUntil.setMonth(activeUntil.getMonth() + 1);

    try {
      await prisma.$transaction([
        prisma.payment.create({
          data: { userId: req.user.userId, amount: 9.99, type: 'listing' }
        }),
        prisma.listing.update({
          where: { id: listingId },
          data: { activeUntil }
        })
      ]);
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'PAYMENT_ERROR' });
    }
  });

  router.post('/search', authMiddleware, async (req, res) => {
    const { description, city } = req.body;

    try {
      const [, request] = await prisma.$transaction([
        prisma.payment.create({
          data: { userId: req.user.userId, amount: 9.99, type: 'search' }
        }),
        prisma.searchRequest.create({
          data: {
            clientId: req.user.userId,
            description,
            city
          }
        })
      ]);
      res.json(request);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'PAYMENT_ERROR' });
    }
  });

  return router;
}
