import mongoose from "mongoose";
import Investment from "../investment/investment.model.js";
import Profit from "./profitCount.model.js";

const getAllProfits = async () => {
  const profits = await Profit.find({})
    .populate([
      { path: "projectId", select: "projectTitle" },
      { path: "manageUserId", select: "name" },
      {
        path: "investmentId",
        select: "_id investmentAmount",
      },
      {
        path: "userId",
        select: "name",
      },
    ])
    .sort({ createdAt: -1 });

  return profits;
};
const getUserAllProfits = async (userId) => {
  const profits = await Profit.find({ userId })
    .populate([
      { path: "projectId", select: "projectTitle" },
      { path: "manageUserId", select: "name" },
      {
        path: "investmentId",
        select: "_id investmentAmount",
      },
      {
        path: "userId",
        select: "_id name",
      },
    ])
    .sort({ createdAt: -1 });
  return profits;
};
const getInvestmentAllProfits = async (investmentId) => {
  const profits = await Profit.find({ investmentId })
    .populate([
      { path: "projectId", select: "projectTitle" },
      { path: "manageUserId", select: "name" },
      {
        path: "investmentId",
        select: "_id investmentAmount",
      },
      {
        path: "userId",
        select: "_id name",
      },
    ])
    .sort({ createdAt: -1 });
  return profits;
};

// Update Profit Count
const updateProfitCount = async (profitId, updateData) => {
  const { paymentStatus } = updateData;

  if (paymentStatus === "Paid") {
    const findThisProfit = await Profit.findOne({ _id: profitId });

    const investmentId = findThisProfit.investmentId;

    const investments = await Investment.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(investmentId) } },
      {
        $set: {
          totalPaidProfitAmount: {
            $add: [
              { $ifNull: ["$totalPaidProfitAmount", 0] },

              findThisProfit.profitCount,
            ],
          },
          totalDueProfitAmount: {
            $subtract: [
              { $ifNull: ["$totalDueProfitAmount", 0] },
              findThisProfit.profitCount,
            ],
          },
        },
      },

      {
        $project: {
          _id: 1,
          totalPaidProfitAmount: 1,
          totalDueProfitAmount: 1,
        },
      },
    ]);

    // Update This Investment
    if (investments?.length > 0) {
      const investment = investments[0];
      await Investment.updateOne(
        { _id: investment?._id },
        {
          $set: {
            totalPaidProfitAmount: investment?.totalPaidProfitAmount,
            totalDueProfitAmount: investment?.totalDueProfitAmount,
          },
        }
      );
    }
  }

  //Status Update
  await Profit.updateOne(
    {
      _id: profitId,
    },
    {
      $set: updateData,
    }
  );
};

export const profitService = {
  getAllProfits,
  updateProfitCount,
  getUserAllProfits,
  getInvestmentAllProfits,
};
