import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Row, Col, Container } from "reactstrap";
import { TextField } from "@material-ui/core";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import IpdPatientDialog from "./IpdPatientProfile/IpdPatientDialog";
import api from "services/Api";

export default function IpdDialog({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
  setFetchData,
  patientId,
  fetchData,
  handlePatientId,
}) {
  const [openDialog, setOpenDialog] = React.useState(false);

  const [listPatient, setListPatient] = useState([]);

  const [consdoctor, setConsdoctor] = useState("");
  const [formData, setFormData] = useState({
    patient_id: "",
    height: "",
    weight: "",
    pulse: "",
    temperature: "",
    respiration: "",
    bp: "",
    bed: 12,
    bed_group_id: 13,
    case_type: "",
    casualty: "",
    symptoms: "",
    known_allergies: "",
    patient_old: "",
    note: "",
    refference: "",
    cons_doctor: "",
    organisation_id: "",
    credit_limit: "",
    payment_mode: "",
    date: "",
    discharged: "",
    live_consult: "",
    is_active: "",
    revert_reason: "",
    hospital_id: "",
  });
  useEffect(() => {
    handleConsultant();
    // handleBloodgroups()
  }, []);

  const handleConsultant = async () => {
    const response = await api.getConsultant();
    const { data } = response;
    setConsdoctor(data);
    console.log(data, "data");
  };
  const handleTPA = () =>{

  }

  useEffect(() => {
    getSetup_Patient();
  }, []);
  const getSetup_Patient = async () => {
    const response = await api.getSetupHR_patient();
    const { data } = response;
    console.log(data, "wwwwwwwwwwww");
    setListPatient(data);
  };

  const handleClickOpen = () => {
    //dialog open
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    //dialog close
    setOpenDialog(false);
  };
  const handleChange = async () =>{
    const {name,value} = e.target
    setFormData({
      [name]:value
    })
  } 

  console.log(data, "data here");
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-end",
      }}
    >
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg"
      >
        <DialogTitle id="alert-dialog-title">
          <Container
            className="p-3"
            fluid
            style={{ backgroundColor: "#6070FF" }}
          >
            <select
              style={{
                width: "20%",
                height: "30px",
                border: "1px solid grey",
                borderRadius: "5px",
              }}
              id="patient_id"
              value={data.patient_id}
              // onChange={handleChange}
              onClick={() => getSetup_Patient()}
            >
              {listPatient &&
                listPatient.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.patient_name}
                  </option>
                ))}
            </select>
            <button
              className="ms-3 btn-mod fw-bold"
              onClick={handleClickOpen}
              style={{ border: "1px solid white" }}
            >
              + New Patient
            </button>
            <IpdPatientDialog
              open={openDialog}
              handleClose={handleDialogClose}
              setFetchData={setFetchData}
              fetchData={fetchData}
            />
          </Container>
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">
          <Row>
            <Col lg="8">
              <Row>
                {/* <Col lg='3' md='3' sm='12'>
                <label>Case Reference ID</label>
                <br />
                <input id="case_reference_id" value={formData?.} onChange={handleChange} type="number" style={{height:'30px',border: '1px solid grey', borderRadius: '5px', width:'100%'}}></input>
              </Col> */}
                <Col lg="3" md="3" sm="12">
                  <label>Height</label>
                  <br />
                  <input
                    type="number"
                    placeholder=""
                    name="height"
                    value={formData?.height}
                    style={{
                      height: "30px",
                      width: "100%",
                      border: "1px solid grey",
                      borderRadius: "5px",
                    }}
                  ></input>
                </Col>
                <Col lg="3" md="3" sm="12">
                  <label>Weight</label>
                  <br />
                  <input
                    type="number"
                    placeholder=""
                    name="weight"
                    value={formData?.weight}
                    style={{
                      height: "30px",
                      width: "100%",
                      border: "1px solid grey",
                      borderRadius: "5px",
                    }}
                  ></input>
                </Col>

                <Col lg="3" md="3" sm="12">
                  <label>Pulse</label>
                  <br />
                  <input
                    id="pulse"
                    type="number"
                    placeholder=""
                    name="pulse"
                    style={{
                      height: "30px",
                      width: "100%",
                      border: "1px solid grey",
                      borderRadius: "5px",
                    }}
                    value={formData?.pulse}
                    onChange={handleChange}
                  ></input>
                </Col>
              </Row>
              <br />
              <Row>
                <Col lg="4" md="4" sm="12">
                  <label>BP</label>
                  <br />
                  <input
                    type="number"
                    placeholder=""
                    name="bp"
                    value={formData?.bp}
                    style={{
                      width: "100%",
                      height: "30px",
                      border: "1px solid grey",
                      borderRadius: "5px",
                    }}
                  ></input>
                </Col>
                <Col lg="4" md="4" sm="12">
                  <label>Temperature</label>
                  <br />
                  <input
                    id="temperature"
                    type="number"
                    placeholder=""
                    style={{
                      width: "100%",
                      height: "30px",
                      border: "1px solid grey",
                      borderRadius: "5px",
                    }}
                    value={formData?.temperature}
                    onChange={handleChange}
                  ></input>
                </Col>
                <Col lg="4" md="4" sm="12">
                  <label>Respiration</label>
                  <br />
                  <input
                    id="respiration"
                    type="text"
                    placeholder=""
                    name="respiration"
                    style={{
                      width: "100%",
                      height: "30px",
                      border: "1px solid grey",
                      borderRadius: "5px",
                    }}
                    value={formData?.respiration}
                    onChange={handleChange}
                  ></input>
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <Row>
                    <Col lg="4" md="4" sm="12">
                      <label>Symptoms Type</label>
                      <br />
                      <input
                        // id="symptoms"
                        type="text"
                        placeholder=""
                        style={{
                          width: "100%",
                          height: "30px",
                          border: "1px solid grey",
                          borderRadius: "5px",
                        }}
                        // value={formData?.symptoms}
                        onChange={handleChange}
                      ></input>
                    </Col>
                    <Col lg="4" md="4" sm="12">
                      <label>Symptoms Title</label>
                      <br />
                      <input
                        type="text"
                        placeholder=""
                        name="symptoms"
                        value={formData?.symptoms}
                        style={{
                          width: "100%",
                          height: "30px",
                          border: "1px solid grey",
                          borderRadius: "5px",
                        }}
                      ></input>
                    </Col>
                    <Col lg="4" md="4" sm="12">
                      <label>Symptoms Description</label>
                      <br />
                      <input
                        type="text"
                        placeholder=""
                        style={{
                          width: "100%",
                          height: "30px",
                          border: "1px solid grey",
                          borderRadius: "5px",
                        }}
                      ></input>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <br />
              <Row>
                <Col lg="12" md="12" sm="12">
                  <label>Note</label>
                  <br />
                  <textarea
                    id="note"
                    maxLength="infinity"
                    style={{
                      width: "100%",
                      border: "1px solid grey",
                      borderRadius: "5px",
                    }}
                    name="note"
                    value={formData?.note}
                    onChange={handleChange}
                  ></textarea>
                </Col>
              </Row>
            </Col>
            <Col lg="4">
              <div
                className="card p-4"
                style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
              >
                <Row>
                  <Col lg="12">
                    <label>
                      Admission Date <span className="text-danger">*</span>
                    </label>
                    <br />
                    <input
                      placeholder="Ex: 2023-01-01 00:00:00"
                      value={formData?.date}
                      style={{
                        width: "100%",
                        border: "1px solid grey",
                        borderRadius: "5px",
                      }}
                    ></input>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <label>Case</label>
                    <br />
                    <input
                      placeholder=""
                      style={{
                        width: "100%",
                        border: "1px solid grey",
                        borderRadius: "5px",
                      }}
                      id="case"
                      name="case"
                      value={formData?.case}
                      onChange={handleChange}
                    ></input>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <label>Casualty</label>
                    <br />
                    <select
                      style={{
                        width: "100%",
                        height: "30px",
                        border: "1px solid grey",
                        borderRadius: "5px",
                      }}
                     value={formData?.casualty}
                     onChange={handleChange}
                    >
                      <option>No</option>
                      <option>Yes</option>
                    </select>
                  </Col>

                  <Col>
                    <label>
                      Consultant <span className="text-danger">*</span>
                    </label>
                    <br />
                    <select
                      style={{
                        width: "100%",
                        height: "30px",
                        border: "1px solid grey",
                        borderRadius: "5px",
                      }}
                      id="cons_doctor"
                      onChange={handleChange}
                      value={formData?.cons_doctor}
                      onClick={()=>handleConsultant()}
                    >
                      <option>select one</option>
                      {consdoctor &&
                        consdoctor.map((doctor) => (
                          <option key={doctor.id} value={doctor.id}>
                            {doctor.name}
                          </option>
                        ))}
                    </select>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <label>TPA</label>
                    <br />
                    <select
                      style={{
                        width: "100%",
                        height: "30px",
                        border: "1px solid grey",
                        borderRadius: "5px",
                      }}
                     onClick={()=>handleTPA()}
                      // value={formData?.}
                    >
                      <option>select</option>
                    </select>
                  </Col>
                  <Col>
                    <label>
                      Credit Limit <span className="text-danger">*</span>
                    </label>
                    <br />
                    <input
                      id="credit_limit"
                      
                      placeholder=""
                      style={{
                        width: "100%",
                        height: "30px",
                        border: "1px solid grey",
                        borderRadius: "5px",
                      }}
                      value={formData?.credit_limit}
                      onChange={handleChange}
                    ></input>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <label>Bed Group</label>
                    <br />
                    <select
                      style={{
                        width: "100%",
                        height: "30px",
                        border: "1px solid grey",
                        borderRadius: "5px",
                      }}
                      value={formData?.bed_group_id}
                      name="bed_group_id"
                    >
                      <option>Select</option>
                    </select>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <label>
                      Bed Number <span className="text-danger">*</span>
                    </label>
                    <br />
                    <select
                      style={{
                        width: "100%",
                        height: "30px",
                        border: "1px solid grey",
                        borderRadius: "5px",
                      }}
                      value={formData?.bed}
                    >
                      <option>Select</option>
                    </select>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <label>Live Consultation</label>
                    <br />
                    <select
                      style={{
                        width: "100%",
                        height: "30px",
                        border: "1px solid grey",
                        borderRadius: "5px",
                      }}
                      id="live_consult"
                      value={formData?.live_consult}
                      onChange={handleChange}
                    >
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </DialogContent>
        <DialogActions>
          <button
            className="btn-mod bg-soft btn-md fw-bold"
            onClick={() => handleFormSubmit(handleClose())}
            style={{ marginRight: "3%" }}
          >
            Save
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
