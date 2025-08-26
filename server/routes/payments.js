import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

export default function paymentRoutes(prisma) {
  const router = Router();

  router.post('/access', authMiddleware, validate({}), async (req, res) => {
    try {
      await prisma.payment.create({
        data: { userId: req.user.userId, amount: 4.99, type: 'access' }
      });
      await prisma.user.update({
        where: { id: req.user.userId },
        data: { paidAccess: true }
      });
      res.json({ success: true });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  const paramsSchema = { id: 'number' };
  router.post('/listing/:id', authMiddleware, validate(paramsSchema, 'params'), async (req, res) => {
    const listingId = req.params.id;
    const activeUntil = new Date();
    activeUntil.setMonth(activeUntil.getMonth() + 1);
    try {
      await prisma.payment.create({
        data: { userId: req.user.userId, amount: 9.99, type: 'listing' }
      });
      await prisma.listing.update({
        where: { id: listingId },
        data: { activeUntil }
      });
      res.json({ success: true });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  const searchSchema = { description: 'string', city: 'string' };
  router.post('/search', authMiddleware, validate(searchSchema), async (req, res) => {
    const { description, city } = req.body;
    try {
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
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  return router;
}
