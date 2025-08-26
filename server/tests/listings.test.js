import test from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import listingRoutes from '../routes/listings.js';

test('GET /listings?city=Paris filters by city', async () => {
  let receivedArgs;
  const prisma = {
    listing: {
      findMany: async (args) => {
        receivedArgs = args;
        return [{ id: 1, salon: { city: 'Paris' } }];
      }
    }
  };

  const app = express();
  app.use('/listings', listingRoutes(prisma));
  const server = app.listen();
  await new Promise((resolve) => server.once('listening', resolve));
  const { port } = server.address();

  const res = await fetch(`http://localhost:${port}/listings?city=Paris`);
  const body = await res.json();

  assert.equal(res.status, 200);
  assert.deepEqual(receivedArgs.where, {
    status: 'active',
    salon: { city: 'Paris' }
  });
  assert.deepEqual(body, [{ id: 1, salon: { city: 'Paris' } }]);

  server.close();
});

