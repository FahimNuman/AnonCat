import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import { companyService } from "./company.service.js";
import httpStatus from "http-status";

const createCompany = catchAsync(async (req, res) => {
  const { companyName, ...companyData } = req.body;

  const companySave = await companyService.createCompany(
    companyName,
    companyData
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Company created successfully!",
    data: companySave,
  });
});
const createCompanyLogin = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const loginCompanyUser = await companyService.createCompanyLogin(
    email,
    password
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Logged in successfully!",
    data: {
      companyUser: loginCompanyUser.companyUser,
      token: loginCompanyUser.token,
    },
  });
});

const getCompanyUser = catchAsync(async (req, res) => {
  const email = req?.user?.email;
  const loginUser = await companyService.getCompanyUser(email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "user get success",
    data: loginUser,
  });
});
const getAllCompanyUser = catchAsync(async (req, res) => {
  const allCompanyUser = await companyService.getAllCompanyUser();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "user get success",
    data: allCompanyUser,
  });
});

export const companyController = {
  createCompany,
  createCompanyLogin,
  getCompanyUser,
  getAllCompanyUser,
};
