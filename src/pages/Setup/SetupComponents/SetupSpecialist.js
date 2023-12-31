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

const SetupSpecialist = props => {

    const [openSetupOperationsDialog, setOpenSetupOperationsDialog] = useState()

  const [rowData,setrowDate] = useState([])
  
  const columnDefs = [
    {headerName: 'Designation List', field: 'specialist_name'},
  ]
 useEffect(()=>{
  getSpecialist()
 },[])
 const getSpecialist= async () =>{
  const response = await api.getHrsetup_Specilist()
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
          <h4>Designation</h4>
          <Card>
            <CardBody>
            <div className="d-flex justify-content-end">
                <button className="btn-mod bg-soft" onClick={handleOpenSetupOperations}><i className="fa fa-plus"></i>&nbsp; Add Designation</button>
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
                <SetupSpecialistDialog getSpecialist={getSpecialist} open={openSetupOperationsDialog} handleClose={handleCloseSetupOperations}/>
                </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(SetupSpecialist)
