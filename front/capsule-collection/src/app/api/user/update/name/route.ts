import prisma from '../../../../../../lib/Prisma'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async(req: NextRequest, res: NextResponse) => {
    try{
        const body = await req.json()

        const user = await prisma.user.update({
            where: { id: body.id },
            data: { username: body.name }
        })
        return NextResponse.json({ message: "Success", user }, { status: 200 })
    }catch(err){
        return NextResponse.json({ message: "Error", err }, { status: 500 })
    }
}