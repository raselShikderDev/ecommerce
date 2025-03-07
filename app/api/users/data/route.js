import dbConnect from "@/confiig/db";
import userModel from "@/models/userModel";
import {getAuth} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { useId } from "react";

export async function GET(request) {
  try {
    const { userId } = getAuth(request);
    if (!useId) {
        return NextResponse.json({ success: false, message: "Unautorized UserId" });
      }
    await dbConnect();
    const user = await userModel.findById(userId);
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" });
    }
    return NextResponse.json({ success: true, message: "User found", user });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
