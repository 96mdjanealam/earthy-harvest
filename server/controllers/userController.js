import User from "../models/User.js";
import bcrypt from "bcryptjs"

// Register User: /api/user/register
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "missing details" });
    }

    const existingUser = await User.findOne({email})

    if(existingUser){
        return res.json({success:false, message:"User already exists"})
    }

    const hashedPassword = await bcrypt

  } catch (error) {}
};
