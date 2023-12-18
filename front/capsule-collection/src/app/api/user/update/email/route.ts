import { PrismaClient, Prisma } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../../../lib/Prisma'

export async function POST(request: any) {
    const body = await request.json()

    const user = await prisma.user.update({
        where: { id: body.id },
        data: { email: body.email }
    })
    prisma.$disconnect()
    return new Response(JSON.stringify({ message: user }))
}
