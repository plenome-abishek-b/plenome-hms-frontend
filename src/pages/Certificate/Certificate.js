import PropTypes from "prop-types"
import React,{useMemo, useState, useEffect} from "react"
import { Card, CardBody, Col, Container, Row } from "reactstrap"

import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"

//i18n
import { withTranslation } from "react-i18next"
import api from "services/Api"
//redux

const Certificate = props => {
  const [certificateTemp, setCertificateTemp] = useState(null)
  const [tableData, setTableData] = useState(null)
  const [htmlData, setHtmlData] = useState("");

  console.log(certificateTemp,'certtt')

  const columnDefs = [
    { headerName: "OPD/IPD No", field: "checkupId" },
    { headerName: "Patient Name", field: "patient_name" },
    {headerName: "Gender", field: "gender"},
    {headerName: "Mobile Number", field: 'mobileno'},
    {headerName: "Discharged", field: 'discharged'}
  ]

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  )

  const handlePrint = () => {
    const printWindow = window.open("", "_blank", "width=800,height=600");

    printWindow.document.write(htmlData);

    printWindow.print();
  };

  useEffect(() => {
    getCertificateTemp()
  }, [])

  const getCertificateView = async () => {
    const module = document.getElementById("module").value
    const certificateTemplate = document.getElementById("certificateTemplate").value
    const status = document.getElementById("status").value
    const response = await api.getCertificateOverview(module, certificateTemplate,status)
    const { data } = response
    console.log(data, "Income group report")
    setTableData(data)
    const selectedTemplate = certificateTemp.find(
      (cert) => cert.id === Number(certificateTemplate)
    );
  
    // Check if the selected template is found
    if (selectedTemplate) {
      const certificateHTML = selectedTemplate.certificate_text
        .replace("[name]", data.patient_name)
        .replace("[dob]", new Date(data.dob).toLocaleDateString())
        .replace("[age]", data.age)
        .replace("[gender]", data.gender)
        .replace("[phone]", data.mobileno)
        .replace("[guardian_name]", data.guardian_name)
        .replace("[address]", data.address)
        .replace("[opd_ipd_no]", data.opdId)
        .replace("[opd_checkup_id]", data.checkupId)
        .replace("[consultant_doctor]", data.doctor);
  
      // Update the state with the generated certificate HTML
      setHtmlData(
        `<div>${selectedTemplate.left_header}${certificateHTML}${selectedTemplate.center_header}${selectedTemplate.right_header}</div>`
      );
    }
  }

  const getCertificateTemp = async () => {
    const response = await api.getCertificateTemplate()
    const { data } = response
    console.log(data, "certificate head")
    setCertificateTemp(data)
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Card>
            <CardBody>
              <h4>Select Criteria</h4>
              <br />
              <div>
                <Row>
                  <Col lg="4">
                    <label>Module</label>
                    <br />
                    <select style={{ width: '100%', height: '30px',border: '1px solid grey', borderRadius: '5px' }} id="module">
                      <option>select</option>
                      <option value="1">OPD</option>
                      <option value="2">IPD</option>
                    </select>
                  </Col>

                  <Col lg="4">
                    <label>Certificate Template</label>
                    <br />
                    <select style={{ width: '100%', height: '30px',border: '1px solid grey', borderRadius: '5px' }} id="certificateTemplate">
                      {certificateTemp &&
                        certificateTemp.map((cert) => (
                          <option key={cert.certTemp} value={cert.id}>
                            {cert.certificate_name}
                          </option>
                        ))}
                    </select>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col lg="4">
                    <label>Patient Status</label>
                    <br />
                  </Col>
                </Row>
                <br />
                <Row style={{position: 'relative', right: '15%'}}>
                  <Col lg="4">
                    {/* Move the dropdown inside a new Col */}
                    <select id="status" style={{ width: '100%', height: '30px' ,border: '1px solid grey', borderRadius: '5px'}} >
                      <option>select</option>
                      <option value="yes">Discharged</option>
                      <option value="no">Not Discharged</option>
                    </select>
                  </Col>
                </Row>
                <div className="d-flex justify-content-end mt-3">
                  <button className="btn-mod" onClick={getCertificateView}>
                    Search
                  </button>
                </div>
                 <div dangerouslySetInnerHTML={{ __html: htmlData }} />
                <button onClick={handlePrint} className="btn-mod">Print</button>
              </div>
            </CardBody>
          </Card>
          <div className="ag-theme-alpine mt-2" style={{ height: 400 }}>
            <AgGridReact rowData={tableData} columnDefs={columnDefs} defaultColDef={defaultColDef} 
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

export default withTranslation()(Certificate)