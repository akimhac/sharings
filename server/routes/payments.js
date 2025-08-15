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

  router.post('/listing/:id', authMiddleware, async (req, res) => {
    const listingId = parseInt(req.params.id, 10);
    const activeUntil = new Date();
    activeUntil.setMonth(activeUntil.getMonth() + 1);

    await prisma.payment.create({
      data: { userId: req.user.userId, amount: 9.99, type: 'listing' }
    });
    await prisma.listing.update({
      where: { id: listingId },
      data: { activeUntil }
    });
    res.json({ success: true });
  });

  router.post('/search', authMiddleware, async (req, res) => {
    const { description, city } = req.body;

    await prisma.payment.create({
      data: { userId: req.user.userId, amount: 9.99, type: 'search' }
    });
    const request = await prisma.searchRequest.create({
      data: {
        clientId: req.user.userId,
        description,
        city
      }
    });
    res.json(request);
  });

  return router;
}
