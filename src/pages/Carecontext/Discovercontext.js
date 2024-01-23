import React, { useEffect } from "react";
import { Button, Container } from "reactstrap";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useMemo, useState, useCallback, useRef } from "react";
import api from "services/Api";
import CarecontextDialog from "./Dialog/Carecontextdialog";
//Import Breadcrumb
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";

//redux

const Discovercontext = (props) => {
  const gridRef = useRef();
  const [quickFilterText, setQuickFilterText] = useState("");

  const rowData = [
    {
      name: "ramu",
      age: "23",
      contact: "9962313564",
      date: "11/12/2023",
      context: "OPD visit 11/12/2023",
    },
    {
      name: "raju",
      age: "23",
      contact: "9962313564",
      date: "11/12/2023",
      context: "OPD visit 11/12/2023",
    },
    {
      name: "ragu",
      age: "23",
      contact: "9962313564",
      date: "11/12/2023",
      context: "OPD visit 11/12/2023",
    },
  ];

  const columnDefs = [
    { headerName: "Name", field: "name" },
    { headerName: "Age", field: "age" },
    { headerName: "Phone", field: "contact" },
    { headerName: "Date", field: "date" },
    {
      headerName: "Context", field: "context",
    },
  ];

  const gridOptions = useRef({
    defaultColDef: {
      sortable: true,
      filter: true,
      flex: 1,
    },
  });

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>Discover Care-context</h4>
         
        </Container>
        <div
          className="ag-theme-alpine"
          style={{ height: 1000, marginTop: "70px" }}
        >
           <div className="mb-3">
            <input
              type="text"
              placeholder="Search..."
              value={quickFilterText}
              onChange={(e) => setQuickFilterText(e.target.value)}
              style={{width: '250px', height: '30px', border: '1px solid grey', borderRadius: '5px'}}
            />
            <button
              onClick={() =>
                gridOptions.current.api.setQuickFilter(quickFilterText)
              }
              className="btn-mod btn-md ms-2"
            >
              Search
            </button>
          </div>
          <AgGridReact
           gridOptions={gridOptions.current}
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            // defaultColDef={defaultColDef}
            pagination={true}
            paginationPageSize={20}
            domLayout="autoHeight"
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default withTranslation()(Discovercontext);
