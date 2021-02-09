// @ts-nocheck
import { PrismaClient } from '@prisma/client'
let prisma: PrismaClient

// https://www.prisma.io/docs/support/help-articles/400%20-%20nextjs-prisma-client-dev-practices
// check to use this workaround only in development and not in production
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

export default prisma
