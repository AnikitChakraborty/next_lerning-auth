import { SignJWT } from "jose";
const JWT_SECRET = "your_jwt_secret_key";
export const createRefreshToken = async (id: any, username: any) => {
  const token = await new SignJWT({
    id,
    username,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("20s")
    .sign(new TextEncoder().encode(JWT_SECRET));

  return token;
};
