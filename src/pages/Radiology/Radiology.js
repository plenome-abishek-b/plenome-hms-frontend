import PropTypes from "prop-types";
import React from "react";
import { Container } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";
//ag-grid modules
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import BillDialog from "pages/Pathology/billDialog";
import RadiologyBillDialog from "./RadiologyBillDialog";
import { useEffect } from "react";
import api from "services/Api";
import { useState } from "react";

const Radiology = props => {
  const [open, setOpen] = React.useState(false);
  const [radiologyBill,setRaiologyBill] = useState([])
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
 const rowData = [
    { billno: 'RADIO2023', caseid: '101', pname: 'Abishek', refdoc: 'oliver thomas', repdate: '06/01', amt: '350' },
    { billno: 'RADIO2023', caseid: '101', pname: 'Abishek', refdoc: 'oliver thomas', repdate: '06/01', amt: '350' },
    { billno: 'RADIO2023', caseid: '101', pname: 'Abishek', refdoc: 'oliver thomas', repdate: '06/01', amt: '350' },
    { billno: 'RADIO2023', caseid: '101', pname: 'Abishek', refdoc: 'oliver thomas', repdate: '06/01', amt: '350' },
    { billno: 'RADIO2023', caseid: '101', pname: 'Abishek', refdoc: 'oliver thomas', repdate: '06/01', amt: '350' },
    { billno: 'RADIO2023', caseid: '101', pname: 'Abishek', refdoc: 'oliver thomas', repdate: '06/01', amt: '350' },
  ];
  useEffect(()=>{
  getRadiologyBill()
  },[])
  const getRadiologyBill =async () =>{
   const response = await api.getRadiologyBill()
   const {data} = response
   setRaiologyBill(data)
   console.log(data,"data response bill")
  }
  const columnDefs = [
    { headerName: 'Case ID.', field: 'id' , cellStyle: {backgroundColor: 'rgba(0,0,0,0.1)', fontWeight: 'bold', color: '#6070FF'}},
    { headerName: 'Bill no.', field: 'id' },
    { headerName: 'Patient Name', field: 'patient_name' },
    { headerName: 'Reference Doctor', field: 'name' },
    { headerName: 'Reporting Date', field: 'date' },
    { headerName: 'Amount', field: 'total' }
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
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t("Radiology")}
            breadcrumbItem={props.t("Radiology")}
          />
          <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
            <Link to='/radiotest'><button className="btn btn-secondary" style={{backgroundColor: '#6070FF', border: '1px solid #6070FF'}}><i className="fas fa-microscope"></i> &nbsp;Radiology Test</button></Link>
            <button className="btn-mod custom-btn" style={{ marginLeft: '10px', border: '1px solid #6070FF' }} onClick={handleClickOpen}><i className="fas fa-file"></i> &nbsp;Generate Bill</button>
          </div>
          <RadiologyBillDialog
            open={open}
            handleClose={handleClose}
          />
          <div
            className="ag-theme-alpine"
            style={{ height: 500, marginTop: "20px" }}
          >
            <AgGridReact
              rowData={radiologyBill}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              pagination={true}
              paginationPageSize={10}
              domLayout='autoHeight'
            />
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withTranslation()(Radiology);