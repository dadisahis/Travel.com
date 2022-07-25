import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
    const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted");
  } catch (err) {
    next(err);
  }
};

export const getHotelById = async (req, res, next) => {
  try {
    req.params.id;
    const hotel_obj = await Hotel.findById(req.params.id);
    hotel_obj;
    res.status(200).json(hotel_obj);
  } catch (err) {
    next(err);
  }
};

export const getAllHotels = async (req, res, next) => {
  const { minPrice, maxPrice, ...others } = req.query;
  try {
    const hotel_list = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: minPrice || 1, $lt: maxPrice || 999 },
    }).limit(req.query.limit);
    res.status(200).json(hotel_list);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.body.cities;
  req.body;
  try {
    const hotel_list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    const result_object = [];
    for (let i = 0; i < cities.length; i++) {
      const obj = {
        city: cities[i],
        count: hotel_list[i],
      };
      result_object.push(obj);
    }
    res.status(200).json(result_object);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const countByType = async (req, res, next) => {
  const hotelCount = await Hotel.countDocuments({ type: "hotel" });
  const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
  const resortCount = await Hotel.countDocuments({ type: "resort" });
  const villaCount = await Hotel.countDocuments({ type: "villa" });
  const cabinCount = await Hotel.countDocuments({ type: "cabin" });
  try {
    const result_object = [
      {
        type: "hotel",
        count: hotelCount,
      },
      {
        type: "apartment",
        count: apartmentCount,
      },
      {
        type: "resort",
        count: resortCount,
      },
      {
        type: "villa",
        count: villaCount,
      },
      {
        type: "cabin",
        count: cabinCount,
      },
    ];
    res.status(200).json(result_object);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const room_list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    return res.status(200).send(room_list);
  } catch (err) {
    next(err);
  }
};
