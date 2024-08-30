import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const ProfitSchema = new mongoose.Schema(
  {
    projectId: {
      type: ObjectId,
      ref: "Project",
    },
    manageUserId: {
      type: ObjectId,
      ref: "AdminUser",
    },
    investmentId: {
      type: ObjectId,
      ref: "Investment",
    },
    userId: {
      type: ObjectId,
      ref: "User",
    },
    percentageOfProfit: {
      type: Number,
    },

    profitCount: {
      type: Number,
    },
    paymentStatus: {
      type: String,
      enum: ["Paid", "Processing", "Unpaid"],
      default: "Unpaid",
    },
    profitGiveDate: {
      type: Date,
    },
    returnType: {
      type: String,
      enum: ["Monthly", "Half-Yearly", "Yearly"],
    },
    profitGiveMonths: {
      type: String,
    },
    profitGiveYear: {
      type: Number,
    },
    withdrawRQ: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    withdrawRQDate: {
      type: Date,
    },
    paymentMethod: {
      type: String,
    },
    userRQPaymentMethod: {
      type: String,
    },
    chooseBank: {
      type: String,
    },
    proofOfPaidPhoto: {
      type: Array,
    },
    noteForProfit: {
      type: String,
    },
  },
  { timestamps: true }
);

const Profit = mongoose.model("Profit", ProfitSchema);

export default Profit;
