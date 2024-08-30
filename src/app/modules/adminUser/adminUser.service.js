import AdminUser from "./adminUser.model.js";

const createAdminUser = async (adminUser) => {
  try {
    const email = adminUser.email;
    const findUser = await AdminUser.findOne({ email });

    if (findUser) {
      return {
        status: "fail",
        message: "Sorry! An account already exists with this email",
      };
    }

    const adminUserData = {
      name: adminUser.name,
      email: adminUser.email,
      gender: adminUser.gender,
      phone: adminUser.phone,
      role: adminUser.role,
      address: adminUser.address,
      projectId: adminUser.projectId,
      password: adminUser.password,
      companyId: adminUser?.companyId,
    };

    const newAdminUser = new AdminUser(adminUserData);
    const result = await newAdminUser.save();

    return {
      status: "success",
      message: "Admin user created successfully!",
      data: result,
    };
  } catch (error) {
    return {
      status: "error",
      message: "An error occurred while creating the admin user.",
      error: error.message,
    };
  }
};

// const createLogin = async (adminUser) => {
//   try {
//     // Add your login logic here
//   } catch (error) {
//     // Handle errors
//   }
// };

export const adminUserService = {
  createAdminUser,
};
