import PropTypes from "prop-types"
import React,{useMemo, useState} from "react"
import { Container, Row, Col, CardBody, Card } from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"

import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import api from "services/Api"
//redux

const Dailytransactionreport = props => {
  const [tableData, setTableData] = useState(null)
  const columnDefs = [
   {headerName: 'Date', field: 'payment_date'},
   {headerName: 'Total Transaction', field: 'totalTransaction'},
   {headerName: 'Online', field: 'online'},
   {headerName: 'Offline', field: 'offline'},
   {headerName: 'Amount', field: 'total'},
   {headerName: 'Action', field: 'action'}
  ]

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  )

  const getDailyTransaction = async () => {
    const fromDate = document.getElementById("fromDate").value
    const toDate = document.getElementById("toDate").value
    const response = await api.getDailyTransactionReport(fromDate, toDate)
    const { data } = response
    console.log(data, "Daily Transaction report")
    setTableData(data)
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Card>
          <CardBody>
            <Container fluid>
              <h4>Daily Transaction Report</h4>
              <br />
              <div>
                <Row>
                  <Col lg="6" md="6" sm="12">
                    <label>Date From</label>
                    <br />
                    <input type="date" style={{width: '80%' , height: '30px', border: '1px solid grey', borderRadius: '5px'}} id="fromDate"></input>
                  </Col>
                  <Col lg="6" md="6" sm="12">
                    <label>Date To</label>
                    <br />
                    <input type="date" style={{width: '80%' , height: '30px', border: '1px solid grey', borderRadius: '5px'}} id="toDate"></input>
                  </Col>
                  <div className="d-flex justify-content-end mt-3">
                    <button className="btn-mod" onClick={getDailyTransaction}>Search</button>
                  </div>
                </Row>
              </div>
            </Container>
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
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(Dailytransactionreport)
