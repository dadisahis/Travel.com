import React, { useContext } from "react";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import UserInfo from "../UserInfo/UserInfo";

function NavBar() {
  const { user, loading, error, dispatch } = useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="navbar__container">
        <div className="navbar__left">
          <Link to="/" style={{ textDecoration: "none" }}>
            <div className="logo">
              <h3>Travel.com</h3>
            </div>
          </Link>
        </div>
        <div className="navbar__right">
          <div className="items">
            <div className="item">
              <p>INR</p>
            </div>
            <div className="item">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png?20111003033457"
                alt=""
                className="country"
              />
            </div>
            <div className="item">
              <HelpOutlineOutlinedIcon className="helpIcon" />
            </div>
            <div className="item">
              <div className="button property">List your Property</div>
            </div>
            {user ? (
              <UserInfo />
            ) : (
              <>
                <div className="item">
                  <div className="button">Register</div>
                </div>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <div className="item">
                    <div className="button">Sign In</div>
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
