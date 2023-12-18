import { Prisma } from '@prisma/client'
import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'
import { prisma } from '../../../../../lib/Prisma'

export async function POST(request: NextApiRequest) {
    const { id } = request.body

    const user = await prisma.user.findUnique({
        where: { id: 'ea36949b-a49d-4bc6-b8b1-cf23aeb71a84' }

    })
    prisma.$disconnect()
    return new Response(JSON.stringify({ message: user }))
}
