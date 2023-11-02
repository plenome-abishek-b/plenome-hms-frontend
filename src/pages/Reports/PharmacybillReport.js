import PropTypes from "prop-types"
import React,{useMemo, useState, useEffect} from "react"
import { Container, Row, Col, CardBody, Card } from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"

import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import api from "services/Api"

//redux

const Pharmacybillreport = props => {
  const [tableData,setTableData] = useState(null)
  const [collectedBy, setCollectedby] = useState()

    const columnDefs = [
        {headerName:"Bill No",field:"bill_no"},
        { headerName: "Date", field: "date"},
        { headerName:"Patient Name",field:"patient_name"},
        { headerName: "Age", field: "age" },
        { headerName: "Gender", field: "gender"},
        { headerName: "Prescription No", field: "prescription_no" },
        { headerName: "Doctor Name", field: "doctor_name" },
        { headerName: "Collected By", field: "collected_by" },
        { headerName: "Total", field: "total" },
        { headerName: "Paid Amount", field: "paid_amount" },
        { headerName: "Balance Amount", field: "balance_amount" },
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
      }, [])

      const getCollected = async () => {
        const response = await api.getCollectedBy()
        const { data } = response
        console.log(data, "collected by")
        setCollectedby(data)
      }

      const getPharmacyBill = async () => {
        const timeDuration = document.getElementById("timeDuration").value
        const collectedBy = document.getElementById("collectedBy").value
        const gender = document.getElementById("gender").value
        const fromAge = document.getElementById("fromAge").value
        const toAge = document.getElementById("toAge").value
        const paymentMode = document.getElementById("paymentMode").value
        const response = await api.getPharmacyBillReport(timeDuration, fromAge,toAge,gender, collectedBy,paymentMode)
        console.log(response,'resss')
        const { data } = response
        console.log(data, "pharmacy bill report")
        setTableData(data)
      }

  return (
    <React.Fragment>
      <div className="page-content">
        <Card>
          <CardBody>
            <Container fluid>
              <h4>Pharmacy Bill Report</h4>
              <br />
              <div>
                <Row>
                  <Col lg="4" md="6" sm="12">
                    <label>Time Duration</label>
                    <br />
                    <select style={{width: '100%', height: '30px'}} id="timeDuration">
                        <option>select</option>
                        <option>Today</option>
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
                  <Col lg="4" md="6" sm="12">
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
                  <Col lg="4" md="6" sm="12">
                  <label>From Age</label>
                    <br />
                    <select style={{width: '100%', height: '30px'}} id="fromAge">
                        <option>select</option>
                        <option value="5">5</option>
                        <option>10</option>
                        <option>15</option>
                        <option>20</option>
                        <option>25</option>
                        <option>30</option>
                        <option>35</option>
                        <option>40</option>
                        <option>45</option>
                        <option>50</option>
                        <option>55</option>
                        <option>60</option>
                        <option>65</option>
                        <option>70</option>
                        <option>75</option>
                        <option>80</option>
                        <option>85</option>
                        <option>90</option>
                        <option>95</option>
                    </select>
                  </Col>
                 
                </Row>
                <br />
                <Row>
                <Col lg='4' md='6' sm='12'>
                <label>To Age</label>
                    <br />
                    <select style={{width: '100%', height: '30px'}} id="toAge">
                        <option>select</option>
                        <option>5</option>
                        <option>10</option>
                        <option>15</option>
                        <option>20</option>
                        <option>25</option>
                        <option>30</option>
                        <option>35</option>
                        <option>40</option>
                        <option>45</option>
                        <option>50</option>
                        <option>55</option>
                        <option>60</option>
                        <option>65</option>
                        <option value="70">70</option>
                        <option>75</option>
                        <option>80</option>
                        <option>85</option>
                        <option>90</option>
                        <option>95</option>
                    </select>
                  </Col>
                  <Col lg='4' md='6' sm='12'>
                    <label>Gender</label>
                    <br />
                    <select style={{width: '100%', height: '30px'}} id="gender">
                        <option>select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                  </Col>
                  <Col lg='4' md='6' sm='12'>
                    <label>Payment Mode</label>
                    <br />
                    <select style={{width: '100%', height: '30px'}} id="paymentMode">
                        <option>select</option>
                        <option value="Cash">Cash</option>
                        <option value="Cheque">Cheque</option>
                        <option value="UPI">UPI</option>
                    </select>
                  </Col>
                </Row>
                <div className="d-flex justify-content-end mt-3">
                    <button className="btn btn-primary" onClick={getPharmacyBill}>Search</button>
                  </div>
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

export default withTranslation()(Pharmacybillreport)
