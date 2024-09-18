import express from "express";
import itemsController from "../controller.js"; 

const router = express.Router();

// Routes
router.get("/items", itemsController.getAllItems);
router.get("/items/:id", itemsController.getItemById);
router.post("/items", itemsController.createItem);
router.put("/items/:id", itemsController.updateItem);
router.delete("/items/:id", itemsController.deleteItem);

export default router; 
