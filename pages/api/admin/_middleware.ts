import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getToken } from 'next-auth/jwt';
import { jwtVerify } from "jose";



export async function middleware(req: NextRequest, ev: NextFetchEvent) {

  const session:any = await getToken({req, secret: process.env.NEXTAUTH_SECRET_SEED});

  if( !session ){
    return new Response(JSON.stringify({message: 'No autorizado'}), {
      status: 401,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  const validRoles = ['admin', 'super-user', 'SEO'];

  if(!validRoles.includes(session.user.role)){
    return new Response(JSON.stringify({message: 'No autorizado'}), {
      status: 401,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
 
  return NextResponse.next();

}
