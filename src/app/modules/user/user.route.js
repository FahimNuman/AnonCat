import express from "express";
import {
  allUser,
  createLogin,
  createUser,
  forgotPassword,
  getMe,
  resetPassword,
  updateUser,
} from "./user.controller.js";
import { verifyToken } from "../../../middleware/verifyToken.js";

const router = express.Router();

router.route("/").get(allUser);

router.route("/signup").post(createUser);

router.route("/login").post(createLogin);
router.route("/forgot").post(forgotPassword);

router.route("/me").get(verifyToken, getMe);
router.route("/password-reset").patch(verifyToken, resetPassword);
router.route("/:userId").patch(updateUser);

export default router;
