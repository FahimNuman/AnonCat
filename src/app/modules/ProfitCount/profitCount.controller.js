import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import { profitService } from "./profitCount.service.js";

const getAllProfits = catchAsync(async (req, res) => {
  const profits = await profitService.getAllProfits();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profit get successfully",
    data: profits,
  });
});
const getUserAllProfits = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const profits = await profitService.getUserAllProfits(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profit get successfully",
    data: profits,
  });
});
const getInvestmentAllProfits = catchAsync(async (req, res) => {
  const investmentId = req.params.investmentId;
  const profits = await profitService.getInvestmentAllProfits(investmentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profit get successfully",
    data: profits,
  });
});

const updateProfitCount = catchAsync(async (req, res) => {
  const profitId = req.params.id;
  const updateData = req.body;
  await profitService.updateProfitCount(profitId, updateData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profit count update successfully",
  });
});

export const profitController = {
  getAllProfits,
  updateProfitCount,
  getUserAllProfits,
  getInvestmentAllProfits,
};
