import PropTypes from "prop-types"
import React ,{useMemo, useState} from "react"
import { Container, Card, CardBody } from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import SetupFloorDialog from "../SetupDialog/SetupFloorDialog"
import { useEffect } from "react"
import api from "services/Api"
import EditButtonRenderer from "common/data/update-button"
import DeleteButtonRenderer from "common/data/delete-button"
//redux

const SetupFloor = props => {

    const [openSetupFloorDialog, setOpenSetupFloorDialog] = useState()
    const [rowData,setRowdata] = useState([])
    const [selectedData,setSelectedData] = useState({})
//   const rowData = [
//     {name: '3rd Floor', desc: 'Neonatal intensive care units (NICUs) which provide care for newborn infants.', action:''}    
// ]
const handleEditClick = (data) =>{
  console.log(data,"edit");
  setSelectedData(data)
  // setSelectedData()
  setOpenSetupFloorDialog(true)
 }
 const handleDeleteClick = async (data) =>{
  const userConfirmed = window.confirm('Are you sure you want to delete this item?');
  console.log(userConfirmed,"delete");
if(userConfirmed){
const response = await api.deleteSetup_bed_floor(data?.id)
getBedFloor()
}else{
console.log("else");
}
 }

  const columnDefs = [
    {headerName: 'Name', field: 'name'},
    {headerName: 'Description', field: 'description'},
    {
      headerName: 'Actions',
      field: 'actions',
      cellRenderer: 'actionsRenderer',
      cellRendererParams: {
        onEditClick: (row) => handleEditClick(row),
        onDeleteClick: (row) => handleDeleteClick(row),
      },
    },
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
   getBedFloor()
  },[])
  const getBedFloor = async () =>{
    const response = await api.getSetup_bed_floor()
    const {data} = response
    console.log(data,"all data");
    setRowdata(data)
  }

  const handleOpenFloorDialog = () => {
    setOpenSetupFloorDialog(true);
  }

  const handleCloseFloorDialog = () => {
    setOpenSetupFloorDialog(false);
  }

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
          <h4>Floor List</h4>
          <Card>
            <CardBody>
            <div className="d-flex justify-content-end">
                <button className="btn-mod bg-soft" onClick={handleOpenFloorDialog}><i className="fa fa-plus"></i>&nbsp; Add Floor</button>
            </div>
              <div
                className="ag-theme-alpine"
                style={{ height: 500, marginTop: "20px" }}
              >
                <AgGridReact
                  rowData={rowData}
                  columnDefs={columnDefs}
                  defaultColDef={defaultColDef}
                  frameworkComponents={components}
                />
                <SetupFloorDialog getBedFloor={getBedFloor} selectedData={selectedData} open={openSetupFloorDialog} handleClose={handleCloseFloorDialog}/>
                </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  ) 
}

export default withTranslation()(SetupFloor)
 