import PropTypes from "prop-types"
import React, { useMemo, useState, useEffect } from "react"
import { Container, Card, CardBody } from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import SetupTaxCategoryDialog from "../SetupDialog/SetupTaxCategoryDialog"
import api from "services/Api"


const setupTaxCategory = props => {
  const initialTaxValue = {
    name: '',
    percentage: '',
    created_at: '2023-06-05 11:11:11'
  }

  const [openTaxCategoryDialog, setOpenTaxCategoryDialog] = useState()
  const [tableData, setTableData] = useState(null)

  const [formData, setFormData] = useState(initialTaxValue)

  const columnDefs = [
    { headerName: "Name", field: "name" },
    { 
      headerName: "Percentage", 
      field: "percentage", 
      valueGetter: ({ data }) => data.percentage.toFixed(2) + "%"
    },
  ];
  
  
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

  const handleOpenTaxCategory = () => {
    setOpenTaxCategoryDialog(true);
  }

  const handleCloseTaxCategory = () => {
    setOpenTaxCategoryDialog(false);
  }

   useEffect(() => {
    // getUsers from json
    getTax()
  }, [])

  const getTax = () => {
    api.getTaxCategory().then(res => setTableData(res.data))
    api.http
  }

  function handleFormSubmit() {
    //for posting and getting data at a sametime
    api.postTaxCategory(formData).then(resp => {
      console.log(resp)
    })
    handleClose()

    api
      .getTaxCategory({ headers: { "content-type": "application/json" } })
      .then(resp => {
        getTax()
        setFormData(initialTaxValue)
        preventDefault()
      })
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>Tax Category List</h4>
          <Card>
            <CardBody>
              <div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button className="btn btn-primary bg-soft" onClick={handleOpenTaxCategory}>
                    <i className="fa fa-plus"></i>&nbsp; Add Tax Category
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
                  <SetupTaxCategoryDialog open={openTaxCategoryDialog} handleClose={handleCloseTaxCategory} data={formData} onChange={onChange} handleFormSubmit={handleFormSubmit}/>
                </div>
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(setupTaxCategory)
