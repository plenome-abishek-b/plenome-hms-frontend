import React, { useState, useEffect } from "react"
import ProgressBar from "@ramonak/react-progress-bar"
import { MDBContainer, MDBIcon } from "mdb-react-ui-kit"
import "mdb-react-ui-kit/dist/css/mdb.min.css"
import MedicationDialog from "./IpdPatientProfile/MedicationDialog"
import ConsultantRegisterDialog from "./IpdPatientProfile/ConsultantRegisterDialog"
// import OperationDialog from "./IpdPatientProfile/OperationDialog";
import PaymentDialog from "./IpdPatientProfile/PaymentDialog"
import NurseNoteDialog from "./IpdPatientProfile/NurseNoteDialog"
import PrescriptionDialog from "./IpdPatientProfile/PrescriptionDialog"
import TimelineDialog from "./IpdPatientProfile/TimelineDialog"
import DischargedPatientDialog from "./IpdPatientProfile/DischargedPatientDialog"
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Button,
  Label,
  Input,
  FormFeedback,
  Form,
  CardTitle,
  Table,
  Nav,
  NavItem,
  NavLink,
  TabPane,
  TabContent,
  CardText,
} from "reactstrap"
import OperationDialog from "./IpdPatientProfile/OperationDialog"
import ChargeDialog from "./IpdPatientProfile/ChargeDialog"

import { Link, withRouter } from "react-router-dom"

import classnames from "classnames"
import MedicationTable from "./InPatientTable/MedicationTable"
import PrescriptionTable from "./InPatientTable/PrescriptionTable"
import ConsultantTable from "./InPatientTable/ConsultantTable"
import LabTable from "./InPatientTable/LabTable"
import OperationTable from "./InPatientTable/OperationTable"
import PaymentTable from "./InPatientTable/PaymentTable"
import LiveTable from "./InPatientTable/LiveConsultation"
import BedTable from "./InPatientTable/BedTable"

import Medication from "./IpdTabs/Medication"
import Prescription from "./IpdTabs/Prescription"
import Consultant from "./IpdTabs/Consultant"
import LabInvestigation from "./IpdTabs/LabInvestigation"
import Operation from "./IpdTabs/Operation"
import Charges from "./IpdTabs/Charges"
import Payment from "./IpdTabs/Payment"
import Liveconsult from "./IpdTabs/LiveConsult"
import Bed from "./IpdTabs/Bed"
import Treatment from "./IpdTabs/Treatment"
import NurseNote from "./IpdTabs/NurseNote"
import LeftPositionedTimeline from "./IpdTabs/Timeline"
import { useParams } from "react-router-dom"
import api from "services/Api"

const UserProfile = ({ data }) => {
  const [activeTab, setactiveTab] = useState("1")
  const [patientId, setPatientId] = useState({})
  const [patient, setPatient] = useState([])

  const [openDischarge, setOpenDischarge] = useState(false)
  // const [overviewDetails,setOverviewDetails] = useState([])
  const { ipdno } = useParams()
  const userTabs = [
    { name: "Profile", tabId: "1" },
    { name: "Address", tabId: "2" },
    { name: "Health", tabId: "3" },
  ]
  // console.log(overviewDetails,"data data data")

  const toggle = tab => {
    if (activeTab !== tab) {
      setactiveTab(tab)
    }
  }
  const [open, setOpen] = React.useState(false)
  // useEffect(()=>{
  //   fetchOverview(ipdno)
  // },[])

  // const fetchOverview = async () =>{
  //   const response = await api.getOverviewDetails(ipdno)
  //   const {data} = response
  //   setOverviewDetails(data)
  //   console.log(data,"overview data")
  // }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const [openCrDialog, setOpenCrDialog] = React.useState(false)

  const handleOpenCr = () => {
    setOpenCrDialog(true)
  }

  const handleCloseCr = () => {
    setOpenCrDialog(false)
  }

  const [openOperationDialog, setOpenOperationDialog] = React.useState(false)

  const handleOpenOperation = () => {
    setOpenOperationDialog(true)
  }

  const handleCloseOperation = () => {
    setOpenOperationDialog(false)
  }

  const [openChargeDialog, setOpenChargeDialog] = React.useState(false)

  const handleOpenCharge = () => {
    setOpenChargeDialog(true)
  }

  const handleCloseCharge = () => {
    setOpenChargeDialog(false)
  }

  const [openPaymentDialog, setOpenPaymentDialog] = React.useState(false)

  const handleOpenPayment = () => {
    setOpenPaymentDialog(true)
  }

  const handleClosePayment = () => {
    setOpenPaymentDialog(false)
  }

  const [openNurseDialog, setOpenNurseDialog] = React.useState(false)

  const handleOpenNurse = () => {
    setOpenNurseDialog(true)
  }

  const handleCloseNurse = () => {
    setOpenNurseDialog(false)
  }

  const [openPrescriptionDialog, setOpenPrescriptionDialog] =
    React.useState(false)

  const handleOpenPrescription = () => {
    setOpenPrescriptionDialog(true)
  }

  const handleClosePrescription = () => {
    setOpenPrescriptionDialog(false)
  }

  const [openTimelineDialog, setOpenTimelineDialog] = React.useState(false)

  const handleOpenTimeline = () => {
    setOpenTimelineDialog(true)
  }

  const handleCloseTimeline = () => {
    setOpenTimelineDialog(false)
  }
  const { ipdon } = useParams()

 

  const handlePatient = async () => {
    // useEffect(()=>{
    // getPatientId()
    // },[])
    const response = await api.getPatientId(ipdno)
    const { data } = response
    console.log("response", response)
    console.log(data, "datrrrrrr")
    setPatient(data)
  }

  useEffect(() => {
    // Call the handlePatient function when the component mounts
    handlePatient()
  }, [])

  console.log(patient, "patientttt")

  // console.log(ipdno,"ioii")
  // const getPatientId = async () =>{

  // }

  const handleOpenDischarge = () => {
    setOpenDischarge(true)
  }

  const handleCloseDischarge = () => {
    setOpenDischarge(false)
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}

          <Row>
            <Col lg="12" sm="12">
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
                          className="fas fa-sticky-note"
                          style={{ marginRight: "4px" }}
                        ></i>
                        Nurse Notes
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
                          className="fas fa-calendar-check"
                          style={{ marginRight: "4px" }}
                        ></i>
                        Prescription
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
                          className="fas fa-file-prescription"
                          style={{ marginRight: "4px" }}
                        ></i>
                        Consultant Register
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
                          active: activeTab === "7",
                        })}
                        onClick={() => {
                          toggle("7")
                        }}
                      >
                        <i
                          className="fas fa-cut"
                          style={{ marginRight: "4px" }}
                        ></i>
                        Operations
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
                          className="fas fa-donate"
                          style={{ marginRight: "4px" }}
                        ></i>
                        Charges
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
                          handlePatient()
                        }}
                      >
                        <i
                          className="fas fa-hand-holding-usd"
                          style={{ marginRight: "4px" }}
                        ></i>
                        Payments
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeTab === "10",
                        })}
                        onClick={() => {
                          toggle("10")
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
                          active: activeTab === "11",
                        })}
                        onClick={() => {
                          toggle("11")
                        }}
                      >
                        <i
                          className="fas fa-procedures"
                          style={{ marginRight: "4px" }}
                        ></i>
                        Bed History
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeTab === "12",
                        })}
                        onClick={() => {
                          toggle("12")
                        }}
                      >
                        <i
                          className="fas fa-calendar-check"
                          style={{ marginRight: "4px" }}
                        ></i>
                        Timeline
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeTab === "13",
                        })}
                        onClick={() => {
                          toggle("13")
                        }}
                      >
                        <i
                          className="fas fa-hourglass-half"
                          style={{ marginRight: "4px" }}
                        ></i>
                        Treatment History
                      </NavLink>
                    </NavItem>
                  </Nav>

                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                      <Row>
                        <Col lg="6" className="mt-3">
                          <Row>
                            <Col lg="3">
                              <div>
                                {/* <h5 className="mt-4">Patient Name : {overviewDetails[0]?.patient_name}</h5>  */}
                              </div>
                              {patient &&
                                    patient.map(patient => (
                                      <h4
                                        key={patient.patient_name}
                                        value={patient.patient_name}
                                        className="fw-bold text-secondary ms-3"
                                      >
                                        {patient.patient_name}
                                      </h4>
                                    ))}
                              <div className="avatar-md profile-user-wid mt-3 ms-3">
                                <img
                                  src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                                  alt=""
                                  className="img-thumbnail rounded-circle"
                                  style={{ border: "4px solid #1B9C85" }}
                                />
                              </div>
                            </Col>
                            <div
                              className="d-flex justify-content-end"
                              style={{ position: "relative", bottom: "60px" }}
                            >
                              <button
                                className="btn btn-warning"
                                onClick={handleOpenDischarge}
                              >
                                <i className="fa fa-bed"></i>
                              </button>
                              <DischargedPatientDialog
                                open={openDischarge}
                                handleClose={handleCloseDischarge}
                              />
                            </div>
                            <Col lg="3" sm="6" className="mt-5 ms-3">
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <p className="fw-bold">Gender :</p>
                                  {patient &&
                                    patient.map(patient => (
                                      <p
                                        key={patient.gender}
                                        value={patient.gender}
                                        className="fw-bold text-primary ms-3"
                                      >
                                        {patient.gender}
                                      </p>
                                    ))}
                                </div>

                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <p className="fw-bold">Age :</p>
                                  {patient &&
                                    patient.map(patient => (
                                      <p
                                        key={patient.age}
                                        value={patient.age}
                                        className="fw-bold text-primary ms-3"
                                      >
                                        {patient.age}
                                      </p>
                                    ))}
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <p className="fw-bold">Guardian Name :</p>
                                  {patient &&
                                    patient.map(patient => (
                                      <p
                                        key={patient.guardian_name}
                                        value={patient.guardian_name}
                                        className="fw-bold text-primary ms-3"
                                      >
                                        {patient.guardian_name}
                                      </p>
                                    ))}
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <p className="fw-bold">Phone :</p>
                                  {patient &&
                                    patient.map(patient => (
                                      <p
                                        key={patient.mobileno}
                                        value={patient.mobileno}
                                        className="fw-bold text-primary ms-3"
                                      >
                                        {patient.mobileno}
                                      </p>
                                    ))}
                                </div>
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
                            <Col lg="3">
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <p className="fw-bold">Case ID :</p>
                                  {patient &&
                                    patient.map(patient => (
                                      <p
                                        key={patient.case_reference_id}
                                        value={patient.case_reference_id}
                                        className="fw-bold text-primary ms-3"
                                      >
                                        {patient.case_reference_id}
                                      </p>
                                    ))}
                                </div>

                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <p className="fw-bold">IPD No : </p>
                                  {patient &&
                                    patient.map(patient => (
                                      <p
                                        key={patient.id}
                                        value={patient.id}
                                        className="fw-bold text-primary ms-3"
                                      >
                                        IPDN{patient.id}
                                      </p>
                                    ))}
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <p className="fw-bold">Admission Date : </p>
                                  {patient &&
                                    patient.map(patient => (
                                      <p
                                        key={patient.date}
                                        value={patient.date}
                                        className="fw-bold text-primary ms-3"
                                      >
                                        {patient.date}
                                      </p>
                                    ))}
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <p className="fw-bold">Bed :</p>
                                  {patient &&
                                    patient.map(patient => (
                                      <p
                                        key={patient.bed}
                                        value={patient.bed}
                                        className="fw-bold text-primary ms-3"
                                      >
                                        {patient.bed}
                                      </p>
                                    ))}
                                </div>
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
                            <div>
                              <p className="fw-bold fs-5">
                                <i
                                  className="fas fa-tag"
                                  style={{ marginRight: "5px" }}
                                ></i>
                                Known Allergies
                              </p>
                              {patient &&
                                patient.map(patient => (
                                  <p
                                    key={patient.known_allergies}
                                    value={patient.known_allergies}
                                    className="fw-bold text-primary ms-3"
                                  >
                                    {patient.known_allergies}
                                  </p>
                                ))}
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
                            <div>
                            <p className="fw-bold fs-5">
                              <i
                                className="fas fa-tag"
                                style={{ marginRight: "5px" }}
                              ></i>
                              Findings
                            </p>
                            {patient &&
                                patient.map(patient => (
                                  <p
                                    key={patient.finding_description}
                                    value={patient.finding_description}
                                    className="fw-bold text-primary ms-3"
                                  >
                                    {patient.finding_description}
                                  </p>
                                ))}
                            </div>
                            
                            <hr
                              className="mt-2"
                              style={{
                                background: "rgba(0,0,0,0.2)",
                                color: "grey",
                                height: "0.5px",
                              }}
                            />
                            <div>
                              <p className="fw-bold fs-5">
                                <i
                                  className="fas fa-tag"
                                  style={{ marginRight: "5px" }}
                                ></i>
                                Symptoms
                              </p>
                              {patient &&
                                patient.map(patient => (
                                  <p
                                    key={patient.symptoms}
                                    value={patient.symptoms}
                                    className="fw-bold text-primary ms-3"
                                  >
                                    {patient.symptoms}
                                  </p>
                                ))}
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
                            <div
                              style={{
                                display: "flex",
                                alignItems: "flex-end",
                                justifyContent: "flex-end",
                              }}
                            >
                              <button className="btn btn-success">
                                Add Doctor
                              </button>
                            </div>

                            <div className="mt-2 ms-2 fw-bold">
                              <ul>
                                <li>
                                {patient &&
                                patient.map(patient => (
                                  <p
                                    key={patient.doctor}
                                    value={patient.doctor}
                                    className="fw-bold ms-3"
                                  >
                                    {patient.doctor}
                                  </p>
                                ))}
                                </li>
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
                            <p className="fw-bold fs-5">Nurse Notes</p>
                            <div className="timeline-item">
                              <h4 className="timeline-header text-primary">
                                Notes
                              </h4>
                              {patient &&
                                patient.map(patient => (
                                  <p
                                    key={patient.note}
                                    value={patient.note}
                                    className="fw-bold ms-3"
                                  >
                                    {patient.note}
                                  </p>
                                ))}
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
                              <LeftPositionedTimeline />
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
                            <p className="fw-bold fs-5">Medication</p>
                            <Col lg="12">
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
                          <Row>
                            <p className="fw-bold fs-5">Prescription</p>
                            <Col lg="12">
                              <PrescriptionTable />
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
                            <p className="fw-bold fs-5">Consultant Register</p>
                            <Col lg="12">
                              <ConsultantTable />
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <p className="fw-bold fs-5">Lab Investigation</p>

                            <Col lg="12">
                              <LabTable />
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
                            <br />
                            <p className="fw-bold fs-5 mt-3">Payment</p>
                            <Row>
                              <Col lg="12">
                                <Payment patient={patient} />
                              </Col>
                            </Row>
                            <br />
                            <p className="fw-bold fs-5 mt-3">
                              Live Consultation
                            </p>
                            <Row>
                              <Col lg="12">
                                <LiveTable />
                              </Col>
                            </Row>
                            <br />
                            <p className="fw-bold fs-5 mt-3">
                              Treatment History
                            </p>
                          </Row>
                          <br />
                          <Row>
                            <p className="fw-bold fs-5 mt-3">Bed History</p>
                            <Col lg="12">
                              <BedTable />
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
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="2">
                      <div className="mt-4">
                        <h4>Nurse Notes</h4>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <button
                            className="btn-mod bg-soft custom-btn"
                            onClick={handleOpenNurse}
                          >
                            + Add Nurse Note
                          </button>
                          <NurseNoteDialog
                            open={openNurseDialog}
                            handleClose={handleCloseNurse}
                          />
                        </div>
                        <div>
                          <NurseNote />
                        </div>
                      </div>
                    </TabPane>
                    <TabPane tabId="3">
                      <h4 className="mt-4">Medication</h4>
                      <div
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <button
                          className="btn-mod custom-btn"
                          onClick={handleClickOpen}
                        >
                          + Add Medication Dose
                        </button>
                        <MedicationDialog
                          open={open}
                          handleClose={handleClose}
                        />
                      </div>
                      <div className="mt-4">
                        <Medication />
                      </div>
                    </TabPane>
                    <TabPane tabId="4">
                      <h4 className="mt-4">Prescription</h4>
                      <div
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <button
                          className="btn-mod custom-btn"
                          onClick={handleOpenPrescription}
                        >
                          + Add Prescription
                        </button>
                        <PrescriptionDialog
                          open={openPrescriptionDialog}
                          handleClose={handleClosePrescription}
                        />
                      </div>
                      <Prescription />
                    </TabPane>
                    <TabPane tabId="5">
                      <h4 className="mt-4">Consultant Register</h4>
                      <div
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <button
                          className="btn-mod custom-btn"
                          onClick={handleOpenCr}
                          style={{marginBottom: '20px'}}
                        >
                          + Consultant Register
                        </button>
                        <ConsultantRegisterDialog
                          open={openCrDialog}
                          handleClose={handleCloseCr}
                        />
                      </div>
                      <Consultant />
                    </TabPane>
                    <TabPane tabId="6">
                      <h4 className="mt-4">LabInvestigation</h4>
                      <LabInvestigation />
                    </TabPane>

                    <TabPane tabId="7">
                      <h4 className="mt-4">Operations</h4>
                      <div
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <button
                          className="btn-mod custom-btn"
                          onClick={handleOpenOperation}
                        >
                          + Add Operation
                        </button>
                        <OperationDialog
                          open={openOperationDialog}
                          handleClose={handleCloseOperation}
                        />
                      </div>
                      <Operation />
                    </TabPane>
                    <TabPane tabId="8">
                      <h4 className="mt-4">Charges</h4>
                      <div
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <button
                          className="btn-mod custom-btn"
                          onClick={handleOpenCharge}
                        >
                          + Add Charges
                        </button>
                        <ChargeDialog
                          open={openChargeDialog}
                          handleClose={handleCloseCharge}
                        />
                      </div>
                      <Charges />
                    </TabPane>
                    <TabPane tabId="9">
                      <h4 className="mt-3">Payment</h4>
                      <div
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <button
                          className="btn-mod custom-btn"
                          onClick={handleOpenPayment}
                        >
                          + Add Payment
                        </button>
                        <PaymentDialog
                          patient={patient}
                          open={openPaymentDialog}
                          handleClose={handleClosePayment}
                        />
                      </div>
                      <Payment />
                    </TabPane>
                    <TabPane tabId="10">
                      <h4 className="mt-4">Live Consultation</h4>
                      <Liveconsult />
                    </TabPane>
                    <TabPane tabId="11">
                      <h4 className="mt-4">Bed History</h4>
                      <Bed />
                    </TabPane>
                    <TabPane tabId="12">
                      <h4 className="mt-4">Timeline</h4>
                      <div
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <button
                          className="btn-mod custom-btn"
                          onClick={handleOpenTimeline}
                        >
                          + Add Timeline
                        </button>
                        <TimelineDialog
                          open={openTimelineDialog}
                          handleClose={handleCloseTimeline}
                        />
                      </div>
                      <div>
                        <LeftPositionedTimeline />
                      </div>
                    </TabPane>
                    <TabPane tabId="13">
                      <h4 className="mt-4">Treatment History</h4>
                      <Treatment />
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

export default withRouter(UserProfile)
