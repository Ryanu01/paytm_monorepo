import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt"
const prisma = new PrismaClient()

async function main() {
  const alice = await prisma.user.upsert({
    where: { number: '9999999999' },
    update: {},
    create: {
      number: '9999999999',
      password: await bcrypt.hash("alice123456", 12),
      name: 'alice',
      onRampTransactions: {
        create: {
          startTime: new Date(),
          status: "success",
          amount: 20000,
          token: "122",
          provider: "HDFC Bank",
        },
      },
    },
  })

  const balanceDb = await prisma.balance.upsert({
    where: {
        userId: alice.id
    },
    update: {},
    create: {
        userId: alice.id,
        amount: 20000,
        locked: 0,
    }
  })
  const bob = await prisma.user.upsert({
    where: { number: '9999999998' },
    update: {},
    create: {
      number: '9999999998',
      password: await bcrypt.hash('bob123456', 12),
      name: 'bob',
      onRampTransactions: {
        create: {
          startTime: new Date(),
          status: "Failed",
          amount: 2000,
          token: "123",
          provider: "HDFC Bank",
        },
      },
    },
  })
  const balanceDbBob = await prisma.balance.upsert({
    where: {
        userId: bob.id
    },
    update: {},
    create: {
        userId: bob.id,
        amount: 0,
        locked: 0
    }
  })
  console.log({ alice, bob })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })