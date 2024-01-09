import React, { useEffect } from "react"
import { Button, Container } from "reactstrap"
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import { useMemo, useState, useCallback, useRef } from "react"
import AlertDialog from "./Dialog/Dialog"
import api from "services/Api"
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { withTranslation } from "react-i18next"
import { Link } from "react-router-dom"

//redux

const initialValue = {
  //reset the form to initial value
  patient_name: "",
  gender: "",
  mobileno: "",
  bloodgroup: "",
  Appointmentno: "",
  Appointmentdate: "",
  priority: "",
  source: "",
  live: "",
  fees: "",
  status: ""
}



const Appointment = props => {
  const gridRef = useRef()

  const [tableData, setTableData] = useState(null)

  const [formData, setFormData] = useState(initialValue)

  const [open, setOpen] = React.useState(false)

  const [datas, setDatas] = useState(null)

  const handleClickOpen = () => {
    //dialog open
    setOpen(true)
  }

  const handleClose = () => {
    //dialog close
    setOpen(false)
  }

  const onChange = e => {
    //catch the parameters when changed.
    const { value, id } = e.target
    setFormData({ ...formData, [id]: value })
  }

  const columnDefs = [
    { headerName: "Patient Name", field: "patient_name", filter: "agSetColumnFilter" },
    {
      headerName: "Appointment No",
      field: "id",
      cellStyle: {
        color: "#6070FF",
        fontWeight: "500",
        backgroundColor: "rgba(0,0,0,0.1)",
      },
    },
    { headerName: "Appointment Date", field: "date" },
    { headerName: "Gender", field: "gender" },
    { headerName: "Phone", field: "mobileno" },
    { headerName: "Priority", field: "priority_status" },
    { headerName: "Live Consultant", field: "live_consult" },
    { headerName: "Fees", field: "amount" },
    { headerName: "Status", field: "appointment_status" },
    {
      headerName: "Actions",
      field: "id",
      cellRendererFramework: params => (
        <div>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(params.value)}
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      ),
    },
  ]

  // const defaultColDef = useMemo(
  //   () => ({
  //     sortable: true,
  //     filter: true,
  //     flex: 1,
  //   }),
  //   []
  // )

  // useEffect(() => {
  //   // getUsers from json
  //   getUsers()
  // }, [])

  // const getUsers = () => {
  //   api.getUser().then(res => setTableData(res.data))
  //   api.http
  // }

  // function handleFormSubmit() {
  //   //for posting and getting data at a sametime
  //   api.postUser(formData).then(resp => {
  //     console.log(resp)
  //   })
  //   handleClose()

  //   api
  //     .getPatient({ headers: { "content-type": "application/json" } })
  //     .then(resp => {
  //       getUsers()
  //       setFormData(initialValue)
  //       preventDefault()
  //     })
  // }

  // const onGridReady = useCallback(params => {
  //   api
  //     .getUser()
  //     .then(resp => resp.data())
  //     .then(data => {
  //       setRowData(data)
  //     })
  // }, [])

  const onBtnExport = useCallback(() => {
    gridRef.current.api.exportDataAsExcel()
  }, [])
  useEffect(() => {
    getAppointment()
  }, [])
  const getAppointment = async () => {
    const response = await api.getAppointment()
    const { data } = response
    console.log(data, 'dddddd')
    setDatas(data)
  }

  const defaultColDef = {
    sortable: true,
    filter: true,
    flex: 1,
  };

  const defaultSort = [
    // Define default sorting based on "Appointment No" column
    { colId: 'id', sort: 'asc' },
  ];

  console.log(datas, 'dataaaaaaa')
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title={props.t("Appointment")}
            breadcrumbItem={props.t("Appointment")}
          />
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            <button
              className="btn-mod bg-soft custom-btn"
              onClick={handleClickOpen}
              style={{ marginRight: "15px" }}
            >
              + Add Appointment
            </button>
            <Link to='/doctorwise'>
              <button
                className="btn-mod bg-soft custom-btn"
                style={{ marginRight: "15px" }}
              >
                <i className="fas fa-align-justify"></i>
                &nbsp;&nbsp;Doctor Wise
              </button>
            </Link>
            <Link to='/patientqueue'>
              <button
                className="btn-mod bg-soft custom-btn"
                style={{ marginRight: "15px" }}
              >
                <i className="fas fa-align-center"></i>&nbsp;&nbsp;Queue
              </button>
            </Link>

            <button
              className="btn-mod bg-soft custom-btn"
              onClick={() => onBtnExport()}
            >
              <i
                className="far fa-file-excel fa-md"
                style={{ paddingRight: "6px" }}
              ></i>
              Export
            </button>
          </div>
        </Container>

        <div
          className="ag-theme-alpine"
          style={{ height: 1000, marginTop: "20px" }}
        >
          <AgGridReact
            ref={gridRef}
            rowData={datas}
            columnDefs={columnDefs}
            pagination={true}
            paginationPageSize={15}
            domLayout='autoHeight'
            defaultColDef={defaultColDef}
            defaultSort={defaultSort}
          />

          <AlertDialog
            open={open}
            handleClose={handleClose}
            data={formData}
          />
        </div>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(Appointment)