import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Container } from "reactstrap";

//i18n
import {  withTranslation } from "react-i18next";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import { AgGridReact } from "ag-grid-react";
import { useMemo} from "react";
import Referralpersondialog from "./Dialog/ReferralPersonDialog";
import api from "services/Api";
//redux

const ReferralPerson = props => {


  const initialReferralPersonValue = {
    name: "",
    contact: "",
    category_id: "1",
    person_name: "",
    person_phone: "",
    standard_commission: "",
    address: "",
    is_active: "1",
    created_at: "2023-09-08 11:11:11"
  }

    const [open, setOpen] = useState()
    const [tableData, setTableData] = useState(null)
  const [formData, setFormData] = useState(initialReferralPersonValue)

  const onChange = e => {
    //catch the parameters when changed.
    const { value, id } = e.target
    setFormData({ ...formData, [id]: value })
    // setFormData1({ ...formData1, [id]: value })
  }

  const columnDefs = [
    { headerName: 'Referral Name', field: 'name' },
    { headerName: 'Category', field: 'category_name' },
    // { headerName: 'Commission', field: 'commission' },
    { headerName: 'Referral Contact', field: 'referralcontact' },
    { headerName: 'Contact Person Name', field: 'contactpersonname' },
    { headerName: 'Contact Person Phone', field: 'contactpersonphone' },
    { headerName: 'Address', field: 'address' },
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
    getReferralPersonList()
  }, [])

  const getReferralPersonList = () => {
    
    // api.getPatient().then(res => setTableData(res.data))
    api.getReferralPersonDetails().then(res => {
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
  
    api.postReferralPersonDetails(formData).then(resp => {
      console.log(resp);
      console.log(resp.data, 'patient');
    });

  
    api
      .getReferralPersonDetails({ headers: { "content-type": "application/json" } })
      .then(resp => {
        getReferralPersonList();
        setFormData(initialReferralPersonValue);
        console.log()
        event.preventDefault();
      });
  
    handleClose();
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>Referral Person List</h4>
          <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
            <button className="btn btn-primary" onClick={handleOpen}>Add Referral Person</button>
          </div>
          <div
            className="ag-theme-balham"
            style={{ height: 500, marginTop: "20px" }}
          >
            <AgGridReact
              rowData={tableData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
            />
          </div>
          <Referralpersondialog open={open} handleClose={handleClose} data={formData} onChange={onChange} handleFormSubmit={handleFormSubmit} />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withTranslation()(ReferralPerson);