import PropTypes from "prop-types";
import React from "react";
import { Container } from "reactstrap";

//i18n
import { withTranslation } from "react-i18next";
//ag-grid modules
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import { AgGridReact } from "ag-grid-react";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import BloodComponentDialog from "../BillingDialog/BloodComponentDialog";

const BloodComponentBilling = props => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
 const rowData = [
    {bill_no: 'BIB01', caseid: '100', issuedate: '2023-05-06', recieved_to: 'Abishek', bldgrp: 'B+ve',component:'Platelets', gender: 'male',donor: 'hari',bags: '2',amt: '200',paidamt: '100',balance: '50' }
  ];

  const columnDefs = [
    {headerName: 'Bill No', field: 'bill_no'},
    {headerName: 'Case ID', field: 'caseid'},
    {headerName: 'Issue Date', field: 'issuedate'},
    {headerName: 'Recieved To', field: 'recieved_to'},
    {headerName: 'Blood Group', field: 'bldgrp'},
    {headerName: 'Component', field: 'component'},
    {headerName: 'Gender', field: 'gender'},
    {headerName: 'Donor Name', field: 'donor'},
    {headerName: 'Bags', field: 'bags'},
    {headerName: 'Amount', field: 'amount'},
    {headerName: 'Paid Amount', field: 'paidamt'},
    {headerName: 'Balance Amount', field: 'balance'}
  ];

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  );

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>Blood Component Billing</h4>
          <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
            <button className="btn btn-primary" style={{ marginLeft: '10px' }} onClick={handleClickOpen}><i className="fas fa-microscope"></i> &nbsp;Issue Bill</button>
          </div>
          <BloodComponentDialog open={open} handleClose={handleClose} />
          <div
            className="ag-theme-balham"
            style={{ height: 500, marginTop: "20px" }}
          >
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
            />
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withTranslation()(BloodComponentBilling);