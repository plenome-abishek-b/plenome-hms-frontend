import PropTypes from "prop-types"
import React, { useMemo, useState } from "react"
import { Row, Col, Card, CardBody, Container } from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"

import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import api from "services/Api"
//redux

const Deathreport = props => {
  const [tableData, setTableData] = useState(null)
  const columnDefs = [
    {headerName: 'Reference No', field: 'reference_no'},
    {headerName: 'Case ID', field: 'case_reference_id'},
    {headerName: 'Guardian Name', field: 'guardian_name'},
    {headerName: 'Gender', field: 'gender'},
    {headerName: 'Death Date', field: 'death_date'},
    {headerName: 'Report', field: 'death_report'}
  ]

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  )

  const getDeaths = async () => {
    const timeDuration = document.getElementById('timeDuration').value;
    const gender = document.getElementById('gender').value;

    const response = await api.getDeathReport(timeDuration, gender);
    const { data } = response;
    console.log(data, 'Death report');
    setTableData(data);
  };


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Card>
            <CardBody>
              <h4>Death Report</h4>
              <Row>
                <Col lg="4">
                  <label>Time Duration</label>
                  <br />
                  <select style={{ width: "100%", height: "30px" }} id="timeDuration">
                    <option>select</option>
                    <option value='today'>Today</option>
                    <option>This Week</option>
                    <option>Last Week</option>
                    <option>This Month</option>
                    <option>Last Month</option>
                    <option>Last 3 Months</option>
                    <option>Last 6 Months</option>
                    <option>Last 12 Months</option>
                    <option value='This Year'>This Year</option>
                    <option value='Last Year'>Last Year</option>
                    <option>Period</option>
                  </select>
                </Col>
                <Col lg="4">
                  <label>Gender</label>
                  <br />
                  <select style={{ width: "100%", height: "30px" }} id="gender">
                    <option>select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </Col>
              </Row>
              <div className="d-flex justify-content-end mt-2">
                <button className="btn btn-primary btn-sm ms-2" onClick={getDeaths}>Search</button>
              </div>
            </CardBody>
          </Card>
          <div className="ag-theme-alpine mt-2" style={{ height: 400 }}>
            <AgGridReact
            rowData={tableData}
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

export default withTranslation()(Deathreport)
