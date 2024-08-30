import express from "express";
import { returnController } from "./return.controller.js";

const router = express.Router();
router.post("/", returnController.createReturn);
router.get("/", returnController.getAllReturn);
router.route("/:id").patch(returnController.updateReturn);
router.route("/:id").delete(returnController.deleteReturn);

export const returnRoutes = router;
