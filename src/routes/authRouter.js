import express from "express"
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
export const authRoute = express.Router()

authRoute.post("/login", async (req, res) => {

  const { email, password } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email" })
  }

  try {
    const userExists = await User.findOne({ email })
    if (!userExists) {
      return res.status(400).json({ message: 'Invalid Credentials' })
    }
    console.log(userExists);




    // Verifying password

    const isPasswordValid = await bcrypt.compare(password, userExists.password)
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }


    // Generating JWT token
    const token = jwt.sign({ userId: userExists._id }, process.env.JWT_SECRET, { expiresIn: '24h' })

    res.json({ token });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }


})

//register

authRoute.post("/register", async (req, res) => {
  const { name, email, password, } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email" })
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hasing password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creating new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

