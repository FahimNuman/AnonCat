import BankAccount from "./bankAccount.model.js";

const createBankAccount = async (bankAccount) => {
  const bankAccountData = {
    ...bankAccount,
  };
  const newBankAccount = new BankAccount(bankAccountData);
  await newBankAccount.save();
};
const getUserBankAccount = async (userId) => {
  const bankAccounts = await BankAccount.find({ userId });
  return bankAccounts;
};

export const bankAccountService = {
  createBankAccount,
  getUserBankAccount,
};
