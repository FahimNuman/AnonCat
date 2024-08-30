import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const healthSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please Provide title "],
      trim: true,
      unique: true,
    },
    file: {
      type: Array,
      //required: true,
    },
   
    description: {
      type: String,
    },
    userId: {
      type: ObjectId,
      ref: "User",
      //required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Health = mongoose.model("Health", healthSchema);

export default Health;
