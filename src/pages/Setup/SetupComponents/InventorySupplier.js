import PropTypes from "prop-types"
import React ,{useMemo, useState} from "react"
import { Container, Card, CardBody } from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import SetupOperationsDialog from "../SetupDialog/SetupOperationDialog"
import SetupInventorySupplierDialog from "../SetupDialog/SetupInventorySupplierDialog"
import { useEffect } from "react"
import api from "services/Api"

const SetupInventorySupplier = props => {

    const [openSetupOperationsDialog, setOpenSetupOperationsDialog] = useState()
    const [supplierData,setSupplierData] = useState([])
    const [inputValue, setInputValue] = useState('');
useEffect(()=>{
  getInventorySupplier()
},[])
const getInventorySupplier = async ()=>{
 const response = await api.getInvestmentSupplier_setup()
 const {data} = response
 setSupplierData(data)
 console.log(data,"vak")
}

  const columnDefs = [
    {headerName: 'Item Supplier', field: 'item_supplier'},
    {headerName: 'Contact Person', field: 'contact_person_name'},
    {headerName: 'Address', field: 'address'},
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

  const handleOpenSetupOperations = () => {
    setOpenSetupOperationsDialog(true);
  }

  const handleCloseSetupOperations = () => {
    setOpenSetupOperationsDialog(false);
  }
  const SearchValue  = async ()=>{
    const response = await api.getInvestmentSupplier_setup(inputValue)
    const {data}= response 
    setSupplierData(data)
 };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };



  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>Item Supplier List</h4>
          {/* <select  id="mySelect" style={{width:'15%'}} onchange={navigate()}> */}
            {/* <option>hi</option>
    <option value='setupinventorycategory'>Inventory Category</option> */}
{/* </select> */}
<input id="myInput" placeholder="search"  name="search" value={inputValue} onChange={handleInputChange} />
        <button onClick={()=>SearchValue()}>Search</button>
          <Card>
            <CardBody>
            <div className="d-flex justify-content-end">    
                <button className="btn btn-primary bg-soft" onClick={handleOpenSetupOperations}><i className="fa fa-plus"></i>&nbsp; Add Item Supplier</button>
            </div>
              <div
                className="ag-theme-alpine"
                style={{ height: 500, marginTop: "20px" }}
              >
                <AgGridReact
                  rowData={supplierData}
                  columnDefs={columnDefs}
                  defaultColDef={defaultColDef}
                />
                <SetupInventorySupplierDialog open={openSetupOperationsDialog} handleClose={handleCloseSetupOperations}/>
                </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(SetupInventorySupplier)
