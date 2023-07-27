import mongoose from "mongoose";
import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  console.log('en el middleware: ', req.nextUrl);

  if (req.nextUrl.pathname.startsWith('/api/entries/')) {
    const id = req.nextUrl.pathname.replace('/api/entries/', '')
    console.log('buscas por id: ', id);
    const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");

    if (!checkMongoIDRegExp.test(id)) {
      console.log(`El id: ${id} no es valido`);
      const url = req.nextUrl.clone()
      url.pathname = '/api/bad-request'
      url.search = `?message=${id} is not a valid MongoID`
      return NextResponse.rewrite(url)
    }

    console.log('el id: ', id, 'es valido');

  }

  return NextResponse.next()
}


export const config = {
  matcher: [
    // '/api/entries',
    '/api/entries/:path*'
  ],
}