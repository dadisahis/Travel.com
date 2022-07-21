import React, { useContext, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import Header from "../../components/Header/Header";
import "./list.scss";
import SearchComponent from "../../components/SearchComponent/SearchComponent";
import SearchResultItem from "../../components/SearchResultItem/SearchResultItem";
import EmailList from "../../components/EmailList/EmailList";
import { getHotels } from "../../api/api";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { SearchContext } from "../../context/SearchContext";
function List() {
  const location = useLocation();
  const [searchResultData, setSearchResultData] = useState([]);
  const { dispatch } = useContext(SearchContext);
  function handleSearch(params) {
    const search_data = getHotels(params);
    dispatch({ type: "NEW_SEARCH", payload: { ...params } });
    search_data.then((data) => {
      setSearchResultData(data);
    });
  }
  function resetSearch(params) {
    const search_data = getHotels();
    dispatch({ type: "RESET_SEARCH" });
    search_data.then((data) => {
      setSearchResultData(data);
    });
  }
  useEffect(() => {
    const params = {
      city: location.state.destination,
      date: location.state.date,
      options: location.state.options,
    };
    handleSearch(params);
  }, []);
  return (
    <div className="list">
      <div className="list_top">
        <NavBar />
        <Header type="list" />
      </div>
      <div className="list_content">
        <div className="list_wrapper">
          <div className="search_component">
            <SearchComponent
              handleSearch={handleSearch}
              resetSearch={resetSearch}
            />
          </div>
          <div className="result_component">
            <SearchResultItem data={searchResultData} />
          </div>
        </div>
      </div>
      <EmailList />
    </div>
  );
}

export default List;
