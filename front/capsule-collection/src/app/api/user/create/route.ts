import { PrismaClient, Prisma } from '@prisma/client'
import type { NextApiRequest } from 'next'
import { prisma } from '../../../../../lib/Prisma'

export async function POST(request: any) {
    const body = await request.json()

    const userData: Prisma.UserCreateInput = {
        id: body.id,
        username: body.username,
        email: body.email
    }

    const user = await prisma.user.create({ data: userData })
    prisma.$disconnect()
    return new Response(JSON.stringify({ message: user }))
}