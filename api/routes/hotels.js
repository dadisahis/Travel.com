import express from "express";
import {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotelById,
  getAllHotels,
} from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/create", verifyAdmin, createHotel);
//UPDATE
router.put("/update/:id", verifyAdmin, updateHotel);
//DELETE
router.delete("/delete/:id", verifyAdmin, deleteHotel);
//GET
router.get("/:id", getHotelById);
//GETALL
router.get("/", getAllHotels);

export default router;
