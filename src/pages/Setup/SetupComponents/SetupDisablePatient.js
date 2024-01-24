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
import SetupDesignationDialog from "../SetupDialog/SetupDesignationDialog"
import SetupSpecialistDialog from "../SetupDialog/SetupSpecialistDialog"
import EditButtonRenderer from "common/data/update-button"
import DeleteButtonRenderer from "common/data/delete-button"
import SetupPatientDialog from "../SetupDialog/setupPatinetDialog"
import SetupPatientDetails from "../SetupDialog/SetupPatientDetails"
import { Link } from "react-router-dom/cjs/react-router-dom"

const SetupDisablePatient = props => {

    const [openSetupOperationsDialog, setOpenSetupOperationsDialog] = useState()
    const [selectedData,setSelectedData] = useState({})
    const [open,setOpen] = useState()
    const [patientDetail,setPatinetDetails] =useState({})
  const [rowData,setrowDate] = useState([])
  
   const handleDeleteClick = async (data) =>{
    const userConfirmed = window.confirm('Are you sure you want to delete this item?');
           console.log(userConfirmed,"delete");
   if(userConfirmed){
         const deleteResponse = await api.deleteSetupHR_patient(data.id)
         getSetup_Patient()
   }else{
    console.log("cancelled");
   }
   }
  const columnDefs = [
    {headerName: 'Patient Name', field: 'patient_name'},
    {headerName: 'age', field: 'dob'},
    {headerName: 'Gender', field: 'gender'},
    {headerName: 'phone', field: 'mobileno'},
    {headerName: 'Guardian Name', field: 'guardian_name'},
    {headerName: 'Address', field: 'address'},
    {headerName: 'Dead', field: 'is_dead'},
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
    // history.pushState('/setupDisablePatient')
    setSelectedData({})
    setOpenSetupOperationsDialog(true);
  }

  const handleCloseSetupOperations = async () => {
    setOpenSetupOperationsDialog(false);
  }
  const handleEditClick = async (data) =>{
    console.log(data,"edit");
    setOpen(true)
    const response = await api.getByIDSetup_Patient(data.id)
    console.log(response.data,"all data");
    
    setPatinetDetails(response.data)
    // setSelectedData(data)
    // // setSelectedData()
    // setOpenSetupOperationsDialog(true)
   }
  

  const handleClose = () =>{
    setOpen(false)
  }
  useEffect(()=>{
    getSetup_Patient()
   },[])
   const getSetup_Patient = async() =>{
    const response = await api.getDisable_Patient()
    const {data} = response
    setrowDate(data)
    console.log(data,"fd")
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
          <h4>Disable Patient List</h4>
          <Card>
            <CardBody>
            <div className="d-flex justify-content-end">
                {/* <button className="btn-mod bg-soft" onClick={handleOpenSetupOperations}><i className="fa fa-plus"></i>&nbsp; Add Specialist</button>
                <button className="btn-mod bg-soft" onClick={handleOpenSetupOperations}><i className="fa fa-plus"></i>&nbsp; Diabel Patient List</button> */}
                <Link to="/setupPatient">
                <button className="btn-mod bg-soft">&nbsp; Patient List</button>
                </Link>


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
                <SetupPatientDialog selectedData={selectedData} getSetup_Patient={getSetup_Patient} open={openSetupOperationsDialog} handleClose={handleCloseSetupOperations}/>
                <SetupPatientDetails location="enable" open={open} getSetup_Patient={getSetup_Patient} patientDetail={patientDetail} handleClose={handleClose}/>
                </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(SetupDisablePatient)
