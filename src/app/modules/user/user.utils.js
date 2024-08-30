import jwt from "jsonwebtoken";

export const generateUserCode = (user) => {
  const payload = {
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "7days",
  });
  return token;
};
