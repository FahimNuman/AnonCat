import { investmentService } from "./investment.service.js";
import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import httpStatus from "http-status";

const createInvest = catchAsync(async (req, res) => {
  const investData = req.body;
  const result = await investmentService.createInvest(investData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Thanks For Your Investment",
    data: result,
  });
});

const getUserLastInvest = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const userLastInvestment = await investmentService.getUserLastInvest(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Data Get Success",
    data: userLastInvestment,
  });
});

const getAllInvest = catchAsync(async (req, res) => {
  const investments = await investmentService.getAllInvest();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Data Get Success",
    data: {
      investments: investments.investments,
      totalInvestmentAmount: investments.totalInvestmentAmount,
      totalInvestor: investments.totalInvestor,
    },
  });
});

const getUserAllInvest = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const investments = await investmentService.getUserAllInvest(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Data Get Success",
    data: investments,
  });
});

const updateInvest = catchAsync(async (req, res) => {
  const investId = req.params.id;
  const updateData = req.body;
  await investmentService.updateInvest(investId, updateData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Data Updated",
  });
});

export const investmentController = {
  createInvest,
  getUserLastInvest,
  getAllInvest,
  getUserAllInvest,
  updateInvest,
};
