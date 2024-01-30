import { Prisma } from '@prisma/client'
import prisma from '../../../../../lib/Prisma'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async(req: NextRequest, res: NextResponse) => {
    try{
        const body = await req.json()

        const categoryData: Prisma.CategoryCreateInput = {
            name: body.name,
            image: body.image,
            price: body.price,
        }
    
        const category = await prisma.category.create({ data: categoryData })
        return NextResponse.json({ message: "Success", category }, { status: 200 })
    }catch(err){
        return NextResponse.json({ message: "Error", err }, { status: 500 })
    }
}