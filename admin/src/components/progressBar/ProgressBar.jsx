import React from "react";
import "./progressbar.scss";
import { CircularProgressBar } from "@tomik23/react-circular-progress-bar";

function ProgressBar() {
  return (
    <div className="progressbar">
      <div className="progressLoader">
        <CircularProgressBar
          percent={70}
          size={130}
          stroke={5}
          strokeBottom={5}
          colorCircle="lightgray"
          fontColor="gray"
          round={true}
          className="progressbar_loader"
        />
      </div>
      <div className="progressText">
        <h3>Total sales made today</h3>
        <h2>$420</h2>
        <h4>
          Previous Transactions processing. Last payments may not be included
        </h4>
      </div>
    </div>
  );
}

export default ProgressBar;
