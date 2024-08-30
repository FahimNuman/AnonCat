import jwt from "jsonwebtoken";
import { promisify } from "util"; // Correctly import promisify
import "dotenv/config"; // Ensure dotenv config is loaded

export const verifyToken = async (req, res, next) => {
  try {
    const token = req?.headers?.authorization?.split(" ")?.[1];

    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "Sorry, something is wrong",
      });
    }

    // Correct usage of promisify with jwt.verify
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Invalid token",
      error: error.message,
    });
  }
};
