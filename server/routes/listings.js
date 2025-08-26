import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

export default function listingRoutes(prisma) {
  const router = Router();

  const createSchema = {
    salonId: 'number',
    title: 'string',
    description: 'string',
    priceDay: 'number',
    priceWeek: 'number'
  };
  router.post('/', authMiddleware, validate(createSchema), async (req, res) => {
    const { salonId, title, description, priceDay, priceWeek } = req.body;
    const activeUntil = new Date();
    activeUntil.setMonth(activeUntil.getMonth() + 1);
    try {
      const listing = await prisma.listing.create({
        data: { salonId, title, description, priceDay, priceWeek, activeUntil }
      });
      res.json(listing);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  const querySchema = { city: { type: 'string', optional: true } };
  router.get('/', validate(querySchema, 'query'), async (req, res) => {
    try {
      const { city } = req.query;
      const listings = await prisma.listing.findMany({
        where: {
          status: 'active',
          salon: city ? { city } : undefined
        },
        include: { salon: true }
      });
      res.json(listings);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  return router;
}
