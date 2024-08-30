import express from "express";
import { investmentController } from "./investment.controller.js";

const router = express.Router();
router.route("/:userId/all").get(investmentController.getUserAllInvest);
router.route("/:userId/last").get(investmentController.getUserLastInvest);
router.route("/:id").patch(investmentController.updateInvest);
router.post("/", investmentController.createInvest);
router.get("/", investmentController.getAllInvest);

export const investmentRoutes = router;
