import PropTypes from "prop-types";
import React from "react";
import { Container } from "reactstrap";
import AmbulanceListDialog from "./AmbulanceListDialog";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import { AgGridReact } from "ag-grid-react";
import { useMemo } from "react";


//redux

const AmbulanceList = props => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const rowData = [
    { vehicleno: 'AMB100', model: 'BS4FGD', made: '2023', dname: 'Rama', contact: '8974658932', license: 'TN31BD5747', date: '06/01', note: 'nothing', vtype: 'Rental' },
  ];

  const columnDefs = [
    { headerName: 'Vehicle Number', field: 'vehicleno',cellStyle: {backgroundColor: '#EEEEEE', fontWeight: 'bold', color: 'blue'}},
    { headerName: 'Vehicle Model', field: 'model' },
    { headerName: 'Year Made', field: 'made' },
    { headerName: 'Driver Name', field: 'dname' },
    { headerName: 'Driver Contact', field: 'contact' },
    { headerName: 'Driver License', field: 'license' },
    { headerName: 'Date', field: 'date' },
    { headerName: 'Note', field: 'note' },
    { headerName: 'Vehicle Type', field: 'vtype' },

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
          <h4>Ambulance List</h4>
          <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
            <button className="btn btn-primary" onClick={handleClickOpen}><i className="fas fa-ambulance"></i>
              &nbsp;Add Ambulance
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
          <AmbulanceListDialog 
            open={open}
            handleClose={handleClose}
          />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withTranslation()(AmbulanceList);
