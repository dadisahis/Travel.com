import React from "react";
import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import "./featured.scss";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Oval } from "react-loader-spinner";

function Featured() {
  const cities = ["berlin", "mumbai", "delhi", "bangalore", "sydney"];
  const { data, loading, error } = useFetch(
    process.env.REACT_APP_API_URL + "/hotels/countByCity/",
    {
      cities: cities,
    }
  );
  const [imageData, setImageData] = useState([]);
  async function searchPhotos(city) {
    const data = await fetch(
      `https://api.unsplash.com/search/photos?page=1&query=${city}&page=1&per_page=1&client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`
    );
    const dataJ = await data.json();
    return dataJ.results;
  }
  function capitalize(title) {
    return title.charAt(0).toUpperCase() + title.slice(1);
  }

  function createImageData(cities) {
    const img_obj = [];
    cities.forEach((city) => {
      searchPhotos(city).then((data) => {
        img_obj.push({
          image: data[0].urls.full,
        });
      });
    });
    setImageData(img_obj);
  }
  useEffect(() => {
    createImageData(cities);
  }, []);
  return (
    <div className="featured">
      <div className="title_container">
        <h1 className="featured_title">Explore Various Destinations</h1>
      </div>
      {loading ? // <Oval
      //   ariaLabel="loading-indicator"
      //   height={100}
      //   width={100}
      //   strokeWidth={5}
      //   color="#a760ff"
      //   secondaryColor="blue"
      // />
      null : (
        <div className="featured_container">
          {data.map((item, index) => (
            <div className="featured_item" key={index}>
              <img
                src={imageData[index]?.image}
                alt=""
                className="featured_img"
              />
              <div className="featured_titles">
                <h1>{capitalize(item.city)}</h1>
                <h2>{item.count} properties</h2>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Featured;
