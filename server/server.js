import express from 'express';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/auth.js';
import listingRoutes from './routes/listings.js';
import paymentRoutes from './routes/payments.js';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.use('/auth', authRoutes(prisma));
app.use('/listings', listingRoutes(prisma));
app.use('/payments', paymentRoutes(prisma));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
