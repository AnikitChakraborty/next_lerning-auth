import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { SignJWT, jwtVerify } from "jose";
import { User } from "../../../types"; // Adjust the path as necessary
import { createRefreshToken } from "@/helpers/createRefreshToken";

const usersFilePath = path.resolve(process.cwd(), "users.json");
const JWT_SECRET = "your_jwt_secret_key"; // Replace with your actual secret key

export async function POST(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;

  if (!accessToken) {
    console.log("No token found, redirecting to login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const { payload } = await jwtVerify(
      accessToken,
      new TextEncoder().encode(JWT_SECRET)
    );
    console.log("Token decoded successfully:", payload);

    // Read the existing users from the JSON file
    const users: User[] = JSON.parse(fs.readFileSync(usersFilePath, "utf8"));

    // Find the user with matching id and username

    const user = users.find(
      (user: User) =>
        user.id === payload.id && user.username === payload.username
    );
    console.log("user index -->", user);

    if (!user) {
      return NextResponse.json(
        { message: "User not exist", success: false },
        { status: 401 }
      );
    }
    // Generate a new Refers token
    console.log("Generating referesh token");

    const newRefersToken = await createRefreshToken(
      payload.id,
      payload.username
    );

    console.log("Generated Refresh Token:", newRefersToken);

    // Update the Referesh token in the users array
    user.refreshToken = newRefersToken;

    // Create the response with the new access token as a cookie
    const response = NextResponse.json({
      message: "Token refreshed successfully",
      success: true,
    });
    response.cookies.set("refreshToken", newRefersToken, {
      httpOnly: true,
      path: "/",
      maxAge: 10,
    }); // Set cookie with a 1 minute expiration

    return response;
  } catch (error: any) {
    console.log("Refers api: Token verification failed:", error.message);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
