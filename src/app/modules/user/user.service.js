import User from "./user.model.js";
const createUser = async (user) => {
  try {
    const email = user.email;
    const findUser = await User.findOne({ email });

    if (findUser) {
      return {
        status: "fail",
        message: "Sorry! Already Account Created with this Email",
      };
    }

    const userData = {
      name: user.name,
      email: user.email,
      mobileNumber: user.mobileNumber,
      password: user.password,
      role: user.role,
      status: user.status,
      fathersName: user.fathersName,
      MothersName: user.MothersName,
      BirthDate: user.BirthDate,
      NIDorPassportNo: user.NIDorPassportNo,
      NIDorPassport: user.NIDorPassport,
    };

    const newUser = new User(userData);
    const result = await newUser.save();

    return {
      status: "success",
      message: "User created successfully!",
      data: result,
    };
  } catch (error) {
    return {
      status: "error",
      message: "An error occurred while creating the user.",
      error: error.message,
    };
  }
};
// Get all users
const getAllUsers = async () => {
  try {
    const users = await User.find();
    return {
      status: "success",
      data: users,
    };
  } catch (error) {
    return {
      status: "error",
      message: "An error occurred while fetching users.",
      error: error.message,
    };
  }
};

// Get a user by ID
const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return {
        status: "fail",
        message: "User not found.",
      };
    }
    return {
      status: "success",
      data: user,
    };
  } catch (error) {
    return {
      status: "error",
      message: "An error occurred while fetching the user.",
      error: error.message,
    };
  }
};

// Update a user
const updateUser = async (userId, updateUserData) => {
  const { ...userData } = updateUserData;
  await User.updateOne(
    { _id: userId },
    {
      $set: userData,
    }
  );
};

// const createLogin = async (user) => {
//   try {
//   } catch (error) {}
// };

export const userService = {
  createUser,
  getUserById,
  updateUser,
};
