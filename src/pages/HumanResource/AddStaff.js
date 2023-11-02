import PropTypes from "prop-types"
import React from "react"
import {
  Row,
  Col,
  Container,
  Card,
  CardBody,
  UncontrolledCollapse,
  Button
} from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//i18n
import { withTranslation } from "react-i18next"

//redux

const AddStaff = props => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <h4 className="text-primary">Basic Information</h4>
          <Card>
            <CardBody>
              <Row>
                <Col lg="3">
                  <label>Staff ID</label>
                  <br />
                  <input
                    placeholder=""
                    style={{ width: "100%", height: "30px" }}
                  ></input>
                </Col>
                <Col lg="3" md="12" sm="12">
                  <label>Role</label>
                  <br />
                  <select style={{ width: "100%", height: "30px" }}>
                    <option>select</option>
                    <option>Admin</option>
                    <option>Accountant</option>
                    <option>Doctor</option>
                    <option>Pharmacist</option>
                    <option>Pathologist</option>
                    <option>Radiologist</option>
                    <option>Super Admin</option>
                    <option>Receptionist</option>
                    <option>Nurse</option>
                  </select>
                </Col>
                <Col lg="3" md="12" sm="12">
                  <label>Designation</label>
                  <br />
                  <select style={{ width: "100%", height: "30px" }}>
                    <option>select</option>
                    <option>Admin</option>
                    <option>Accountant</option>
                    <option>Doctor</option>
                    <option>Pharmacist</option>
                    <option>Pathologist</option>
                    <option>Radiologist</option>
                    <option>IT Admin</option>
                    <option>Receptionist</option>
                    <option>Nurse</option>
                    <option>Technical Head</option>
                    <option>Driver</option>
                  </select>
                </Col>
                <Col lg="3" md="12" sm="12">
                  <label>Department</label>
                  <br />
                  <select style={{ width: "100%", height: "30px" }}>
                    <option>select</option>
                    <option>OT</option>
                    <option>Doctor</option>
                    <option>Admin</option>
                    <option>IPD</option>
                    <option>OPD</option>
                    <option>ICU</option>
                    <option>Blood Bank</option>
                    <option>Pharmacy</option>
                    <option>pathology</option>
                    <option>Reception</option>
                    <option>Human Resource</option>
                    <option>Gynecology</option>
                    <option>Finance</option>
                    <option>Emergency</option>
                    <option>Cardiology</option>
                    <option>Burn Care</option>
                    <option>NICU</option>
                    <option>Nursing Department</option>
                  </select>
                </Col>
                <Col lg="3" md="12" sm="12" className="mt-3">
                  <label>Specialist</label>
                  <br />
                  <select style={{ width: "100%", height: "30px" }}>
                    <option>Cardiologists</option>
                    <option>Endocrinologists</option>
                    <option>Dermatologists</option>
                    <option>Gastroenterologists</option>
                    <option>Ophthalmologists</option>
                    <option>Neuroradiology</option>
                  </select>
                </Col>
              </Row>
              <br />
              <Row>
                <Col lg="3" md="12" sm="12">
                  <label>First Name</label>
                  <br />
                  <input style={{ width: "100%", height: "30px" }}></input>
                </Col>
                <Col lg="3" md="12" sm="12">
                  <label>Last Name</label>
                  <br />
                  <input style={{ width: "100%", height: "30px" }}></input>
                </Col>
                <Col lg="3" md="12" sm="12">
                  <label>Father Name</label>
                  <br />
                  <input style={{ width: "100%", height: "30px" }}></input>
                </Col>
                <Col lg="3" md="12" sm="12">
                  <label>Mother Name</label>
                  <br />
                  <input style={{ width: "100%", height: "30px" }}></input>
                </Col>
              </Row>
              <br />
              <Row>
                <Col lg="3" md="12" sm="12">
                  <label>Gender</label>
                  <br />
                  <select style={{ width: "100%", height: "30px" }}>
                    <option>Select</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </Col>
                <Col lg="3" md="12" sm="12">
                  <label>Marital Status</label>
                  <br />
                  <select style={{ width: "100%", height: "30px" }}>
                    <option>Select</option>
                    <option>Single</option>
                    <option>Married</option>
                    <option>Widowed</option>
                    <option>Separated</option>
                    <option>Not Specified</option>
                  </select>
                </Col>
                <Col lg="3" md="12" sm="12">
                  <label>Blood Group</label>
                  <br />
                  <select style={{ width: "100%", height: "30px" }}>
                    <option>Select</option>
                    <option>O+</option>
                    <option>A+</option>
                    <option>B+</option>
                    <option>AB+</option>
                    <option>O-</option>
                    <option>A-</option>
                    <option>B-</option>
                    <option>AB-</option>
                  </select>
                </Col>
                <Col>
                  <label>Date of Birth</label>
                  <br />
                  <input
                    type="date"
                    style={{ width: "100%", height: "30px" }}
                  ></input>
                </Col>
              </Row>
              <br />
              <Row>
                <Col lg="3" md="12" sm="12">
                  <label>Date of Joining</label>
                  <br />
                  <input style={{ width: "100%", height: "30px" }}></input>
                </Col>
                <Col lg="3" md="12" sm="12">
                  <label>Phone</label>
                  <br />
                  <input style={{ width: "100%", height: "30px" }}></input>
                </Col>
                <Col lg="3" md="12" sm="12">
                  <label>Emergency Contact</label>
                  <br />
                  <input style={{ width: "100%", height: "30px" }}></input>
                </Col>
                <Col lg="3" md="12" sm="12">
                  <label>Email</label>
                  <br />
                  <input style={{ width: "100%", height: "30px" }}></input>
                </Col>
                <Col lg="3" md="12" sm="12" className="mt-3">
                  <label>Photo</label>
                  <br />
                  <input
                    type="file"
                    style={{ width: "100%", height: "30px" }}
                  ></input>
                </Col>
              </Row>
              <br />
              <Row>
                <Col lg="6" md="12" sm="12">
                  <label>Current Address</label>
                  <textarea
                   

                   
                    style={{ width: "100%", height: "50px" }}
                  ></textarea>
                </Col>
                <Col lg="6" md="12" sm="12">
                  <label>Permanent Address</label>
                  <textarea
                    
                    style={{ width: "100%", height: "50px" }}
                  ></textarea>
                </Col>
              </Row>
              <br />
              <Row>
                <Col lg="3" md="12" sm="12">
                  <label>Qualification</label>
                  <br />
                  <textarea
                   
                    style={{ width: "100%", height: "50px" }}
                  ></textarea>
                </Col>
                <Col lg="3" md="12" sm="12">
                  <label>Work Experience</label>
                  <br />
                  <textarea
                    
                    style={{ width: "100%", height: "50px" }}
                  ></textarea>
                </Col>
                <Col lg="3" md="12" sm="12">
                  <label>Specialization</label>
                  <br />
                  <textarea
                    
                    style={{ width: "100%", height: "50px" }}
                  ></textarea>
                </Col>
                <Col lg="3" md="12" sm="12">
                  <label>Note</label>
                  <br />
                  <textarea
                    
                    style={{ width: "100%", height: "50px" }}
                  ></textarea>
                </Col>
              </Row>
              <br />
              <Row>
                <Col lg="3" md="12" sm="12">
                  <label>PAN Number</label>
                  <br />
                  <input style={{ width: "100%", height: "30px" }}></input>
                </Col>
                <Col lg="3" md="12" sm="12">
                  <label>National Identification Number</label>
                  <br />
                  <input style={{ width: "100%", height: "30px" }}></input>
                </Col>
                <Col lg="3" md="12" sm="12">
                  <label>Local Identification Number</label>
                  <br />
                  <input style={{ width: "100%", height: "30px" }}></input>
                </Col>
                <Col lg="3" md="12" sm="12">
                  <label>Reference Contact</label>
                  <br />
                  <input style={{ width: "100%", height: "30px" }}></input>
                </Col>
              </Row>
              <br />
              <Row className="mt-3">
                <Col>
                  <div>
                  <h4
                  
                  >Add Other Details</h4>
                  <div id="toggler" style={{display: 'flex', justifyContent: 'flex-end'}}>
                  <Button
                      color="primary"
                      
                      style={{ marginBottom: "1rem" }}
                    >
                      <i className="fas fa-caret-down fa-lg"></i>
                    </Button>
                  </div>
                    
                    <UncontrolledCollapse toggler="#toggler">
                      <Card>
                        <CardBody>
                          <div className="bg-primary bg-soft p-2">
                            <h5 className="mt-1 ms-1">Payroll</h5>
                          </div>
                          <Row className="mt-3">
                            <Col lg='4'>
                              <label>EPF No</label>
                              <br />
                              <input style={{ width: "100%", height: "30px" }}></input>
                            </Col>
                            <Col lg='4'>
                              <label>Basic Salary</label>
                              <br />
                              <input style={{ width: "100%", height: "30px" }}></input>
                            </Col>
                            <Col lg='4'>
                              <label >Contract Type</label>
                              <br />
                              <select style={{ width: "100%", height: "30px" }}>
                                <option>Select</option>
                                <option>Permanent</option>
                                <option>Probation</option>
                              </select>
                            </Col>
                            </Row>
                            <br />
                            <Row>
                            <Col lg='4'>
                              <label>Work Shift</label>
                              <br />
                              <input style={{ width: "100%", height: "30px" }}></input>
                            </Col>
                            <Col lg='4'>
                              <label>Work Location</label>
                              <br />
                              <input style={{ width: "100%", height: "30px" }}></input>
                            </Col>
                            </Row>
                            <br />
                            <Row>
                              <div className="bg-primary bg-soft p-2 mb-3">
                                <h5 className="mt-1 ms-2">Leaves</h5>
                              </div>
                              <Col lg='4'>
                                <label>Casual Leave</label>
                                <br />
                                <input placeholder="Number of leaves" style={{ width: "100%", height: "30px" }}></input>
                              </Col>
                              <Col lg='4'>
                                <label>Privilege Leave</label>
                                <br />
                                <input placeholder="Number of leaves" style={{ width: "100%", height: "30px" }}></input>
                              </Col>
                              <Col lg='4'>
                                <label>Sick Leave</label>
                                <br />
                                <input placeholder="Number of leaves" style={{ width: "100%", height: "30px" }}></input>
                              </Col>
                            </Row>
                            <br />
                            <Row>
                            <Col lg='4'>
                                <label>Maternity Leave</label>
                                <br />
                                <input placeholder="Number of leaves" style={{ width: "100%", height: "30px" }}></input>
                              </Col>
                              <Col lg='4'>
                                <label>Paternity Leave</label>
                                <br />
                                <input placeholder="Number of leaves" style={{ width: "100%", height: "30px" }}></input>
                              </Col>
                              <Col lg='4'>
                                <label>Fever Leave</label>
                                <br />
                                <input placeholder="Number of leaves" style={{ width: "100%", height: "30px" }}></input>
                              </Col>
                            </Row>
                            <br />
                            <Row>
                            <div className="bg-primary bg-soft p-2 mb-3">
                                <h5 className="mt-1 ms-2">Bank Account Details</h5>
                              </div>
                              <Col lg='4'>
                                <label>Account Title</label>
                                <br />
                                <input style={{ width: "100%", height: "30px" }}></input>
                              </Col>
                              <Col lg='4'>
                                <label>Account Title</label>
                                <br />
                                <input style={{ width: "100%", height: "30px" }}></input>
                              </Col>
                              <Col lg='4'>
                                <label>Bank Account No.</label>
                                <br />
                                <input style={{ width: "100%", height: "30px" }}></input>
                              </Col>
                              </Row>
                              <br />
                              <Row>
                              <Col lg='4'>
                                <label>Account Name</label>
                                <br />
                                <input style={{ width: "100%", height: "30px" }}></input>
                              </Col>
                              <Col lg='4'>
                                <label>IFSC Code</label>
                                <br />
                                <input style={{ width: "100%", height: "30px" }}></input>
                              </Col>
                              <Col lg='4'>
                                <label>Bank Branch Name</label>
                                <br />
                                <input style={{ width: "100%", height: "30px" }}></input>
                              </Col>
                              </Row>
                            <br />
                            <Row>
                              <div className="bg-primary bg-soft p-2 mb-3">
                                <h5 className="mt-1">Social Media Link</h5>
                              </div>
                              <Col lg='6'>
                                <label>Facebook URL</label>
                                <br />
                                <input style={{ width: "100%", height: "30px" }}></input>
                              </Col>
                              <Col lg='6'>
                                <label>Twitter URL</label>
                                <br />
                                <input style={{ width: "100%", height: "30px" }}></input>
                              </Col>
                            </Row>
                            <br />
                            <Row>
                              <Col lg='6'>
                                <label>Linkedin URL</label>
                                <br />
                                <input style={{ width: "100%", height: "30px" }}></input>
                              </Col>
                              <Col lg='6'>
                                <label>Instagram URL</label>
                                <br />
                                <input style={{ width: "100%", height: "30px" }}></input>
                              </Col>
                            </Row>
                            <br />
                            <Row>
                              <div className="bg-primary bg-soft  p-2 mb-3">
                                <h5 className="mt-1">Upload Documents</h5>
                              </div>
                              <Col lg='4'>
                                <p>1. Resume</p>
                                <input type="file"></input>
                              </Col>
                              <Col lg='4'>
                                <p>2.Joining Letter</p>
                                <input type="file"></input>
                              </Col>
                              <Col lg='4'>
                                <p>3.Other Documents</p>
                                <input type="file"></input>
                              </Col>
                            </Row>
                        </CardBody>
                      </Card>
                    </UncontrolledCollapse>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(AddStaff)
