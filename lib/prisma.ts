import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const prismaClientSingleton = () => {
  let connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    return new PrismaClient();
  }

  // Handle password encoding for '#' if present
  if (connectionString.includes('#') && !connectionString.includes('%23')) {
    // We only want to encode the '#' if it's likely part of the password
    // A safer way is to use URL but that might fail if the URL is already invalid
    try {
      const url = new URL(connectionString);
      if (url.password.includes('#')) {
        url.password = url.password.replace(/#/g, '%23');
        connectionString = url.toString();
      }
    } catch (e) {
      // Fallback to simple replacement if URL parsing fails
      connectionString = connectionString.replace('#', '%23');
    }
  }

  const pool = new pg.Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;