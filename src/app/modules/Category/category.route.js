import express from "express";
import {
  createCategory,
  getCategories,
  updateCategory,
} from "./category.controller.js";

const router = express.Router();

router.post("/", createCategory);
router.get("/", getCategories);
router.route("/:id").patch(updateCategory);
export const categoryRoutes = router;
