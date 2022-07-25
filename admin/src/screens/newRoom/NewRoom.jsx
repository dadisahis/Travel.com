import React, { useEffect, useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./newroom.scss";
import { useNavigate } from "react-router-dom";
import { getHotels, createRoom } from "../../api/api";

function NewRoom({ inputs, title }) {
  const navigate = useNavigate();
  const [info, setInfo] = useState({});
  const [hotels, setHotels] = useState([]);
  const [roomNumber, setRoomNumber] = useState(null);
  const [hotelID, setHotelID] = useState(null);
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleClick = (e) => {
    e.preventDefault();
    const rooms = roomNumber.split(",").map((room) => ({ number: room }));
    setInfo({ ...info, rooms });
    const res = createRoom(hotelID, info);
    res.then((data) => {
      navigate("/rooms");
    });
  };

  const getAllHotels = () => {
    const res = getHotels();
    res.then((data) => {
      setHotels(data);
    });
  };

  useEffect(() => {
    getAllHotels();
  }, []);
  hotelID;
  return (
    <div className="new">
      <Sidebar />
      <div className="new__container">
        <NavBar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    type={input.type}
                    placeholder={input.placeholder ? input.placeholder : null}
                    id={input.id}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Choose Hotel</label>
                <select
                  id="hotelID"
                  onChange={(e) => setHotelID(e.target.value)}
                >
                  {hotels.length > 0
                    ? hotels.map((item) => (
                        <option value={item._id}>{item.name}</option>
                      ))
                    : null}
                </select>
              </div>
              <div className="formInput">
                <label>Room Number</label>
                <textarea
                  onChange={(e) => setRoomNumber(e.target.value)}
                  cols="20"
                  rows="3"
                ></textarea>
              </div>

              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewRoom;
