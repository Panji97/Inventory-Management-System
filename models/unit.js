const mongoose = require("mongoose");

const unitSchema = new mongoose.Schema(
  {
    unit_name: String,
    unit_type: String,
    unit_model: String,
    unit_serial_number: String,
    unit_processor: String,
    unit_ram: String,
    unit_ssd: String,
    unit_llf: String,
    unit_asset_status: String,
    unit_date_in: {
      type: String,
      default: Date.now,
    },
    unit_date_use: {
      type: String,
      default: Date.now,
    },
    unit_date_out: {
      type: String,
      default: Date.now,
    },
    supplier_name: {
      type: String,
      ref: "Supplier",
    },
    resource_name: {
      type: String,
      ref: "Resource",
    },
  },
  {
    timestamps: true,
  }
);

const Unit = mongoose.model("Unit", unitSchema);

module.exports = Unit;
