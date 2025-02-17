import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(req: NextRequest) {
  const currentPath = req.nextUrl.pathname;

  const publicRoutes = ["/biblioteca", "/videoteca", "/biblioteca/:id"];

  if (publicRoutes.some((val) => currentPath.includes(val))) {
    return NextResponse.next();
  }

  if (req.nextUrl.pathname === "/") {
    const url = req.nextUrl.clone();
    url.pathname = "/inicio";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
