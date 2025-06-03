import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import User from "../models/user";
import verifyToken from "../middleware/auth";
import { authAttempts } from "../metrics";

const router = express.Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password (min 6 characters)
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   description: User ID
 *       400:
 *         description: Invalid credentials or validation error
 *       500:
 *         description: Server error
 */
router.post("/login", [check("email", "Email is required").isEmail(),
  check("password", "Password with 6 or more characters is required").isLength({ min: 6 }),
], async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    authAttempts.inc({ type: 'login', status: 'validation_failed' });
    return res.status(400).json({ message: errors.array() });
  }
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      authAttempts.inc({ type: 'login', status: 'user_not_found' });
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      authAttempts.inc({ type: 'login', status: 'invalid_password' });
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY as string, {
      expiresIn: "1d",
    });
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    });
    
    authAttempts.inc({ type: 'login', status: 'success' });
    return res.status(200).json({ userId: user._id });
  }
  catch (error) {
    console.error("Login error:", error);
    authAttempts.inc({ type: 'login', status: 'error' });
    return res.status(500).json({ message: "Something went wrong" });
  }
});

/**
 * @swagger
 * /api/auth/validate-token:
 *   get:
 *     summary: Validate user token
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token is valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   description: User ID
 *       401:
 *         description: Unauthorized, invalid or expired token
 */
router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
  return res.status(200).send({ userId: req.userId });
});

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout a user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.post("/logout", (_req: Request, res: Response) => {
  res.cookie("auth_token", "", {
    expires: new Date(0),
  });
  return res.send();
});

export default router;