import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import createError from "http-errors";
export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);
  //create new room
  try {
    const savedRoom = await newRoom.save();
    //add the room to the hotel
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).send(savedRoom);
  } catch (err) {
    next(err);
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};

export const updateRoomAvailability = async (req, res, next) => {
  try {
    const updatedRoom = await Room.updateOne(
      {
        "roomNumber._id": req.params.id,
      },
      {
        $push: { "roomNumber.$.unavailableDates": req.body.dates },
      }
    );
    res.status(200).json("Rooms data has been updated");
  } catch (err) {
    next(err);
  }
};

export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Room has been deleted");
  } catch (err) {
    next(err);
  }
};

export const getRoomById = async (req, res, next) => {
  try {
    const room_obj = await Room.findById(req.params.id);
    res.status(200).json(room_obj);
  } catch (err) {
    next(err);
  }
};

export const getAllRooms = async (req, res, next) => {
  try {
    const room_list = await Room.find();
    res.status(200).json(room_list);
  } catch (err) {
    res.status(500).json(err);
  }
};
