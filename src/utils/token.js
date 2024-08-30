import jwt from "jsonwebtoken";
import "dotenv/config";

export const generateToken = (user) => {
  const payload = {
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "365d",
  });
  return token;
};
