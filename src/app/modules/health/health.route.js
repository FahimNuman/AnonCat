import express from "express";
import { healthController } from "./health.controller.js";

const router = express.Router();

router.post("/", healthController.createHealth);

// router.route("/:id").patch(profitController.updateProfitCount);
router.route("/:healthId").get(healthController.getUserHealth);
router.route("/").get(healthController.getAllHealth);

export const healthRoutes = router;
