import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const provider = await prisma.user.create({
    data: {
      email: 'provider@example.com',
      password: 'hashed',
      role: 'provider',
      paidAccess: true,
    },
  });

  const salon = await prisma.salon.create({
    data: {
      ownerId: provider.id,
      name: 'Salon Demo',
      address: '12 Rue Demo',
      city: 'Paris',
      photos: ['https://example.com/photo.jpg'],
      description: 'Salon de démonstration',
    },
  });

  await prisma.listing.create({
    data: {
      salonId: salon.id,
      title: 'Poste coiffure',
      description: 'Poste lumineux',
      priceDay: 50,
      priceWeek: 250,
      activeUntil: new Date(),
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
