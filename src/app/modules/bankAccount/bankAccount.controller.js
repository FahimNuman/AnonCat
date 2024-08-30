import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import { bankAccountService } from "./bankAccount.service.js";

const createBankAccount = catchAsync(async (req, res) => {
  const { ...bankAccount } = req.body;
  await bankAccountService.createBankAccount(bankAccount);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bank Account created successfully!",
  });
});
const getUserBankAccount = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const bankAccounts = await bankAccountService.getUserBankAccount(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bank Account created successfully!",
    data: bankAccounts,
  });
});

export const bankAccountController = {
  createBankAccount,
  getUserBankAccount,
};
