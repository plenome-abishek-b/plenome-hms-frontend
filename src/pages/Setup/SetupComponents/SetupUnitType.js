import PropTypes from "prop-types"
import React, { useMemo, useState, useEffect } from "react"
import { Container, Card, CardBody } from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import SetupUnitTypeDialog from "../SetupDialog/SetupUnitTypeDialog"
import api from "services/Api"

const setupUnitType = props => {
  const [openUnitTypeDialog, setOpenUnitTypeDialog] = useState();

  const initialUnitValue = {
    unit:'',
    created_at: '2023-09-08 11:11:11'
  }

  const [tableData, setTableData] = useState(null)

  const [formData, setFormData] = useState(initialUnitValue)

  const columnDefs = [
    { headerName: "Unit Name", field: "unit" },
  ]

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  )

  
  const onChange = e => {
    //catch the parameters when changed.
    const { value, id } = e.target
    setFormData({ ...formData, [id]: value })
  }

  const handleOpenUnitType = () => {
    setOpenUnitTypeDialog(true);
  }

  const handleCloseUnitType = () => {
    setOpenUnitTypeDialog(false);
  }

  useEffect(() => {
    // getUsers from json
    getUnit()
  }, [])

  const getUnit = () => {
    api.getUnitType
    ().then(res => setTableData(res.data))
    api.http
  }

  function handleFormSubmit() {
    //for posting and getting data at a sametime
    api.postUnitType(formData).then(resp => {
      console.log(resp)
    })
    handleClose()

    api
      .getUnitType({ headers: { "content-type": "application/json" } })
      .then(resp => {
        getUnit()
        setFormData(initialUnitValue)
        preventDefault()
      })
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
                  <button className="btn btn-primary bg-soft" onClick={handleOpenUnitType}>
                    <i className="fa fa-plus"></i>&nbsp; Add Unit Type
                  </button>
                </div>
                <div
                  className="ag-theme-alpine"
                  style={{height: 500, marginTop: "20px" }}
                >
                  <AgGridReact
                    rowData={tableData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                  />
                  <SetupUnitTypeDialog open={openUnitTypeDialog} handleClose={handleCloseUnitType} data={formData} onChange={onChange} handleFormSubmit={handleFormSubmit}/>
                </div>
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(setupUnitType)
