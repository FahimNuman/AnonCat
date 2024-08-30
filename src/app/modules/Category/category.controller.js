import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import Category from "./category.model.js";

export const createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    const result = await category.save();

    res.status(200).json({
      status: "success",
      message: "Successfully Added",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Sorry ! Some wrong",
      error: error.message,
    });
  }
};
export const updateCategory = catchAsync(async (req, res) => {
  const id = req.params.id;
  const { ...updateData } = req.body;

  await Category.updateOne(
    { _id: id },
    {
      $set: updateData,
    }
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category Updated",
  });
});

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json({
      status: "success",
      message: "data get Success",
      data: categories,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Not Found Data",
      error: error.message,
    });
  }
};
