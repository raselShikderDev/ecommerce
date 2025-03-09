import dbConnect from "@/confiig/db";
import userModel from "@/models/userModel";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
export async function GET(request) {
  try {
    const { userId } = getAuth(request);
    console.log("Clerk UserID :", userId);
    if (!userId) {
      console.error("No userId found from Clerk Authentication.");
      return NextResponse.json({
        success: false,
        message: "Unautorized UserId",
      });
    }
    await dbConnect();

    const user = await userModel.findOne({ clerkId: userId });
    console.log("user from mongodb :", user);
    if (!user) {
      console.error(" No user in mongodb based on user id of clerk");
      return NextResponse.json({ success: false, message: "User not found" });
    }
    return NextResponse.json({ success: true, message: "User found", user });
  } catch (error) {
    console.error(" API error :", error.message);
    return NextResponse.json({ success: false, message: error.message });
  }
}
