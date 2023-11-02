import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Container } from "reactstrap";
import { Link } from "react-router-dom/cjs/react-router-dom";
import api from "services/Api";


//i18n
import {  withTranslation } from "react-i18next";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import { AgGridReact } from "ag-grid-react";
import { useMemo } from "react";
import Referraldialog from "./Dialog/ReferralDialog";

const Referral = props => {


    const initialReferralPaymentValue = {
        billing_id: "1",
        referral_person_id: "1",
        date: "2023-09-08 11:11:11",
        patient_id: "",
        bill_amount: "",
        percentage: "",
        amount: "",
        created_at: "2023-09-08 11:11:11",
      }

    const [open, setOpen] = useState()
    const [tableData, setTableData] = useState(null)
  const [formData, setFormData] = useState(initialReferralPaymentValue)

  const onChange = e => {
    //catch the parameters when changed.
    const { value, id } = e.target
    setFormData({ ...formData, [id]: value })
    // setFormData1({ ...formData1, [id]: value })
  }

  const columnDefs = [
    { headerName: 'Name', field: 'referral_person_name' },
    { headerName: 'Patient Name', field: 'Patient name' },
    { headerName: 'Bill No', field: 'Bill_No' },
    { headerName: 'Bill Amount', field: 'bill_amount' },
    { headerName: 'Commission Percentage', field: 'commission_percentage' },
    { headerName: 'Commission Amount', field: 'commission_amount_fixed' },
  ];

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  );

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }


  useEffect(() => {
    // getUsers from json
    getReferralList()
  }, [])

  const getReferralList = () => {
    
    // api.getPatient().then(res => setTableData(res.data))
    api.getReferralPaymentDetails().then(res => {
      console.log(res,'response');
      setTableData(res.data)})
    
    api.http
  }


  function handleFormSubmit(event) {

    // const payload = {
    //   case_reference_id: "1",
    //   patient_id: id, // Assign the patient ID to the patient_id field
    //   generated_by: "1",
    //   is_ipd_moved: "no",
    //   discharged: "2023-04-25 14:07:22",
    //   created_at: ""
    // };
  
    api.postReferralPaymentDetails(formData).then(resp => {
      console.log(resp);
      console.log(resp.data, 'patient');
    });

  
    api
      .getReferralPaymentDetails({ headers: { "content-type": "application/json" } })
      .then(resp => {
        getReferralList();
        setFormData(initialReferralPaymentValue);
        console.log()
        event.preventDefault();
      });
  
    handleClose();
  }


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>Referral Payment List</h4>
          <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
            <button className="btn btn-primary" onClick={handleOpen}>Add Referral Payment</button>
            <Link to="/referralperson"><button className="btn btn-primary ms-2">Referral person</button></Link>
          </div>
          <div
            className="ag-theme-balham"
            style={{ height: 700, marginTop: "20px" }}
          >
            <AgGridReact
              rowData={tableData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
            />
          </div>
          <Referraldialog open={open} handleClose={handleClose} data={formData} onChange={onChange} handleFormSubmit={handleFormSubmit} />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withTranslation()(Referral);