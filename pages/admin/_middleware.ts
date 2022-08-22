import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getToken } from 'next-auth/jwt';



export async function middleware(req: NextRequest, ev: NextFetchEvent) {

  const session:any = await getToken({req, secret: process.env.NEXTAUTH_SECRET_SEED});

  if( !session ){
    const { origin } = req.nextUrl.clone();
    const requestedPage = req.page.name;
    return NextResponse.redirect(`${origin}/auth/login?page=${requestedPage}`);
  }

  const validRoles = ['admin', 'super-user', 'SEO'];

  if(!validRoles.includes(session.user.role)){
    const { origin } = req.nextUrl.clone();
    return NextResponse.redirect(`${origin}`);
  }
 
  return NextResponse.next();

}
