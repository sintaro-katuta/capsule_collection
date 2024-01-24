import prisma from '../../../../../../lib/Prisma'
import { NextResponse } from 'next/server'

export const POST = async(req: Request, res: NextResponse) => {
    try{
        const body: any = await req.json()
        const category = await prisma.category.findMany({
            where: {
                price: {equals: body.price}
            },
            select: {
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
        return NextResponse.json({ message: "Success", category }, { status: 200 })
    }catch(err){
        return NextResponse.json({ message: "Error", err }, { status: 500 })
    }
}