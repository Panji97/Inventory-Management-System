const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");

exports.getAllUser = catchAsync(async (req, res, next) => {
  const user = await User.find();

  res.status(200).render("user/all-user", { user });
});

exports.editUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).render("user/edit-User", { user });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  await User.findById(req.params.id, req.body);

  res.status(200).redirect("/user-all");
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(200).redirect("/user-all");
});
