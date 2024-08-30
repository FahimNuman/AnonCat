import Return from "../return/return.model.js";
import Project from "./project.model.js";

const createProject = async (
  projectData,
  parsedTimelines,
  parsedGoogleDriveLinks,
  files
) => {
  const project = new Project({
    ...projectData,
    projectPdf: files?.pdf?.map((pdf) => pdf?.path),
    timelines: parsedTimelines,
    googleDriveLinks: parsedGoogleDriveLinks,
  });

  const projectUpload = await project.save();
  return projectUpload;
};

const getProject = async () => {
  const projects = await Project.find({}).populate("projectType");
  return projects;
};

const getProjectDetails = async (id) => {
  const project = await Project.findOne({ _id: id }).populate("projectType");

  return project;
};

const updateProject = async (projectId, projectData) => {
  const { status, prManager } = projectData;
  await Project.updateOne(
    { _id: projectId },
    {
      $set: {
        status: status,
      },
      $push: {
        prManagers: prManager,
      },
    }
  );
};

export const projectService = {
  createProject,
  getProject,
  getProjectDetails,
  updateProject,
};
