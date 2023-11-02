import PropTypes from "prop-types"
import React, { useMemo , useState} from "react"
import { Card, CardBody, Col, Container, Row } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//i18n
import { withTranslation } from "react-i18next"

import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import { useEffect } from "react"
import api from "services/Api"

//redux
const OpdDischargedreport = props => {
  const [formData, setformData] = useState({
    timeDuration:'',
    gender:'',
    dischargeStatus:'',
    doctor:''
  });
  const [doctors,setDoctors] = useState([])
  const [fromAge,setFromAge] = useState('')
  useEffect(()=>{
    getDoctor()
  },[])
  
  const getDoctor = async () =>{
   const response = await api.getDoctor()
   const {data} = response
   console.log(data,"datgg")
   setDoctors(data)
  }
  const handleChange = (e) =>{
    const {value,name} = e.target
    setformData({...formData,[name]:value})
  }
  const [toAge, setToAge] = useState('');
  const [toAgeOptions, setToAgeOptions] = useState(['select']);
  const [data,setData] = useState([])
  const handleFromAgeChange = (e) => {
    const selectedFromAge = e.target.value;
    setFromAge(selectedFromAge);

    const options = ['select'];
    for (let i = Number(selectedFromAge) + 5; i <= 100; i += 5) {
      options.push(String(i));
    }
    setToAge(''); 
    setToAgeOptions(options);
  };
  const rowData = [
    {
      pname: "abishek",
      ipno: "101",
      caseid: "cs123",
      gender: "male",
      phone: "9962313564",
      consultant: "yyy",
      bed: "123",
      admdate: "14/04",
      disdate: "15/04",
      disstatus: "dis",
      total: "2",
    },
    {
        pname: "venkat",
        ipno: "101",
        caseid: "cs123",
        gender: "male",
        phone: "9962313564",
        consultant: "yyy",
        bed: "123",
        admdate: "14/04",
        disdate: "15/04",
        disstatus: "dis",
        total: "2",
      },
      {
        pname: "akhil",
        ipno: "101",
        caseid: "cs123",
        gender: "male",
        phone: "9962313564",
        consultant: "yyy",
        bed: "123",
        admdate: "14/04",
        disdate: "15/04",
        disstatus: "dis",
        total: "2",
      },
  ]

  const columnDefs = [
    { headerName: "Patient Name", field: "patient_name" },
    { headerName: "OPD No", field: "opd_id"},
    { headerName: "Case ID", field: "case_reference_id" },
    { headerName: "Gender", field: "gender" },
    { headerName: "Phone", field: "mobileno" },
    { headerName: "Consutant", field: "consultant" },
    { headerName: "Appointment Date", field: "appointment_date"},
    { headerName: "Admission Date", field: "appointment_date" },
    { headerName: "Discharged Date", field: "discharge_date" },
    { headerName: "Discharge Status", field: "status" },
    { headerName: "Total Admit Days", field: "admitted_days" },
  ]

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  )

  const [searchText, setSearchText] = useState("")
  const handleToAgeChange = (e) => {
    console.log(e.target.value,"selc")
    const selectedToAge = e.target.value;
    setToAge(selectedToAge);
  };
  const [gridApi, setGridApi] = useState(null);
  const onGridReady = params => {
      setGridApi(params.api);
  };

  const onQuickFilterText = event => {
      gridApi.setQuickFilter(event.target.value);
  };
console.log(formData,toAge,fromAge,"kkkk")
 const handleSearch =async () =>{
    const response = await api.getOpdDischargedReport(formData,toAge,fromAge)
    const {data} = response
    console.log(data,"duta")
    setData(data)
 }
return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>OPD Discharged Patient Report</h4>
          <Card>
            <CardBody>
              <Row>
                <Col lg="3" sm="12">
                  <label>Time Duration</label>
                  <br />
                  <select name="timeDuration" onChange={handleChange} value={formData.timeDuration} style={{ width: "100%", height: "30px" }}>
                     <option>select</option>
                    <option value='today'>Today</option>
                    <option value='ThisWeek'>This week</option>
                    <option value="LastWeek">Last week</option>
                    <option value='ThisMonth'>This Month</option>
                    <option value='LastMonth'>Last Month</option>
                    <option value='Last3Months'>Last 3 Months</option>
                    <option value='Last6Months'>Last 6 Months</option>
                    <option value='Last9Months'>Last 9 Months</option>
                    <option value='Last12Months'>Last 12 Months</option>
                    <option value='ThisYear'>This Year</option>
                    <option value="LastYear">Last Year</option>
                    
                  </select>
                </Col>
                <Col lg="3" sm="12">
                  <label>Doctor</label>
                  <br />
                  <select name="doctor" value={formData.doctor} onChange={handleChange} style={{ width: "100%", height: "30px" }}>
                    <option>select</option>
                    {doctors.map((val=>(
                <option key={val.staff_id} value={val.staff_id}>{val.name}</option>
                    )))}
                  </select>
                </Col>
                <Col lg="3" sm="12">
                  <label>From Age</label>
                  <br />
                  <select
                  name="fromAge"
        style={{ width: '100%', height: '30px' }}
        value={formData.fromAge}
        onChange={handleFromAgeChange}
      >
        <option value="select">select</option>
        <option value="5">5</option>
        <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                    <option value="30">30</option>
                    <option value="35">35</option>
                    <option value="40">40</option>
                    <option value="45">45</option>
                    <option value="50">50</option>
                    <option value="55">55</option>
                    <option value="60">60</option>
                    <option value="65">65</option>
                    <option value="70">70</option>
                    <option value="75">75</option>
                    <option value="80">80</option>
                    <option value="85">85</option>
                    <option value="90">90</option>
                    <option value="95">95</option>
                    <option value="100">100</option>
                  </select>
                </Col>
                <Col lg="3" sm="12">
                  <label>To Age</label>
                  <br />
                  <select
                  name="toAge"
        style={{ width: '100%', height: '30px' }}
        value={toAge}
        onChange={handleToAgeChange}
      >
        {toAgeOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
                </Col>
              </Row>
              <br />
              <Row>
                <Col lg="3" sm="12">
                  <label>Gender</label>
                  <br />
                  <select name="gender" value={formData.gender} onChange={handleChange} style={{ width: "100%", height: "30px" }}>
                    <option>select</option>
                    <option key="male" value="Male">Male</option>
                    <option key="female" value="Femail">Female</option>
                  </select>
                </Col>
                <Col lg="3" sm="12">
                  <label>Discharge Status</label>
                  <br />
                  <select name="dischargeStatus" value={formData.dischargeStatus} onChange={handleChange} style={{ width: "100%", height: "30px" }}>
                    <option>select</option>
                    <option key="Death" value="1">Death</option>
                    <option key="Referral" value="2">Referral</option>
                    <option key="Normal" value="3">Normal</option>
                  </select>
                </Col>
              </Row>
              <br />
              <div style={{display: 'flex', justifyContent: 'flex-end'}}>
              <button onClick={handleSearch} className="btn btn-primary"><i className="fas fa-search"></i>&nbsp;Search</button>
              </div>
              

              <br />

              <div className="ag-theme-alpine mt-2" style={{ height: 400 }}>
                <AgGridReact
                  rowData={data}
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

export default withTranslation()(OpdDischargedreport)
