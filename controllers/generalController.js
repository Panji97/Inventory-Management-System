const Unit = require("../models/unit");
const Resource = require("../models/resource");
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");

exports.dahsboardView = catchAsync(async (req, res, next) => {
  const resource = await Resource.find();
  const unit = await Unit.find();
  const dgeAsset = await Unit.where({
    unit_asset_status: "DGE",
  }).count();
  const personalAsset = await Unit.where({
    unit_asset_status: "Personal",
  }).count();

  res.render("index", { resource, unit, dgeAsset, personalAsset });
});

exports.profile = catchAsync(async (req, res, next) => {
  res.render("user/profile");
});
