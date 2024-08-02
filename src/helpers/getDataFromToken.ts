import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { request } from "http";
//import path from "path";
import fs from "fs";
import { User } from "./../types";
//const usersFilePath = path.resolve(process.cwd(), "users.json");

const JWT_SECRET = "your_jwt_secret_key";
export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";

    const decodedToken: any = jwt.verify(token, JWT_SECRET);

    const users: User[] = JSON.parse(
      fs.readFileSync("./../../users.json", "utf8")
    );

    // Find the user with matching username and password
    const userIndex = users.findIndex(
      (user: User) => user.id === decodedToken.id
    );
    return NextResponse.json({
      message: "user found",
      data: userIndex,
    });
  } catch (error: any) {
    console.log(error);
  }
};
