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
//redux

const DoctorShift_setupAppointment = props => {
  const [formData,setFormData] = useState([])
  const [openBbDialog, setOpenBbDialog] = useState();

  const rowData = [
    {name: 'A +', type: 'blood group'}
  ]
  // useEffect(()=>{
  // getBloodBanks()
  // },[])
const getBloodBanks =async () =>{
 const response = await api.getBloodbankSetup()
 const {data} = response
 setFormData(data)
 console.log(data,"blood")
}
  const columnDefs = [
    {headerName: 'Doctor Name', field: 'name'},
    {headerName: 'Morning', field: 'group_or_component'},
    {headerName: 'Night', field: 'action '}
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
     getDoctorshifts()
  },[])

  const getDoctorshifts =async () =>{
    const response = await api.getAppointmentdoctorshift()
    const {data} = response
    console.log(data,"dww")
  }

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
          <h4>Doctor shift</h4>
          <Card>
            <CardBody>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                {/* <button className="btn btn-primary bg-soft" onClick={handleOpenBb}>
                  <i className="fa fa-plus"></i>&nbsp; Add Shift
                </button> */}
              </div>
              <div
                className="ag-theme-alpine"
                style={{ height: 500, marginTop: "20px" }}
              >
                <AgGridReact
                  rowData={formData}
                  columnDefs={columnDefs}
                  defaultColDef={defaultColDef}
                />
                <SetupBloodBankDialog open={openBbDialog} handleClose={handleCloseBb} />
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(DoctorShift_setupAppointment)
