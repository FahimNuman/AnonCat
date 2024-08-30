import AdminUser from "./adminUser.model.js";
import { adminUserService } from "./adminUser.service.js";
import { generateToken } from "../../../utils/token.js";

export const createAdminUser = async (req, res) => {
  try {
    const adminUser = req.body;
    const result = await adminUserService.createAdminUser(adminUser);

    if (result.status === "fail") {
      return res.status(401).json({
        status: "fail",
        message: result.message,
      });
    }

    if (result.status === "error") {
      return res.status(400).json({
        status: "error",
        message: result.message,
        error: result.error,
      });
    }

    res.status(200).json({
      status: "success",
      message: "Admin user created successfully!",
      data: result.data,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "An unexpected error occurred",
      error: error.message,
    });
  }
};

export const createLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        status: "fail",
        message: "Please provide email and password",
      });
    }

    const adminUser = await AdminUser.findOne({ email });

    if (!adminUser) {
      return res.status(401).json({
        status: "fail",
        message: "No account found with this email",
      });
    }

    const isValidPassword = await adminUser.comparePassword(password);
    if (!isValidPassword) {
      return res.status(403).json({
        status: "fail",
        message: "Wrong password",
      });
    }
    const token = generateToken(adminUser);

    const { password: pwd, ...others } = adminUser.toObject();

    res.status(200).json({
      status: "success",
      message: "Logged in successfully",
      data: {
        adminUser: others,
        token,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Failed to log in",
      error: error.message,
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const email = req?.user?.email;
    //console.log(email);
    const adminUser = await AdminUser.findOne({ email });
    const { password: pwd, ...others } = adminUser?.toObject();

    res.status(200).json({
      status: "success",
      data: others,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Please log in",
      error: error.message,
    });
  }
};

export const allAdminUser = async (req, res) => {
  try {
    const adminUser = await AdminUser.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      status: "success",
      data: adminUser,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "No admin users found",
      error: error.message,
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    // Your forgot password logic here
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Failed to send password reset email",
      error: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    // Your reset password logic here
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Failed to reset password",
      error: error.message,
    });
  }
};
