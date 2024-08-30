import express from "express";
import {
  CreateProjectTitle,
  getProjectTitle,
} from "./projectTitle.controller.js";

const router = express.Router();
router.post("/", CreateProjectTitle);
router.get("/", getProjectTitle);

export default router;
