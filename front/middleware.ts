import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// here a middleware that checks if user is logged in or not
export async function middleware(request: NextRequest) {
  // first of all get hashkey cookie if its exist and send it to server to check if it exist in database
  const res = await fetch("http://localhost:2000/session_status", {
    method: "POST",
    body: JSON.stringify({ key: request.cookies.get("user_hashkey")?.value }),
    headers: { "Content-Type": "application/json" }
  });

  // then check status, if status is not 401 - move on
  if (res.status !== 401) {
    return NextResponse.next();
  }

  // if 401 - redirect to login page
  return NextResponse.redirect(new URL("/login", request.url));
}

// project pages
export const config = {
  matcher: ["/members", "/", "/indox", "/settings", "/help%20&%20support"]
};
