import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

// Schema Design
const userSchema = mongoose.Schema(
 {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: [true, "This email already exists!"],
      validate: [validator.isEmail, "Provide a valid email"],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      trim: true,
    },
    role: {
      type: String,
      enum: ["Admin", "User", "SuperAdmin"],
      default: "User",
    },
    status: {
      type: String,
      enum: ["active", "inactive", "blocked"],
      default: "active",
    },
    // Personal Information
    fathersName: {
      type: String,
    },
    mothersName: {
      type: String,
    },
    birthDate: {
      type: Date,
    },
    nidOrPassportNo: {
      type: String,
    },
    nidOrPassportPhoto: {
      type: Array, 
    },
    nidOrPassportBacksidePhoto: {
      type: Array, 
    },
    passportSizeImage: {
      type: Array, 
    },
    // Nominee Information
  
      nomineeFullName: {
        type: String,
      },
      nomineeRelation: {
        type: String,
      },
      nomineeFathersName: {
        type: String,
      },
      nomineeMothersName: {
        type: String,
      },
      nomineeBirthDate: {
        type: Date,
      },
      nomineeNidOrPassportNo: {
        type: String,
      },
      nomineeNidOrPassport: {
        type: Array, 
      },
  
    // Address Information
   
      addressline1: {
        type: String,
      },
      addressline2: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      zipCode: {
        type: String,
      },
      country: {
        type: String,
        default: "Bangladesh",
      },
   
  },
  {
    timestamps: true,
  }
);
// Middleware to hash password before saving
userSchema.pre("save", async function (next) {
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
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

// Model
const User = mongoose.model("User", userSchema);

export default User;
