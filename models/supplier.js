const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema(
  {
    supplier_name: String,
    supplier_pic: String,
    supplier_mobile: String,
    supplier_email: String,
    supplier_address: String,
  },
  {
    timestamps: true,
  }
);

const Supplier = mongoose.model("Supplier", supplierSchema);

module.exports = Supplier;
