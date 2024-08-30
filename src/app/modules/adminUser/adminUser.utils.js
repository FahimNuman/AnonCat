import jwt from "jsonwebtoken";

export const generateAdminUserCode = (adminUser) => {
  const payload = {
    email: adminUser.email,
    role: adminUser.role,
  };

  const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "7days",
  });
  return token;
};
