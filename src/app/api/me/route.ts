// import { getDataFromToken } from "@/helpers/getDataFromToken";
// import { NextRequest, NextResponse } from "next/server";
// import fs from "fs";
// import { User } from "../../../types";
// import path from "path";

// const usersFilePath = path.resolve(process.cwd(), "users.json");

// export async function GET(request: NextRequest) {
//   try {
//     const userId = await getDataFromToken(request);

//     // Read the existing users from the JSON file
//     const users: User[] = JSON.parse(fs.readFileSync(usersFilePath, "utf8"));

//     // Find the user with matching userId
//     const userIndex = users.findIndex((user: User) => user.id === userId);
//     console.log("user detail -->", userIndex);
//     return NextResponse.json({
//       message: "user found",
//       data: userIndex,
//     });
//   } catch (error: any) {
//     console.log(error);
//   }
// }
