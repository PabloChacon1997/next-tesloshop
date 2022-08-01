import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";



export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  let url= req.nextUrl.clone();
  url.basePath = '/auth/login?page=';
  url.pathname = req.page.name!;

  const {token=''}= req.cookies;

  try {
  
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET_SEED));
    return NextResponse.next();
      
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(url);
  }
}