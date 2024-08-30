import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const projectSchema = new mongoose.Schema(
  {
    projectTitle: {
      type: String,
    },

   
    description: {
      type: String,
    },
   

    projectType: {
      type: ObjectId,
      ref: "Category",
      // required: true,
    },

   
   
 
   
    projectPicture: {
      type: Array,
    },

   

   
    
   
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;
