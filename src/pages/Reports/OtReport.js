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

const Otreport = props => {

  const [tableData, setTableData] = useState(null)
  const [consdoctor,setConsdoctor] = useState('')
  const [operationCategory,setOperationCategory] = useState('')
  const [operationName,setoperationName] = useState('')
  


  useEffect(()=>{
    handleOperationCategory()
    handleOperationName()
    handleConsultant()
    
    // handleBloodgroups()
  
  },[])

  const handleOperationCategory = async () =>{
    const response = await  api.getOperationCategory()
    const {data} = response
    setOperationCategory(data)
    console.log(data,"data")
  }

  const handleOperationName = async () =>{
    const response = await  api.getOperationName()
    const {data} = response
    setoperationName(data)
    console.log(data,"data")
  }

  const handleConsultant = async () =>{
    const response = await  api.getConsultant()
    const {data} = response
    setConsdoctor(data)
    console.log(data,"data")
  }
  


  const columnDefs = [
    {headerName: 'Date', field: 'date'},
    {headerName: 'Reference No', field: 'reference_no'},
    {headerName: 'OPD No', field: 'opd_id'},
    {headerName: 'IPD No', field: 'ipd_id'},
    {headerName: 'Consultant Doctor', field: 'cons_doctor'},
    {headerName: 'Assistant Consultant', field: 'ass_consultant_1'},
    {headerName: 'Operation Name', field: 'operation_name'},
    {headerName: 'Operation Category', field: 'operation_category'},
    {headerName: 'Result', field: 'result'}
  ]

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  )


  const getOTReportList = async () => {
    const timeDuration = document.getElementById('timeDuration').value;
    const doctor = document.getElementById('doctor').value;
    const category = document.getElementById('category').value;
    const operation = document.getElementById('operation').value;

    const response = await api.getOTReport(timeDuration, doctor , category , operation);
    const { data } = response;
    console.log(data, 'OT report');
    setTableData(data);
  };



  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Card>
            <CardBody>
              <h4>OT Report</h4>
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
                  <label>Consultant Doctor</label>
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
              </Row>
              <br />
              <Row>
                <Col lg='4'>
                <label>Operation Category</label>
                <br />
                <select style={{width: "100%",height:'30px', border: '1px solid grey', borderRadius: '5px'}} id="category" >
                <option>select</option>
                {operationCategory && operationCategory.map((operation) => (
                    <option key={operation.id} value={operation.id}>
                      {operation.category}
                    </option>
                  ))}
                </select>
                </Col>
                <Col lg='4'>
                    <label>Operation Name</label>
                    <br />
                    <select style={{width: "100%",height:'30px', border: '1px solid grey', borderRadius: '5px'}} id="operation" >
                        <option>select</option>
                        {operationName && operationName.map((medicine) => (
                    <option key={medicine.id} value={medicine.id}>
                      {medicine.operation}
                    </option>
                  ))}
                    </select>
                </Col>
              </Row>
              <div className="d-flex justify-content-end mt-2">
                <button className="btn-mod btn-sm ms-2" onClick={getOTReportList} >Search</button>
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

export default withTranslation()(Otreport)
