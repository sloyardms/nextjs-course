import { NextResponse } from "next/server";

export function middleware(request){
    console.log("Middleware running for ", request.url);
    return NextResponse.next();
}

export const config = {
    matcher: '/news'
}