import React from "react";
import "./propertylist.scss";

function PropertyList({ data, title, height, width }) {
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
    <div className="propertyList">
      <div className="title_container">
        <h1 className="propertyList_title">{title}</h1>
      </div>
      <div className="propertyList_container">
        {data.map((item, index) => (
          <div className="propertyList_item" key={index}>
            <img
              src={
                Array.isArray(item.image) ? item.image[0].url : item.image.url
              }
              alt=""
              className="propertyList_img"
              style={{ height: `${height}px`, width: `${width}px` }}
            />
            <div className="propertyList_titles">
              <h1>{item.name ? item.name : item.title}</h1>
              <h2>{item.city ? item.city : item.subtitle + ` properties`}</h2>
            </div>
            {item.cheapestPrice ? (
              <div className="propertyList_price">
                <h2>Starting from ${item.cheapestPrice}</h2>
              </div>
            ) : null}
            {item.rating ? (
              <div className="propertyList_ratingdata">
                <p className="rating">{item.rating}</p>
                <p className="feedback">{generateFeedback(item.rating)}</p>
                <p>|</p>
                <p className="review_count">{item.review_count} reviews</p>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PropertyList;
