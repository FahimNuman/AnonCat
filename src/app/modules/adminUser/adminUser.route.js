import express from "express";

import { verifyToken } from "../../../middleware/verifyToken.js";
import {
  allAdminUser,
  createAdminUser,
  createLogin,
  forgotPassword,
  getMe,
  resetPassword,
} from "./admin-User.controller.js";

const router = express.Router();

router.route("/").get(allAdminUser);

router.route("/create-admin-user").post(createAdminUser);

router.route("/login").post(createLogin);
router.route("/forgot").post(forgotPassword);

router.route("/me").get(verifyToken, getMe);
router.route("/password-reset").patch(verifyToken, resetPassword);

export default router;
