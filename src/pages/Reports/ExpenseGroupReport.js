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

const Expensegroupreport = props => {
  const [expenseHead, setExpenseHead] = useState([])
  const [tableData, setTableData] = useState(null)

  const columnDefs = [
    { headerName: "Name", field: "name" },
    { headerName: "Invoice Number", field: "invoice_no" },
    { headerName: "Expense Head", field: "exp_category" },
    { headerName: "Expense ID", field:"id" },
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
    getExpenseHead()
    getExpenses()
  }, [])

  const getExpenses = async () => {
    const timeDuration = document.getElementById("timeDuration").value
    const expenseHead = document.getElementById("expenseHead").value

    const response = await api.getExpensegroupReport(timeDuration, expenseHead)
    const { data } = response
    console.log(data, "expense group report")
    setTableData(data)
  }

  const getExpenseHead = async () => {
    const response = await api.getExpenceHeads()
    const { data } = response
    console.log(data, "expense head")
    setExpenseHead(data)
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <h4>Expense Group Report</h4>
          <Card>
            <CardBody>
              <Row>
                <Col lg="4">
                  <label>Time Duration</label>
                  <br />
                  <select
                    style={{ width: "100%", height: "30px" }}
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
                  <label>Search Expense Head</label>
                  <br />
                  <select
                    style={{ width: "100%", height: "30px" }}
                    id="expenseHead"
                  >
                    {expenseHead &&
                      expenseHead.map(expense => (
                        <option key={expense.expenseHead} value={expense.id}>
                          {expense.exp_category}
                        </option>
                      ))}
                  </select>
                </Col>
              </Row>
              <div className="d-flex justify-content-end mt-2">
                <button className="btn btn-primary" onClick={getExpenses}>Search</button>
              </div>
            </CardBody>
          </Card>

          <br />
          <div className="ag-theme-alpine mt-2" style={{ height: 400 }}>
            <AgGridReact
              rowData={tableData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
            />
          </div>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(Expensegroupreport)
