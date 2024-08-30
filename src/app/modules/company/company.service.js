import { generateToken } from "../../../utils/token.js";
import Company from "./company.model.js";

import { generateCompanyId } from "./company.utils.js";

const createCompany = async (companyName, companyData) => {
  const id = await generateCompanyId(companyName);
  const company = {
    ...companyData,
    companyName,
    role: "company",
    companyId: id,
  };

  const newCompany = new Company(company);
  const companySave = await newCompany.save();

  if (!companySave) {
    // throw new ApiError(400, "Failed to create");
    console.log("Failed to Create");
  }
  return companySave;
};

const createCompanyLogin = async (email, password) => {
  if (!email || !password) {
    return res.status(401).json({
      status: "fail",
      message: "Please provide email and password",
    });
  }

  const companyUser = await Company.findOne({ email });

  if (!companyUser) {
    return res.status(401).json({
      status: "fail",
      message: "No account found with this email",
    });
  }

  const isValidPassword = await companyUser.comparePassword(password);
  if (!isValidPassword) {
    return res.status(403).json({
      status: "fail",
      message: "Wrong password",
    });
  }
  const token = generateToken(companyUser);

  const { password: pwd, ...others } = companyUser.toObject();

  return {
    companyUser: others,
    token,
  };
};

const getCompanyUser = async (email) => {
  //console.log(email);
  const companyUser = await Company.findOne({ email });
  const { password: pwd, ...others } = companyUser?.toObject();
  return others;
};
const getAllCompanyUser = async () => {
  //console.log(email);
  const companyUser = await Company.find({});
  // const { password: pwd, ...others } = companyUser?.toObject();
  return companyUser;
};

export const companyService = {
  createCompany,
  createCompanyLogin,
  getCompanyUser,
  getAllCompanyUser,
};
