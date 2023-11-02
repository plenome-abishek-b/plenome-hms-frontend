import PropTypes from "prop-types"
import React ,{useMemo, useState, useEffect} from "react"
import { Container, Card, CardBody } from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
//redux
import SetupSupplierDialog from "../SetupDialog/SetupSupplierDialog"
import api from "services/Api"

const SetupSupplier = props => {

  const initialSupplierValue = {
    supplier: '',
    contact: '',
    supplier_person: '',
    supplier_person_contact: '',
    supplier_drug_licence: '',
    address: '', 
    created_at: '2023-04-05 11:11:11'
  }
 
  const [openSetupSupplierDialog, setOpenSetupSupplierDialog] = useState()
    const [tableData, setTableData] = useState();
    const [formData, setFormData] = useState(initialSupplierValue);

  const columnDefs = [
    {headerName: 'Supplier Name', field: 'supplier'},
    {headerName: 'Supplier Contact', field: 'contact'},
    {headerName: 'Contact Person Name', field: 'supplier_person'},
    {headerName: 'Contact Person Phone', field: 'supplier_person_contact'},
    {headerName: 'Drug License Number', field: 'supplier_drug_licence'},
    {headerName: 'Address', field: 'address'},
  ]

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  )

  const onChange = (e) => {
    console.log(e.target.value,"lllll")
    const { value, id } = e.target;
    setFormData({ ...formData, [id]: value });
  };


  const handleOpenSupplier = () => {
    setOpenSetupSupplierDialog(true);
  }

  const handleCloseSupplier = () => {
    setOpenSetupSupplierDialog(false);
  }

  useEffect(() => {
    // getUsers from json
    getSupplier()
  }, [])

  const getSupplier = () => {
    api.getMedSupplier().then(res => setTableData(res.data))
    api.http
  }

  function handleFormSubmit() {
    //for posting and getting data at a sametime
    api.postMedSupplier(formData).then(resp => {
      console.log(resp)
    })
    handleClose()

    api
      .getMedSupplier({ headers: { "content-type": "application/json" } })
      .then(resp => {
        getSupplier()
        setFormData(initialSupplierValue)
        preventDefault()
      })
  }


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>Supplier List</h4>
          <Card>
            <CardBody>
            <div className="d-flex justify-content-end">
                <button className="btn btn-primary bg-soft" onClick={handleOpenSupplier}><i className="fa fa-plus"></i>&nbsp; Add Supplier</button>
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
                <SetupSupplierDialog open={openSetupSupplierDialog} handleClose={handleCloseSupplier} data={formData} onChange={onChange} handleFormSubmit={handleFormSubmit}/>
                </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(SetupSupplier)
