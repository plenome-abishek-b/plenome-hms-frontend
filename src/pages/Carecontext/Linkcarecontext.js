import React, { useEffect } from "react"
import { Button, Container } from "reactstrap"
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import { useMemo, useState, useCallback, useRef } from "react"
import api from "services/Api"
import CarecontextDialog from "./Dialog/Carecontextdialog"
//Import Breadcrumb
import { withTranslation } from "react-i18next"
import { Link } from "react-router-dom"

//redux

const Linkcarecontext = props => {
  const gridRef = useRef()

  const [open, setOpen] = useState(false);

  const rowData = [
    {name: 'ramu',age: '23', contact: '9962313564', date: '11/12/2023', link: ''}
  ]

  const columnDefs = [
    { headerName: 'Name', field: 'name' },
    {headerName: 'Age', field: 'age'},
    { headerName: 'Phone', field: 'contact' },
    { headerName: 'Date', field: 'date' },
    {
      headerName: "Link",
      field: "link",
      cellRendererFramework: params => (
        <div>
          <button
            className="btn-mod btn-sm"
            onClick={() => handleLinkButtonClick(params.value)}
          >
            <i className="fas fa-link"></i>
            &nbsp;Link
          </button>
        </div>
      ),
    },
];

const handleLinkButtonClick = linkValue => {
  console.log("Link button clicked");
  setOpen(true);
}

const handleDialogClose = () => { 
  console.log("Dialog closed");
  setOpen(false);
}

  
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
         <h4>Link Care-context</h4>
        </Container>
        {open && <CarecontextDialog handleClose={handleDialogClose}/>}
        <div
          className="ag-theme-alpine"
          style={{ height: 1000, marginTop: "70px" }}
        >
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            pagination={true}
            paginationPageSize={20}
            domLayout='autoHeight'
          />
        </div>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(Linkcarecontext)