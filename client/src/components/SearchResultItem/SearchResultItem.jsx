import React, { useContext } from "react";
import "./searchresultitem.scss";
import { Link } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";

function SearchResultItem({ data }) {
  const { city } = useContext(SearchContext);
  function generateFeedback(rating) {
    if (rating >= 9.0 && rating < 10.0) {
      return "Exceptional";
    } else if (rating >= 8.0 && rating < 9.0) {
      return "Superb";
    } else if (rating >= 7.0 && rating < 8.0) {
      return "Very good";
    } else {
      return "Average";
    }
  }
  return (
    <div className="searchResultItem">
      <div className="total_properties">
        <h1>
          {city ? `${city.charAt(0).toUpperCase() + city.slice(1)} :` : "Total"}{" "}
          {data.length} properties found
        </h1>
      </div>
      {data.map((item, index) => (
        <div className="searchResultItem_container" key={index}>
          <div className="searchResult_left">
            <img src={item.image[0].url} alt="" />
          </div>
          <div className="searchResult_middle">
            <Link
              to={`/hotels/${item._id}`}
              style={{ textDecoration: "none", color: "#1363df" }}
            >
              <p className="title">{item.name}</p>
            </Link>
            <p className="distance">{item.distance}</p>
            <p
              className={
                item.taxi_availability
                  ? "taxi_availability free"
                  : "taxi_availability paid"
              }
            >
              {item.taxi_availability
                ? "Free airport taxi"
                : "Paid taxi available"}
            </p>
            <p className="description">{item.title}</p>
            <div className="feature_container">
              {item.features.map((feature, index) => (
                <>
                  <p className="features">{feature}</p>
                  {index !== item.features.length - 1 ? <p>•</p> : null}
                </>
              ))}
            </div>
            <div
              className={
                item.free_cancelation
                  ? "cancellation_container free"
                  : "cancellation_container paid"
              }
            >
              {item.free_cancelation ? (
                <>
                  <p className="cancellation_type">Free Cancellation</p>
                  <p className="cancellation_feedback">
                    You can cancel later, so lock in great price today
                  </p>
                </>
              ) : (
                <>
                  <p className="cancellation_type">No free cancellation</p>
                  <p className="cancellation_feedback">
                    Cancellation fee will be charged
                  </p>
                </>
              )}
            </div>
          </div>
          <div className="searchResult_right">
            <div className="rating_container">
              <div className="rating">
                <p className="feedback">{generateFeedback(item.rating)}</p>
                <p className="rating_number">{item.rating}</p>
              </div>
            </div>
            <div className="price_container">
              <div className="price">
                <p>$ {item.cheapestPrice}</p>
                <p className="disclaimer">Includes taxes and other charges</p>
              </div>
              <button>See availability</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SearchResultItem;
