import prisma, { Prisma } from '../../../../../lib/Prisma'
import { NextResponse } from 'next/server'

export const GET = async(req: Request, res: NextResponse) => {
    try{
        const categories = await prisma.category.findMany()
        return NextResponse.json({ message: "Success", categories }, { status: 200 })
    }catch(err){
        return NextResponse.json({ message: "Error", err }, { status: 500 })
    }
}