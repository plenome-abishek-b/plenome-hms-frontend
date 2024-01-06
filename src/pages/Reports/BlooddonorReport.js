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

const Blooddonorreport = props => {


  const [tableData, setTableData] = useState(null)
  console.log(tableData,'tabledata')

  const [bloodgroupData,setbloodgroupData] = useState('')
  const [bloodDonorData,setbloodDonorData] = useState('')


  useEffect(()=>{
    handleBloodgroup()
    handleBloodDonor()
    // handleBloodgroups()
  
  },[])
  
  
  const handleBloodgroup = async () =>{
    const response = await  api.getBloodgroups()
    const {data} = response
    setbloodgroupData(data)
    console.log(data,"data")
  }

  const handleBloodDonor = async () =>{
    const response = await  api.getBloodDonorDetail()
    const {data} = response
    setbloodDonorData(data)
    console.log(data,"data")
  }


  const columnDefs = [
    {headerName: 'Blood Group', field: 'blood_group'},
    {headerName: 'Bags', field: 'bags'},
    {headerName: 'Donor Name', field: 'donor_name'},
    {headerName: 'Age', field: 'age'},
    {headerName: 'Donate Date', field: 'donate_date'},
    {headerName: 'Apply Charge', field: 'apply_charge'},
    {headerName: 'Discount Percentage', field: 'discount_percentage'},
    {headerName: 'Tax Percentage', field: 'tax_percentage'},
    {headerName: 'Amount', field: 'amount'},
    {headerName: 'Paid Amount', field: 'paid_amount'}
  ]

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  )

  const getBloodDonorReportList = async () => {
    const timeDuration = document.getElementById('timeDuration').value;
    const bloodGroup = document.getElementById('bloodGroup').value;
    const bloodDonor = document.getElementById('bloodDonor').value;

    const response = await api.getBloodDonorReport(timeDuration, bloodGroup , bloodDonor);
    const { data } = response;
    console.log(data, 'Blood donor report');
    setTableData(data);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Card>
            <CardBody>
              <h4>Blood Donor Report</h4>
              <Row>
                <Col lg="4">
                  <label>Time Duration</label>
                  <br />
                  <select style={{ width: "100%", height: "30px", border: '1px solid grey', borderRadius: '5px' }} id="timeDuration">
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
                  <label>Blood Group</label>
                  <br />
                  <select style={{ width: "100%", height: "30px", border: '1px solid grey', borderRadius: '5px' }} id="bloodGroup" >
                    <option>select</option>
                    {bloodgroupData && bloodgroupData.map((bloodgroup) => (
                    <option key={bloodgroup.name} value={bloodgroup.id}>
                      {bloodgroup.name}
                    </option>
                  ))}
                  </select>
                </Col>
                <Col lg='4'>
                <label>Blood Donor</label>
                <br />
                <select style={{ width: "100%", height: "30px", border: '1px solid grey', borderRadius: '5px' }} id="bloodDonor" >
                    <option>select</option>
                    {bloodDonorData && bloodDonorData.map((blooddonor) => (
                    <option key={blooddonor.bloodDonorData} value={blooddonor.id}>
                      {blooddonor.donor_name}
                    </option>
                  ))}
                </select>
                </Col>
              </Row>
              <br />
              <div className="d-flex justify-content-end mt-2">
                <button className="btn-mod btn-sm ms-2" onClick={getBloodDonorReportList} >Search</button>
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

export default withTranslation()(Blooddonorreport)
