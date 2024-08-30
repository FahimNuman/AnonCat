import Project from "../projects/project.model.js";
import Investment from "./investment.model.js";
import { generateInvestmentId } from "./investment.utils.js";
// Create a investment
const createInvest = async (params) => {
  const { ...investData } = params;

  const investmentId = await generateInvestmentId();
  const invest = new Investment({
    investmentId: investmentId,
    ...investData,
  });
  const result = await invest.save();
  return result;
};

// get last user investment
const getUserLastInvest = async (userId) => {
  const userLastInvestment = await Investment.findOne({ userId }).sort({
    createdAt: -1,
  });
  return userLastInvestment;
};

// get all investment
const getAllInvest = async () => {
  const investments = await Investment.find({})
    .populate("userId projectId")
    .sort({ createdAt: -1 });

  const investmentsTotal = await Investment.aggregate([
    { $match: { status: "Received" } },
    {
      $group: {
        _id: null,
        totalInvestmentAmount: { $sum: "$investmentAmount" },
        totalInvestor: { $sum: 1 },
      },
    },
  ]);

  return {
    investments,
    totalInvestmentAmount: investmentsTotal[0]?.totalInvestmentAmount,
    totalInvestor: investmentsTotal[0]?.totalInvestor,
  };
};

// get all investment
const getUserAllInvest = async (userId) => {
  const investments = await Investment.find({ userId })
    .populate("userId projectId")
    .sort({ createdAt: -1 });

  return investments;
};

// update a single  investment
const updateInvest = async (investId, updateData) => {
  const { status, projectId, buyTotalShare } = updateData;

  // Update the status of the investment
  await Investment.updateOne({ _id: investId }, { $set: { status: status } });

  // Update the project's buyTotalShare
  if (status === "Received") {
    await Project.updateOne(
      { _id: projectId },
      { $inc: { buyTotalShare: buyTotalShare } }
    );
  }
};

export const investmentService = {
  createInvest,
  getUserLastInvest,
  getAllInvest,
  getUserAllInvest,
  updateInvest,
};
