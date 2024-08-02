import fs from "fs";
import path from "path";
import { User } from "../types";
import jwt from "jsonwebtoken";

const USERS_FILE_PATH = path.join(process.cwd(), "users.json");
const SECRET_KEY = "your-secret-key";

export const readUsers = (): User[] => {
  const usersData = fs.readFileSync(USERS_FILE_PATH, "utf-8");
  return JSON.parse(usersData);
};

export const writeUsers = (users: User[]) => {
  fs.writeFileSync(USERS_FILE_PATH, JSON.stringify(users, null, 2), "utf-8");
};

export const generateToken = (user: User) => {
  return jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
    expiresIn: "1h",
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET_KEY);
};
