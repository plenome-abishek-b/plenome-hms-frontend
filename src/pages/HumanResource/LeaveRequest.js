import PropTypes from "prop-types"
import React, { useState } from "react"
import { Container, Row, Col, Card, CardBody} from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//i18n
import { withTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import { AgGridReact } from "ag-grid-react"
import { useMemo } from "react"
import Leaverequestdialog from "./Dialog/LeaveRequestDialog"

//redux

const Leaverequest = props => {
  const [open, setOpen] = useState()
  const rowData = [
    {
      staff: "Super Admin",
      type: "Sick Leave",
      date: "18/04/2023",
      days: "3",
      appdate: "14/04/2023",
      status: "Approved",
      action: "",
    },
  ]

  const columnDefs = [
    { headerName: "Staff", field: "staff" },
    { headerName: "Leave Type", field: "type" },
    { headerName: "Leave Date", field: "date" },
    { headerName: "Days", field: "days" },
    { headerName: "Apply Date", field: "appdate" },
    { headerName: "Status", field: "status" },
    { headerName: "Action", field: "action" },
  ]

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  )

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
        <h4>Approve Leave Request</h4>
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <button className="btn btn-primary" style={{marginRight: '10px'}} onClick={handleOpen}>+&nbsp;Add Leave Request</button>
        </div>
        <div className="ag-theme-alpine mt-4"
            style={{ height: 100 }}>
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
            />
          </div>
          <Leaverequestdialog open={open} handleClose={handleClose}/>
        </Container>
       </div>
    </React.Fragment>
  )
}

export default withTranslation()(Leaverequest)
