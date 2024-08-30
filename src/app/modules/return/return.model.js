import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const returnSchema = new mongoose.Schema(
  {
    projectId: {
      type: ObjectId,
      ref: "Project",
    },
    manageUserId: {
      type: ObjectId,
      ref: "AdminUser",
    },

    percentageOfProfit: {
      type: Number,
    },
    totalInvestAmount: {
      type: Number,
    },
    totalInvestor: {
      type: Number,
    },
    totalHalfYearlyInvestor: {
      type: String,
    },
    totalYearlyInvestor: {
      type: String,
    },
    totalProfitCount: {
      type: Number,
    },
    acceptableStatus: {
      type: String,
      enum: ["Pending", "Processing", "Completed"],
      default: "Pending",
    },
    returnDate: {
      type: Date,
    },
    returnType: {
      type: String,
      enum: ["Monthly", "Half Yearly", "Yearly"],
    },
    returnMonths: {
      type: String,
    },
    returnYear: {
      type: Number,
    },
    noteForReturn: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Return", returnSchema);
