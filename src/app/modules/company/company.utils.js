import Company from "./company.model.js";

const findLastCompanyId = async () => {
  const lastCompany = await Company.findOne({}, { companyId: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastCompany?.companyId;
};

export const generateCompanyId = async (companyName) => {
  let previousId = await findLastCompanyId();
  let convertNumberPreviousId = previousId
    ? previousId.slice(2)
    : (0).toString().padStart(4, "0");

  // Increment by 1
  let incrementedId = (parseInt(convertNumberPreviousId) + 1)
    .toString()
    .padStart(4, "0");
  incrementedId = companyName?.substring(0, 2).toLowerCase() + incrementedId;

  return incrementedId;
};
