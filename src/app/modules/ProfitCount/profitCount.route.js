import express from "express";
import { profitController } from "./profitCount.controller.js";

const router = express.Router();

router.get("/", profitController.getAllProfits);
router.route("/:id").patch(profitController.updateProfitCount);
router
  .route("/:userId/user-investment")
  .get(profitController.getUserAllProfits);
router
  .route("/:investmentId/investment")
  .get(profitController.getInvestmentAllProfits);

export const profitRoutes = router;
