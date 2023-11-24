import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Container } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import {  withTranslation } from "react-i18next";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import { AgGridReact } from "ag-grid-react";
import { useMemo } from "react";
import BirthDialog from "./BirthRecordDialog";
import api from "services/Api";
//redux

const Birthrecord = props => {

  const initialBirthValue = {
    child_name: '',
    child_pic: '',
    gender: '',
    birth_date: '',
    weight: '',
    patient_id: '1',
    case_reference_id: '',
    contact: '',
    mother_pic: '',
    father_name: '',
    father_pic: '',
    document: '',
    is_active: 'yes',
    created_at: '2023-09-09 11:11:11'
  }

  const [open, setOpen] = React.useState(false);
  const [tableData, setTableData] = useState(null)
  const [formData, setFormData] = useState(initialBirthValue);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const columnDefs = [
    { headerName: 'Case ID', field: 'case_reference_id' , cellStyle: {backgroundColor: '#EEEEEE', fontWeight: 'bold', color: 'green'}},
    { headerName: 'Reference no.', field: 'reference_no' },
    { headerName: 'Child Name', field: 'child_name' },
    { headerName: 'Gender', field: 'gender' },
    { headerName: 'Father Name', field: 'father_name' },
    { headerName: 'Mother Name', field: 'Mother name' },
    { headerName: 'Report', field: 'birth_report' },
    { headerName: 'Birth Date', field: 'birth_date' },
  ];

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  );

  const onChange = (e) => {
    console.log(e.target.value,"lllll")
    const { value, id } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  useEffect(() => {
    // getUsers from json
    getBirthrecords()
  }, [])

  const getBirthrecords = () => {
    api.getBirthRecord().then(res => setTableData(res.data))
    api.http
  }

  function handleFormSubmit() {
    api.postBirthRecord(formData).then(resp => {
      console.log(resp)
    })
   

    api
      .getBirthRecord({ headers: { "content-type": "application/json" } })
      .then(resp => {
        getBirthrecords()
        setFormData(initialBirthValue)
        preventDefault()
      })
      handleClose()
  }


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t("Birth Record")}
            breadcrumbItem={props.t("Birth Records")}
          />
          <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
            <button className="btn btn-primary" onClick={handleClickOpen}>Add Birth Record</button>
          </div>
          <div
            className="ag-theme-alpine"
            style={{ height: 500, marginTop: "20px" }}
          >
            <AgGridReact
              rowData={tableData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              pagination={true}
              paginationPageSize={10}
              domLayout='autoHeight'
            />
          </div>
          <BirthDialog 
            open={open}
            handleClose={handleClose}
            data={formData}
            onChange={onChange}
            handleFormSubmit={handleFormSubmit}
          />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withTranslation()(Birthrecord);