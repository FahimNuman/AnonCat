import catchAsync from "../../../shared/catchAsync.js";
import { returnService } from "./return.service.js";
import sendResponse from "../../../shared/sendResponse.js";
import httpStatus from "http-status";

const createReturn = catchAsync(async (req, res) => {
  const returnsData = req.body;

  const newReturn = await returnService.createReturn(returnsData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Return Request Submitted",
    data: newReturn,
  });
});

const getAllReturn = catchAsync(async (req, res) => {
  const returnsData = await returnService.getAllReturn();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Return get successfully",
    data: returnsData,
  });
});

const updateReturn = catchAsync(async (req, res) => {
  const returnId = req.params.id;
  const updateData = req.body;
  await returnService.updateReturn(returnId, updateData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Updated",
  });
});
const deleteReturn = catchAsync(async (req, res) => {
  const returnId = req.params.id;

  await returnService.deleteReturn(returnId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Deleted",
  });
});

export const returnController = {
  createReturn,
  getAllReturn,
  updateReturn,
  deleteReturn,
};
