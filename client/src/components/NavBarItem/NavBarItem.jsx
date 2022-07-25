import React from "react";
import "./NavBarItem.scss";

function NavBarItem({ title, Icon }) {
  return (
    <div className="navbaritem">
      <div>{Icon}</div>
      <p>{title}</p>
    </div>
  );
}

export default NavBarItem;
