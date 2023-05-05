const Unit = require("../models/unit");
const Supplier = require("../models/supplier");
const Resource = require("../models/resource");
const catchAsync = require("../utils/catchAsync");

exports.getAllUnit = catchAsync(async (req, res, next) => {
  const unit = await Unit.find();
  const alertMessage = req.flash("alertMessage");
  const alertStatus = req.flash("alertStatus");
  const alert = { message: alertMessage, status: alertStatus };

  res.status(200).render("unit/all-unit", { unit, alert });
});

exports.addUnit = catchAsync(async (req, res, next) => {
  const supplier = await Supplier.find();
  const resource = await Resource.find();

  res.render("unit/add-unit", { supplier, resource });
});

exports.createUnit = catchAsync(async (req, res, next) => {
  await Unit.create(req.body);
  req.flash("alertMessage", "Success Add Unit");
  req.flash("alertStatus", "success");

  res.status(201).redirect("unit-all");
});

exports.editUnit = catchAsync(async (req, res, next) => {
  const unit = await Unit.findById(req.params.id);
  const supplier = await Supplier.find();
  const resource = await Resource.find();

  res.status(200).render("unit/edit-unit", { unit, supplier, resource });
});

exports.updateUnit = catchAsync(async (req, res, next) => {
  await Unit.findByIdAndUpdate(req.params.id, req.body);
  req.flash("alertMessage", "Success Update Unit");
  req.flash("alertStatus", "success");

  res.status(200).redirect("unit-all");
});

exports.deleteUnit = catchAsync(async (req, res, next) => {
  await Unit.findByIdAndDelete(req.params.id);
  req.flash("alertMessage", "Success Delete Unit");
  req.flash("alertStatus", "success");

  res.status(200).redirect("unit-all");
});
