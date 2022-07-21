import React from "react";
import "./NavBarItem.scss";

function NavBarItem({ title, Icon, isActive }) {
  return (
    <div className={isActive ? "navbaritem active" : "navbaritem"}>
      <div>{Icon}</div>
      <p>{title}</p>
    </div>
  );
}

export default NavBarItem;
