import PropTypes from "prop-types"
import React, { useMemo ,useState , useEffect} from "react"
import { Row, Col, Card, CardBody, Container } from "reactstrap"
import api from "services/Api"

//i18n
import { withTranslation } from "react-i18next"

import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
//redux

const Tpareport = props => {

  const [tableData, setTableData] = useState(null)
  const [consdoctor,setConsdoctor] = useState('')
  const [Tpa,setTpa] = useState('')
  const [chargeCategory,setchargeCategory] = useState('')
  const [chargeName,setchargeName] = useState('')

  console.log(Tpa,'tpa')


  useEffect(()=>{
    handleConsultant()
    handleTPA()
    handleChargeCategory()
    handleChargeName()
    
    
    // handleBloodgroups()
  
  },[])

  const handleConsultant = async () =>{
    const response = await  api.getConsultant()
    const {data} = response
    setConsdoctor(data)
    console.log(data,"data")
  }

  const handleTPA = async () =>{
    const response = await  api.getTPAManagement()
    const {data} = response
    setTpa(data)
    console.log(data,"data")
  }

  const handleChargeCategory = async () =>{
    const response = await  api.getChargeCategory()
    const {data} = response
    setchargeCategory(data)
    console.log(data,"data")
  }

  const handleChargeName = async () =>{
    const response = await  api.getChargeName()
    const {data} = response
    setchargeName(data)
    console.log(data,"data")
  }



  const columnDefs = [
    { headerName: "Checkup No", field: "billno" },
    { headerName: "Case ID", field: "case_reference_id" },
    { headerName: "Head TPA Name", field: "tpa_name" },
    { headerName: "Patient Name", field: "patient_name" },
    { headerName: "Appointment Date", field: "date" },
    { headerName: "Doctor", field: "doctor" },
    { headerName: "Charge Name", field: "charge_name" },
    { headerName: "Charge Category Type", field: "chargeCategory_name" },
    { headerName: "Standard Charge", field: "standard_charge" },
    { headerName: "Applied Charge", field: "apply_charge" },
    {headerName: "TPA Charge", field: 'tpa_charge'},
    {headerName: "Tax Amount", field: 'tax'}
  ]

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  )

  const getTPAReportList = async () => {
    const timeDuration = document.getElementById('timeDuration').value;
    const doctor = document.getElementById('doctor').value;
    const tpa = document.getElementById('tpa').value;
    const caseId = document.getElementById('caseId').value;
    const chargeCategory = document.getElementById('chargeCategory').value;
    const charge = document.getElementById('charge').value;

    const response = await api.getTPADetails(timeDuration, doctor , tpa,caseId,chargeCategory,charge);
    const { data } = response;
    console.log(data, 'TPA report');
    setTableData(data);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Card>
            <CardBody>
              <h4>TPA Report</h4>
              <br />
              <Row>
                <Col lg="4">
                  <label>Time Duration</label>
                  <br />
                  <select style={{ width: "100%", height: "30px", border: '1px solid grey', borderRadius: '5px' }} id="timeDuration" >
                    <option>select</option>
                    <option value="This Year" >Today</option>
                    <option value="This Week" >This Week</option>
                    <option value="Last Week" >Last Week</option>
                    <option value="This Month" >This Month</option>
                    <option value="Last Month" >Last Month</option>
                    <option value="Last 3 Months" >Last 3 Months</option>
                    <option value="Last 6 Months" >Last 6 Months</option>
                    <option value="Last 12 Months" >Last 12 Months</option>
                    <option value="This Year" >This Year</option>
                    <option value="Last Year" >Last Year</option>
                    <option value="Period" >Period</option>
                  </select>
                </Col>
                <Col lg="4">
                  <label>Doctor</label>
                  <br />
                  <select style={{ width: "100%", height: "30px", border: '1px solid grey', borderRadius: '5px' }} id="doctor" >
                    <option>select</option>
                    {consdoctor && consdoctor.map((med) => (
                    <option key={med.id} value={med.id}>
                      {med.name}
                    </option>
                  ))}
                  </select>
                </Col>
                <Col lg="4">
                  <label>TPA</label>
                  <br />
                  <select style={{ width: "100%", height: "30px", border: '1px solid grey', borderRadius: '5px' }} id="tpa" >
                    <option>select</option>
                    {Tpa && Tpa.map((tpa) => (
                    <option key={tpa.id} value={tpa.id}>
                      {tpa.organisation_name}
                    </option>
                  ))}
                  </select>
                </Col>
              </Row>
              <br />
              <Row>
                <Col lg="4">
                  <label>Case ID</label>
                  <br />
                  <input style={{ width: "100%", height: "30px", border: '1px solid grey', borderRadius: '5px' }} id="caseId" >
                   
                  </input>
                </Col>
                <Col lg="4">
                  <label>Charge Category</label>
                  <br />
                  <select style={{ width: "100%", height: "30px", border: '1px solid grey', borderRadius: '5px' }} id="chargeCategory" >
                    <option>select</option>
                    {chargeCategory && chargeCategory.map((ccategory) => (
                      
                      <option key={ccategory.id} value={ccategory.id}>
                        {ccategory.name}
                      </option>
                    ))}
                  </select>
                </Col>
                <Col lg="4">
                  <label>Charge</label>
                  <br />
                  <select style={{ width: "100%", height: "30px", border: '1px solid grey', borderRadius: '5px' }} id="charge" >
                    <option>select</option>
                    {chargeName && chargeName.map((cname) => (
                    <option key={cname.id} value={cname.id}>
                      {cname.name}
                    </option>
                  ))}
                  </select>
                </Col>
              </Row>
              <br />
              <div className="d-flex justify-content-end mt-2">
                <button className="btn-mod btn-sm ms-2" onClick={getTPAReportList} >Search</button>
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

export default withTranslation()(Tpareport)
