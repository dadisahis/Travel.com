import React from "react";
import NavBar from "../../components/navbar/NavBar";
import Sidebar from "../../components/sidebar/Sidebar";
import TableList from "../../components/table/Table";
import UserInfo from "../../components/userInfo/UserInfo";
import Chart from "../../components/chart/Chart";
import "./Single.scss";

function Single() {
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <NavBar />
        <div className="single__top">
          <UserInfo />
          <Chart aspect={3 / 1} title="User Transactions (Last 6 Months) " />
        </div>
        <div className="single__bottom">
          <div className="listTitle">Latest Transactions</div>
          <TableList />
        </div>
      </div>
    </div>
  );
}

export default Single;
