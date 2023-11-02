import React, { useState, useMemo, useEffect } from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  Container,
  Button,
  Label,
  Input,
  FormFeedback,
  Form,
  CardTitle,
  Table,
  Nav,
  NavItem,
  NavLink,
  TabPane,
  TabContent,
  CardText,
} from "reactstrap"
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import { Link, withRouter } from "react-router-dom"
import classnames from "classnames"
import api from "services/Api"

function UserSetting() {
  const [activeTab, setactiveTab] = useState("1")
  const [datas,setDatas] = useState(null)
  const [staffdata, setStaffData] = useState(null)

  const toggle = tab => {
    if (activeTab !== tab) {
      setactiveTab(tab)
    }
  }


  const columnDefs = [
    { headerName: "Patient ID", field: "patient_id" },
    { headerName: "Name", field: "patient_name" },
    { headerName: "Username", field: "username" },
    { headerName: "Mobile Number", field: "mobileno" },
    {
      headerName: "Action",
      field: "action",
      cellRendererFramework: params => {
        const toggleAction = () => {
          const { data } = params
          const updatedData = rowData.map(row => {
            if (row === data) {
              return { ...row, action: !row.action }
            }
            return row
          })
          setRowData(updatedData)
        }

        return (
          <input
            type="checkbox"
            checked={params.value}
            onChange={toggleAction}
          />
        )
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

  const staff_columnDefs = [
    {headerName: 'Staff ID', field: 'employee_id'},
    {headerName: 'Name', field: 'staff_name'},
    {headerName: 'Email', field: 'email'},
    {headerName: 'Role', field: 'role_name'},
    {headerName: 'Designation', field: 'designation'},
    {headerName: 'Department', field: 'department_name'},
    {headerName: 'Phone', field: 'contact_no'},
    {headerName: 'Action', field: ''}
  ]

  useEffect(()=>{
    getUserPatient()
    getUserStaff()
  },[])
    const getUserPatient = async () =>{
      const response = await api.getUserPatientSetting()
      const {data} = response
      console.log(data, 'user patient')
      setDatas(data)
    }

    const getUserStaff = async () => {
      const response = await api.getUserStaffSetting()
      const {data} = response
      console.log(data, 'user staff')
      setStaffData(data)
    }
  return (
    <React.Fragment>
      <Nav tabs style={{marginTop: '80px'}}>
        <NavItem>
          <NavLink
            style={{ cursor: "pointer" }}
            className={classnames({
              active: activeTab === "1",
            })}
            onClick={() => {
              toggle("1")
            }}
          >
            Patient
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            style={{ cursor: "pointer" }}
            className={classnames({
              active: activeTab === "2",
            })}
            onClick={() => {
              toggle("2")
            }}
          >
            Staff
          </NavLink>
        </NavItem>
      </Nav>
      <div style={{ margin: "20px 20px" }}>
        <h4>Users</h4>
        <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
        <div
          className="ag-theme-alpine"
          style={{ height: 500, marginTop: "20px" }}
        >
          <AgGridReact
            rowData={datas}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
          />
        </div>
        </TabPane>
        <TabPane tabId="2">
        <div
          className="ag-theme-alpine"
          style={{ height: 500, marginTop: "20px" }}
        >
          <AgGridReact
            rowData={staffdata}
            columnDefs={staff_columnDefs}
            defaultColDef={defaultColDef}
          />
          </div>
        </TabPane>
        </TabContent>
        
      </div>
    </React.Fragment>
  )
}

export default UserSetting
