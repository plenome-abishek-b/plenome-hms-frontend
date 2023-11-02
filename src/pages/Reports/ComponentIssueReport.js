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

const Componentissuereport = props => {

  const [tableData, setTableData] = useState(null)
  const [consdoctor,setConsdoctor] = useState('')
  const [bloodCollectedBy,setbloodCollectedBy] = useState('')
  const [amountCollectedBy,setamountCollectedBy] = useState('')
  const [bloodgroupData,setbloodgroupData] = useState('')
  const [component,setComponent] = useState('')



  useEffect(()=>{
    bloodCollected()
    amountCollected()
    handleBloodgroup()
    handleComponent()
    handleConsultant()
    
    // handleBloodgroups()
  
  },[])

  const handleConsultant = async () =>{
    const response = await  api.getConsultant()
    const {data} = response
    setConsdoctor(data)
    console.log(data,"data")
  }

  
  const bloodCollected = async () =>{
    const response = await  api.getAmbulanceCollected()
    const {data} = response
    setbloodCollectedBy(data)
    console.log(data,"data")
  }

  const amountCollected = async () =>{
    const response = await  api.getAmbulanceCollected()
    const {data} = response
    setamountCollectedBy(data)
    console.log(data,"data")
  }

  const handleBloodgroup = async () =>{
    const response = await  api.getBloodgroups()
    const {data} = response
    setbloodgroupData(data)
    console.log(data,"data")
  }

  const handleComponent = async () =>{
    const response = await  api.getComponents()
    const {data} = response
    setComponent(data)
    console.log(data,"data")
  }

  const columnDefs = [
    {headerName: 'Bill No', field: 'bill_no'},
    {headerName: 'Issue Date', field: 'date_of_issue'},
    {headerName: 'Received To', field: 'receivedTo'},
    {headerName: 'Blood Group', field: 'name'},
    {headerName: 'Component', field: 'name'},
    {headerName: 'Gender', field: 'gender'},
    {headerName: 'Bags', field: 'bags'},
    {headerName: 'Donor Name', field: 'donor_name'},
    {headerName: 'Component Collect By', field: 'ComponentCollectedBy'},
    {headerName: 'Amount', field: 'amount'},
    {headerName: 'Paid Amount', field: 'paid_amount'},
    {headerName: 'Balance Amount',field: 'balance_amount'}
  ]

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  )

  const getComponentIssueReportList = async () => {
    const timeDuration = document.getElementById('timeDuration').value;
    const bloodCollectedBy = document.getElementById('bloodCollectedBy').value;
    const amountCollectedBy = document.getElementById('amountCollectedBy').value;
    const bloodGroup = document.getElementById('bloodGroup').value;
    const components = document.getElementById('components').value;

    const response = await api.getComponentIssueReport(timeDuration, bloodCollectedBy , amountCollectedBy , bloodGroup , components);
    const { data } = response;
    console.log(data, 'Component Issue report');
    setTableData(data);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Card>
            <CardBody>
              <h4>Component Issue Report</h4>
              <Row>
                <Col lg="3">
                  <label>Time Duration</label>
                  <br />
                  <select style={{ width: "100%", height: "30px" }} id="timeDuration" >
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
                <Col lg="3">
                  <label>Component Collect By</label>
                  <br />
                  <select style={{ width: "100%", height: "30px" }} id="bloodCollectedBy" >
                    <option>select</option>
                    {consdoctor && consdoctor.map((collected) => (
                    <option key={collected.id} value={collected.id}>
                      {collected.name}
                    </option>
                  ))}
                  </select>
                </Col>
                <Col lg='3'>
                <label>Amount Collect By</label>
                <br />
                <select style={{ width: "100%", height: "30px" }} id="amountCollectedBy" >
                    <option>select</option>
                    {amountCollectedBy && amountCollectedBy.map((collectedamount) => (
                    <option key={collectedamount.id} value={collectedamount.id}>
                      {collectedamount.name}
                    </option>
                  ))}
                </select>
                </Col>
                <Col lg='3'>
                <label>Blood Group</label>
                <br />
                <select style={{ width: "100%", height: "30px" }} id="bloodGroup" >
                    <option>select</option>
                    {bloodgroupData && bloodgroupData.map((bloodgroup) => (
                    <option key={bloodgroup.name} value={bloodgroup.id}>
                      {bloodgroup.name}
                    </option>
                  ))}
                </select>

                
                </Col>
              </Row>
              <br />
              <Row>
                <Col lg='3'>
                    <label>Components</label>
                    <br />
                    <select style={{ width: "100%", height: "30px" }} id="components" >
                        <option>select</option>
                        {component && component.map((comp) => (
                    <option key={comp.bloodComponent} value={comp.id}>
                      {comp.name}
                    </option>
                  ))}
                    </select>
                </Col>
              </Row>
              <br />
              <div className="d-flex justify-content-end mt-2">
                <button className="btn btn-primary btn-sm ms-2" onClick={getComponentIssueReportList} >Search</button>
              </div>
            </CardBody>
          </Card>
          <div className="ag-theme-alpine mt-2" style={{ height: 400 }}>
            <AgGridReact
            rowData={tableData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
            />
          </div>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(Componentissuereport)
