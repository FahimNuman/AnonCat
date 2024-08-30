import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";


const createHealth = catchAsync(async (req, res) => {
  const { ...health } = req.body;
  await healthService.createHealth(health);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Health created successfully!",
  });
});

const getUserHealth = catchAsync(async (req, res) => {
  const healthId = req.params.healthId;
  const healths = await healthService.getUserHealth(healthId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Health  created successfully!",
    data: healths,
  });
});

const getAllHealth = catchAsync(async (req, res) => {
  const healths = await healthService.getAllHealth();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get All Health successfully!",
    data: healths,
  });
});

export const healthController = {
  createHealth,
  getUserHealth,
  getAllHealth,
};
