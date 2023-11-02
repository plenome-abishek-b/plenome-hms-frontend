import PropTypes from "prop-types"
import React ,{useMemo, useState, useEffect} from "react"
import { Container, Card, CardBody } from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import SetupChargeDialog from "../SetupDialog/SetupChargeDialog"
import api from "services/Api"
//redux

const setupCharges = props => {

  const initialChargeValue = {
    name: '',
    type_name: '',
    charge_category_id: '',
    charge_unit_id: '1',
    tax_category_id: '',
    standard_charge: '',
    status: 'ok',
    created_at: '2023-07-09 17:07:07'
  }

    const [openCharge, setOpenCharge] = useState()
    const [tableData, setTableData] = useState(null)
  const [formData, setFormData] = useState(initialChargeValue);

  const columnDefs = [
    {headerName: 'Name', field: 'name'},
    {headerName: 'Charge Category', field: 'charge_category_id'},
    {headerName: 'Charge Type', field: 'type_name'},
    {headerName: 'Unit', field: 'charge_unit_id'},
    {headerName: 'Tax(%)', field: 'tax_category_id'},
    {headerName: 'Standard Charges(₹)', field: 'standard_charge'}
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

  const handleOpenCharge = () => {
    setOpenCharge(true);
  }

  const handleCloseCharge = () => {
    setOpenCharge(false);
  }

  useEffect(() => {
    // getUsers from json
    getSetupcharges()
  }, [])

  const getSetupcharges = () => {
    api.getCharges().then(res => setTableData(res.data))
    api.http
  }

  function handleFormSubmit() {
    api.postCharges(formData).then(resp => {
      console.log(resp)
    })
   

    api
      .getCharges({ headers: { "content-type": "application/json" } })
      .then(resp => {
        getSetupcharges()
        setFormData(initialChargeValue)
        preventDefault()
      })
      handleClose()
  }


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>Charges Details</h4>
          <Card>
            <CardBody>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button className="btn btn-primary bg-soft" onClick={handleOpenCharge}>
                  <i className="fa fa-plus"></i>&nbsp; Add Charges
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
                <SetupChargeDialog open={openCharge} handleClose={handleCloseCharge} data={formData} onChange={onChange} handleFormSubmit={handleFormSubmit}/>
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(setupCharges)
