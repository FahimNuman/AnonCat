import express from "express";
import { companyController } from "./company.controller.js";
import { verifyToken } from "../../../middleware/verifyToken.js";

const router = express.Router();

router.post("/", companyController.createCompany);
router.get("/", companyController.getAllCompanyUser);
router.route("/login").post(companyController.createCompanyLogin);
router
  .route("/company-user")
  .get(verifyToken, companyController.getCompanyUser);

export const companyRoutes = router;
