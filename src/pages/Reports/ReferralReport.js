import PropTypes from "prop-types"
import React, { useMemo , useState , useEffect} from "react"
import { Row, Col, Card, CardBody, Container } from "reactstrap"
import api from "services/Api"

//i18n
import { withTranslation } from "react-i18next"

import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
//redux

const Referralreport = props => {

  const [tableData, setTableData] = useState(null)
  const [payee,setPayee] = useState('')
  const [patientType,setPatientType] = useState('')
  const [patient,setPatient] = useState('')

  console.log(patientType,'patientType')


  useEffect(()=>{
    handlePayee()
    handlePatientType()
    handlePatient()
    
    // handleBloodgroups()
  
  },[])

  const handlePayee = async () =>{
    const response = await  api.getPayeeDetails()
    const {data} = response
    setPayee(data)
    console.log(data,"data")
  }

  const handlePatientType = async () =>{
    const response = await  api.getPatientTypeDetails()
    const {data} = response
    setPatientType(data)
    console.log(data,"data")
  }

  const handlePatient = async () =>{
    const response = await  api.getAllPatients()
    const {data} = response
    setPatient(data)
    console.log(data,"data")
  }

  const columnDefs = [
    {headerName: 'Name', field: 'name'},
    {headerName: 'Patient Name', field: 'patient_name'},
    {headerName: 'Bill No', field: 'billing_id'},
    {headerName: 'Bill Amount', field: 'bill_amount'},
    {headerName: 'Commission Percentage', field: 'percentage'},
    {headerName: 'Commission Amount', field: 'amount'}
  ]

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  )

  const getReferralReportList = async () => {
    const payee = document.getElementById('payee').value;
    const patient_type = document.getElementById('patient_type').value;
    const patient = document.getElementById('patient').value;

    const response = await api.getReferralReport(payee, patient_type , patient);
    const { data } = response;
    console.log(data, 'referral report');
    setTableData(data);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Card>
            <CardBody>
              <h4>Referral Report</h4>
              <br />
              <Row>
                <Col lg="4">
                  <label>Payee</label>
                  <br />
                  <select style={{ width: "100%", height: "30px" }} id="payee" >
                    <option>select</option>
                    {payee && payee.map((pay) => (
                    <option key={pay.name} value={pay.name}>
                      {pay.name}
                    </option>
                  ))}
                  </select>
                </Col>
                <Col lg="4">
                  <label>Patient Type</label>
                  <br />
                  <select style={{ width: "100%", height: "30px" }} id="patient_type" >
                    <option>select</option>
                    {patientType && patientType.map((type) => (
                    <option key={type.name} value={type.name}>
                      {type.referral_type}  
                    </option>
                  ))}
                  </select>
                </Col>
                <Col lg="4">
                  <label>Patient</label>
                  <br />
                  <select style={{ width: "100%", height: "30px" }} id="patient" >
                    <option>select</option>
                    {patient && patient.map((pat) => (
                    <option key={pat.id} value={pat.id}>
                      {pat.patient_name}
                    </option>
                  ))}
                  </select>
                </Col>
              </Row>
              <br />
              <div className="d-flex justify-content-end mt-2">
                <button className="btn btn-primary btn-sm ms-2" onClick={getReferralReportList} >Search</button>
              </div>
            </CardBody>
          </Card>
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

export default withTranslation()(Referralreport)
