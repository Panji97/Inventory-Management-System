const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");

exports.getAllUser = catchAsync(async (req, res, next) => {
  const user = await User.find();

  res.status(200).render("user/all-user", { user });
});
