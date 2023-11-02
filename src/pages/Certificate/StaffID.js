import PropTypes from "prop-types"
import React,{useMemo} from "react"
import { Card, CardBody, Col, Container, Row } from "reactstrap"

import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"

//i18n
import { withTranslation } from "react-i18next"

//redux

const Staffcard = props => {
  const columnDefs = [
    { headerName: "Staff ID", field: "staff_id" },
    { headerName: "Name", field: "name" },
    {headerName: "Designation", field: "designation"},
    {headerName: "Department", field: "department"},
    {headerName: "Father Name", field: "fname"},
    {headerName: "Mother Name", field: "mname"},
    {headerName: "Date Of Joining", field: 'doj'},
    {headerName: "Phone", field: 'mobileno'},
    {headerName: "Address", field: 'address'},
    {headerName: "Date Of Birth", field: "dob"}
]

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  )

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
        <Card>
          <CardBody>
          <h4>Select Criteria</h4>
          <br />
          <div>
            <Row>
              <Col lg='6'>
                <label>Role</label>
                <br />
                <select style={{width: '100%', height: '30px'}}>
                  <option>select</option>
                </select>
              </Col>
              <Col lg='6'>
                <label>ID Card Template</label>
                <br />
                <select style={{width: '100%', height: '30px'}}>
                  <option>select</option>
                </select>
              </Col>
              <div className="d-flex justify-content-end mt-2">
                <button className="btn btn-primary">Search</button>
              </div>
            </Row>
          </div>
          </CardBody>
        </Card>
        <div className="d-flex justify-content-end">
            <button className="btn btn-primary">Generate</button>
        </div>
        <h4>Staff List</h4>
        <div className="ag-theme-alpine mt-2" style={{ height: 400 }}>
            <AgGridReact
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
            />
          </div>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(Staffcard)