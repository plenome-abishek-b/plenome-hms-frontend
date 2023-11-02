import PropTypes from "prop-types"
import React,{useMemo, useState, useEffect} from "react"
import { Card, CardBody, Col, Container, Row } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
//i18n
import { withTranslation } from "react-i18next"
import api from "services/Api"
//redux

const Radiologyreport = props => {
  const [radioName, setRadioName] = useState(null)
  const [testName, setTestName] = useState(null)
  const [collectedBy, setCollectedby] = useState()
  const [tableData,setTableData] = useState(null)

  console.log(radioName,'radio')
  console.log(testName, 'testName')
  const columnDefs = [
    { headerName: "Bill No", field: "bill_no" },
    { headerName: "Date", field: "date"},
    { headerName: "Patient Name", field: "patient_name" },
    { headerName: "Category Name", field: "radio_category" },
    { headerName: "Test Name", field: "test_name" },
    {headerName: "Description", field: "note"},
    { headerName: "Consutant Doctor", field: "consult_doctor" },
    { headerName: "Sample Collected Person Name", field: "sample_collected_by" },
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
    getRadioName()
    getRadioTest()
    getCollected()
  }, [])

  const getRadioName = async () => {
    const response = await api.getRadiologyReportCategory()
    const { data } = response
    console.log(data, "radio cat")
    setRadioName(data)
  }

  const getRadioTest = async () => {
    const response = await api.getRadiologyReportName()
    const { data } = response
    console.log(data, "radio name")
    setTestName(data)
  }

  const getCollected = async () => {
    const response = await api.getCollectedBy()
    const { data } = response
    console.log(data, "collected by")
    setCollectedby(data)
  }

  const getRadiologyReport = async () => {
    const timeDuration = document.getElementById("timeDuration").value
    const collectedBy = document.getElementById("collectedBy").value
    const test = document.getElementById("test").value
    const category = document.getElementById("category").value

    const response = await api.getRadiologyPatientReport(timeDuration, test,category, collectedBy)
    console.log(response,'resss')
    const { data } = response
    console.log(data, "radiology report")
    setTableData(data)
  }


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Card>
            <CardBody>
              <h4>Radiology Patient Report</h4>
              <br />
              <Row>
                <Col lg='3'>
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
                <Col lg='3'>
                  <label>Sample Collected Person Name</label>
                  <br />
                  <select  style={{ width: "100%", height: "30px" }} id="collectedBy">
                  {collectedBy &&
                      collectedBy.map(collect => (
                        <option key={collect.collectedBy} value={collect.id}>
                          {collect.name}
                        </option>
                      ))}
                  </select>
                </Col>
                <Col lg='3'>
                  <label>Category Name</label>
                  <br />
                  <select  style={{ width: "100%", height: "30px" }} id="category">
                  {radioName &&
                    radioName.map(radio_name => (
                        <option key={radio_name.test} value={radio_name.id}>
                          {radio_name.lab_name}
                        </option>
                      ))}
                  </select>
                </Col>
                <Col lg='3'>
                  <label>Test Name</label>
                  <br />
                  <select  style={{ width: "100%", height: "30px" }} id="test">
                  {testName &&
                    testName.map(test_name => (
                        <option key={test_name.tests} value={test_name.id}>
                          {test_name.test_name}
                        </option>
                      ))}
                  </select>
                </Col>
                <div className="mt-2 d-flex justify-content-end">
                  <button className="btn btn-primary" onClick={getRadiologyReport}>Search</button>
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
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(Radiologyreport)