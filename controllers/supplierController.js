const Supplier = require("../models/supplier");
const catchAsync = require("../utils/catchAsync");

exports.getAllSupplier = catchAsync(async (req, res, next) => {
  const supplier = await Supplier.find();
  const alertMessage = req.flash("alertMessage");
  const alertStatus = req.flash("alertStatus");
  const alert = { message: alertMessage, status: alertStatus };

  res.status(200).render("supplier/all-supplier", { supplier, alert });
});

exports.addSupplier = catchAsync(async (req, res, next) => {
  res.render("supplier/add-supplier");
});

exports.createSupplier = catchAsync(async (req, res, next) => {
  await Supplier.create(req.body);
  req.flash("alertMessage", "Success Add Supplier");
  req.flash("alertStatus", "success");

  res.status(201).redirect("supplier-all");
});

exports.editSupplier = catchAsync(async (req, res, next) => {
  const supplier = await Supplier.findById(req.params.id);

  res.status(200).render("supplier/edit-supplier", { supplier });
});

exports.updateSupplier = catchAsync(async (req, res, next) => {
  await Supplier.findByIdAndUpdate(req.params.id, req.body);
  req.flash("alertMessage", "Success Update Supplier");
  req.flash("alertStatus", "success");

  res.status(200).redirect("supplier-all");
});

exports.deleteSupplier = catchAsync(async (req, res, next) => {
  await Supplier.findByIdAndDelete(req.params.id);
  req.flash("alertMessage", "Success Delete Supplier");
  req.flash("alertStatus", "success");

  res.status(200).redirect("supplier-all");
});
