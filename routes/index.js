import express from "express";
import {createPlayer, deletePlayerById, getPlayerListId, getPlayersList, updatePlayerById } from "../controller.js";
import { validatePlayer } from "../middleware/index.js";
// import itemsController from "../controller.js"; 

const router = express.Router();

// Routes
// router.get("/items", itemsController.getAllItems);
// router.get("/items/:id", itemsController.getItemById);
// router.post("/items", itemsController.createItem);
// router.put("/items/:id", itemsController.updateItem);
// router.delete("/items/:id", itemsController.deleteItem);


router.post('/create_player', validatePlayer ,createPlayer);
router.get('/get_players',getPlayersList);
router.get('/get_player/:id',getPlayerListId);
router.put('/update_player/:id',validatePlayer,updatePlayerById);
router.delete('/delete_player/:id',deletePlayerById);





export default router; 
