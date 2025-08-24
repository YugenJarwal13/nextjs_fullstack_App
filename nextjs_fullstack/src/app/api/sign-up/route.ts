import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bycrypt from "bcryptjs"

import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request){
    await dbConnect()
    try{
        const {username,email,password}=await request.json()
        const existingUserVerifiedByUsername=UserModel.findOne({
            username,
            isVerified: true
        })
        if(existingUserVerifiedByUsername){
            return Response.json(
                {
                    success: false,
                    message: "Username already taken"
                },{status: 400})
        }

    }catch(error){
        console.log("Error in signing-up user:", error);
        return Response.json(
            {
                success: false,
                message: "Error registering the user"
            },
            {
                status: 500
            }
        )
    }
}