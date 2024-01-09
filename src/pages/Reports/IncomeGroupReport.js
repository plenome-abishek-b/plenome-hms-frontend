import PropTypes from "prop-types"
import React, { useMemo, useState, useEffect } from "react"
import { Container, Row, Col, Card, CardBody } from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import api from "services/Api"
//redux

const Incomegroupreport = props => {
  const [tableData, setTableData] = useState(null)
  const [incomeHead, setIncomeHead] = useState([])
  const columnDefs = [
    { headerName: "Name", field: "name" },
    { headerName: "Invoice Number", field: "invoice_no" },
    { headerName: "Income Head", field: "income_category" },
    { headerName: "Income ID", field: "id" },
    { headerName: "Date", field: "date" },
    { headerName: "Amount", field: "amount" },
  ]
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  )

  useEffect(() => {
    getIncomes()
    getIncomeHead()
  }, [])

  const getIncomes = async () => {
    const timeDuration = document.getElementById("timeDuration").value
    const incomeHead = document.getElementById("incomeHead").value
    const response = await api.getIncomegroupReport(timeDuration, incomeHead)
    const { data } = response
    console.log(data, "Income group report")
    setTableData(data)
  }

  const getIncomeHead = async () => {
    const response = await api.getIncomeHeads()
    const { data } = response
    console.log(data, "income head")
    setIncomeHead(data)
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <h4>Income Group Report</h4>
          <Card>
            <CardBody>
              <Row>
                <Col lg="4">
                  <label>Time Duration</label>
                  <br />
                  <select
                    style={{ width: "100%", height: "30px", border: '1px solid grey', borderRadius: '5px' }}
                    id="timeDuration"
                  >
                    <option>select</option>
                    <option value="today">Today</option>
                    <option>This Week</option>
                    <option>Last Week</option>
                    <option>This Month</option>
                    <option>Last Month</option>
                    <option>Last 3 Months</option>
                    <option>Last 6 Months</option>
                    <option>Last 12 Months</option>
                    <option value="This Year">This Year</option>
                    <option>Last Year</option>
                    <option>Period</option>
                  </select>
                </Col>
                <Col lg="4">
                  <label>Search Income Head</label>
                  <br />
                  <select style={{ width: "100%", height: "30px", border: '1px solid grey', borderRadius: '5px' }} id="incomeHead">
                    <option>select one</option>
                    {incomeHead &&
                      incomeHead.map(income => (
                        <option key={income.incomeHead} value={income.id}>
                          {income.income_category}
                        </option>
                      ))}
                  </select>
                </Col>
              </Row>
              <div className="d-flex justify-content-end mt-2">
                <button className="btn-mod" onClick={getIncomes}>
                  Search
                </button>
              </div>
            </CardBody>
          </Card>

          <br />
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

export default withTranslation()(Incomegroupreport)
