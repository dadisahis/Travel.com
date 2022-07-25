import React, { useState } from "react";
import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userRows, userColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { deleteRecord, getData } from "../../api/api";
import { useEffect } from "react";

function Datatable({ dataColumns }) {
  const [data, setData] = useState([]);
  const page = window.location.pathname.split("/")[1];
  function getUserList() {
    const list = getData(page);
    list.then((user_data) => {
      setData(user_data);
    });
  }
  function handleDelete(id) {
    const res = deleteRecord(page, id);
    res.then((data) => {
      setData(data.filter((item) => item._id !== id));
    });
  }
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => {
                handleDelete(params.row._id);
              }}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getUserList();
  }, [data]);
  return (
    <div className="datatable">
      <div className="datatableTitle">
        <p style={{ textTransform: "capitalize" }}>{page}</p>
        <Link
          to={`/${page}/new`}
          style={{ textDecoration: "none" }}
          className="link"
        >
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={dataColumns.concat(actionColumn)}
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
}

export default Datatable;
