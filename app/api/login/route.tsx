import { NextResponse, NextRequest } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
    const res = await request.json();
    const session = res?.session as Session;
    if (session) {
        const cookieValue = JSON.stringify(session);
        (await cookies()).set({
            name: 'session',
            value: cookieValue,
            httpOnly: false,
            path: '/',
            maxAge: 30 * 24 * 60 * 60,
            secure: process.env.NODE_ENV !== "development",
            //domain: ".styxsports.com"
        });
    }
    return NextResponse.json(res)
}

