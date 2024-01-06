import PropTypes from "prop-types"
import React, { useMemo, useState } from "react"
import { Card, CardBody, Col, Container, Row } from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import api from "services/Api"
//redux

const Patientvisitreport = props => {
  const [tableData, setTableData] = useState(null)

  const getPatientVisit = async () => {
    const patient_ID = document.getElementById("patient_ID").value
    const response = await api.getPatientVisitReport(patient_ID)

    const { data } = response
    console.log(data, "patient visit report")

    // Create a new array with the received data
    const updatedTableData = [...data]

    // Update the tableData state with the new array
    setTableData(updatedTableData)
  }

  const columnOpdDefs = [
    { headerName: "OPD No", field: "opdNo" },
    { headerName: "Case ID", field: "caseID" },
    { headerName: "Date", field: "date" },
    { headerName: "OPD Checkup ID", field: "opdCheckupId" },
    { headerName: "Doctor Name", field: "doctorName" },
    { headerName: "Symptoms", field: "symptoms" },
    { headerName: "Findings", field: "findings" },
  ]

  const columnIpdDefs = [
    { headerName: "IPD No", field: "ipdNo" },
    { headerName: "Case ID", field: "caseID" },
    { headerName: "Date", field: "date" },
    { headerName: "Doctor Name", field: "doctorName" },
    { headerName: "Symptoms", field: "symptoms" },
    { headerName: "Findings", field: "findings" },
  ]

  const columnPharmacyDefs = [
    { headerName: "Bill No", field: "billno" },
    { headerName: "Case ID", field: "caseid" },
    { headerName: "Date", field: "date" },
    { headerName: "Discount", field: "discount" },
    { headerName: "Amount", field: "amt" },
    { headerName: "Paid Amount", field: "paidamt" },
    { headerName: "Balance", field: "balamt" },
  ]

  const PathologyDefs = [
    { headerName: "Bill No", field: "billno" },
    { headerName: "Case ID", field: "caseid" },
    { headerName: "Date", field: "date" },
    { headerName: "Discount", field: "discount" },
    { headerName: "Amount", field: "amt" },
    { headerName: "Paid Amount", field: "paidamt" },
    { headerName: "Balance", field: "balamt" },
  ]

  const RadiologyDefs = [
    { headerName: "Bill No", field: "billno" },
    { headerName: "Case ID", field: "caseid" },
    { headerName: "Date", field: "date" },
    { headerName: "Discount", field: "discount" },
    { headerName: "Amount", field: "amt" },
    { headerName: "Paid Amount", field: "paidamt" },
    { headerName: "Balance", field: "balamt" },
  ]

  const BloodBankIssueDefs = [
    { headerName: "Bill No", field: "billno" },
    { headerName: "Case ID", field: "caseid" },
    { headerName: "Issue Date", field: "date" },
    { headerName: "Donor Name", field: "donorname" },
    { headerName: "Bags", field: "bags" },
    { headerName: "Discount", field: "discount" },
    { headerName: "Amount", field: "amt" },
    { headerName: "Paid Amount", field: "paidamt" },
    { headerName: "Balance", field: "balamt" },
  ]

  const BloodBankComponentDefs = [
    { headerName: "Bill No", field: "billno" },
    { headerName: "Case ID", field: "caseid" },
    { headerName: "Issue Date", field: "date" },
    { headerName: "Donor Name", field: "donorname" },
    { headerName: "Component Bags", field: "bags" },
    { headerName: "Discount", field: "discount" },
    { headerName: "Amount", field: "amt" },
    { headerName: "Paid Amount", field: "paidamt" },
    { headerName: "Balance", field: "balamt" },
  ]

  const AmbulanceDefs = [
    { headerName: "Bill No", field: "billno" },
    { headerName: "Case ID", field: "caseid" },
    { headerName: "Date", field: "date" },
    { headerName: "Vehicle Number", field: "vno" },
    { headerName: "Amount", field: "amt" },
    { headerName: "Paid Amount", field: "paidamt" },
    { headerName: "Balance", field: "balamt" },
  ]

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  )

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>Patient Visit Report</h4>
          <Card>
            <CardBody className="p-5">
              <Row>
                <Col lg="4">
                  <div>
                    <label>Patient ID</label>
                    <br />
                    <input
                      placeholder="Patient ID"
                      style={{ width: "100%", height: "30px", border: '1px solid grey', borderRadius: '5px' }}
                      id="patient_ID"
                    ></input>
                    <button
                      className="btn-mod mt-2"
                      onClick={getPatientVisit}
                    >
                      Search
                    </button>
                  </div>
                </Col>
              </Row>
              <br />
              <div className="ag-theme-alpine mt-2" style={{ height: 300 }}>
                <h4>OPD Details</h4>
                <AgGridReact
                  rowData={
                    tableData && tableData.length > 0 ? tableData[0] : []
                  }
                  columnDefs={columnOpdDefs}
                  defaultColDef={defaultColDef}
                />
              </div>
              <br />
              <br />

              <div className="ag-theme-alpine mt-2" style={{ height: 200 }}>
                <h4>IPD Details</h4>
                <AgGridReact
                  rowData={
                    tableData && tableData.length > 0 ? tableData[1] : []
                  }
                  columnDefs={columnIpdDefs}
                  defaultColDef={defaultColDef}
                />
              </div>
              <br />
              <br />
              <div className="ag-theme-alpine mt-2" style={{ height: 100 }}>
                <h4>Pharmacy Details</h4>
                <AgGridReact
                  rowData={
                    tableData && tableData.length > 0 ? tableData[2] : []
                  }
                  columnDefs={columnPharmacyDefs}
                  defaultColDef={defaultColDef}
                />
              </div>
              <br />
              <br />
              <div className="ag-theme-alpine mt-2" style={{ height: 100 }}>
                <h4>Pathology Details</h4>
                <AgGridReact
                rowData={
                    tableData && tableData.length > 0 ? tableData[3] : []
                  }
                  columnDefs={PathologyDefs}
                  defaultColDef={defaultColDef}
                />
              </div>
              <br />
              <br />
              <div className="ag-theme-alpine mt-2" style={{ height: 100 }}>
                <h4>Radiology Details</h4>
                <AgGridReact
                rowData={
                    tableData && tableData.length > 0 ? tableData[4] : []
                  }
                  columnDefs={RadiologyDefs}
                  defaultColDef={defaultColDef}
                />
              </div>
              <br />
              <br />
              <div className="ag-theme-alpine mt-2" style={{ height: 100 }}>
                <h4>Blood Bank Issue Details</h4>
                <AgGridReact
                rowData={
                    tableData && tableData.length > 0 ? tableData[5] : []
                  }
                  columnDefs={BloodBankIssueDefs}
                  defaultColDef={defaultColDef}
                />
              </div>
              <br />
              <br />
              <div className="ag-theme-alpine mt-2" style={{ height: 100 }}>
                <h4>Blood Bank Component Details</h4>
                <AgGridReact
                rowData={
                    tableData && tableData.length > 0 ? tableData[6] : []
                  }
                  columnDefs={BloodBankComponentDefs}
                  defaultColDef={defaultColDef}
                />
              </div>
              <br />
              <br />
              <div className="ag-theme-alpine mt-2" style={{ height: 100 }}>
                <h4>Ambulance Details</h4>
                <AgGridReact
                rowData={
                    tableData && tableData.length > 0 ? tableData[7] : []
                  }
                  columnDefs={AmbulanceDefs}
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

export default withTranslation()(Patientvisitreport)
