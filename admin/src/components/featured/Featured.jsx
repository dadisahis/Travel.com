import React from "react";
import "./featured.scss";
import ProgressBar from "../progressBar/ProgressBar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function Featured() {
  return (
    <div className="featured">
      <div className="featured__top">
        <h3>Total Revenue</h3>
        <MoreVertIcon />
      </div>
      <div className="featured__bottom">
        <ProgressBar />
        <div className="summary">
          <div className="item">
            <div className="item__header">
              <h3>Target</h3>
            </div>
            <div className="item__info negative">
              <KeyboardArrowDownIcon className="item__icon" fontSize="small" />
              <div className="resultAmount">$12.4K</div>
            </div>
          </div>
          <div className="item">
            <div className="item__header">
              <h3>Target</h3>
            </div>
            <div className="item__info positive">
              <KeyboardArrowDownIcon className="item__icon" fontSize="small" />
              <div className="resultAmount">$12.4K</div>
            </div>
          </div>
          <div className="item">
            <div className="item__header">
              <h3>Target</h3>
            </div>
            <div className="item__info positive">
              <KeyboardArrowDownIcon className="item__icon" fontSize="small" />
              <div className="resultAmount">$12.4K</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Featured;
