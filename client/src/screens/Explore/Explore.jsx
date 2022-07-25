import React from "react";
import "./explore.scss";
import NavBar from "../../components/NavBar/NavBar";
import Header from "../../components/Header/Header";
import EmailList from "../../components/EmailList/EmailList";
import { useState } from "react";
import { searchMultiplePhotos } from "../../api/api";
import { useEffect } from "react";
function Explore() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const colors = [
    "#D61C4E",
    "#F77E21",
    "#A03C78",
    "#FBC5C5",
    "#6CC4A1",
    "#A0D995",
  ];
  const [cities, setCities] = useState([
    { name: "London", select: false },
    { name: "Mumbai", select: false },
    { name: "New York", select: false },
    { name: "Sydney", select: false },
    { name: "Greece", select: false },
    { name: "Bali", select: false },
  ]);

  function generateRandomNumber() {
    const max = 5;
    const min = 0;
    return Math.round(Math.random() * (max - min) + min);
  }

  function getExplorePhotos(query, page, page_size) {
    const res = searchMultiplePhotos(query, page, page_size);
    res.then((data) => {
      setPhotos([...photos, ...data]);
    });
  }
  function searchByPlace(place, select) {
    if (!select) {
      setQuery(place);
    } else {
      setQuery("");
    }
    setCities(
      cities.map((city) =>
        city.name === place
          ? { ...city, select: !select }
          : { ...city, select: false }
      )
    );

    setPage(1);
    setPhotos([]);
  }
  useEffect(() => {
    const search_query = query === "" ? "travel architecture" : query;
    getExplorePhotos(search_query, page, 6);
  }, [page, query]);
  console.log(photos);
  console.log(query);

  return (
    <div className="explore">
      <div className="explore_top">
        <NavBar />
        <Header type="explore" />
      </div>
      <div className="explore_content">
        <div className="mostSearched">
          <h1 className="title">Most visited places</h1>
          <div className="pill_container">
            {cities.map((city, index) => (
              <div
                className={
                  city.name === query && city.select ? "pill active" : "pill"
                }
                onClick={() => {
                  searchByPlace(city.name, city.select);
                }}
                key={index}
              >
                <p>{city.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="explore_wrapper">
          {photos.map((data, index) => (
            <div
              className="image_div"
              key={index}
              style={{ backgroundColor: `${colors[generateRandomNumber()]}` }}
            >
              <img
                src={data.urls.regular}
                alt=""
                className="image"
                style={{
                  height: `${Math.max(data.height / 13, 300)}px`,
                  width: `300px`,
                }}
              />
              <p className="description">
                {data.alt_description
                  ? `${
                      data.alt_description.charAt(0).toUpperCase() +
                      data.alt_description.slice(1)
                    }`
                  : null}{" "}
              </p>
              <div className="tag_container">
                {data.tags.map((tag) => (
                  <p className="tag">#{tag.title}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button className="view_more" onClick={() => setPage(page + 1)}>
          View More
        </button>
      </div>
      <EmailList />
    </div>
  );
}

export default Explore;
