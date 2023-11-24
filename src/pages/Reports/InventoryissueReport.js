import PropTypes from "prop-types"
import React, { useMemo , useState} from "react"
import { Card, CardBody, Container, Row, Col } from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import api from "services/Api"
//redux

const InventoryissueReport = props => {
  const [tableData, setTableData] = useState(null)

  const columnDefs = [
    { headerName: "Item", field: "name" },
    { headerName: "Item Category", field: "item_category" },
    { headerName: "Issue - Return", field: "issue_return" },
    { headerName: "Issue To", field: "issued_to" },
    { headerName: "Issued By", field: "issue_by" },
    { headerName: "Quantity", field: "quantity" },
  ]

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  )

  const getInventoryIssues = async () => {
    const timeDuration = document.getElementById("timeDuration").value
    const response = await api.getInventoryIssueReport(timeDuration)
    const { data } = response
    console.log(data, "Inventory Issue report")
    setTableData(data)
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>Inventory Issue Report</h4>
          <Card>
            <CardBody>
              <Row>
                <Col lg="4">
                  <label>Time Duration</label>
                  <br />
                  <select style={{ width: "100%", height: "30px" }} id="timeDuration">
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
                    <option value="Last Year">Last Year</option>
                    <option>Period</option>
                  </select>
                </Col>
                <div className="d-flex justify-content-end">
                  <button className="btn btn-primary" onClick={getInventoryIssues}>Search</button>
                </div>
              </Row>
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
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(InventoryissueReport)
