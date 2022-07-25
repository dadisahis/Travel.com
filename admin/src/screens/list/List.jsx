import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import NavBar from "../../components/navbar/NavBar";
import "./list.scss";
import Datatable from "../../components/datatable/Datatable";
function List({ dataColumns }) {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <NavBar />
        <Datatable dataColumns={dataColumns} />
      </div>
    </div>
  );
}

export default List;
