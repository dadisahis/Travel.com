import React, { useState, useContext, useEffect } from "react";
import "./userinfo.scss";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function UserInfo() {
  const navigate = useNavigate();
  const [display, setDisplay] = useState(false);

  const { user, loading, error, dispatch } = useContext(AuthContext);
  const logOut = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="userinfo">
      <div className="userinfo_icon" onClick={() => setDisplay(!display)}>
        {/* {userData.image ? (
          <img
            src="https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg"
            alt=""
            className="image"
          />
        )  */}
        <h2>{user.username.charAt(0).toUpperCase()}</h2>
      </div>
      {display && user ? (
        <div className="userinfo_container">
          <h3> User Info</h3>
          <div className="userinfo_item">
            <p>Username</p>
            <p className="username">{user.username}</p>
          </div>
          <div className="userinfo_item">
            <p>Email</p>
            <p className="email">{user.email}</p>
          </div>

          <div className="userinfo_signout" onClick={logOut}>
            <p>Sign Out</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default UserInfo;
