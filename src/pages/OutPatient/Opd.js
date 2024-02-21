import PropTypes from "prop-types";
import React from "react";
import { useState, useEffect } from "react";
import { Container } from "reactstrap";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import { useMemo } from "react";
import api from "services/Api";
import "./styles.css"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";
import OpdDialog from "./DialogOpd";
// import { clearConfigCache } from "prettier";
//redux

const Opd = props => {

  const [id, setId] = useState('')

const [fetchData,setFetchData] = useState('')
console.log(fetchData,'fetchdata');
  const [open, setOpen] = useState(false);
  const [tableData, setTableData] = useState(null)
  const [formData, setFormData] = useState()
  console.log(formData,'formdata')

  // {console.log(tableData,'data')}


 
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
console.log(tableData,"jjijijij")

  const columnDefs = [
    // {
    //   headerName: "Patient ID",
    //   field: "  ",
    //   filter: "agSetColumnFilter",
    //   cellStyle: { color: 'red', fontWeight: '900', backgroundColor: '#EEEEEE' },
    //   cellRenderer: (params) => {
      //     return (
      // const pid = params.data.id;
    //       <a href={`/opdprofile/${pid}`}>
    //         {pid}
    //       </a>
    //     );
    //   }
    // },
    {
      headerName: "Name", field: "patient_name", cellRenderer: (params) => {
        const name = params.data.patient_name;
        const pid = params.data.id
        return (
          <a href={`/opdprofile/${pid}`}>
            {name}
          </a>
        );
      }
    },
    { headerName: "Patient ID", field: "id"},
    {headerName: "Guardian Name", field: "guardian_name"},
    { headerName: "Gender", field: "gender" },
    { headerName: "Contact", field: "mobileno" },
    { headerName: "Consultant", field: "doctor" },
    // { headerName: "Last visit", field: "appointment_date" },
    { headerName: "Age", field: "age" }
    //{ headerName: "Total Recheckup", field: "totalrecheckup" },
  ];

  const gridOptions = {
    domLayout: 'autoHeight', // Set domLayout to autoHeight
    defaultColDef: {
      flex: 1, // Set the default flex property for columns
      sortable: true,
      filter: true,
    },
    onFirstDataRendered: (params) => {
      params.api.autoSizeAllColumns(); // Auto-size all columns on first data render
    },
  };

 useEffect(()=>{
  getOPDpatient()
 },[])
 const getOPDpatient = async () => {
  const response = await api.getOpdOutpatient_MainModule();
  const modifiedData = response.data.map(patient => ({
      ...patient,
      patient_name: patient.patient_name.replace('/', ' ')
  }));
  console.log(modifiedData, "wwwwwwww");
  setTableData(modifiedData);
}

   return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title={props.t("OPD")}
            breadcrumbItem={props.t("Out Patient")}
          />

          <OpdDialog  setFetchData={setFetchData} open={open} handleClose={handleClose} />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <button className="btn-mod bg-soft custom-btn" onClick={handleClickOpen}>
              Add Outpatient
            </button>
          </div>
        </Container>
        <div
          className="ag-theme-alpine"
          style={{ height: 500, marginTop: "20px" }}
        >
          <AgGridReact
            rowData={tableData}
            columnDefs={columnDefs}
            // defaultColDef={defaultColDef}
            pagination={true}
            paginationPageSize={10}
            domLayout='autoHeight'
            gridOptions={gridOptions}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default withTranslation()(Opd);