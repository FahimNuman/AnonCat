import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;
const ProjectTitleSchema = new mongoose.Schema(
  {
    projectTitle: {
      type: String,
    },
    // projectId: {
    //   type: ObjectId,
    //   ref: "Project",
    // },
    user: [
      {
        type: ObjectId,
        ref: "AdminUser",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("ProjectTitle", ProjectTitleSchema);
