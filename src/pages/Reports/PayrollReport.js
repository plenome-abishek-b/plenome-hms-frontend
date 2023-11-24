import PropTypes from "prop-types"
import React, { useMemo,useState } from "react"
import { Row, Col, Card, CardBody, Container } from "reactstrap"
import api from "services/Api"

//i18n
import { withTranslation } from "react-i18next"

import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
//redux

const Payrollreport = props => {

  const [tableData, setTableData] = useState(null)
  console.log(tableData,'tabledata')


  const columnDefs = [
    {headerName: 'Name', field: 'name'},
    {headerName: 'Role', field: 'role_name'},
    {headerName: 'Designation', field: 'designation'},
    {headerName: 'Month', field: 'month'},
    {headerName: 'Year', field: 'year'},
    {headerName: 'Payment Date', field: 'payment_date'},
    {headerName: 'Payslip', field: 'id'},
    {headerName: 'Basic Salary', field: 'basic'},
    {headerName: 'Earning', field: 'total_allowance'},
    {headerName: 'Deduction', field: 'total_deduction'},
    {headerName: 'Gross Salary', field: 'gross_salary'},
    {headerName: 'Tax', field: 'tax'},
    {headerName: 'Net Salary', field: 'net_salary'},
]

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  )


  const getReportPayroll = async () => {
    const timeDuration = document.getElementById('timeDuration').value;

    const response = await api.getPayrollReport(timeDuration);
    const { data } = response;
    console.log(data, 'payroll report');
    setTableData(data);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Card>
            <CardBody>
              <h4>Payroll Report</h4>
              <Row>
                <Col lg='4'>
                  <label>Time Duration</label>
                  <br />
                  <select style={{ width: "100%", height: "30px" }} id="timeDuration">
                    <option>select</option>
                    <option>Today</option>
                    <option>This Week</option>
                    <option>Last Week</option>
                    <option>This Month</option>
                    <option>Last Month</option>
                    <option>Last 3 Months</option>
                    <option>Last 6 Months</option>
                    <option>Last 12 Months</option>
                    <option>This Year</option>
                    <option>Last Year</option>
                    <option>Period</option>
                  </select>
                  <div className="d-flex justify-content-end mt-2">
                    <button className="btn btn-primary btn-sm ms-2" onClick={getReportPayroll}>
                      Search
                    </button>
                  </div>
                </Col>
              </Row>
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

export default withTranslation()(Payrollreport)
