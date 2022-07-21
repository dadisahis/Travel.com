import React from "react";
import "./userinfo.scss";

function UserInfo() {
  return (
    <div className="userInfo">
      <div className="userInfo__top">Edit</div>
      <div className="userInfo__middle">Information</div>
      <div className="userInfo__bottom">
        <img
          src="https://img.freepik.com/free-photo/young-handsome-man-with-beard-isolated-keeping-arms-crossed-frontal-position_1368-132662.jpg?w=360"
          alt=""
        />
        <div className="userInfo__right">
          <h1 className="itemTitle">John Williams</h1>
          <div className="detailItem">
            <span className="itemKey">Email: </span>
            <span className="itemValue"> john@gmail.com</span>
          </div>
          <div className="detailItem">
            <span className="itemKey">Phone: </span>
            <span className="itemValue">+1 2345 76 89</span>
          </div>
          <div className="detailItem">
            <span className="itemKey">Address: </span>
            <span className="itemValue">Elton st. 234 Garden Yd. New York</span>
          </div>
          <div className="detailItem">
            <span className="itemKey">Country: </span>
            <span className="itemValue">USA</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
