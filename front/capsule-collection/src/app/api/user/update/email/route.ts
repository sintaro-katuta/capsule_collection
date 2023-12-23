import { PrismaClient, Prisma } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../../../lib/Prisma'

export const POST = async(req: NextRequest, res: NextResponse) => {
    try{
        const body = await req.json()

        const user = await prisma.user.update({
            where: { id: body.id },
            data: { email: body.email }
        })
        return NextResponse.json({ message: "Success", user }, { status: 200 })
    }catch(err){
        return NextResponse.json({ message: "Error", err }, { status: 500 })
    }
}
