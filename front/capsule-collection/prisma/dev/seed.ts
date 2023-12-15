import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";

const prisma = new PrismaClient()

// 投入するデータの定義
const userData: Prisma.UserCreateInput[] = [
    {
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'test123',
    },
    {
        username: 'testuser2',
        email: 'testuser2@example.com',
        password: 'test456',
    }
]

const transfer = async () => {
    const users: any = []
    for (const u of userData) {
        const user = prisma.user.create({
            data: u,
        })
        users.push(user)
    }
    return await prisma.$transaction(users)
}

const main = async () => {
    console.log("Start seeding ...")
    await transfer()
    console.log("Seeding finished.")
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
