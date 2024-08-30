import bcrypt from "bcrypt";
import User from "./user.model.js";
import "dotenv/config";
import { userService } from "./user.service.js";
import { generateToken } from "../../../utils/token.js";
import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import httpStatus from "http-status";

export const createUser = async (req, res) => {
  try {
    const user = req.body;
    const result = await userService.createUser(user);

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
      message: "Thanks for the account create",
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
        message: "please provide email and password",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "Not Found Any Account!",
      });
    }

    const isValidPassword = user.comparePassword(password, user.password);
    if (!isValidPassword) {
      return res.status(403).json({
        status: "fail",
        message: "Sorry ! Wrong Password",
      });
    }
    const token = generateToken(user);

    const { password: pwd, ...others } = user.toObject();

    res.status(200).json({
      status: "success",
      message: "Thanks For Login",
      data: {
        user: others,
        token,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Sorry Not Found Your Account",
      error: error.message,
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const email = req?.user?.email;
    const user = await User.findOne({ email });
    const { password: pwd, ...others } = user?.toObject();

    res.status(200).json({
      status: "success",
      data: others,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Please Log in",
      error: error.message,
    });
  }
};

export const allUser = async (req, res) => {
  try {
    // const email =  req?.user?.email
    const user = await User.find({});
    //  const {password:pwd2, ...others} = user?.toObject();
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "no user found",
      error: error.message,
    });
  }
};
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        status: "fail",
        message:
          "দুঃখিত ! আমরা এই ইমেইল দিয়ে কোন অ্যাকাউন্ট আমাদের ডাটাবেজে খুঁজে পাইনি, দয়া করে আপনি একাউন্ট করুন !",
      });
    } else {
      const userCode = generateUserCode(user);

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "alaminbamna08@gmail.com",
          pass: "qesfajhmrfhkfnbo",
        },
      });

      const mailOptions = {
        from: "alaminbamna08@gmail.com",
        to: email,
        subject: "Password Reset",
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          return res.status(401).json({
            status: "fail",
            message: " Sorry Something is wrong !",
          });
        } else {
          res.status(200).json({
            status: "Success",
            message: "Please Check Your email!",
          });
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "no user found",
      error: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const email = req?.user?.email;

    const hasPassword = bcrypt.hashSync(password);

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        status: "fail",
        message:
          "দুঃখিত আপনার টোকনের মেয়াদ শেষ! নতুন করে ফরগেট পাসওয়ার্ড এর রিকুয়েস্ট দিন",
      });
    }

    const result = await User.updateOne(
      { email: email },
      {
        $set: {
          password: hasPassword,
        },
      },
      { runValidators: true }
    );
    res.status(200).json({
      status: "success",
      message: "Wow! Your Password Updated",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "no user found",
      error: error.message,
    });
  }
};

export const updateUser = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const updateUserData = req.body;

  await userService.updateUser(userId, updateUserData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully Updated",
  });
});
