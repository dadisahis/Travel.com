import React from "react";
import "./emaillist.scss";

function EmailList() {
  return (
    <div className="emailList">
      <h1 className="title">Time is money!</h1>
      <h3 className="subtitle">Sign up to receive the best deals</h3>
      <div className="emailList_input">
        <input type="text" placeholder="Your email" className="email_input" />
        <button className="email_subscribe">Subscribe</button>
      </div>
    </div>
  );
}

export default EmailList;
