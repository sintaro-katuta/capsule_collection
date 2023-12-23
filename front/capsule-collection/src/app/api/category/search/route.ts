import prisma from '../../../../../lib/Prisma'
import { NextResponse } from 'next/server'

export const POST = async(req: Request, res: NextResponse) => {
    try{
        const body = await req.json()
        const categories = await prisma.category.findMany({
            where: {
                name: {
                    search: body.name
                }
            },
        })
        return NextResponse.json({ message: "Success", categories }, { status: 200 })
    }catch(err){
        return NextResponse.json({ message: "Error", err }, { status: 500 })
    }
}