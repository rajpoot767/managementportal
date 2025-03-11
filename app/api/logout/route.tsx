import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
      (await cookies()).set({
        name: 'session',
        value: '',
        httpOnly: false,
        path: '/',
        maxAge: 0,
        secure: process.env.NODE_ENV !== "development",
        //domain: ".styxsports.com"
    });
    return NextResponse.json({ isSuccessful: true })
}