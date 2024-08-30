import express from "express";
import { companyRoutes } from "../modules/company/company.route.js";
import { projectRoutes } from "../modules/projects/project.route.js";
import { returnRoutes } from "../modules/return/return.route.js";
import { profitRoutes } from "../modules/ProfitCount/profitCount.route.js";
import { investmentRoutes } from "../modules/investment/investment.route.js";
import { categoryRoutes } from "../modules/Category/category.route.js";
import { bankAccountRoutes } from "../modules/bankAccount/bankAccount.route.js";
import { healthRoutes } from "../modules/health/health.route.js";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/company",
    route: companyRoutes,
  },
  {
    path: "/project",
    route: projectRoutes,
  },
  {
    path: "/return",
    route: returnRoutes,
  },
  {
    path: "/profit-count",
    route: profitRoutes,
  },
  {
    path: "/investment",
    route: investmentRoutes,
  },
  {
    path: "/category",
    route: categoryRoutes,
  },
  {
    path: "/bank-account",
    route: bankAccountRoutes,
  },
  {
    path: "/health",
    route: healthRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
