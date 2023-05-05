var express = require("express");
var router = express.Router();

const supplierController = require("../controllers/supplierController");

router.get("/supplier-all", supplierController.getAllSupplier);

router.get("/supplier-add", supplierController.addSupplier);

router.post("/supplier-create", supplierController.createSupplier);

router.get("/supplier-edit-:id", supplierController.editSupplier);

router.post("/supplier-update-:id", supplierController.updateSupplier);

router.get("/supplier-delete-:id", supplierController.deleteSupplier);

module.exports = router;
