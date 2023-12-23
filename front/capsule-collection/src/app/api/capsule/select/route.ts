import { Prisma } from '@prisma/client'
import prisma from '../../../../../lib/Prisma'
import { NextRequest, NextResponse } from 'next/server'
import { where } from 'firebase/firestore'

export const POST = async(req: NextRequest, res: NextResponse) => {
    try{
        const body = await req.json()
    
        const capsule = await prisma.capsule.findMany({
            where: { categoryId: body.id },
        })
        return NextResponse.json({ message: "Success", capsule }, { status: 200 })
    }catch(err){
        return NextResponse.json({ message: "Error", err }, { status: 500 })
    }
}