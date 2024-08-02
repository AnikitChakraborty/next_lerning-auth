import { SignJWT } from "jose";

export const createRefreshToken = async (id: any, username: any) => {
  const token = await new SignJWT({
    id,
    username,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("20s")
    .sign(new TextEncoder().encode(process.env.JWT_SECRET!));

  return token;
};
