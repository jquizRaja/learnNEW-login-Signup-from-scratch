import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcrypt";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    //Check user
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User DoesNot Exits" },
        { status: 400 }
      );
    }
    //if password is correct
    const ValidPassword = await bcryptjs.compare(password, user.password);
    if (!ValidPassword) {
      return NextResponse.json(
        { error: "Invalid Credentials📧🔑🔑❌❌☠️❌" },
        { status: 401 }
      );
    }
    //create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    //create token
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login Successfully",
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
