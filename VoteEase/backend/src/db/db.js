import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const User = prisma.user;

const connectDB = async() => {
    
        await prisma.$connect();
}

export {
    User,
    connectDB
}