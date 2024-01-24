import { Prisma } from '@prisma/client'
import prisma from '../../../../../lib/Prisma'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async(req: NextRequest, res: NextResponse) => {
    try{
        const body = await req.json()

        const capsuleData: Prisma.CapsuleCreateInput = {
            name: body.name,
            image: body.image,
            category: {
                connect: {
                    id: body.categoryId
                },
            },
        }
    
        const capsule = await prisma.capsule.create({ data: capsuleData  })
        return NextResponse.json({ message: "Success", capsule }, { status: 200 })
    }catch(err){
        return NextResponse.json({ message: "Error", err }, { status: 500 })
    }
}