import PropTypes from "prop-types"
import React,{useMemo, useState} from "react"
import { Card, CardBody, Container,Row,Col } from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import api from "services/Api"
//redux

const InventoryitemReport = props => {
  const [tableData, setTableData] = useState(null)
    const columnDefs = [
        {headerName: 'Name', field: 'name'},
        {headerName: 'Category', field: 'item_category'},
        {headerName: 'Supplier', field: 'item_supplier'},
        {headerName: 'Store', field: 'item_store'},
       {headerName: 'Quantity', field: 'quantity'},
       {headerName: 'Purchase Price', field: 'purchase_price'}
]
    
      const defaultColDef = useMemo(
        () => ({
          sortable: true,
          filter: true,
          flex: 1,
        }),
        []
      )

  
 const getInventoryItems = async () => {
    const timeDuration = document.getElementById("timeDuration").value
    const response = await api.getInventoryItemReport(timeDuration)
    const { data } = response
    console.log(data, "Inventory Item report")
    setTableData(data)
  }

    
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>Inventory Item Report</h4>
          <Card>
            <CardBody>
            <Row>
                <Col lg='4'>
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
                    <option>Last Year</option>
                    <option>Period</option>
                  </select>
                </Col>
                <div className="d-flex justify-content-end">
                <button className="btn btn-primary" onClick={getInventoryItems}>Search</button>
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

export default withTranslation()(InventoryitemReport)