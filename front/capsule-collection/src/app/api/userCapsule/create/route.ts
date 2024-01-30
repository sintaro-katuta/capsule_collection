import { Prisma } from '@prisma/client'
import prisma from '../../../../../lib/Prisma'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async(req: NextRequest, res: NextResponse) => {
    try{
        const body = await req.json()
        const Data: Prisma.UserCapsuleCreateInput = {
            capsule: {
                connect: {
                    id: body.capsuleId
                }
            },
            user: {
                connect: {
                    id: body.userId
                }
            },
        }
        const category = await prisma.userCapsule.create({ data: Data })
        return NextResponse.json({ message: "Success", category }, { status: 200 })
    }catch(err){
        return NextResponse.json({ message: "Error", err }, { status: 500 })
    }
}