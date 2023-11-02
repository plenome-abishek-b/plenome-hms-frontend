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

const SetupDepartment = props => {

    const [openSetupOperationsDialog, setOpenSetupOperationsDialog] = useState()

  const [rowData,setrowDate] = useState([])
  
  const columnDefs = [
    {headerName: 'Department', field: 'department_name'},
  ]
 useEffect(()=>{
  getDepartments()
 },[])
 const getDepartments= async () =>{
  const response = await api.getHrsetup_Department()
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
    setOpenSetupOperationsDialog(true);
  }

  const handleCloseSetupOperations = () => {
    setOpenSetupOperationsDialog(false);
  }


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>Department</h4>
          <Card>
            <CardBody>
            <div className="d-flex justify-content-end">
                <button className="btn btn-primary bg-soft" onClick={handleOpenSetupOperations}><i className="fa fa-plus"></i>&nbsp; Add Department</button>
            </div>
              <div
                className="ag-theme-alpine"
                style={{ height: 500, marginTop: "20px" }}
              >
                <AgGridReact
                  rowData={rowData}
                  columnDefs={columnDefs}
                  defaultColDef={defaultColDef}
                />
                <SetupDepartmentDialog getDepartments={getDepartments} open={openSetupOperationsDialog} handleClose={handleCloseSetupOperations}/>
                </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(SetupDepartment)
