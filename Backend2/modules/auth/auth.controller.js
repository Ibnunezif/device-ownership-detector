import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../users/user.model.js";

export const register = async (req, res) => {
  const { name, email, password, role, studentId } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
    studentId,
  });

  res.status(201).json({ message: "User registered" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user._1d, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  // This is the line that generates the response you want:
  const { password: _password, ...userWithoutPassword } = user.toObject();

  res.json({ token, user: userWithoutPassword });

};
