// app/middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  const url = request.nextUrl.clone();

  // Kök URL'ye istek geldiğinde "/en" URL'sine yönlendirin
  if (url.pathname === "/") {
    url.pathname = "/en";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}