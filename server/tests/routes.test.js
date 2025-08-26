import test from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import jwt from 'jsonwebtoken';
import authRoutes from '../routes/auth.js';
import listingRoutes from '../routes/listings.js';
import paymentRoutes from '../routes/payments.js';

function mockRes() {
  return {
    statusCode: 200,
    body: undefined,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(obj) {
      this.body = obj;
      return this;
    }
  };
}

// Auth route tests
const prismaAuth = {
  user: {
    create: async () => {
      throw new Error('fail');
    },
    findUnique: async () => null
  }
};
const authRouter = authRoutes(prismaAuth);
const authLayer = authRouter.stack.find(l => l.route && l.route.path === '/register').route.stack;
const authValidate = authLayer[0].handle;
const authHandler = authLayer[1].handle;

test('register validation requires password', () => {
  const req = { body: { email: 'a@b.com', role: 'user' } };
  const res = mockRes();
  authValidate(req, res, () => {});
  assert.equal(res.statusCode, 400);
  assert.match(res.body.error, /password/);
});

test('register handler returns explicit prisma error', async () => {
  const req = { body: { email: 'a@b.com', password: 'secret', role: 'user' } };
  const res = mockRes();
  authValidate(req, res, async () => {
    await authHandler(req, res);
  });
  assert.equal(res.statusCode, 400);
  assert.equal(res.body.error, 'fail');
});

// Listings route tests
const prismaListings = {
  listing: {
    findMany: async () => {
      throw new Error('listings fail');
    }
  }
};
const listingRouter = listingRoutes(prismaListings);
const listLayer = listingRouter.stack.find(l => l.route && l.route.path === '/').route.stack;
const listValidate = listLayer[0].handle;
const listHandler = listLayer[1].handle;

test('listings validation rejects wrong type', () => {
  const req = { query: { city: 123 } };
  const res = mockRes();
  listValidate(req, res, () => {});
  assert.equal(res.statusCode, 400);
  assert.match(res.body.error, /city/);
});

test('listings handler returns prisma error', async () => {
  const req = { query: { city: 'Paris' } };
  const res = mockRes();
  await new Promise(resolve => {
    listValidate(req, res, async () => {
      await listHandler(req, res);
      resolve();
    });
  });
  assert.equal(res.statusCode, 400);
  assert.equal(res.body.error, 'listings fail');
});

// Payments route tests
const prismaPayments = {
  payment: {
    create: async () => {
      throw new Error('payment fail');
    }
  },
  user: {
    update: async () => {}
  },
  listing: {
    update: async () => {}
  },
  searchRequest: {
    create: async () => ({ id: 1 })
  }
};
const paymentRouter = paymentRoutes(prismaPayments);
const searchLayer = paymentRouter.stack.find(l => l.route && l.route.path === '/search').route.stack;
const searchAuth = searchLayer[0].handle;
const searchValidate = searchLayer[1].handle;
const searchHandler = searchLayer[2].handle;

test('payments validation requires city', async () => {
  const token = jwt.sign({ userId: 1 }, 'SECRET');
  const req = { headers: { authorization: `Bearer ${token}` }, body: { description: 'desc' } };
  const res = mockRes();
  await new Promise(resolve => searchAuth(req, res, resolve));
  searchValidate(req, res, () => {});
  assert.equal(res.statusCode, 400);
  assert.match(res.body.error, /city/);
});

test('payments handler returns prisma error', async () => {
  const token = jwt.sign({ userId: 1 }, 'SECRET');
  const req = { headers: { authorization: `Bearer ${token}` }, body: { description: 'desc', city: 'Paris' }, user: { userId: 1 } };
  const res = mockRes();
  await new Promise(resolve => searchAuth(req, res, () => {
    searchValidate(req, res, async () => {
      await searchHandler(req, res);
      resolve();
    });
  }));
  assert.equal(res.statusCode, 400);
  assert.equal(res.body.error, 'payment fail');
});
