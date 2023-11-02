import PropTypes from "prop-types"
import React ,{useMemo, useState} from "react"
import { Container, Card, CardBody } from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import SetupOperationsDialog from "../SetupDialog/SetupOperationDialog"

const SetupOperations = props => {

    const [openSetupOperationsDialog, setOpenSetupOperationsDialog] = useState()

  const rowData = [
    {name: 'Tooth Extraction',category: 'ENT and Oral Surgery', action: ''},
]

  const columnDefs = [
    {headerName: 'Name', field: 'name'},
    {headerName: 'Category', field: 'category'},
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

  const handleOpenSetupOperations = () => {
    setOpenSetupOperationsDialog(true);
  }

  const handleCloseSetupOperations = () => {
    setOpenSetupOperationsDialog(false);
  }


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>Operation List</h4>
          <Card>
            <CardBody>
            <div className="d-flex justify-content-end">
                <button className="btn btn-primary bg-soft" onClick={handleOpenSetupOperations}><i className="fa fa-plus"></i>&nbsp; Add Operation</button>
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
                <SetupOperationsDialog open={openSetupOperationsDialog} handleClose={handleCloseSetupOperations}/>
                </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(SetupOperations)
