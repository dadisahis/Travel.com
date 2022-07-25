import React from "react";
import Header from "../../components/Header/Header";
import NavBar from "../../components/NavBar/NavBar";
import "./singleitem.scss";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import EmailList from "../../components/EmailList/EmailList";
import { useState } from "react";
import { getHotelByID } from "../../api/api";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/Reserve/Reserve";
function SingleItem() {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.pathname.split("/")[2];
  const [hotelData, setHotelData] = useState(null);
  const [openModel, setOpenModal] = useState(false);
  const { date, options } = useContext(SearchContext);
  const { user, dispatch } = useContext(AuthContext);
  function getTotalDays(endDate, startDate) {
    const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
    const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return dayDiff;
  }
  const dayDiff = getTotalDays(date[0].endDate, date[0].startDate);

  function handleClick() {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  }

  function getHotel(id) {
    const hotel_data = getHotelByID(id);
    hotel_data.then((data) => {
      setHotelData({ ...data });
    });
  }
  useEffect(() => {
    getHotel(id);
  }, []);
  return (
    <div className="singleitem">
      <div className="singleitem_top">
        <NavBar />
        <Header type="item" />
      </div>
      <div className="singleitem_content">
        {hotelData ? (
          <div className="singleitem_wrapper">
            <div className="top_container">
              <div className="title_container">
                <h1 className="title">{hotelData.name}</h1>
                <div className="location">
                  <FmdGoodIcon />
                  <p className="address">{hotelData.address}</p>
                </div>
              </div>
              <button>Reserve or Book Now</button>
            </div>
            <div className="location_container">
              <p className="landmark">
                Excellent location - {hotelData.distance}
              </p>
              {hotelData.taxi_availability ? (
                <p className="scheme">{`Book a stay over ${hotelData.cheapestPrice}$ at this property and get free airport taxi`}</p>
              ) : null}
            </div>
            <div className="image_container">
              {hotelData.image.map((item) => (
                <img src={item.url} alt="" />
              ))}
            </div>
            <div className="bottom_container">
              <div className="hotel_details">
                <div className="hotel_details_container">
                  <h1>{hotelData.title}</h1>
                  <p>{hotelData.description}</p>
                </div>
              </div>
              <div className="hotel_card">
                <div className="hotel_card_container">
                  <p className="hotel_card_title">Highly Rated. Low Price.</p>
                  <p className="hotel_card_description">
                    {`Located in the real heart of ${
                      hotelData.city.charAt(0).toUpperCase() +
                      hotelData.city.slice(1)
                    }, this property has an
                  excellent location score of ${hotelData.rating}!`}
                  </p>
                  <p className="hotel_card_deal">
                    <b>
                      $
                      {dayDiff *
                        hotelData.cheapestPrice *
                        options.filter((item) => item.title === "Room")[0]
                          .count}
                    </b>{" "}
                    ({dayDiff} nights)
                  </p>
                  <button onClick={() => handleClick()}>
                    Reserve or Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <EmailList />
      {openModel ? <Reserve setOpen={setOpenModal} hotelId={id} /> : null}
    </div>
  );
}

export default SingleItem;
