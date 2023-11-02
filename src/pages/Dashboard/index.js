import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import { Card, CardBody, Container, Row, Col } from "reactstrap"
import { Link } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"
import "./styles.css"
import Barchart from "pages/BarChart/Barchart"
import { useLocation } from "react-router-dom"
import EventCalendar from "./Calendar"
import MyChart from "./Charts";
import Piechart from "./PieCharts";
import api from "services/Api"
//redux

const Dashboard = props => {
  const [opdIncome,setOpdIncome] = useState()
  const [ipdIncome,setIpdIncome] = useState()
  const [pharmacyIncome, setPharmacyIncome] = useState()
  const [pathologyIncome,setPathologyIncome] = useState()
  const [radiologyIncome, setRadiologyIncome] = useState()
  const [bloodIncome, setBloodIncome] = useState()
  const [generalIncome, setGeneralIncome] = useState()
  const [ambulanceIncome, setAmbulanceIncome] = useState()
  const [generalexpenses, setGeneralExpenses] = useState()

  const[doctor,setDoctor] = useState()
  const[admin, setAdmin] = useState()
  const[pharmacist,setPharmacist] = useState()
  const [superAdmin, setSuperAdmin] = useState()
  //meta title
  document.title = "Dashboard | BlockTrack"
  const location = useLocation()
  const userData = location.state && location.state.userData
  console.log(userData, "userrrrr")

  const [events, setEvents] = useState([
    // Initial events data (Replace this with your actual events data)
    {
      title: "Event 1",
      start: new Date(2023, 6, 10, 10, 0),
      end: new Date(2023, 6, 10, 12, 0),
    },
    // Add more events as needed
  ])

  // State to manage the modal for adding events
  const [showModal, setShowModal] = useState(false)

  // Function to handle adding new events
  const handleAddEvent = newEvent => {
    setEvents(prevEvents => [...prevEvents, newEvent])
    setShowModal(false) // Close the modal after adding the event
  }

  useEffect(()=>{
    getDashdata()
    getStaffDoctor()
    getStaffAdmin()
    getStaffPharmacist()
    getStaffSuperAdmin()
  },[])

  const getDashdata = async () => {
   const response = await api.getDashboardData();
    const { data } = response;
    console.log(data, 'dashboard data');
    setOpdIncome(data[0].opdIncome)
    setIpdIncome(data[0].ipdIncome)
    setPharmacyIncome(data[0].pharmacyIncome)
    setPathologyIncome(data[0].pathologyIncome)
    setRadiologyIncome(data[0].radiologyIncome)
    setBloodIncome(data[0].bloodIncome)
  setGeneralIncome(data[0].generalIncome)
  setAmbulanceIncome(data[0].ambulanceIncome)
  setGeneralExpenses(data[0].generalexpenses)
  };

  const getStaffDoctor = async () => {
    
    const roleId = 3;
    const response = await api.getStaffcountData(roleId);
     const { data } = response;
     console.log(data, 'staff3 data');
     setDoctor(data[0].count)
  }

  const getStaffAdmin = async () => {
    const roleId = 1;
    const response = await api.getStaffcountData(roleId);
     const { data } = response;
     console.log(data, 'staff1 data');
     setAdmin(data[0].count)
  }

  const getStaffPharmacist = async () => {
    const roleId = 4;
    const response = await api.getStaffcountData(roleId);
     const { data } = response;
     console.log(data, 'staff4 data');
     setPharmacist(data[0].count)
  }

  const getStaffSuperAdmin = async () => {
    const roleId = 7;
    const response = await api.getStaffcountData(roleId);
     const { data } = response;
     console.log(data, 'staff7 data');
     setSuperAdmin(data[0].count)
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <h4>Dashboard</h4>
          <div className="row mt-4">
            <div className="overflow-hidden card">
              <div  className="bg-primary bg-soft">
                <div className="row">
                  <div className="col-6 ">
                    <div className="text-primary p-3 mt-2">
                      <h5 className="text-primary fw-bold">Welcome Back!</h5>
                      <p className="fs-6">BlockTrack Dashboard</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="mini-stats-wid card">
                <div className="card-body" style={{ backgroundColor: "#6070FF", borderRadius: '0 0 10px 10px' }}>
                  <Link to="/opd">
                    <div className="d-flex">
                      <div className="flex-grow-1">
                        <p className="text-white fw-bold">Outpatient Income</p>
                        <h5 className="mb-0 text-white">₹ 20000.00</h5>
                      </div>
                      <div className="avatar-sm rounded-circle bg-white">
                        <span className="avatar-title rounded-circle bg-white">
                          <i
                            className="fas fa-stethoscope fa-lg"
                            style={{ color: "#6070FF" }}
                          ></i>
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="mini-stats-wid card">
                <div className="card-body" style={{ backgroundColor: "#6070FF", borderRadius: '0 0 10px 10px'  }}>
                  <Link to="/ipd">
                    <div className="d-flex">
                      <div className="flex-grow-1">
                        <p className="fw-bold text-white">Inpatient Income</p>
                        <h5 className="mb-0 text-white">₹ 18000.00</h5>
                      </div>
                      <div className="avatar-sm rounded-circle bg-white">
                        <span className="avatar-title rounded-circle bg-white">
                          <i
                            className="fas fa-procedures fa-lg"
                            style={{ color: "#4E4FEB" }}
                          ></i>
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="mini-stats-wid card">
                <div className="card-body" style={{ backgroundColor: "#6070FF", borderRadius: '0 0 10px 10px'  }}>
                  <Link to="/pharmacy">
                    <div className="d-flex">
                      <div className="flex-grow-1">
                        <p className="fw-bold text-white">Pharmacy Income</p>
                        <h5 className="mb-0 text-white">₹ 14000.00</h5>
                      </div>
                      <div className="avatar-sm rounded-circle bg-white">
                        <span className="avatar-title rounded-circle bg-white">
                          <i
                            className="fas fa-mortar-pestle fa-lg"
                            style={{ color: "#4E4FEB" }}
                          ></i>
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="mini-stats-wid card">
                <div className="card-body" style={{ backgroundColor: "#6070FF", borderRadius: '0 0 10px 10px'  }}>
                  <Link to="/pathology">
                    <div className="d-flex">
                      <div className="flex-grow-1">
                        <p className="fw-bold text-white">Pathology Income</p>
                        <h5 className="mb-0 text-white">₹ 22000.00</h5>
                      </div>
                      <div className="avatar-sm rounded-circle bg-white">
                        <span className="avatar-title rounded-circle bg-white">
                          <i
                            className="fas fa-flask fa-lg"
                            style={{ color: "#4E4FEB" }}
                          ></i>
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="mini-stats-wid card">
                <div className="card-body" style={{ backgroundColor: "#6070FF", borderRadius: '0 0 10px 10px'  }}>
                  <Link to="/radiology">
                    <div className="d-flex">
                      <div className="flex-grow-1">
                        <p className="fw-bold text-white">Radiology Income</p>
                        <h5 className="mb-0 text-white">₹ 17000.00</h5>
                      </div>
                      <div className="avatar-sm rounded-circle bg-white">
                        <span className="avatar-title rounded-circle bg-white">
                          <i
                            className="fas fa-microscope fa-lg"
                            style={{ color: "#4E4FEB" }}
                          ></i>
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="mini-stats-wid card">
                <div className="card-body" style={{ backgroundColor: "#6070FF", borderRadius: '0 0 10px 10px'  }}>
                  <Link to="/bloodbank">
                    <div className="d-flex">
                      <div className="flex-grow-1">
                        <p className="fw-bold text-white">Blood Bank Income</p>
                        <h5 className="mb-0 text-white">₹ 17500.00</h5>
                      </div>
                      <div className="avatar-sm rounded-circle bg-white">
                        <span className="avatar-title rounded-circle bg-white">
                          <i
                            className="fas fa-tint fa-lg"
                            style={{ color: "#4E4FEB" }}
                          ></i>
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="mini-stats-wid card">
                <div className="card-body" style={{ backgroundColor: "#6070FF", borderRadius: '0 0 10px 10px'  }}>
                  <Link to="/ambulance">
                    <div className="d-flex">
                      <div className="flex-grow-1">
                        <p className="fw-bold text-white">Ambulance Income</p>
                        <h5 className="mb-0 text-white">₹ 12700.00</h5>
                      </div>
                      <div className="avatar-sm rounded-circle bg-white">
                        <span className="avatar-title rounded-circle bg-white">
                          <i
                            className="fas fa-ambulance fa-lg"
                            style={{ color: "#4E4FEB" }}
                          ></i>
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="mini-stats-wid card">
                <div className="card-body"  style={{ backgroundColor: "#6070FF", borderRadius: '0 0 10px 10px'  }}>
                  <Link to="/income">
                    <div className="d-flex">
                      <div className="flex-grow-1">
                        <p className="fw-bold text-white">General Income</p>
                        <h5 className="mb-0 text-white">₹ 30000.00</h5>
                      </div>
                      <div className="avatar-sm rounded-circle bg-white">
                        <span className="avatar-title rounded-circle bg-white">
                          <i
                            className="fas fa-money-bill-wave fa-lg"
                            style={{ color: "#4E4FEB" }}
                          ></i>
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="mini-stats-wid card">
                <div className="card-body bg-success">
                  <Link to="/expenses">
                    <div className="d-flex">
                      <div className="flex-grow-1">
                        <p className="fw-bold text-white">Expenses</p>
                        <h5 className="mb-0 text-white">₹ 70000.00</h5>
                      </div>
                      <div className="avatar-sm rounded-circle bg-white">
                        <span className="avatar-title rounded-circle bg-white">
                          <i
                            className="fas fa-rupee-sign fa-lg"
                            style={{ color: "#28a745" }}
                          ></i>
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <br />
            <Row>
              <Col lg='6' md='6' sm='12'>
                <Card>
                  <CardBody>
                  <h5>Yearly Income & Expense Overview</h5>
                  <br />
                    <MyChart />
                  </CardBody>
                </Card>
              </Col>
              <Col lg='6' md='6' sm='12'>
                <Card>
                  <CardBody>
                    <h5>Monthly Income Overview</h5>
                    <br />
                    <Piechart />
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col lg="9">
                <Card>
                  <CardBody>
                  <h5>Calendar</h5>
                  <br />
                    <div>
                      {showModal && (
                        <div>
                          
                          <form >
                            <label>Add Event</label>
                            <br />
                            <input></input>
                            <button onClick={handleSubmit}>submit</button>
                          </form>
                        </div>
                      )}
                    </div>
                    <EventCalendar events={events} handleAddEvent={handleAddEvent} />
                  </CardBody>
                </Card>
              </Col>
              <Col lg='3'>
              <Link to='/hr'>
              <Card>
                  <CardBody>
                  <h5>Staffs</h5>
                  <br />
                    <div className="card" style={{ border: "1px solid grey" }}>
                    <div
                          className="info-box ms-3 mt-2 mb-2"
                          title="accountant"
                        >
                          <Link to="/hr">
                            <span className="info-box-icon bg-warning p-2">
                              <i
                                className="far fa-file-alt fa-lg mt-2 p-1"
                                style={{ color: "white" }}
                              ></i>
                            </span>
                            <div className="info-box-content">
                              <br />
                              <span className="info-box-text text-secondary">
                                Doctor
                              </span>
                              <br />
                              <span
                                className="info-box-number text-secondary"
                                style={{ fontWeight: "bold" }}
                              >
                                {doctor}
                              </span>
                            </div>
                          </Link>
                        </div>
                    </div>
                      <div
                        className="card"
                        style={{ border: "1px solid grey" }}
                      >
                        <div className="info-box ms-3 mt-3 mb-2" title="doctor">
                          <Link to="/hr">
                            <span className="info-user-md fa-lg bg-danger p-2">
                              <i
                                className="fas fa-user-md fa-lg mt-2"
                                style={{ color: "white" }}
                              ></i>
                            </span>
                            <div className="info-box-content">
                              <br />
                              <span className="info-box-text text-secondary">
                                Admin
                              </span>
                              <br />
                              <span
                                className="info-box-number text-secondary"
                                style={{ fontWeight: "bold" }}
                              >
                                {admin}
                              </span>
                            </div>
                          </Link>
                        </div>
                      </div>
                      <div
                        className="card"
                        style={{ border: "1px solid grey" }}
                      >
                        <div
                          className="info-box ms-3 mt-3 mb-2"
                          title="pharmacist"
                        >
                          <Link to="/hr">
                            <span className="info-box-icon bg-success p-2">
                              <i
                                className="fas fa-medkit fa-lg mt-2"
                                style={{ color: "white" }}
                              ></i>
                            </span>
                            <div className="info-box-content">
                              <br />
                              <span className="info-box-text text-secondary">
                                Pharmacist
                              </span>
                              <br />
                              <span
                                className="info-box-number text-secondary"
                                style={{ fontWeight: "bold" }}
                              >
                                {pharmacist}
                              </span>
                            </div>
                          </Link>
                        </div>
                      </div>
                      <div
                        className="card"
                        style={{ border: "1px solid grey" }}
                      >
                        <div
                          className="info-box ms-3 mt-3 mb-2"
                          title="superadmin"
                        >
                          <Link to="/hr">
                            <span className="info-box-icon bg-primary p-2">
                              <i
                                className="fas fa-user-cog fa-lg mt-2"
                                style={{ color: "white" }}
                              ></i>
                            </span>
                            <div className="info-box-content">
                              <br />
                              <span className="info-box-text text-secondary">
                                Super Admin
                              </span>
                              <br />
                              <span
                                className="info-box-number text-secondary"
                                style={{ fontWeight: "bold" }}
                              >
                                {superAdmin}
                              </span>
                            </div>
                          </Link>
                        </div>
                        </div>
                  </CardBody>
                </Card>
              </Link>
               
              </Col>
            </Row>
            <div className="row">
              <div className="col-xl-4">
                <div className="card">
                  <div className="card-body">
                    <div className="card-title">
                      <h5>Social Media</h5>
                    </div>
                    <div className="mt-4 row p-2">
                      <div className="col-4 col">
                        <a href="https://mail.google.com/">
                          <div className="social-source text-center mt-3">
                            <div className="avatar-sm mx-auto mb-3">
                              <span className="avatar-title rounded-circle bg-danger font-size-16">
                                <i className="mdi mdi-gmail text-white"></i>
                              </span>
                            </div>
                            <h5 className="font-size-15">Gmail</h5>
                          </div>
                        </a>
                      </div>
                      <div className="col-4 col">
                        <a href="https://www.linkedin.com/">
                          <div className="social-source text-center mt-3">
                            <div className="avatar-sm mx-auto mb-3">
                              <span className="avatar-title rounded-circle bg-primary font-size-16">
                                <i className="mdi mdi-linkedin text-white"></i>
                              </span>
                            </div>
                            <h5 className="font-size-15">Linkedin</h5>
                          </div>
                        </a>
                      </div>
                      <div className="col-4 col" style={{ height: "120px" }}>
                        <a href="https://www.whatsapp.com/">
                          <div className="social-source text-center mt-3">
                            <div className="avatar-sm mx-auto mb-3">
                              <span className="avatar-title rounded-circle bg-success font-size-16">
                                <i className="mdi mdi-whatsapp text-white"></i>
                              </span>
                            </div>

                            <h5 className="font-size-15">whatsapp</h5>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4">
                <div className="card" style={{ height: "218px" }}>
                  <div className="card-body">
                    <div className="card-title">
                      <h5>Activity</h5>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4">
                <div className="card">
                  <div className="card-body">
                    <div className="card-title">
                      <h5>About</h5>

                      <p className="text-muted fw-normal fs-8 mt-2" >
                        BlockTrack aims to securely digitise healthcare
                        information systems along with ensuring protection of
                        sensitive personal information and medical records by
                        decentralising the control and ownership of patient
                        data, through a blockchain-based innovation.{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(Dashboard)
