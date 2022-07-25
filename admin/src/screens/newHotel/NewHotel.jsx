import React from "react";
import NavBar from "../../components/navbar/NavBar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./newhotel.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { auth, db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useEffect } from "react";
import { createHotel, getAllRooms } from "../../api/api";
import { useNavigate } from "react-router-dom";

function NewHotel({ inputs, title }) {
  const navigate = useNavigate();
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [perc, setPerc] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [selectRoom, setSelectRoom] = useState([]);
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleClick = (e) => {
    e.preventDefault();
    const res = createHotel(info);
    res.then((data) => {
      navigate("/hotels");
    });
  };
  function getRooms() {
    const res = getAllRooms();
    res.then((data) => {
      setRooms(data);
    });
  }

  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectRoom(value);
  };
  selectRoom;

  useEffect(() => {
    const uploadFile = (file) => {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          "Upload is " + progress + "% done";
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              "Upload is paused";
              break;
            case "running":
              "Upload is running";
              break;
            default:
              break;
          }
        },
        (error) => {
          error;
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setInfo((prev) => ({
              ...prev,
              image: prev.image
                ? [...prev.image, { url: downloadURL }]
                : [{ url: downloadURL }],
            }));
          });
        }
      );
    };
    files && Object.values(files).map((file) => uploadFile(file));
  }, [files]);

  useEffect(() => {
    getRooms();
  }, []);
  return (
    <div className="new">
      <Sidebar />
      <div className="new__container">
        <NavBar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  multiple
                  id="file"
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    type={input.type}
                    placeholder={input.placeholder ? input.placeholder : null}
                    onChange={handleChange}
                    id={input.id}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Featured</label>
                <select id="featured" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <div className="selectRooms">
                <label>Rooms</label>
                <select id="rooms" multiple onChange={handleSelect}>
                  {rooms.length > 0
                    ? rooms.map((room) => (
                        <option key={room.id} value={room._id}>
                          {room.title}
                        </option>
                      ))
                    : null}
                </select>
              </div>

              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewHotel;
