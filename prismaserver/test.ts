import pgvector from 'pgvector/utils'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const embedding = pgvector.toSql([1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4,])
async function test () {
    const data = await prisma.testt.count()
    console.log(data)
    await prisma.$executeRaw`INSERT INTO testt (embedding) VALUES (${embedding}::vector)`
    const adata = await prisma.testt.count()
    console.log(adata)
}
test()