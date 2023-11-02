import PropTypes from "prop-types";
import React from "react";
import { Container } from "reactstrap";
import AmbulanceDialog from "./AmbulanceDialog";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import { AgGridReact } from "ag-grid-react";
import { useMemo } from "react";

//redux

const Ambulance = props => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const rowData = [
    { billno: 'AMB100', caseid: '202301', pname: 'Raju', dname: 'Rama', contact: '8974658932', address: 'No.1,Vivekananda street,dubai', date: '06/01', vehicle: 'DB31AD4675', amt: '200' },
    { billno: 'AMB100', caseid: '202301', pname: 'Raju', dname: 'Rama', contact: '8974658932', address: 'No.1,Vivekananda street,dubai', date: '06/01', vehicle: 'DB31AD4675', amt: '200' },
    { billno: 'AMB100', caseid: '202301', pname: 'Raju', dname: 'Rama', contact: '8974658932', address: 'No.1,Vivekananda street,dubai', date: '06/01', vehicle: 'DB31AD4675', amt: '200' },
    { billno: 'AMB100', caseid: '202301', pname: 'Raju', dname: 'Rama', contact: '8974658932', address: 'No.1,Vivekananda street,dubai', date: '06/01', vehicle: 'DB31AD4675', amt: '200' }
  ];

  const columnDefs = [
    { headerName: 'Case ID', field: 'caseid',cellStyle: {backgroundColor: '#EEEEEE', fontWeight: 'bold', color: 'blue'}},
    { headerName: 'Bill no', field: 'billno' },
    { headerName: 'Patient Name', field: 'pname' },
    { headerName: 'Driver Name', field: 'dname' },
    { headerName: 'Driver Contact', field: 'contact' },
    { headerName: 'Patient Address', field: 'address' },
    { headerName: 'Date', field: 'date' },
    { headerName: 'Vehicle no', field: 'vehicle' },
    { headerName: 'Amount(₹)', field: 'amt' },

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
            title={props.t("Ambulance")}
            breadcrumbItem={props.t("Ambulance")}
          />
          <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
            <button className="btn btn-primary" onClick={handleClickOpen}><i className="fas fa-ambulance"></i>
              &nbsp;Add Ambulance Call
            </button>
          </div>
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
          <AmbulanceDialog 
            open={open}
            handleClose={handleClose}
          />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withTranslation()(Ambulance);
