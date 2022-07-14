import mongoose from "mongoose";
const { Schema } = mongoose;

const roomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    maxPeople: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    roomNumber: [{ number: Number, unavailableDates: { type: [Date] } }],
  },
  { timestamps: true }
);

export default mongoose.model("Room", roomSchema);
