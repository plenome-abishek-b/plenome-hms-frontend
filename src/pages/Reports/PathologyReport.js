import PropTypes from "prop-types"
import React,{useMemo ,useState , useEffect } from "react"
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

const Pathologyreport = props => {

  const [tableData, setTableData] = useState(null)
  const [consdoctor,setConsdoctor] = useState('')
  const [category,setCategory] = useState('')
  const [test,setTest] = useState('')



  useEffect(()=>{
    handleConsultant()
    handleCategory()
    handleTest()
    
    
    
    // handleBloodgroups()
  
  },[])

  const handleConsultant = async () =>{
    const response = await  api.getConsultant()
    const {data} = response
    setConsdoctor(data)
    console.log(data,"data")
  }

  const handleCategory = async () =>{
    const response = await  api.getPathologyCategoryDetails()
    const {data} = response
    setCategory(data)
    console.log(data,"data")
  }

  const handleTest = async () =>{
    const response = await  api.getPathologyNameDetails()
    const {data} = response
    setTest(data)
    console.log(data,"data")
  }




  const columnDefs = [
    { headerName: "Bill No", field: "bill_no" },
    { headerName: "Date", field: "date"},
    { headerName: "Patient Name", field: "patient_name" },
    { headerName: "Category Name", field: "category_name" },
    { headerName: "Test Name", field: "test_name" },
    { headerName: "Consutant Doctor", field: "consult_doctor" },
    { headerName: "Sample Collected Person Name", field: "sample_collected_by" },
    { headerName: "Paid amount", field: "paid_amount" },
    { headerName: "Amount", field: "balance_amount" },
  ]

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  )

  const getPathologyReportList = async () => {
    const timeDuration = document.getElementById('timeDuration').value;
    const collectedBy = document.getElementById('collectedBy').value;
    const category = document.getElementById('category').value;
    const test = document.getElementById('test').value;

    const response = await api.getPathologyPatientReportDetails(timeDuration, collectedBy , category,test);
    const { data } = response;
    console.log(data, 'Pathology patient report');
    setTableData(data);
  };


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Card>
            <CardBody>
              <h4>Pathology Patient Report</h4>
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
                <Col lg='3'>
                  <label>Sample Collected Person Name</label>
                  <br />
                  <select  style={{ width: "100%", height: "30px" }} id="collectedBy">
                    <option>select</option>
                    {consdoctor && consdoctor.map((doct) => (
                    <option key={doct.docid} value={doct.id}>
                      {doct.name}
                    </option>
                  ))}
                  </select>
                </Col>
                <Col lg='3'>
                  <label>Category Name</label>
                  <br />
                  <select  style={{ width: "100%", height: "30px" }} id="category" >
                    <option>select</option>
                    {category && category.map((categ) => (
                    <option key={categ.id} value={categ.id}>
                      {categ.category_name}
                    </option>
                  ))}
                  </select>
                </Col>
                <Col lg='3'>
                  <label>Test Name</label>
                  <br />
                  <select  style={{ width: "100%", height: "30px" }} id="test" >
                    <option>select</option>
                    {test && test.map((testname) => (
                    <option key={testname.testid} value={testname.id}>
                      {testname.test_name}
                    </option>
                  ))}
                  </select>
                </Col>
              </Row>
              <div className="mt-2 d-flex justify-content-end">
                  <button className="btn btn-primary" onClick={getPathologyReportList} >Search</button>
                </div>
              <br />
              <div className="ag-theme-alpine mt-2" style={{ height: 700 }}>
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

export default withTranslation()(Pathologyreport)