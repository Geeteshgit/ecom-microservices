import { User } from "../models/user.model.js";
import { generateToken } from "../lib/generateToken.js";

export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ firstName, lastName, email, password, role });
    await newUser.save();

    const token = generateToken(newUser);
    return res.status(201).json({ message: "User successfully registered", token });

  } catch (err) {
    console.error("Error Signing Up: ", err);
    return res.status(500).json({ message: "Error registering user" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and Password is required" });
    }

    const user = await User.findOne({ email }).select("+password");    
    if (!user) return res.status(401).json({ message: "Invalid Email" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid Password" });

    const token = generateToken(user);
    res.status(200).json({ message: "Logged in successfully", token });
  } catch (err) {
    console.error("Error Loggin In: ", err);
    return res.status(500).json({ message: "Error logging in" });
  }
};
