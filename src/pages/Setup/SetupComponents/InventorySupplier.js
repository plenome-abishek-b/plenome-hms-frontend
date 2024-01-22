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
import EditButtonRenderer from "common/data/update-button"
import DeleteButtonRenderer from "common/data/delete-button"

const SetupInventorySupplier = props => {

    const [openSetupOperationsDialog, setOpenSetupOperationsDialog] = useState(false)
    const [supplierData,setSupplierData] = useState([])
    const [inputValue, setInputValue] = useState('');
    const [selectedData,setSelectedData] = useState({})

useEffect(()=>{
  getInventorySupplier()
},[])
const getInventorySupplier = async ()=>{
 const response = await api.getSetup_Inventory_supplier()
 const {data} = response
 setSupplierData(data)
 console.log(data,"vak")
}
const handleEditClick = (data) =>{
  console.log(data,"edit");
  setSelectedData(data)
  // setSelectedData()
  setOpenSetupOperationsDialog(true)
 }

 const handleDeleteClick = async (data) =>{
  const userConfirmed = window.confirm('Are you sure you want to delete this item?');
         console.log(userConfirmed,"delete");
 if(userConfirmed){
       const deleteResponse = await api.deleteSetup_Inventory_supplier(data.id)
       getInventorySupplier()
 }else{
  console.log("cancelled");
 }
 }
  const columnDefs = [
    {headerName: 'Item Supplier', field: 'item_supplier'},
    {headerName: 'Contact Person', field: 'contact_person_name'},
    {headerName: 'Address', field: 'address'},
    {
      headerName: 'Actions',
      field: 'actions',
      cellRenderer: 'actionsRenderer',
      cellRendererParams: {
        onEditClick: (row) => handleEditClick(row),
        onDeleteClick: (row) => handleDeleteClick(row),
      },
    }

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

  const components = {
    actionsRenderer: (props) => (
      <div>
        <EditButtonRenderer onClick={() => props.onEditClick(props.data)} />
        &nbsp;
        <DeleteButtonRenderer onClick={() => props.onDeleteClick(props.data)} />
      </div>
    ),
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
                <button className="btn-mod bg-soft" onClick={handleOpenSetupOperations}><i className="fa fa-plus"></i>&nbsp; Add Item Supplier</button>
            </div>
              <div
                className="ag-theme-alpine"
                style={{ height: 500, marginTop: "20px" }}
              >
                <AgGridReact
                  rowData={supplierData}
                  columnDefs={columnDefs}
                  defaultColDef={defaultColDef}
                  frameworkComponents={components}
                />
                <SetupInventorySupplierDialog getInventorySupplier={getInventorySupplier} selectedData={selectedData} open={openSetupOperationsDialog} handleClose={handleCloseSetupOperations}/>
                </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(SetupInventorySupplier)
