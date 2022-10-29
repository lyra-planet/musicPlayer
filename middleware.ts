import {getToken} from 'next-auth/jwt'
import jwt from "jsonwebtoken";
import {NextResponse} from 'next/server'
import type { NextRequest } from 'next/server'
import { json } from 'stream/consumers';

export const middleware = async (req:NextRequest ) => {
    const secret = process.env.JWT_SECRET;
    const token = await getToken({req,secret:secret});
    console.log(req.cookies)
    const {pathname} = req.nextUrl
    if(pathname.includes('/api/auth')||token){
        
        return NextResponse.next()
    }
    const url = req.nextUrl.clone()
    url.pathname = '/login'
    if(!token&&pathname!=='/login'){
        return NextResponse.redirect(url)
    }
}
export const config={
    matcher:['/api/auth','/login','/']
}