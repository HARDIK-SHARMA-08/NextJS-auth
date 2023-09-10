import { connect } from "@/DB Config/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    console.log(reqBody);

    //Checking if user already Exists
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User Already Exists" },
        { status: 400 }
      );
    }

    //Hashing Password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt)


    //Save User in Data Base
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    })

    const savedUser = await newUser.save();
    console.log(savedUser);
    
    return NextResponse.json({
        message: "User Created Successfully",
        success: true,
        savedUser
    })
  } 
  
  catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
