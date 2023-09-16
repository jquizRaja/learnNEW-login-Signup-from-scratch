import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcrypt';

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    console.log(reqBody);
    //Check if user already exists
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User Already Registered with These Credentials" },
        { status: 400 }
      );
    }
    //hash password
    const salt = await bcryptjs.genSalt(12);
    const hasshedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hasshedPassword,
    });
    const savedUser = await newUser.save();
    console.log(savedUser);

    return NextResponse.json({
      message: "User Created Successfully✅👤✅🎈🎈🎈🎆👍",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
