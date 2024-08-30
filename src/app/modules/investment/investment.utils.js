import Investment from "./investment.model.js";

const findLastInvestmentId = async () => {
  const lastInvestment = await Investment.findOne(
    {},
    { investmentId: 1, _id: 0 }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastInvestment?.investmentId;
};

export const generateInvestmentId = async () => {
  const date = new Date();
  const year = date.getFullYear().toString().substring(2, 4);

  let previousId = await findLastInvestmentId();
  let currentYear = year;

  if (previousId && previousId.startsWith(currentYear)) {
    let convertNumberPreviousId = previousId.slice(2);
    let incrementedId = (parseInt(convertNumberPreviousId) + 1)
      .toString()
      .padStart(4, "0");
    return currentYear + incrementedId;
  } else {
    // Reset to "0001" for the new year
    return currentYear + "0001";
  }
};
