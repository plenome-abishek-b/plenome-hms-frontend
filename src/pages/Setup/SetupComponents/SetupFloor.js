import PropTypes from "prop-types"
import React ,{useMemo, useState} from "react"
import { Container, Card, CardBody } from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import SetupFloorDialog from "../SetupDialog/SetupFloorDialog"
//redux

const SetupFloor = props => {

    const [openSetupFloorDialog, setOpenSetupFloorDialog] = useState()

  const rowData = [
    {name: '3rd Floor', desc: 'Neonatal intensive care units (NICUs) which provide care for newborn infants.', action:''}    
]

  const columnDefs = [
    {headerName: 'Name', field: 'name'},
    {headerName: 'Description', field: 'desc'},
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

  const handleOpenFloorDialog = () => {
    setOpenSetupFloorDialog(true);
  }

  const handleCloseFloorDialog = () => {
    setOpenSetupFloorDialog(false);
  }


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>Floor List</h4>
          <Card>
            <CardBody>
            <div className="d-flex justify-content-end">
                <button className="btn-mod bg-soft" onClick={handleOpenFloorDialog}><i className="fa fa-plus"></i>&nbsp; Add Floor</button>
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
                <SetupFloorDialog open={openSetupFloorDialog} handleClose={handleCloseFloorDialog}/>
                </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(SetupFloor)
