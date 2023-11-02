import React, { useState } from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  TabPane,
  TabContent,
  Nav,
  NavItem,
  NavLink,
  Container,
} from "reactstrap"
import classnames from "classnames"
import ProgressBar from "@ramonak/react-progress-bar"
import OpdTimeline from "../OpdTable/OpdTimeline"
import VisitTable from "../OpdTable/VisitTable"
import LabInvest from "../OpdTable/LabInvestigation"
import Visits from "../OpdTable/Visits"
import LabInvestigation from "pages/InPatient/IpdTabs/LabInvestigation"
import Treatment from "../OpdTable/Treatment"
import { withTranslation } from "react-i18next"
import OperationTable from "../OpdTable/OperationTable"
import Payment from "../OpdTable/Payment"
import Medication from "pages/InPatient/IpdTabs/Medication"
import MedicationTable from "../OpdTable/MedicationTable"
import Charges from "../OpdTable/Charges"
import LiveConsult from "pages/Consultation/LiveConsult"
import LiveConsultation from "../OpdTable/LiveConsultation"
import OpdVisits from "../OpdTabs/OpdVisits"
import OpdChargeDialog from "../OpdDialog/OpdChargeDialog"
import OpdPaymentDialog from "../OpdDialog/OpdPaymentDialog"
import MedicationDialog from "pages/InPatient/IpdPatientProfile/MedicationDialog"
import OpdCharges from "../OpdTabs/OpdCharges";
import OpdTimelineDialog from "../OpdDialog/OpdTimelineDialog"
import OpdOperationDialog from "../OpdDialog/OpdOperationDialog"


const OutPatientProfile = props => {
  const [activeTab, setactiveTab] = useState("1")
  
  

  const [openTimeline, setOpenTimeline] = useState(false)

  

  const toggle = tab => {
    if (activeTab !== tab) {
      setactiveTab(tab)
    }
  }

  
 


  const handleOpenTimeline = () => {
    setOpenTimeline(true)
  }

  const handleCloseTimeline = () => {
    setOpenTimeline(false)
  }


  


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <Nav tabs>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeTab === "1",
                        })}
                        onClick={() => {
                          toggle("1")
                        }}
                      >
                        <i
                          className="fas fa-th"
                          style={{ marginRight: "4px" }}
                        ></i>
                        Overview
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeTab === "2",
                        })}
                        onClick={() => {
                          toggle("2")
                        }}
                      >
                        <i
                          className="fas fa-caret-square-down"
                          style={{ marginRight: "4px" }}
                        ></i>
                        Visits
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeTab === "3",
                        })}
                        onClick={() => {
                          toggle("3")
                        }}
                      >
                        <i
                          className="fas fa-medkit"
                          style={{ marginRight: "4px" }}
                        ></i>
                        Medication
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeTab === "4",
                        })}
                        onClick={() => {
                          toggle("4")
                        }}
                      >
                        <i
                          className="fas fa-diagnoses"
                          style={{ marginRight: "4px" }}
                        ></i>
                        Lab Investigation
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeTab === "5",
                        })}
                        onClick={() => {
                          toggle("5")
                        }}
                      >
                        <i
                          className="fas fa-operation"
                          style={{ marginRight: "4px" }}
                        ></i>
                        Operations
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeTab === "6",
                        })}
                        onClick={() => {
                          toggle("6")
                        }}
                      >
                        <i
                          className="fas fa-calendar-check"
                          style={{ marginRight: "4px" }}
                        ></i>
                        Charges
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeTab === "7",
                        })}
                        onClick={() => {
                          toggle("7")
                        }}
                      >
                        <i
                          className="fas fa-calendar"
                          style={{ marginRight: "4px" }}
                        ></i>
                        Payments
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeTab === "8",
                        })}
                        onClick={() => {
                          toggle("8")
                        }}
                      >
                        <i
                          className="fas fa-video"
                          style={{ marginRight: "4px" }}
                        ></i>
                        Live Consultation
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeTab === "9",
                        })}
                        onClick={() => {
                          toggle("9")
                        }}
                      >
                        <i
                          className="fas fa-clock"
                          style={{ marginRight: "4px" }}
                        ></i>
                        Timeline
                      </NavLink>
                    </NavItem>
                  </Nav>

                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                      <Row>
                        <Col lg="6" className="mt-3">
                          <Row>
                            <Col lg="3">
                              <h5 className="mt-4">Patient Name</h5>
                              <div className="avatar-md profile-user-wid mt-3">
                                <img
                                  src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                                  alt=""
                                  className="img-thumbnail rounded-circle"
                                />
                              </div>
                            </Col>
                            <Col lg="3" sm="6" className="mt-5 ms-3">
                              <p className="fw-bold">Gender</p>
                              <p className="fw-bold">Age</p>
                              <p className="fw-bold">Guardian Name</p>
                              <p className="fw-bold">Phone</p>
                            </Col>
                            <hr
                              className="mt-2"
                              style={{
                                background: "rgba(0,0,0,0.2)",
                                color: "grey",
                                borderColor: "grey",
                                height: "0.5px",
                              }}
                            />
                          </Row>
                          <Row>
                            <Col lg="3">
                              <p className="fw-bold">Case ID</p>
                              <p className="fw-bold">IPD No</p>
                              <p className="fw-bold">Admission Date</p>
                              <p className="fw-bold">Bed</p>
                            </Col>
                            <hr
                              className="mt-2"
                              style={{
                                background: "rgba(0,0,0,0.2)",
                                color: "grey",
                                borderColor: "grey",
                                height: "0.5px",
                              }}
                            />
                          </Row>
                          <Row>
                            <p className="fw-bold fs-5">
                              <i
                                className="fas fa-tag"
                                style={{ marginRight: "5px" }}
                              ></i>
                              Known Allergies
                            </p>
                            <hr
                              className="mt-2"
                              style={{
                                background: "rgba(0,0,0,0.2)",
                                color: "grey",
                                borderColor: "grey",
                                height: "0.5px",
                              }}
                            />
                            <p className="fw-bold fs-5">
                              <i
                                className="fas fa-tag"
                                style={{ marginRight: "5px" }}
                              ></i>
                              Findings
                            </p>
                            <hr
                              className="mt-2"
                              style={{
                                background: "rgba(0,0,0,0.2)",
                                color: "grey",
                                height: "0.5px",
                              }}
                            />
                            <p className="fw-bold fs-5">
                              <i
                                className="fas fa-tag"
                                style={{ marginRight: "5px" }}
                              ></i>
                              Symptoms
                            </p>
                            <hr
                              className="mt-2"
                              style={{
                                background: "rgba(0,0,0,0.2)",
                                color: "grey",
                                borderColor: "grey",
                                height: "0.5px",
                              }}
                            />
                          </Row>
                          <Row>
                            <p className="fw-bold fs-5">Consultant Doctor</p>

                            <div className="mt-2 ms-2 fw-bold">
                              <ul>
                                <li>
                                  <p>Doctor_1 name</p>
                                </li>
                                <li>
                                  <p>Doctor_2 name</p>
                                </li>
                              </ul>
                            </div>
                            <hr
                              className="mt-2"
                              style={{
                                background: "rgba(0,0,0,0.2)",
                                color: "grey",
                                borderColor: "grey",
                                height: "0.5px",
                              }}
                            />
                          </Row>
                          <Row>
                            <p className="fw-bold fs-5">Nurse Notes</p>
                            <div className="timeline-item">
                              <h4 className="timeline-header text-primary">
                                Notes
                              </h4>
                              <div className="timeline-body">Note</div>
                            </div>
                            <hr
                              className="mt-2"
                              style={{
                                background: "rgba(0,0,0,0.2)",
                                color: "grey",
                                borderColor: "grey",
                                height: "0.5px",
                              }}
                            />
                          </Row>
                          <Row>
                            <p className="fw-bold fs-5">Timeline</p>
                            <Col lg="12" className="mt-2">
                              <OpdTimeline />
                            </Col>
                          </Row>
                        </Col>
                        <Col lg="6">
                          <Row>
                            <Col lg="3" style={{ width: "50%" }}>
                              <p className="fw-bold fs-6 mt-4">
                                IPD Payment Billing
                                <i
                                  className="fas fa-procedures"
                                  style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    alignItems: "flex-end",
                                  }}
                                ></i>
                              </p>
                              <br />
                              <ProgressBar
                                completed={50}
                                bgColor="#537FE7"
                                animateOnRender={true}
                                height="15px"
                              />
                            </Col>
                            <Col lg="3" style={{ width: "50%" }}>
                              <p className="fw-bold fs-6 mt-4">
                                Pharmacy Payment/Billing
                                <i
                                  className="fas fa-mortar-pestle "
                                  style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    alignItems: "flex-end",
                                  }}
                                ></i>
                              </p>
                              <br />
                              <ProgressBar
                                completed={0}
                                bgColor="#537FE7"
                                animateOnRender={true}
                                height="15px"
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col lg="3" style={{ width: "50%" }}>
                              <p className="fw-bold fs-6 mt-4">
                                Pathology Payment/Billing
                                <i
                                  className="fas fa-flask "
                                  style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    alignItems: "flex-end",
                                  }}
                                ></i>
                              </p>
                              <br />
                              <ProgressBar
                                completed={20}
                                bgColor="#537FE7"
                                animateOnRender={true}
                                height="15px"
                              />
                            </Col>
                            <Col lg="3" style={{ width: "50%" }}>
                              <p className="fw-bold fs-6 mt-4">
                                Radiology Payment/Billing
                                <i
                                  className="fas fa-microscope "
                                  style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    alignItems: "flex-end",
                                  }}
                                ></i>
                              </p>
                              <br />
                              <ProgressBar
                                completed={0}
                                bgColor="#537FE7"
                                animateOnRender={true}
                                height="15px"
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col lg="3" style={{ width: "50%" }}>
                              <p className="fw-bold fs-6 mt-4">
                                Blood Bank Payment/Billing
                                <i
                                  className="fas fa-tint "
                                  style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    alignItems: "flex-end",
                                  }}
                                ></i>
                              </p>
                              <br />
                              <ProgressBar
                                completed={70}
                                bgColor="#537FE7"
                                animateOnRender={true}
                                height="15px"
                              />
                            </Col>
                            <Col lg="3" style={{ width: "50%" }}>
                              <p className="fw-bold fs-6 mt-4">
                                Ambulance Payment/Billing
                                <i
                                  className="fas fa-ambulance"
                                  style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    alignItems: "flex-end",
                                  }}
                                ></i>
                              </p>
                              <br />
                              <ProgressBar
                                completed={0}
                                bgColor="#537FE7"
                                animateOnRender={true}
                                height="15px"
                              />
                            </Col>
                            <hr
                              className="mt-3"
                              style={{
                                background: "rgba(0,0,0,0.2)",
                                color: "grey",
                                borderColor: "grey",
                                height: "0.5px",
                              }}
                            />
                          </Row>
                          <Row>
                            <Col>
                              <p className="fw-bold fs-4">Medication</p>
                              <MedicationTable />
                            </Col>
                          </Row>
                          <hr
                            className="mt-3"
                            style={{
                              background: "rgba(0,0,0,0.2)",
                              color: "grey",
                              borderColor: "grey",
                              height: "0.5px",
                            }}
                          />

                          <br />
                          <Row>
                            <p className="fw-bold fs-5">Lab Investigation</p>

                            <Col lg="12">
                              <LabInvest />
                            </Col>
                          </Row>
                          <hr
                            className="mt-3"
                            style={{
                              background: "rgba(0,0,0,0.2)",
                              color: "grey",
                              borderColor: "grey",
                              height: "0.5px",
                            }}
                          />
                          <Row>
                            <p className="fw-bold fs-5">Operation</p>
                            <Col lg="12">
                              <OperationTable />
                            </Col>
                          </Row>
                          <hr
                            className="mt-3"
                            style={{
                              background: "rgba(0,0,0,0.2)",
                              color: "grey",
                              borderColor: "grey",
                              height: "0.5px",
                            }}
                          />
                          <Row>
                            <p className="fw-bold fs-5 mt-3">Charges</p>
                            <Row>
                              <Col>
                                <OpdCharges />
                              </Col>
                            </Row>
                            <br />
                            <p className="fw-bold fs-5 mt-3">Payment</p>
                            <Row>
                              <Col lg="12">
                                <Payment />
                              </Col>
                            </Row>
                            <br />
                            <p className="fw-bold fs-5 mt-3">
                              Live Consultation
                            </p>
                            <Row>
                              <Col lg="12">
                                <LiveConsultation />
                              </Col>
                            </Row>
                            <br />
                          </Row>
                          <hr
                            className="mt-3"
                            style={{
                              background: "rgba(0,0,0,0.2)",
                              color: "grey",
                              borderColor: "grey",
                              height: "0.5px",
                            }}
                          />
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="2">
                      <h4 className="mt-4">Visits</h4>
                      <Visits />
                    </TabPane>
                    <TabPane tabId="3">
                      <h4 className="mt-4">Medication</h4>
                      
                      <MedicationTable />
                    </TabPane>
                    <TabPane tabId="4">
                      <h4 className="mt-4">Lab Investigation</h4>
                      <LabInvest />
                    </TabPane>
                    <TabPane tabId="5">
                      <h4 className="mt-4">Operation</h4>
                      
                      <OperationTable />
                    </TabPane>
                    <TabPane tabId="6">
                      <h4 className="mt-4">Charges</h4>
                      <OpdCharges />
                    </TabPane>
                    <TabPane tabId="7">
                        <h4 className="mt-4">Payments</h4>
                        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                            
                        </div>
                        <Payment />
                    </TabPane>
                    <TabPane tabId="8">
                        <h4 className="mt-4">Live Consultation</h4>
                        <LiveConsultation />
                    </TabPane>
                    <TabPane tabId="9">
                      <h4 className="mt-4">Timeline</h4>
                      <div>
                        <button className="btn btn-primary" onClick={handleOpenTimeline}>+ Add Timeline</button>
                        <OpdTimelineDialog open={openTimeline} handleClose={handleCloseTimeline}/>
                      </div>
                      <OpdTimeline />
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(OutPatientProfile)
