const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
  {
    resource_name: String,
    resource_id_huawei: String,
    resource_id_dge: String,
    resource_position: String,
    resource_departement: String,
    resource_join_date: {
      type: String,
      default: Date.now,
    },
    resource_end_date: {
      type: String,
      default: Date.now,
    },
    resource_pic: String,
    resource_mobile: String,
    resource_email: String,
    resource_address: String,
  },
  {
    timestamps: true,
  }
);

const Resource = mongoose.model("Resource", resourceSchema);

module.exports = Resource;
