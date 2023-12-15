import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from '@prisma/client'
import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'


const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {

}

export async function GET(request: any) {
    const { searchParams } = new URL(request.url)
    const prisma = new PrismaClient()
    const resUser = await prisma.user.findUnique({
        where: {
            email: 'testuser@example.com'
        }
    })
    console.log("GET request", searchParams.get("name"))

    return new Response(JSON.stringify({ message: resUser }))
}

export async function POST(request: any) {
    const body = await request.json()

    console.log("POST request", body.name)
    return new Response(JSON.stringify({ message: "Hello World" }))
}
