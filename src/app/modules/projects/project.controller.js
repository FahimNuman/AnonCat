import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";

import { projectService } from "./project.service.js";

const createProject = catchAsync(async (req, res) => {
  const { timelines, googleDriveLinks, ...projectData } = req.body;

  const parseJsonArray = (str) =>
    str.split("},").map((item, index, array) => {
      const objectString = index < array.length - 1 ? item + "}" : item;
      return JSON.parse(objectString);
    });

  const parsedTimelines = timelines ? parseJsonArray(timelines) : [];
  const parsedGoogleDriveLinks = googleDriveLinks
    ? parseJsonArray(googleDriveLinks)
    : [];

  const projectUpload = await projectService.createProject(
    projectData,
    parsedTimelines,
    parsedGoogleDriveLinks,
    req.files
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project Upload Successfully",
    data: projectUpload,
  });
});

const getProject = catchAsync(async (req, res) => {
  const projects = await projectService.getProject();
  // if (!projects) {
  //   return sendResponse(res, {
  //     statusCode: httpStatus.NOT_FOUND,
  //     success: false,
  //     message: "No Project Found",
  //   });
  // }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project Get successfully",
    data: projects,
  });
});

const getProjectDetails = catchAsync(async (req, res) => {
  const id = req?.params?.id;
  const project = await projectService.getProjectDetails(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project Get successfully",
    data: project,
  });
});

const updateProject = catchAsync(async (req, res) => {
  const projectId = req?.params?.id;
  const projectData = req.body;
  await projectService.updateProject(projectId, projectData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project Update successfully",
  });
});

export const projectController = {
  createProject,
  getProject,
  getProjectDetails,
  updateProject,
};
