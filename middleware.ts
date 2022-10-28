import {getToken} from 'next-auth/jwt'
import {NextResponse} from 'next/server'
import type { NextRequest } from 'next/server'

export const middleware = async (req:NextRequest ) => {
    console.log(req)
    const token = await getToken({req,secret:process.env.JWT_SECRET});
   
    const {pathname,origin} = req.nextUrl
    console.log(token)
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