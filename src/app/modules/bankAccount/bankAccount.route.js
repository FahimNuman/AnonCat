import express from "express";
import { bankAccountController } from "./bankAccount.controller.js";

const router = express.Router();

router.post("/", bankAccountController.createBankAccount);
// router.route("/:id").patch(profitController.updateProfitCount);
router.route("/:userId").get(bankAccountController.getUserBankAccount);

export const bankAccountRoutes = router;
