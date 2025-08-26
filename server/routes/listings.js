import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';

export default function listingRoutes(prisma) {
  const router = Router();

  router.post('/', authMiddleware, async (req, res) => {
    const { salonId, title, description, priceDay, priceWeek } = req.body;
    const activeUntil = new Date();
    activeUntil.setMonth(activeUntil.getMonth() + 1);
    try {
      const listing = await prisma.listing.create({
        data: { salonId, title, description, priceDay, priceWeek, activeUntil }
      });
      res.json(listing);
    } catch {
      res.status(400).json({ error: 'Unable to create listing' });
    }
  });

  router.get('/', async (req, res) => {
    const { city } = req.query;
    const listings = await prisma.listing.findMany({
      where: {
        status: 'active',
        salon: { city }
      },
      include: { salon: true }
    });
    res.json(listings);
  });

  return router;
}
