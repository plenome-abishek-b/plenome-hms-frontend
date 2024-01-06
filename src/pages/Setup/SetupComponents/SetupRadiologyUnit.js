import PropTypes from "prop-types"
import React, { useMemo, useState, useEffect } from "react"
import { Container, Card, CardBody } from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import SetupRadiologyUnitDialog from "../SetupDialog/SetupRadiologyUnitDialog"
import api from "services/Api"

const setupRadiologyUnit = props => {
  const [openRadiologyUnitDialog, setOpenRadiologyUnitDialog] = useState();
  const [data,setData] = useState()

  const rowData = [
    {unit: 'Micrometer'}
  ]

  const columnDefs = [
    { headerName: "Unit Name", field: "unit_name" },
  ]

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  )
  useEffect(()=>{
    getRadiologyUnit()
  },[])


  const handleOpenPathUnitType = () => {
    setOpenRadiologyUnitDialog(true);
  }

  const handleClosePathUnitType = () => {
    setOpenRadiologyUnitDialog(false);
  }
 const getRadiologyUnit = async () =>{
 const response = await api.getRadiologyUnit()
 const {data} = response
 setData(data)
 }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>Unit Type List</h4>
          <Card>
            <CardBody>
              <div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button className="btn-mod bg-soft" onClick={handleOpenPathUnitType}>
                    <i className="fa fa-plus"></i>&nbsp; Add Unit Type
                  </button>
                </div>
                <div
                  className="ag-theme-alpine"
                  style={{height: 500, marginTop: "20px" }}
                >
                  <AgGridReact
                    rowData={data}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                  />
                  <SetupRadiologyUnitDialog open={openRadiologyUnitDialog} handleClose={handleClosePathUnitType} />
                </div>
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(setupRadiologyUnit)
