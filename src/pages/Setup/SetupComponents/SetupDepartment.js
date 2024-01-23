import PropTypes from "prop-types"
import React ,{useMemo, useState} from "react"
import { Container, Card, CardBody } from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import SetupOperationsDialog from "../SetupDialog/SetupOperationDialog"
import SetupLeavetypeDialog from "../SetupDialog/SetupLeavetypeDialog"
import { useEffect } from "react"
import api from "services/Api"
import SetupDepartmentDialog from "../SetupDialog/SetupDeparmentDialog"
import EditButtonRenderer from "common/data/update-button"
import DeleteButtonRenderer from "common/data/delete-button"

const SetupDepartment = props => {

    const [openSetupOperationsDialog, setOpenSetupOperationsDialog] = useState()

  const [rowData,setrowDate] = useState([])
  const [selectedData,setSelectedData] = useState({})
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
         const deleteResponse = await api.deleteSetupHR_department(data.id)
         getDepartments()
   }else{
    console.log("cancelled");
   }
   }
  const columnDefs = [
    {headerName: 'Department', field: 'department_name'},
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
 useEffect(()=>{
  getDepartments()
 },[])
 const getDepartments= async () =>{
  const response = await api.getSetupHR_department()
  const {data} = response
  setrowDate(data)
  console.log(data,"fd")
 }
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
        <EditButtonRenderer onClick={() => props.onEditClick(props.data)} />
        &nbsp;
        <DeleteButtonRenderer onClick={() => props.onDeleteClick(props.data)} />
      </div>
    )
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>Department</h4>
          <Card>
            <CardBody>
            <div className="d-flex justify-content-end">
                <button className="btn-mod bg-soft" onClick={handleOpenSetupOperations}><i className="fa fa-plus"></i>&nbsp; Add Department</button>
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
                <SetupDepartmentDialog selectedData={selectedData} getDepartments={getDepartments} open={openSetupOperationsDialog} handleClose={handleCloseSetupOperations}/>
                </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(SetupDepartment)
