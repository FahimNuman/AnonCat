import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const investmentSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
    },
    projectInfo: {
      type: Object,
    },
    projectId: {
      type: ObjectId,
      ref: "Project",
    },
    investmentId: {
      type: String,
      require: true,
    },
    investmentAmount: {
      type: Number,
    },
    totalBuyShare: {
      type: Number,
    },
    minimumShare: {
      type: Number,
    },

    paymentFee: {
      type: Number,
    },

    returnType: {
      type: String,
    },
    durationOfInvest: {
      type: String,
    },
    paymentMethod: {
      type: String,
    },
    notaryFee: {
      type: Number,
    },
    sharikanaFee: {
      type: Number,
    },
    InvestorPhoto: {
      type: Array,
    },
    proofOfInvestPhoto: {
      type: Array,
    },
    investorNid: {
      type: Array,
    },
    nomineePhoto: {
      type: Array,
    },
    nomineeNid: {
      type: Array,
    },

    percentOfReturn: {
      type: Number,
    },

    totalProfitAmount: {
      type: Number,
      default: 0,
    },
    totalPaidProfitAmount: {
      type: Number,
      default: 0,
    },
    totalDueProfitAmount: {
      type: Number,
      default: 0,
    },
    totalProfitOfPercentage: {
      type: Number,
      default: 0,
    },
    investmentStartDate: {
      type: Date,
    },
    firstReturnDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Received", "Canceled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);
const Investment = mongoose.model("Investment", investmentSchema);
export default Investment;
