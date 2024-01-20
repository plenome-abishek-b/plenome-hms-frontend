import PropTypes from "prop-types"
import React ,{useMemo, useState} from "react"
import { Container, Card, CardBody } from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import SetupOperationsDialog from "../SetupDialog/SetupOperationDialog"
import SetupInventoryStoreDialog from "../SetupDialog/SetupInventoryStoreDialog"
import { useEffect } from "react"
import api from "services/Api"
import EditButtonRenderer from "common/data/update-button"
import DeleteButtonRenderer from "common/data/delete-button"

const SetupInventoryStore = props => {

    const [openSetupOperationsDialog, setOpenSetupOperationsDialog] = useState()
     const [storeData,setStoreData] = useState([])
     const [inputValue, setInputValue] = useState('');
  const [selectedData,setSelectedData] = useState({})

useEffect(()=>{
  getInventoryStore()
},[])
const getInventoryStore = async () =>{
    const response = await api.getSetup_Inventory_store()
    const {data} = response
    setStoreData(data)
    console.log(data)
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
       const deleteResponse = await api.deleteSetup_Inventory_store(data.id)
       getInventoryStore()
 }else{
  console.log("cancelled");
 }
 }
const SearchValue  = async ()=>{
    const response = await api.getInvestmentStore_setup (inputValue)
    const {data}= response 
    setStoreData(data)
 };
 const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const columnDefs = [
    {headerName: 'Item Store Name', field: 'item_store'},
    {headerName: 'Item Store Code', field: 'code'},
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
    setSelectedData({})
    setOpenSetupOperationsDialog(true);
  }

  const handleCloseSetupOperations = () => {
    setOpenSetupOperationsDialog(false);
  }

  const components = {
    actionsRenderer: (props) => (
      <div>
        <EditButtonRenderer onClick={() => props.onEditClick(props.data)}/>
        &nbsp;
        <DeleteButtonRenderer onClick={() => props.onDeleteClick(props.data)} />
      </div>
    ),
  };
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>Item Store List</h4>
          {/* <select style={{width:'15%'}}>
    <option>select</option>
</select> */}
<input id="myInput" placeholder="search"  name="search" value={inputValue} onChange={handleInputChange} />
        <button onClick={()=>SearchValue()}>Search</button>
          <Card>
            <CardBody>
            <div className="d-flex justify-content-end">
                <button className="btn-mod bg-soft" onClick={handleOpenSetupOperations}><i className="fa fa-plus"></i>&nbsp; Add Item Store</button>
            </div> 
              <div
                className="ag-theme-alpine"
                style={{ height: 500, marginTop: "20px" }}
              >
                <AgGridReact
                  rowData={storeData}
                  columnDefs={columnDefs}
                  defaultColDef={defaultColDef}
                  frameworkComponents={components}
                />
                <SetupInventoryStoreDialog selectedData={selectedData} getInventoryStore={getInventoryStore} open={openSetupOperationsDialog} handleClose={handleCloseSetupOperations}/>
                </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(SetupInventoryStore)
