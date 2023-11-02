import PropTypes from "prop-types"
import React ,{useMemo, useState} from "react"
import { Container, Card, CardBody } from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import SetupOperationCategoryDialog from "../SetupDialog/SetupOperationCategoryDialog"

const SetupOperationCategory = props => {

  const [openSetupOperationDialog, setOpenSetupOperationDialog] = useState();

  const rowData = [
    {name: 'ENT and Oral Surgery', action: ''},
    {name: 'Gynaecology', action: ''}
]

  const columnDefs = [
    {headerName: 'Name', field: 'name'},
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

  const handleOpenOperation = () => {
    setOpenSetupOperationDialog(true);
  }

  const handleCloseOperation = () => {
    setOpenSetupOperationDialog(false);
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>Operation Category List</h4>
          <Card>
            <CardBody>
            <div className="d-flex justify-content-end">
                <button className="btn btn-primary bg-soft" onClick={handleOpenOperation}><i className="fa fa-plus"></i>&nbsp; Add Category</button>
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
                <SetupOperationCategoryDialog open={openSetupOperationDialog} handleClose={handleCloseOperation}/>
                </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(SetupOperationCategory)
