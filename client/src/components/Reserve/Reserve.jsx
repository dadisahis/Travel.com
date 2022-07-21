import React from "react";
import "./reserve.scss";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { getHotelRooms, updateRoomAvailability } from "../../api/api";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";

function Reserve({ setOpen, hotelId }) {
  const [hotelRooms, setHotelRooms] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [reserveRoom, setReserveRoom] = useState(null);
  const [reserveRoomList, setReserveRoomList] = useState([]);

  const { date, options } = useContext(SearchContext);
  function getRooms(hotelId) {
    const hotel_rooms = getHotelRooms(hotelId);
    hotel_rooms.then((data) => {
      setHotelRooms(data);
    });
  }
  function handleSelect(e) {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  }
  function getDatesInRange(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());
    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  }
  const allDates = getDatesInRange(date[0].startDate, date[0].endDate);

  function isAvailable(roomNumber) {
    const isFound = roomNumber.unavailableDates.some((date) =>
      allDates.includes(new Date(date).getTime())
    );
    return !isFound;
  }
  async function handleClick() {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = updateRoomAvailability(roomId, { dates: allDates });
          res
            .then((data) => {
              setReserveRoom(true);
            })
            .catch((err) => {
              setReserveRoom(false);
            });
          return res;
        })
      );
    } catch (err) {}
  }

  function getReservedRoom(roomId) {
    const roomDetails = hotelRooms.filter((data) =>
      data.roomNumber.filter((room) => room._id === roomId).length > 0
        ? data
        : null
    );
    console.log(roomDetails);
    return roomDetails;
  }
  useEffect(() => {
    getRooms(hotelId);
  }, []);

  useEffect(() => {
    const reserved_room = [];
    selectedRooms.map((roomId) => {
      const roomDetails = getReservedRoom(roomId);
      reserved_room.push(roomDetails[0]);
    });
    setReserveRoomList(reserved_room);
  }, [reserveRoom]);
  console.log(reserveRoomList);

  return (
    <div className="reserve">
      <div className="reserveContainer">
        <div className="close_icon" onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
        {reserveRoom ? (
          <div className="reserveSuccess">
            <CheckCircleIcon className="successIcon" />
            <h1>Room Reservation Successfull</h1>
            {reserveRoomList.map((data, index) => (
              <div className="reserved_roomInfo" style={{ marginTop: "10px" }}>
                <p>
                  <b>Room type</b>:{" "}
                  {data.title.charAt(0).toUpperCase() + data.title.slice(1)}
                </p>
                <p>
                  <b>Total stay</b>: {allDates.length - 1} nights /{" "}
                  {allDates.length} days
                </p>
                <p>
                  <hr color="black" style={{ marginTop: "5px" }} />
                  <b>Total price</b>: ${allDates.length * data.price}
                </p>
              </div>
            ))}
            <h2 style={{ marginTop: "10px" }}>Have a safe journey!</h2>
          </div>
        ) : (
          <>
            <span> Select your rooms: </span>
            {hotelRooms.map((item, index) => (
              <div className="reserveItem" key={index}>
                <div className="reserveItemInfo">
                  <div className="title">{item.title}</div>
                  <div className="description">{item.description}</div>
                  <div className="maxPeople">
                    <b>Max People</b>: {item.maxPeople} people
                  </div>
                  <div className="price">
                    <b>Price</b>: ${item.price}
                  </div>
                </div>
                <div className="roomContainer">
                  {item.roomNumber.map((roomNumber, index) => (
                    <div
                      className={
                        !isAvailable(roomNumber) ? "room disable" : "room"
                      }
                      key={index}
                    >
                      <label>{roomNumber.number}</label>
                      <input
                        type="checkbox"
                        value={roomNumber._id}
                        onChange={handleSelect}
                        disabled={!isAvailable(roomNumber)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <button className="reserveButton" onClick={handleClick}>
              {" "}
              Reserve Now!
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Reserve;
