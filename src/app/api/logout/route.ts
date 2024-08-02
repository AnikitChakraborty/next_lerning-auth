import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({
      message: "Logout successful",
      success: true,
    });

    // Expire both the accessToken and refreshToken by setting their expiration date to a time in the past
    response.cookies.set("accessToken", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    response.cookies.set("refreshToken", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return response;
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { message: "Logout failed", success: false },
      { status: 500 }
    );
  }
}
