import express from "express";
import {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotelById,
  getAllHotels,
  countByCity,
  countByType,
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
router.get("/find/:id", getHotelById);
//GETALL
router.get("/", getAllHotels);
router.post("/countByCity", countByCity);
router.get("/countByType", countByType);

export default router;
