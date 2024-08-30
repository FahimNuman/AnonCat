import ProjectTitle from "./projectTitle.model.js";

export const CreateProjectTitle = async (req, res, next) => {
  try {
    const newProjectTitle = new ProjectTitle(req.body);
    const projectTitle = await newProjectTitle.save();
    res.status(200).json(projectTitle);
  } catch (err) {
    next(err);
  }
};

export const getProjectTitle = async (req, res, next) => {
  try {
    const projectTitles = await ProjectTitle.find({});
    res.status(200).json({
      status: "success",
      message: "Project Title Get successfully",
      projectTitles,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to Get Projects Title",
      error: error.message,
    });
  }
};
