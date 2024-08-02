// src/app/api/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { User } from "../../../types"; // Adjust the path as necessary
import { SignJWT } from "jose";
import { createAccessToken } from "@/helpers/createAccessTocken";
import { createRefreshToken } from "@/helpers/createRefreshToken";

const usersFilePath = path.resolve(process.cwd(), "users.json");
const JWT_SECRET = "your_jwt_secret_key"; // Replace with your actual secret key

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json(
      { message: "Username and password are required" },
      { status: 400 }
    );
  }

  // Read the existing users from the JSON file
  const users: User[] = JSON.parse(fs.readFileSync(usersFilePath, "utf8"));

  // Find the user with matching username and password
  const userIndex = users.findIndex(
    (user: User) => user.username === username && user.password === password
  );

  if (userIndex === -1) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const accessToken = await createAccessToken(
    users[userIndex].id,
    users[userIndex].username
  );
  console.log("Generated Access Token:", accessToken);

  const refreshToken = await createRefreshToken(
    users[userIndex].id,
    users[userIndex].username
  );

  console.log("Generated Refresh Token:", refreshToken);

  // Update the user's access Token in the users array
  users[userIndex].accessToken = accessToken;

  // Update the Referesh token in the users array
  users[userIndex].refreshToken = refreshToken;

  // Write the updated users array back to the JSON file
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

  const response = NextResponse.json({
    message: "S successfull",
    accessToken,
  });
  response.cookies.set("accessToken", accessToken, {
    httpOnly: true,
    path: "/",
    maxAge: 3600, // 1hr in seconds
  });

  // Set refresh token as cookie
  response.cookies.set("refreshToken", refreshToken, {
    httpOnly: true,
    path: "/",
    maxAge: 20, // 10 seconds
  });

  return response;
}
