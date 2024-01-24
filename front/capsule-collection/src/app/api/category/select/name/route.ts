import prisma from '../../../../../../lib/Prisma'
import { NextResponse } from 'next/server'

export const POST = async(req: Request, res: NextResponse) => {
    try{
        const body: any = await req.json()
        const categoryData = await prisma.category.findMany({
            where: {
                name: {contains: body.name.join(' ')}
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
        console.log(categoryData)
        return NextResponse.json({ message: "Success!" }, { status: 200 })
    }catch(err){
        return NextResponse.json({ message: "Error", err }, { status: 500 })
    }
}