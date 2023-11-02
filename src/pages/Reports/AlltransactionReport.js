import PropTypes from "prop-types"
import React,{useMemo, useState, useEffect} from "react"
import { Container, Row, Col, CardBody, Card } from "reactstrap"

//i18n
import { useSSR, withTranslation } from "react-i18next"

import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import api from "services/Api"

//redux

const Alltransactionreport = props => {
  const [tableData, setTableData] = useState(null)
  const [collectedBy, setCollectedby] = useState()

    const columnDefs = [
        {headerName:"Transaction ID",field:"billno"},
        { headerName: "Date", field: "payment_date"},
        { headerName:"Patient Name",field:"patient_name"},
        { headerName: "Reference", field: "referance" },
        { headerName: "Category", field: "section"},
        { headerName: "Collected By", field: "collected_by" },
        { headerName: "Payment Type", field: "type" },
        { headerName: "Payment Mode", field: "payment_mode" },
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
        getCollected()
        getTransactions()
      }, [])

      const getCollected = async () => {
        const response = await api.getCollectedBy()
        const { data } = response
        console.log(data, "income head")
        setCollectedby(data)
      }
    
      const getTransactions = async () => {
        const timeDuration = document.getElementById("timeDuration").value
        const collectedBy = document.getElementById("collectedBy").value
        const head = document.getElementById("head").value
        const response = await api.getAllTransactionReport(timeDuration, collectedBy,head)
        console.log(response,'resss')
        const { data } = response
        console.log(data, "all transaction report")
        setTableData(data)
      }
      
   return (
    <React.Fragment>
      <div className="page-content">
        <Card>
          <CardBody>
            <Container fluid>
              <h4>Transaction Report</h4>
              <br />
              <div>
                <Row>
                  <Col lg="4" md="4" sm="12">
                    <label>Time Duration</label>
                    <br />
                    <select style={{width: '100%', height: '30px'}} id="timeDuration">
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
                  <Col lg="4" md="4" sm="12">
                    <label>Collected By</label>
                    <br />
                    <select style={{width: '100%', height: '30px'}} id="collectedBy">
                    {collectedBy &&
                      collectedBy.map(collect => (
                        <option key={collect.collectedBy} value={collect.id}>
                          {collect.name}
                        </option>
                      ))}
                    </select>
                  </Col>
                  <Col lg="4" md="4" sm="12">
                  <label>Select Head</label>
                    <br />
                    <select style={{width: '100%', height: '30px'}} id="head">
                        <option>select</option>
                        <option value="ipd">IPD</option>
                        <option value="opd">OPD</option>
                        <option value="pharmacy bill">Pharmacy Bill</option>
                        <option value="Pathology Test">Pathology Test</option>
                        <option value="Radiology Test">Radiology Test</option>
                        <option value="Blood Issue">Blood Issue</option>
                        <option value="Ambulance Call">Ambulance Call</option>
                        <option value="Income">Income</option>
                        <option value="Expenses">Expenses</option>
                    </select>
                  </Col>
                  <div className="d-flex justify-content-end mt-3">
                    <button className="btn btn-primary" onClick={getTransactions}>Search</button>
                  </div>
                </Row>
                <br />
                <div className="ag-theme-alpine mt-2" style={{ height: 400 }}>
                <AgGridReact
                rowData={tableData}
                  columnDefs={columnDefs}
                  defaultColDef={defaultColDef}
                />
              </div>
              </div>
            </Container>
          </CardBody>
        </Card>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(Alltransactionreport)
