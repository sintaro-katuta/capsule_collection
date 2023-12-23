import prisma, { Prisma } from '../../../../../lib/Prisma'
import { NextResponse } from 'next/server'

export const POST = async(req: Request, res: NextResponse) => {
    try{
        const body = await req.json()
        const userData: Prisma.UserCreateInput = {
            id: body.id,
            username: body.username,
            email: body.email,
        }
        const user = await prisma.user.create({ data: userData })
        return NextResponse.json({ message: "Success", user }, { status: 200 })
    }catch(err){
        return NextResponse.json({ message: "Error", err }, { status: 500 })
    }
}