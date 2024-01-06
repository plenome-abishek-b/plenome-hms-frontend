import PropTypes from "prop-types"
import React,{useMemo} from "react"
import { Card, CardBody, Col, Container, Row } from "reactstrap"

import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"

//i18n
import { withTranslation } from "react-i18next"

//redux

const Patientcard = props => {
  const columnDefs = [
    { headerName: "Patient Name", field: "patient_name" },
    { headerName: "Age", field: "age" },
    {headerName: "Gender", field: "gender"},
    {headerName: "Phone", field: 'mobileno'},
    {headerName: "Guardian Name", field: 'guardian_name'},
    {headerName: "Address", field: 'address'}
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
                <label>Patient</label>
                <br />
                <select style={{width: '100%', height: '30px',border: '1px solid grey', borderRadius: '5px'}}>
                  <option>select</option>
                </select>
              </Col>
              <Col lg='6'>
                <label>ID Card Template</label>
                <br />
                <select style={{width: '100%', height: '30px',border: '1px solid grey', borderRadius: '5px'}}>
                  <option>select</option>
                </select>
              </Col>
              <div className="d-flex justify-content-end mt-2">
                <button className="btn-mod">Search</button>
              </div>
            </Row>
          </div>
          </CardBody>
        </Card>
        <div className="d-flex justify-content-end">
            <button className="btn-mod">Generate</button>
        </div>
        <h4>Patient List</h4>
        <div className="ag-theme-alpine mt-2" style={{ height: 400 }}>
            <AgGridReact
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              pagination={true}
              paginationPageSize={10}
              domLayout='autoHeight'
            />
          </div>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(Patientcard)