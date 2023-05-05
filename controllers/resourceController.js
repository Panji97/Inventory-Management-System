const Resource = require("../models/resource");
const catchAsync = require("../utils/catchAsync");

exports.getAllResource = catchAsync(async (req, res, next) => {
  const resource = await Resource.find();
  const alertMessage = req.flash("alertMessage");
  const alertStatus = req.flash("alertStatus");
  const alert = { message: alertMessage, status: alertStatus };

  res.status(200).render("resource/all-Resource", { resource, alert });
});

exports.addResource = catchAsync(async (req, res, next) => {
  res.render("resource/add-Resource");
});

exports.createResource = catchAsync(async (req, res, next) => {
  await Resource.create(req.body);
  req.flash("alertMessage", "Success Add Resource");
  req.flash("alertStatus", "success");

  res.status(201).redirect("resource-all");
});

exports.editResource = catchAsync(async (req, res, next) => {
  const resource = await Resource.findById(req.params.id);

  res.status(200).render("resource/edit-Resource", { resource });
});

exports.updateResource = catchAsync(async (req, res, next) => {
  await Resource.findByIdAndUpdate(req.params.id, req.body);
  req.flash("alertMessage", "Success Update Resource");
  req.flash("alertStatus", "success");

  res.status(200).redirect("resource-all");
});

exports.deleteResource = catchAsync(async (req, res, next) => {
  await Resource.findByIdAndDelete(req.params.id);
  req.flash("alertMessage", "Success Delete Resource");
  req.flash("alertStatus", "success");

  res.status(200).redirect("resource-all");
});
