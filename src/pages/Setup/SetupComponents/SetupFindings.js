import PropTypes from "prop-types"
import React ,{useMemo, useState} from "react"
import { Container, Card, CardBody } from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
//redux
import SetupFindingDialog from "../SetupDialog/SetupFindingDialog"

const setupFindings = props => {

    const [openFindingDialog, setOpenFindingDialog] = useState()

  const rowData = [
    {finding: 'Stomach Pain', category: 'Fever', find: 'The medical community generally defines a fever as a body temperature above 100.4 degrees Fahrenheit. A body temp between 100.4 and 102.2 degree is usually considered a low-grade fever.', action:''}
  ]

  const columnDefs = [
    {headerName: 'Finding', field: 'finding'},
    {headerName: 'Category', field: 'category'},
    {headerName: 'Finding Description', field: 'find'},
    {headerName: 'Action', field: 'action'}
  ]

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  )

  const handleOpenFinding = () => {
    setOpenFindingDialog(true);
  }

  const handleCloseFindingDialog = () => {
    setOpenFindingDialog(false);
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>Finding List</h4>
          <Card>
            <CardBody>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button className="btn btn-primary bg-soft" onClick={handleOpenFinding}>
                  <i className="fa fa-plus"></i>&nbsp; Add Finding
                </button>
              </div>
              <div
                className="ag-theme-alpine"
                style={{ height: 500, marginTop: "20px" }}
              >
                <AgGridReact
                  rowData={rowData}
                  columnDefs={columnDefs}
                  defaultColDef={defaultColDef}
                />
                <SetupFindingDialog open={openFindingDialog} handleClose={handleCloseFindingDialog}/>
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(setupFindings)
