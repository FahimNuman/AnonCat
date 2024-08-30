import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const bankAccountSchema = mongoose.Schema(
  {
    bankName: {
      type: String,
      required: [true, "Please Provide Bank Name"],
      trim: true,
      unique: true,
    },
    accountHolderName: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: Number,
      required: true,
      trim: true,
      unique: true,
    },
    accountType: {
      type: String,
    },
    branchName: {
      type: String,
    },
    routingNumber: {
      type: String,
    },
    userId: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const BankAccount = mongoose.model("BankAccount", bankAccountSchema);

export default BankAccount;
