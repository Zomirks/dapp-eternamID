import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const body = await request.json()

        const user = await prisma.user.create({
            data: {
                nft_id: body.nft_id,
                firstname: body.firstname,
                name: body.name,
                description: body.description,
                private_notes: body.private_notes,
                hash: body.hash,
                bornAt: new Date(body.bornAt),
            },
        })

        return NextResponse.json(user)
    } catch (error) {
        console.error('Erreur création user:', error)
        return NextResponse.json(
            { error: 'Erreur lors de la création' },
            { status: 500 }
        )
    }
}