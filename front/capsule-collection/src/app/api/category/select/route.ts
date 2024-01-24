import prisma from '../../../../../lib/Prisma'
import { NextResponse } from 'next/server'

export const GET = async(req: Request, res: NextResponse) => {
    try{
        const categories = await prisma.category.findMany({
            orderBy: { name: "asc" },
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
        return NextResponse.json({ message: "Success", categories }, { status: 200 })
    }catch(err){
        return NextResponse.json({ message: "Error", err }, { status: 500 })
    }
}

export const POST = async(req: Request, res: NextResponse) => {
    try{
        const body = await req.json()
        const category = await prisma.category.findUnique({
            where: {
                id: body.id
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