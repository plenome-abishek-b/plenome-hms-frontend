import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Container,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  TabContent,
} from "reactstrap";

//Import Breadcrumb
//i18n
import { withTranslation } from "react-i18next";
import classnames from "classnames";
//redux
import OpdTimeline from "./OpdTable/OpdTimeline";
import { CellPositionUtils } from "ag-grid-community";
import VisitTable from "./OpdTable/VisitTable";
import Visits from "./OpdTable/Visits";
import LabInvest from "./OpdTable/LabInvestigation";
import Treatment from "./OpdTable/Treatment";
import OpdVisits from "./OpdTabs/OpdVisits";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import api from "services/Api";
import OpdVisitDialog from "./OpdDialog/OpdVisitsDialog";

const Message = (props) => {
  const [details, setDetails] = useState([]);
  const [consultant,setConsultant] = useState([]);
  const [selectedData,setSelectedData] = useState({});
  const [openVisit, setOpenVisit] = useState(false);

  const params = useParams();
  console.log(params.pid, "params");
  const pid = params?.pid;
  const [activeTab, setactiveTab] = useState("1");
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setactiveTab(tab);
    }
  };
  // useEffect(()=>{
  //  getDetails()
  // },[])
  useEffect(() => {
    getOverView();
    getConsultant()
  }, [params?.pid]);
  const getOverView = async () => {
    const response = await api.get_OPD_Overview(pid);
    const { data } = response;
    console.log(data, "all details");
    localStorage.setItem('opdid',data[0]?.OPD_ID)
    setDetails(data);
  };
  const handleOpenVisit = () => {
    setOpenVisit(true)
  };
  const getConsultant = async () =>{
   const response = await api.get_OPD_Consultant(pid)
   const {data} = response;
   console.log(data,"all data");
   setConsultant(data);
  }
  //     const getDetails = async () =>{
  // //    const data =
  //     }
  const handleOPDEdit = async () =>{
    handleOpenVisit(true)
    console.log(details[0]?.OPD_ID,"OPD ID")
    const response = await api.get_OPD_VISIT_list(details[0]?.OPD_ID);
    const {data} = response;
    setSelectedData(data[0]);
  }
  const handleCloseVisit = () => {
    setOpenVisit(false)
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
                          toggle("1");
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
                          toggle("2");
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
                      {/* <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeTab === "3",
                        })}
                        onClick={() => {
                          toggle("3");
                        }}
                      >
                        <i
                          className="fas fa-diagnoses"
                          style={{ marginRight: "4px" }}
                        ></i>
                        Lab Investigation
                      </NavLink> */}
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeTab === "4",
                        })}
                        onClick={() => {
                          toggle("4");
                        }}
                      >
                        <i
                          className="fas fa-hourglass-half"
                          style={{ marginRight: "4px" }}
                        ></i>
                        Treatment History
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeTab === "5",
                        })}
                        onClick={() => {
                          toggle("5");
                        }}
                      >
                        <i
                          className="fas fa-calendar-check"
                          style={{ marginRight: "4px" }}
                        ></i>
                        Timeline
                      </NavLink>
                    </NavItem>
                  </Nav>

                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                      <Row>
                        <Col className="lg='6">
                          <Row>
                            <Col lg="3">
                              <div className="avatar-md profile-user-wid mt-3">
                                <img
                                  src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                                  alt=""
                                  className="img-thumbnail rounded-circle"
                                />
                              </div>
                              <h5 className="mt-4">Patient Name</h5>{" "}
                              <h3>{details[0]?.name}</h3>
                            </Col>
                            <Col lg="3" sm="6" className="mt-5 ms-3">
                              <i className="fas fa-pencil-alt" onClick={()=>handleOPDEdit()} style={{marginBottom:'30px'}}></i>     
                              <div
                                style={{
                                  display: "flex",
                                  marginBottom: "10px",
                                }}
                              >
                                <p
                                  className="fw-bold"
                                  style={{ marginRight: "10px" }}
                                >
                                  Gender:
                                </p>
                                <span>{details[0]?.gender}</span>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  marginBottom: "10px",
                                }}
                              >
                                <p
                                  className="fw-bold"
                                  style={{ marginRight: "10px" }}
                                >
                                  Age:
                                </p>
                                <span>
                                  {details[0]?.age ? details[0]?.age : "null"}
                                </span>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  marginBottom: "10px",
                                }}
                              >
                                <p
                                  className="fw-bold"
                                  style={{ marginRight: "10px" }}
                                >
                                  Guardian.name:
                                </p>
                                <span style={{ flex: "1" }}>
                                  {details[0]?.guardian_name}
                                </span>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  marginBottom: "10px",
                                }}
                              >
                                <p
                                  className="fw-bold"
                                  style={{ marginRight: "10px" }}
                                >
                                  Phone:
                                </p>
                                <span>{details[0]?.phone}</span>
                              </div>
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
                            {/* <Col lg="3">
                              <p className="fw-bold">Case ID</p>
                              <p className="fw-bold">IPD No</p>
                              <p className="fw-bold">Admission Date</p>
                              <p className="fw-bold">Bed</p>
                            </Col> */}
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
                            <div className="mt-2 ms-2 fw-bold">
                              <ul>
                                {details.map((val=>(

                                <li>
                                  <p>{val?.known_allergies ? val?.known_allergies : 'null'}</p>
                                </li>
                                )))}
                                {/* <li>
                                  <p>Doctor_2 name</p>
                                </li> */}
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
                            <p className="fw-bold fs-5">
                              <i
                                className="fas fa-tag"
                                style={{ marginRight: "5px" }}
                              ></i>
                              Findings
                            </p>
                            <div className="mt-2 ms-2 fw-bold">
                              <ul>
                                {details.map((val=>(

                                <li>
                                  <p>{val?.consultant_doctor}</p>
                                </li>
                                )))}
                                {/* <li>
                                  <p>Doctor_2 name</p>
                                </li> */}
                              </ul>
                            </div>
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
                            <div className="mt-2 ms-2 fw-bold">
                              <ul>
                                {details.map((val=>(

                                <li>
                                  <p>{val?.symptoms  ? val?.symptoms : 'null'}</p>
                                </li>
                                )))}
                                {/* <li>
                                  <p>Doctor_2 name</p>
                                </li> */}
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
                            <p className="fw-bold fs-5">Consultant Doctor</p>
                            <div className="mt-2 ms-2 fw-bold">
                              <ul>
                                {consultant.map((val=>(

                                <li>
                                  <p>{val?.consultant_doctor}</p>
                                </li>
                                )))}
                                {/* <li>
                                  <p>Doctor_2 name</p>
                                </li> */}
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
                          {/* <Row>
                            <Col className="" style={{ borderRadius: "8px" }}>
                              <p className="fw-bold fs-5 mt-4">Timeline</p>
                              <OpdTimeline />
                            </Col>
                          </Row> */}
                        </Col>
                        <Col lg="6">
                          <hr
                            className="mt-2"
                            style={{
                              background: "rgba(0,0,0,0.2)",
                              color: "grey",
                              borderColor: "grey",
                              height: "0.5px",
                            }}
                          />
                          <Row>
                            <Col>
                              <p className="fw-bold fs-5">Visit Details</p>
                              <Visits />    
                              <br />
                              {/* <p className="fw-bold fs-5">Lab Investigation</p>
                              <LabInvest />
                              <br />
                              <hr
                                className="mt-2"
                                style={{
                                  background: "rgba(0,0,0,0.2)",
                                  color: "grey",
                                  borderColor: "grey",
                                  height: "0.5px",
                                }}
                              />
                              <p className="fw-bold fs-5">Treatment History</p>
                              <Treatment /> */}
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="2">
                      <h4 className="mt-4">Visits</h4>
                      <Visits />
                    </TabPane>
                    <TabPane tabId="3">
                      <h4 className="mt-4">Lab Investigation</h4>
                      <LabInvest />
                    </TabPane>
                    <TabPane tabId="4">
                      <h4 className="mt-4">Treatment History</h4>
                      <Treatment />
                    </TabPane>
                    <TabPane tabId="5">
                      <h4 className="mt-4">Timeline</h4>
                      <OpdTimeline />
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          </Row>
        <OpdVisitDialog selectedData={selectedData} open={openVisit} handleClose={handleCloseVisit}/>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withTranslation()(Message);
