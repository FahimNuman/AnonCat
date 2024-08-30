import mongoose from "mongoose";
import bcrypt from "bcrypt";

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      unique: [true, "Company name must be unique"],
    },
    companyOwnerName: {
      type: String,
      required: true,
    },
    companyOwnerEmail: {
      type: String,
      required: true,
    },
    companyOwnerPhoneNumber: {
      type: String,
    },
    designation: {
      type: String,
    },
    companyId: {
      type: String,
      required: true,
      unique: [true, "Company ID must be unique"],
    },
    role: {
      type: String,
      enum: ["company"],
      default: "company",
      required: true,
    },

    businessAddress: {
      type: String,
    },

    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // Company Validation
    tinNumber: {
      type: String,
    },
    tradeLicenceNumber: {
      type: String,
    },
    binNumber: {
      type: String,
    },
    // Bank Details
    bankName: {
      type: String,
    },
    accountHolderName: {
      type: String,
    },
    accountNumber: {
      type: Number,
    },
    accountType: {
      type: String,
    },
    // Attachment
    incorporationCertificate: {
      type: Array,
    },
    tradeLicense: {
      type: Array,
    },
    binCertificate: {
      type: Array,
    },
    tinCertificate: {
      type: Array,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Middleware to hash password before saving
companySchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(9);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

// Method to compare passwords
companySchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const Company = mongoose.model("Company", companySchema);

export default Company;
