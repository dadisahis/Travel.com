import axios from "axios";
export const getPropertyByType = async () => {
  const data = await axios.get(
    process.env.REACT_APP_API_URL + "/hotels/countByType"
  );
  return data.data;
};

export const searchPhotos = async (query) => {
  const data = await fetch(
    `https://api.unsplash.com/search/photos?page=1&query=${query}&page=1&per_page=1&client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`
  );
  const dataJ = await data.json();
  return dataJ.results;
};

export const getFeaturedProperties = async () => {
  const data = await axios.get(
    process.env.REACT_APP_API_URL + "/hotels?featured=true&limit=5"
  );
  return data.data;
};

export const getHotels = async (params) => {
  const data = await axios.get(process.env.REACT_APP_API_URL + "/hotels", {
    params,
  });
  return data.data;
};

export const getHotelByID = async (id) => {
  const data = await axios.get(
    process.env.REACT_APP_API_URL + `/hotels/find/${id}`
  );
  return data.data;
};

export const loginUser = async (payload) => {
  const data = await axios.post(
    process.env.REACT_APP_API_URL + `/auth/login`,
    payload
  );
  return data.data;
};

export const getHotelRooms = async (id) => {
  const data = await axios.get(
    process.env.REACT_APP_API_URL + `/hotels/room/${id}`
  );
  return data.data;
};

export const updateRoomAvailability = async (id, body) => {
  const data = await axios.put(
    process.env.REACT_APP_API_URL + `/rooms/availability/${id}`,
    body
  );
  return data.data;
};
