import express from "express";

import { productFile } from "../../../middleware/uploads.js";
import { projectController } from "./project.controller.js";

const router = express.Router();

router.post("/", productFile, projectController.createProject);
router.get("/", projectController.getProject);
router.get("/:id", projectController.getProjectDetails);
router.route("/:id").patch(projectController.updateProject);

export const projectRoutes = router;
