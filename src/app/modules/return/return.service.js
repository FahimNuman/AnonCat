import mongoose from "mongoose";
import Invest from "../investment/investment.model.js";
import Return from "./return.model.js";
import Profit from "../ProfitCount/profitCount.model.js";

const createReturn = async (returnsData) => {
  const {
    returnType,
    projectId,
    totalProfitCount,
    percentageOfProfit,
    returnMonths,
    returnYear,
    ...returnData
  } = returnsData;

  const matchStage = {
    projectId: mongoose.Types.ObjectId(projectId),
    returnType: returnType,
    status: "Received",
  };
  // find project Id & return type matched  Investment Data
  const pipeline = [
    { $match: matchStage },

    {
      $group: {
        _id: null,
        totalInvestmentAmount: { $sum: "$investmentAmount" },
        totalInvestor: { $sum: 1 },
      },
    },

    {
      $project: {
        totalInvestmentAmount: 1,
        totalInvestor: 1,
      },
    },
  ];

  const investments = await Invest.aggregate(pipeline);

  const totalProfitCounts =
    (investments[0]?.totalInvestmentAmount * percentageOfProfit) / 100;

  // Check already submitted Return Start

  const matchedData = {
    projectId: mongoose.Types.ObjectId(projectId),
    returnType: returnType,
    returnMonths: returnMonths,
    returnYear: returnYear,
  };
  const findThisReturn = await Return.aggregate([
    { $match: matchedData },
    {
      $project: {
        _id: 1,
      },
    },
  ]);

  if (findThisReturn?.length > 0) {
    throw new Error("Sorry ! Already This month return Submitted");
  }
  // Check already submitted Return End

  // Create New Return
  const newReturn = new Return({
    returnType,
    returnMonths,
    returnYear,
    projectId,
    percentageOfProfit,
    totalInvestor: investments[0]?.totalInvestor,
    totalInvestAmount: investments[0]?.totalInvestmentAmount,
    totalProfitCount: totalProfitCounts,
    ...returnData,
  });

  // Save new Return
  const createReturn = await newReturn.save();
  return createReturn;
};

const getAllReturn = async () => {
  const returnsData = await Return.find({})
    .populate("projectId manageUserId")
    .sort({ createdAt: -1 });

  return returnsData;
};

// Update Return
const updateReturn = async (returnId, updateData) => {
  const status = updateData.acceptableStatus;

  if (status) {
    if (status === "Approved") {
      const findThisReturn = await Return.findOne({ _id: returnId });

      if (!findThisReturn) {
        throw new Error("Return not found");
      }

      const matchStage = {
        projectId: mongoose.Types.ObjectId(findThisReturn.projectId),
        returnType: findThisReturn.returnType,
      };

      const percentageOfProfit = findThisReturn.percentageOfProfit;

      const investments = await Invest.aggregate([
        { $match: matchStage },
        {
          $set: {
            totalProfitAmount: {
              $add: [
                { $ifNull: ["$totalProfitAmount", 0] },
                {
                  $multiply: [
                    { $ifNull: ["$investmentAmount", 0] },
                    percentageOfProfit / 100,
                  ],
                },
              ],
            },
          },
        },
      ]);

      const updateFindInvestments = investments.map((doc) => ({
        updateOne: {
          filter: { _id: doc._id },
          update: {
            $set: {
              totalProfitAmount: doc.totalProfitAmount,
              totalDueProfitAmount:
                doc.totalProfitAmount - (doc.totalPaidProfitAmount || 0),
            },
          },
        },
      }));

      if (updateFindInvestments.length > 0) {
        await Invest.bulkWrite(updateFindInvestments);

        // Create Profit Count Every Matched Investor
        for (let index = 0; index < investments.length; index++) {
          const investment = investments[index];

          const newProfitData = {
            projectId: investment.projectId,
            manageUserId: findThisReturn.manageUserId,
            percentageOfProfit: percentageOfProfit,
            totalInvestAmount: investment.investmentAmount,
            profitCount:
              (investment.investmentAmount * percentageOfProfit) / 100,
            returnType: findThisReturn.returnType,
            profitGiveMonths: findThisReturn.returnMonths,
            profitGiveYear: findThisReturn.returnYear,
            investmentId: investment._id,
            userId: investment.userId,
          };

          const newProfit = new Profit(newProfitData);
          await newProfit.save();
        }
      }

      await Return.updateOne({ _id: returnId }, { $set: updateData });
    } else {
      await Return.updateOne({ _id: returnId }, { $set: updateData });
    }
  } else {
    const {
      returnType,
      projectId,
      totalProfitCount,
      percentageOfProfit,
      ...returnData
    } = updateData;

    const matchStage = {
      projectId: mongoose.Types.ObjectId(projectId),
      returnType: returnType,
    };
    // find project Id & return type matched  Investment Data
    const pipeline = [
      { $match: matchStage },

      {
        $group: {
          _id: null,
          totalInvestmentAmount: { $sum: "$investmentAmount" },
          totalInvestor: { $sum: 1 },
        },
      },

      {
        $project: {
          totalInvestmentAmount: 1,
          totalInvestor: 1,
        },
      },
    ];

    const investments = await Invest.aggregate(pipeline);

    const totalProfitCounts =
      (investments[0].totalInvestmentAmount * percentageOfProfit) / 100;

    const updatedReturn = {
      returnType,
      projectId,
      percentageOfProfit,
      totalInvestor: investments[0].totalInvestor,
      totalInvestAmount: investments[0].totalInvestmentAmount,
      totalProfitCount: totalProfitCounts,
      ...returnData,
    };

    await Return.updateOne({ _id: returnId }, { $set: updatedReturn });
  }
};

const deleteReturn = async (returnId) => {
  await Return.deleteOne({ _id: returnId });
};

export const returnService = {
  createReturn,
  getAllReturn,
  updateReturn,
  deleteReturn,
};
