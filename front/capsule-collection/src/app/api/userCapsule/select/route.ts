import prisma from '../../../../../lib/Prisma'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async(req: NextRequest, res: NextResponse) => {
    try{
        const body = await req.json()
    
        const capsule = await prisma.userCapsule.findMany({
            orderBy: { capsule: { name: "asc" } },
            where: { userId: body.id },
            select: {
                capsule: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                        category: {
                            select: {
                                id: true,
                                name: true,
                                price: true,
                                image: true,
                            }
                        }
                    }
                }
            
            }
        })
        return NextResponse.json({ message: "Success", capsule }, { status: 200 })
    }catch(err){
        return NextResponse.json({ message: "Error", err }, { status: 500 })
    }
}