import prisma from '../../../../../lib/Prisma'
import { NextResponse } from 'next/server'

export const POST = async(req: Request, res: NextResponse) => {
    try{
        const body = await req.json()
        const categories = await prisma.category.findMany({
            where: {
                name: {
                    contains: body.name
                }
            },
            select:{
                id: true,
                name: true,
                price: true,
                image: true,
                capsule: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                    }
                }
            }
        })
        return NextResponse.json({ message: "Success", categories }, { status: 200 })
    }catch(err){
        return NextResponse.json({ message: "Error", err }, { status: 500 })
    }
}