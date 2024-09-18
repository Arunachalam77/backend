const express = require("express");
const router = express.Router();
const itemsController = require("../controller");

// Routes
router.get("/items", itemsController.getAllItems);
router.get("/items/:id", itemsController.getItemById);
router.post("/items", itemsController.createItem);
router.put("/items/:id", itemsController.updateItem);
router.delete("/items/:id", itemsController.deleteItem);

module.exports = router;
