import PropTypes from "prop-types"
import React ,{useMemo, useState, useEffect} from "react"
import { Container, Card, CardBody } from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import SetupBloodBankDialog from "../SetupDialog/SetupBloodBankDialog"
import api from "services/Api"
//redux

const SetupBloodBank = props => {

  const initialBloodProductValue = {
    name: '',
    is_blood_group: '',
    created_at: '2023-09-08 11:11:11'
  }

  const [formData, setFormData] = useState(initialBloodProductValue);
  const [tableData, setTableData] = useState();
  const [openBbDialog, setOpenBbDialog] = useState(null);

  const columnDefs = [
    {headerName: 'Name', field: 'name'},
    {headerName: 'Type', field: 'type'},
    {headerName: 'Action', field: 'action '}
  ]

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  )

  const handleOpenBb = () => {
    setOpenBbDialog(true)
  }

  const handleCloseBb = () => {
    setOpenBbDialog(false)
  }

  const onChange = e => {
    //catch the parameters when changed.
    const { value, id } = e.target
    setFormData({ ...formData, [id]: value })
    // setFormData1({ ...formData1, [id]: value })
  }

  // useEffect(() => {
  //   // getUsers from json
  //   getBloodProduct()
  // }, [])

  // const getBloodProduct = () => {
  //   api.getSetupBloodBank().then(res => setTableData(res.data))
  //   api.http
  // }

  function handleFormSubmit() {
    api.postSetupBloodBank(formData).then(resp => {
      console.log(resp)
    })
   

    api
      .getSetupBloodBank({ headers: { "content-type": "application/json" } })
      .then(resp => {
        // getBloodProduct()
        setFormData(initialBloodProductValue)
        preventDefault()
      })
      handleCloseBb()
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>Products List</h4>
          <Card>
            <CardBody>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button className="btn btn-primary bg-soft" onClick={handleOpenBb}>
                  <i className="fa fa-plus"></i>&nbsp; Add Products
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
                <SetupBloodBankDialog open={openBbDialog} handleClose={handleCloseBb} handleFormSubmit={handleFormSubmit} onChange={onChange} data={formData}/>
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(SetupBloodBank)
