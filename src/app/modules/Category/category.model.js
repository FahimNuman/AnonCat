import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const categorySchema = mongoose.Schema(
  {
    project: [
      {
        type: ObjectId,
        ref: "Project",
      },
    ],
    name: {
      type: String,
      required: [true, "Please Provide Category Name"],
      trim: true,
      // unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
