import PropTypes from "prop-types"
import React, { useMemo , useState , useEffect } from "react"
import { Row, Col, Card, CardBody, Container } from "reactstrap"
import api from "services/Api"

//i18n
import { withTranslation } from "react-i18next"

import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
//redux

const Bloodissuereport = props => {
  const [formData, setformData] = useState({
    timeDuration:'',
    bloodCollectedBy:'',
    bloodCollectedBy:'',
    amountCollectedBy: '',
    bloodGroup: '',
    bloodDonor: ''
  });

  const [tableData, setTableData] = useState(null)
  
  const [newData,setNewData] = useState(null)
  console.log(tableData,'tabledata')

  const [bloodCollectedBy,setbloodCollectedBy] = useState('')
  const [amountCollectedBy,setamountCollectedBy] = useState('')
  const [bloodgroupData,setbloodgroupData] = useState('')
  const [bloodDonorData,setbloodDonorData] = useState('')
  const [consdoctor,setConsdoctor] = useState('')

  const handleChange = (e) =>{
    const {value,name} = e.target
    setformData({...formData,[name]:value})
  }

  console.log(bloodgroupData,'bg')


  useEffect(()=>{
    bloodCollected()
    amountCollected()
    handleBloodgroup()
    handleBloodDonor()
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

  const handleBloodDonor = async () =>{
    const response = await  api.getBloodDonorDetail()
    const {data} = response
    setbloodDonorData(data)
    console.log(data,"data")
  }

  const columnDefs = [
    {headerName: 'Bill No', field: 'bill_no'},
    {headerName: 'Issue Date', field: 'date_of_issue'},
    {headerName: 'Received To', field: 'receiced_to'},
    {headerName: 'Blood Group', field: 'blood_group'},
    {headerName: 'Gender', field: 'gender'},
    {headerName: 'Bags', field: 'bags'},
    {headerName: 'Donor Name', field: 'donor_name'},
    {headerName: 'Amount Collect By', field: 'amount_collectedBy'},
    {headerName: 'Blood Collect By', field: 'blood_collectedBy'},
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

  useEffect(() => {
    getBloodIssueReportList()
    getIssueReport()
  }, [])

  const getIssueReport = () => {
    api.getBloodIssuereports().then(res => setNewData(res.data))
    api.http
  }

  const getBloodIssueReportList = async () => {
    const queryParams = {
      timeDuration: formData.timeDuration,
      bloodCollectedBy: formData.bloodCollectedBy,
      amountCollectedBy: formData.amountCollectedBy,
      bloodGroup: formData.bloodGroup,
      bloodDonor: formData.bloodDonor,
    };

    try {
      const response = await api.getBloodIssueReport(queryParams);
      const { data } = response;
      console.log(data, 'Blood Issue report');
      setTableData(data);
    } catch (error) {
      console.error('Error fetching blood issue report:', error);
    }
  };


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Card>
            <CardBody>
              <h4>Blood Issue Report</h4>
              <Row>
                <Col lg="3">
                  <label>Time Duration</label>
                  <br />
                  <select style={{ width: "100%", height: "30px", border: '1px solid grey', borderRadius: '5px' }} id="timeDuration" onChange={handleChange} value={formData.timeDuration}>
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
                  <label>Blood Collect By</label>
                  <br />
                  <select style={{ width: "100%", height: "30px", border: '1px solid grey', borderRadius: '5px' }} id="bloodCollectedBy" onChange={handleChange} value={formData.bloodCollectedBy}>
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
                <select style={{ width: "100%", height: "30px", border: '1px solid grey', borderRadius: '5px' }} id="amountCollectedBy" onChange={handleChange} value={formData.amountCollectedBy}>
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
                <select style={{ width: "100%", height: "30px", border: '1px solid grey', borderRadius: '5px' }} id="bloodGroup"  onChange={handleChange} value={formData.bloodGroup}>
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
                    <label>Blood Donor</label>
                    <br />
                    <select style={{ width: "100%", height: "30px", border: '1px solid grey', borderRadius: '5px' }} id="bloodDonor" onChange={handleChange} value={formData.bloodDonor}>
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
                <button className="btn-mod btn-sm ms-2" onClick={getBloodIssueReportList}>Search</button>
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

export default withTranslation()(Bloodissuereport)
