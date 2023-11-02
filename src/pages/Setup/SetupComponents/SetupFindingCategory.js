import PropTypes from "prop-types"
import React ,{useMemo, useState} from "react"
import { Container, Card, CardBody } from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import SetupFindingCategoryDialog from "../SetupDialog/SetupFindingCategoryDialog"
//redux


const setupFindingCategory = props => {
  
    const [openFindingCategoryDialog, setOpenFindingCategoryDialog] = useState()

  const rowData = [
    { category: 'Fever', action:''}
  ]

  const columnDefs = [
    {headerName: 'Category', field: 'category'},
    // {headerName: 'Action', field: 'action'}
  ]

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  )

  const handleOpenFindingCategory = () => {
    setOpenFindingCategoryDialog(true);
  }

  const handleCloseFindingCategory = () => {
    setOpenFindingCategoryDialog(false);
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>Finding Category List</h4>
          <Card>
            <CardBody>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button className="btn btn-primary bg-soft" onClick={handleOpenFindingCategory}>
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
                <SetupFindingCategoryDialog open={openFindingCategoryDialog} handleClose={handleCloseFindingCategory}/>
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(setupFindingCategory)
