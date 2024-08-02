import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import { User } from "../../../types";
import { createRefreshToken } from "@/helpers/createRefreshToken";
import { createAccessToken } from "@/helpers/createAccessTocken";

const usersFilePath = path.resolve(process.cwd(), "users.json");
const JWT_SECRET = "your_jwt_secret_key";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json(
      { message: "Username and password are required" },
      { status: 400 }
    );
  }

  // Read the existing users from the JSON file
  const users = JSON.parse(fs.readFileSync(usersFilePath, "utf8"));

  // Check if the user already exists
  const userExists = users.some((user: User) => user.username === username);

  if (userExists) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 409 }
    );
  }

  const id = users.length + 1;

  const accessToken = await createAccessToken(id, username);
  console.log("Generated JWT Token:", accessToken);

  const refreshToken = await createRefreshToken(id, username);
  console.log("Generated JWT Token:", refreshToken);
  // Create a new user with the token and add it to the users array
  const newUser: User = {
    id: users.length + 1,
    username,
    password,
    refreshToken,
    accessToken,
  };
  users.push(newUser);
  console.log(newUser);

  // Write the updated users array back to the JSON file
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

  const response = NextResponse.json({
    message: "Signup successfull",
    accessToken,
  });
  response.cookies.set("accessToken", accessToken, {
    httpOnly: true,
    path: "/",
    maxAge: 60, // 1 minute in seconds
  });

  // Set refresh token as cookie
  response.cookies.set("refreshToken", refreshToken, {
    httpOnly: true,
    path: "/",
    maxAge: 10, // 10 seconds
  });

  return response;
}
