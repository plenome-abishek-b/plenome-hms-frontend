import PropTypes from "prop-types"
import React ,{useMemo, useState} from "react"
import { Container, Card, CardBody } from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-material.css"
import SetupBloodBankDialog from "../SetupDialog/SetupBloodBankDialog"
import { useEffect } from "react"
import api from "services/Api"
import SetupShiftDialog from "../SetupDialog/SetupShiftDialog"
import EditButtonRenderer from "common/data/update-button"
import DeleteButtonRenderer from "common/data/delete-button"
//redux

const Shift_setupAppointment = props => {
  const [formData,setFormData] = useState([])
  const [openBbDialog, setOpenBbDialog] = useState();
  const [appointmentSetupShift,setAppointmentSetupShift] = useState([])
  const [selectedData,setSelectedData] = useState([])
  useEffect(()=>{
    getSetupAppointmentShift()
  },[])
  const getSetupAppointmentShift =async () =>{
   const response = await api.getSetupApptShift()
   const {data} = response
   setAppointmentSetupShift(data)
   console.log(data,"resp")
  }

  const handleEditClick = (data) =>{
    console.log(data,"edit");
    setSelectedData(data)
    // setSelectedData()
    setOpenBbDialog(true)
   }
   const handleDeleteClick = async (data) =>{
    const userConfirmed = window.confirm('Are you sure you want to delete this item?');
           console.log(userConfirmed,"delete");
   if(userConfirmed){
         const deleteResponse = await api.deleteSetupApptShift(data.id);
        //  const {data} = deleteResponse;
        //  console.log(data,"delted sucessfully")
         getSetupAppointmentShift()
        //  setTimeout(() => {
        //   getFindings();
        // }, 500);
        // handleClose();
   }else{
    console.log("cancelled");
   }
   }

  const columnDefs = [
    {headerName: 'Name', field: 'name'},
    {headerName: 'Time From', field: 'start_time'},
    {headerName: 'Time To', field: 'end_time'},
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

  const handleOpenBb = () => {
    setSelectedData({});
    setOpenBbDialog(true);
  }

  const handleCloseBb = () => {
    setOpenBbDialog(false)
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
          <h4>Shift</h4>
          <Card>
            <CardBody>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button className="btn-mod bg-primary" onClick={handleOpenBb}>
                  <i className="fa fa-plus"></i>&nbsp; Add Shift
                </button>
              </div>
              <div
                className="ag-theme-material"
                style={{ height: 500, marginTop: "20px" }}
              >
                <AgGridReact
                  rowData={appointmentSetupShift}
                  columnDefs={columnDefs}
                  defaultColDef={defaultColDef}
                  frameworkComponents={components}
                />
                <SetupShiftDialog getSetupAppointmentShift={getSetupAppointmentShift} selectedData={selectedData} open={openBbDialog} handleClose={handleCloseBb} />
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(Shift_setupAppointment)
