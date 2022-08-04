import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getToken } from 'next-auth/jwt';
import { jwtVerify } from "jose";



export async function middleware(req: NextRequest, ev: NextFetchEvent) {

  const session = await getToken({req, secret: process.env.NEXTAUTH_SECRET_SEED});
  console.log(session);

  
  if( !session ){
    const { origin } = req.nextUrl.clone();
    const requestedPage = req.page.name;
    return NextResponse.redirect(`${origin}/auth/login?page=${requestedPage}`);
  }
 
  return NextResponse.next();
 


  // let url= req.nextUrl.clone();
  // url.basePath = '/auth/login?page=';
  // url.pathname = req.page.name!;

  // const {token=''}= req.cookies;

  // try {
  
  //   await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET_SEED));
  //   return NextResponse.next();
      
  // } catch (error) {
  //   console.log(error);
  //   return NextResponse.redirect(url);
  // }
}

// export const config = {
//   matcher: ['/checkout/:path*'],
// };