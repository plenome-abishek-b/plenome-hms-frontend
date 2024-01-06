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
import ConsentDialog from "./Dialog/Consentdialog";

//redux

const Consentrequest = (props) => {
  const gridRef = useRef();
  const [open, setOpen] = useState(false);
  const [quickFilterText, setQuickFilterText] = useState("");

  const rowData = [
    {
      name: "ramu",
      abha: "abishek5@sbx",
      status: "Consent Granted",
      created: "14/12/2023",
      granted: "15/12/2023",
      expiry: "16/12/2023",
    },
    {
      name: "ramu",
      abha: "abishek5@sbx",
      status: "Consent Granted",
      created: "14/12/2023",
      granted: "15/12/2023",
      expiry: "16/12/2023",
    },
    {
      name: "ramu",
      abha: "abishek5@sbx",
      status: "Consent Granted",
      created: "14/12/2023",
      granted: "15/12/2023",
      expiry: "16/12/2023",
    },
    {
      name: "ramu",
      abha: "abishek5@sbx",
      status: "Consent Granted",
      created: "14/12/2023",
      granted: "15/12/2023",
      expiry: "16/12/2023",
    },
    {
      name: "ramu",
      abha: "abishek5@sbx",
      status: "Consent Granted",
      created: "14/12/2023",
      granted: "15/12/2023",
      expiry: "16/12/2023",
    },
    {
      name: "ramu",
      abha: "abishek5@sbx",
      status: "Consent Granted",
      created: "14/12/2023",
      granted: "15/12/2023",
      expiry: "16/12/2023",
    },
    {
      name: "raju",
      abha: "abishek5@sbx",
      status: "Consent Granted",
      created: "14/12/2023",
      granted: "15/12/2023",
      expiry: "16/12/2023",
    },
  ];

  const columnDefs = [
    { headerName: "Name", field: "name" },
    { headerName: "Abha ID", field: "abha" },
    { headerName: "Request Status", field: "status" },
    { headerName: "Consent Created", field: "created" },
    {
      headerName: "Consent Granted",
      field: "granted",
    },
    { headerName: "Consent Expiry", field: "expiry" },
  ];

  const gridOptions = useRef({
    defaultColDef: {
      sortable: true,
      filter: true,
      flex: 1,
    },
  });

  const handleQuickFilterChange = (event) => {
    setQuickFilter(event.target.value);
  };

  const handleClickOpen = () => {
    //dialog open
    setOpen(true);
  };

  const handleClose = () => {
    //dialog close
    setOpen(false);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>Consent List</h4>
          <div className="d-flex justify-content-end" style={{position: 'relative', top:'60px'}}>
            <button className="btn-mod" onClick={handleClickOpen}>
              + New Consent Request
            </button>
            <ConsentDialog open={open} handleClose={handleClose} />
          </div>
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
            // quickFilter={quickFilter}
            pagination={true}
            paginationPageSize={20}
            domLayout="autoHeight"
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default withTranslation()(Consentrequest);
