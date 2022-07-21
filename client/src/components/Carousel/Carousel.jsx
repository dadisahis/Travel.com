import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import "./carousel.scss";
function Carousel() {
  const [photos, setPhotos] = useState([]);
  const [currentPhotos, setCurrentPhotos] = useState([]);
  const [photolength, setPhotolength] = useState(photos.length);
  const [page, setPage] = useState(1);
  async function searchPhotos(page) {
    const data = await fetch(
      `https://api.unsplash.com/search/photos?page=1&query=${"travel architecture"}&page=${page}&per_page=5&client_id=${
        process.env.REACT_APP_UNSPLASH_ACCESS_KEY
      }`
    );
    if (photolength < 10) {
      const dataJ = await data.json();
      const result = dataJ.results;
      setPhotos([...photos, ...result]);
      setCurrentPhotos([...result]);
      setPhotolength(photos.length);
    } else {
      setCurrentPhotos(photos.slice((page - 1) * 5, page * 5));
    }
  }
  function previousPage() {
    setPage(page === 1 ? 3 : page - 1);
  }
  function nextPage() {
    setPage(page === 3 ? 1 : page + 1);
  }

  useEffect(() => {
    searchPhotos(page);
  }, [page]);
  return (
    <div className="carousel">
      <KeyboardDoubleArrowLeftIcon
        className="left-arrow"
        onClick={() => {
          previousPage();
        }}
      />
      {currentPhotos.map((item, index) => (
        <div className="carousel_item" key={index}>
          <img src={item.urls.full} alt="" className="image" />
        </div>
      ))}
      <KeyboardDoubleArrowRightIcon
        className="right-arrow"
        onClick={() => {
          nextPage();
        }}
      />
    </div>
  );
}

export default Carousel;
