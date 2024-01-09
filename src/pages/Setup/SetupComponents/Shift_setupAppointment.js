import PropTypes from "prop-types"
import React ,{useMemo, useState} from "react"
import { Container, Card, CardBody } from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import SetupBloodBankDialog from "../SetupDialog/SetupBloodBankDialog"
import { useEffect } from "react"
import api from "services/Api"
import SetupShiftDialog from "../SetupDialog/SetupShiftDialog"
//redux

const Shift_setupAppointment = props => {
  const [formData,setFormData] = useState([])
  const [openBbDialog, setOpenBbDialog] = useState();
  const [appointmentSetupShift,setAppointmentSetupShift] = useState([])
  useEffect(()=>{
    getSetupAppointmentShift()
  },[])
  const getSetupAppointmentShift =async () =>{
   const response = await api.getSetupApptShift()
   const {data} = response
   setAppointmentSetupShift(data)
   console.log(data,"resp")
  }

  const columnDefs = [
    {headerName: 'Name', field: 'name'},
    {headerName: 'Time From', field: 'start_time'},
    {headerName: 'Time To', field: 'end_time'}
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

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>Shift</h4>
          <Card>
            <CardBody>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button className="btn-mod bg-soft" onClick={handleOpenBb}>
                  <i className="fa fa-plus"></i>&nbsp; Add Shift
                </button>
              </div>
              <div
                className="ag-theme-alpine"
                style={{ height: 500, marginTop: "20px" }}
              >
                <AgGridReact
                  rowData={appointmentSetupShift}
                  columnDefs={columnDefs}
                  defaultColDef={defaultColDef}
                />
                <SetupShiftDialog open={openBbDialog} handleClose={handleCloseBb} />
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(Shift_setupAppointment)
