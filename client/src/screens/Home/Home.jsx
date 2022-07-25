import React, { useEffect, useState, useContext } from "react";
import NavBar from "../../components/NavBar/NavBar";
import Header from "../../components/Header/Header";
import Carousel from "../../components/Carousel/Carousel";
import "./home.scss";
import PropertyList from "../../components/PropertyList/PropertyList";
import Featured from "../../components/Featured/Featured";
import { Oval } from "react-loader-spinner";
import EmailList from "../../components/EmailList/EmailList";
import { getPropertyByType, getFeaturedProperties } from "../../api/api";
import { AuthContext } from "../../context/AuthContext";
function Home() {
  const { user, loading, error, dispatch } = useContext(AuthContext);
  const imageData = [
    {
      url: "https://cdn.britannica.com/96/115096-050-5AFDAF5D/Bellagio-Hotel-Casino-Las-Vegas.jpg",
    },
    {
      url: "https://st.depositphotos.com/1041088/2009/i/600/depositphotos_20099509-stock-photo-modern-loft-apartment-living-room.jpg",
    },
    {
      url: "https://media.cntraveler.com/photos/53da60a46dec627b149e66f4/master/pass/hilton-moorea-lagoon-resort-spa-moorea-french-poly--110160-1.jpg",
    },
    {
      url: "https://www.villtravel.com/files/Rhodos/villa_elafina/villa-elafina_1182.jpg",
    },
    { url: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8" },
  ];
  const [propertyData, setPropertyData] = useState([]);
  const [homeData, setHomeData] = useState([]);
  function getPropertyData() {
    const property_count = getPropertyByType();
    property_count.then((data) => {
      const property_obj = [];
      data.forEach((item) => {
        const obj = {
          title: item.type.charAt(0).toUpperCase() + item.type.slice(1),
          subtitle: item.count,
        };
        property_obj.push(obj);
      });
      property_obj.map((item, index) => (item.image = imageData[index]));
      setPropertyData(property_obj);
    });
  }

  function getHomeData() {
    const featured_properties = getFeaturedProperties();
    featured_properties.then((data) => {
      setHomeData(data);
    });
  }
  useEffect(() => {
    getPropertyData();
    getHomeData();
  }, []);

  return (
    <div className="home">
      <div className="home_top">
        <NavBar />
        <Header type="home" />
      </div>
      <div className="home_content">
        <h1 className="carousel_title">Amazing Places. Amazing Stories.</h1>
        <Carousel />
        <div className="home_propertyList">
          <Featured />
          <>
            <PropertyList
              data={propertyData}
              title="Browse by property type"
              height={160}
              width={230}
            />

            <PropertyList
              data={homeData}
              title="Homes people love"
              height={160}
              width={230}
            />
          </>
          <EmailList />
        </div>
      </div>
    </div>
  );
}

export default Home;
