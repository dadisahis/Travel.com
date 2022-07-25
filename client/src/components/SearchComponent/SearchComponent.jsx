import React, { useState } from "react";
import "./searchcomponent.scss";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useLocation } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import { useDetectClickOutside } from "../../hooks/useDetectClick";
import { useEffect } from "react";
function SearchComponent({ handleSearch, resetSearch }) {
  const location = useLocation();
  const dateRef = useDetectClickOutside(() => setOpenDate(false));
  const optionRef = useDetectClickOutside(() => setOpenOptions(false));
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [options, setOptions] = useState(location.state.options);
  const [openDate, setOpenDate] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [params, setParams] = useState({
    city: location.state.destination,
    date: location.state.date,
    options: location.state.options,
  });

  function increaseCount(title) {
    setOptions(
      options.map((item) =>
        item.title === title ? { ...item, count: item.count + 1 } : item
      )
    );
  }
  function decreaseCount(title) {
    setOptions(
      options.map((item) =>
        item.title === title ? { ...item, count: item.count - 1 } : item
      )
    );
  }
  function reset(params) {
    setDestination("");
    setDate([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ]);
    setOptions([
      {
        title: "Adult",
        count: 2,
      },
      {
        title: "Children",
        count: 0,
      },
      {
        title: "Room",
        count: 1,
      },
    ]);
    resetSearch(params);
  }

  useEffect(() => {
    setParams({
      city: destination.toLowerCase(),
      date: date,
      options: options,
    });
  }, [destination, date, options]);

  return (
    <div className="search">
      <div className="search_container">
        <div className="search_title">Search</div>
        <div className="search_items">
          <div className="search_item">
            <p className="item_title">Destination</p>
            <input
              value={destination}
              type="text"
              className="search_input"
              onChange={(e) => {
                setDestination(e.target.value);
              }}
            />
          </div>
          <div className="search_item" ref={dateRef}>
            <p className="item_title">Check in - Check out date</p>
            <div className="item_container">
              <CalendarMonthIcon />
              <span
                className="searchBoxText"
                onClick={() => setOpenDate(!openDate)}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              >
                {`${format(date[0].startDate, "MM/dd/yyyy")} - ${format(
                  date[0].endDate,
                  "MM/dd/yyyy"
                )}`}
              </span>
            </div>
            {openDate ? (
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={date}
                className="daterange"
              />
            ) : null}
          </div>
          <div className="search_item" ref={optionRef}>
            <p className="item_title">Check in - Check out date</p>
            <div className="item_container">
              <PeopleIcon />
              <span
                className="searchBoxText"
                onClick={() => {
                  setOpenOptions(!openOptions);
                }}
                onChange={(e) => {
                  setOptions(e.target.value);
                }}
              >{`${options[0].count} adult | ${options[1].count} children | ${options[2].count} room`}</span>
            </div>
            {openOptions ? (
              <div className="optionSelector">
                {options.map((item, index) => (
                  <div className="optionSelectorItem" key={index}>
                    <div className="optionSelectorItem_left">
                      <p>{item.title}</p>
                    </div>
                    <div className="optionSelectorItem_right">
                      <button
                        disabled={item.count < 1}
                        onClick={() => {
                          decreaseCount(item.title);
                        }}
                      >
                        -
                      </button>
                      <p>{item.count}</p>
                      <button
                        onClick={() => {
                          increaseCount(item.title);
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
          <div className="search_item button">
            <button
              className="searchButton"
              onClick={() => handleSearch(params)}
            >
              Search
            </button>
            <button className="searchButton" onClick={() => reset(params)}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchComponent;
