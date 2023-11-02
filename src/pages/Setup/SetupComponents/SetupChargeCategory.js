import PropTypes from "prop-types"
import React, { useMemo, useState, useEffect } from "react"
import { Container, Card, CardBody } from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"

import SetupChargeCategoryDialog from "../SetupDialog/SetupChargeCategoryDialog"
import api from "services/Api"

const setupChargeCategory = props => {
  const initialChargecategoryValue = {
    charge_type: '',
    name: '',
    description: '',
    is_default: 'yes',
    created_at: '2023-09-08 19:09:09',
    charge_type_id: ''
  }

  const [openChargeCategoryDialog, setOpenChargeCategoryDialog] = useState()

  const [tableData, setTableData] = useState(null)

  const [formData, setFormData] = useState(initialChargecategoryValue)

  const columnDefs = [
    { headerName: "Name", field: "name" },
    { headerName: "Charge Type", field: "charge_type" },
    { headerName: "Description", field: "description" },
    // { headerName: "Action", field: "action" },
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

  const handleOpenCategory = () => {
    setOpenChargeCategoryDialog(true)
  }

  const handleCloseCategory = () => {
    setOpenChargeCategoryDialog(false)
  }

   useEffect(() => {
    // getUsers from json
    getCharge()
  }, [])

  const getCharge = () => {
    api.getChargeCategory().then(res => setTableData(res.data))
    api.http
  }

  function handleFormSubmit() {
    //for posting and getting data at a sametime
    api.postChargeCategory(formData).then(resp => {
      console.log(resp)
    })
    handleClose()

    api
      .getChargeCategory({ headers: { "content-type": "application/json" } })
      .then(resp => {
        getCharge()
        setFormData(initialChargecategoryValue)
        preventDefault()
      })
  }


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>Charges Category List</h4>
          <Card>
            <CardBody>
              <div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button className="btn btn-primary bg-soft" onClick={handleOpenCategory}>
                    <i className="fa fa-plus"></i>&nbsp; Add Charge Category
                  </button>
                </div>
                <div
                  className="ag-theme-alpine"
                  style={{ height: 500, marginTop: "20px" }}
                >
                  <AgGridReact
                    rowData={tableData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                  />
                  <SetupChargeCategoryDialog open={openChargeCategoryDialog} handleClose={handleCloseCategory} data={formData} onChange={onChange} handleFormSubmit={handleFormSubmit}/>
                </div>
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(setupChargeCategory)
