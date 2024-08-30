import mongoose from "mongoose";
import bcrypt from "bcrypt";
const { ObjectId } = mongoose.Schema.Types;

// Schema Design
const adminUserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },

    companyId: {
      type: ObjectId,
      ref: "Company",
    },

    refferCode: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      // required: true,
    },
    role: {
      type: String,
      enum: ["superAdmin", "admin", "PR Manager", "company"],
      default: "admin",
      required: true,
    },

    userStatus: {
      type: String,
      enum: ["Active", "Deactive", "Blocked"],
      default: "Active",
    },
  },
  { timestamps: true }
);

// Middleware to hash password before saving
adminUserSchema.pre("save", async function (next) {
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
adminUserSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

// Model
const AdminUser = mongoose.model("AdminUser", adminUserSchema);

export default AdminUser;
