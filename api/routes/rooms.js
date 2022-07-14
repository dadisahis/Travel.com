import express from "express";
import {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoomById,
  getAllRooms,
} from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/create/:hotelid", verifyAdmin, createRoom);
//UPDATE
router.put("/update/:id", verifyAdmin, updateRoom);
//DELETE
router.delete("/delete/:id/:hotelid", verifyAdmin, deleteRoom);
//GET
router.get("/:id", getRoomById);
//GETALL
router.get("/", getAllRooms);

export default router;
