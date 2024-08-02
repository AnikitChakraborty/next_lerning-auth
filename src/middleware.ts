// src/middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = "your_jwt_secret_key"; // Replace with your actual secret key

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;

  const refreshToken = req.cookies.get("refreshToken")?.value;

  console.log("Middleware: Checking for token in cookies:", accessToken);

  if (!accessToken) {
    console.log("Middleware: No access token found, redirecting to login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (!refreshToken) {
    console.log("Middleware: No refresh token found, redirecting to login");
    return NextResponse.redirect(new URL("/refresh", req.url));
  }

  try {
    const { payload } = await jwtVerify(
      accessToken,
      new TextEncoder().encode(JWT_SECRET)
    );
    console.log("Middleware: Token decoded successfully:", payload);

    return NextResponse.next();
  } catch (error: any) {
    console.log("Middleware: Token verification failed:", error.message);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/trial", "/dashboard", "/another-page"], // Add more routes here as needed
};
