import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Row, Col, Container } from "reactstrap";
import { TextField } from "@material-ui/core";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import OpdPatientDialog from "./OpdDialog/OpdPatientDialog";
import { useEffect } from "react";
import api from "services/Api";
import { useState } from "react";
import { options } from "toastr";

export default function OpdDialog({
  open,
  handleClose,
  data,
  handleFormSubmit,
  setFetchData,
  patientId,
  getOPDpatient
}) {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [listPatient, setListPatient] = useState([]);
  const [consdoctor, setConsdoctor] = useState("");
  const [symptID, setSymptID] = useState("");
  const [hospitalCharge, setHospitalCharge] = useState([]);
  const [chargeCategoryId, setChargeCategroyId] = useState("");
  const [charge, setCharge] = useState([]);
  const [amount, setAmount] = useState([]);
  const [tpa, setTpa] = useState([]);
  const initialOpdValue = {
    patient_id: "",
    Hospital_id: 1,
    cons_doctor: "",
    symptoms: "",
    bp: "",
    height: "",
    weight: "",
    pulse: "",
    temperature: "",
    respiration: "",
    known_allergies: "",
    patient_old: "",
    casualty: "",
    refference: "",
    date: "2023-03-03",
    note: "",
    payment_mode: "",
    generated_by: "aaaa",
    live_consult: "",
    can_delete: "yes",
    payment_date: "",
    time: "11:11:11",
    standard_charge: amount[0]?.standard_charge,
    charge_id: "",
    tpa_charge: "",
    tax: "",
    apply_charge: amount[0]?.apply_charge,
    amount: amount[0]?.amount,
    organisation_id: "14",
    cons_doctor: "",
    case_type: "",
    appointment_date: "",
    symptoms_type: symptID,
    refference: "",
  };

  const [formData, setFormData] = useState(initialOpdValue);
  const [symptomsType, setSympotoms] = useState([]);
  const [symptomTitle, setSymptomTitle] = useState([]);
  const [description, setDescription] = useState([]);
  useEffect(() => {
    getAllPatients();
    handleConsultant();
  }, []);
  const getAllPatients = async () => {
    const response = await api.getPatient();
    const { data } = response;
    console.log(data, "kkkkkkkkkkkkkkkkkkk");
    const modifiedData = response.data.map((patient) => ({
      ...patient,
      patient_name: patient.patient_name.replace("/", " "),
    }));
    setListPatient(modifiedData);
  };

  const handleConsultant = async () => {
    const response = await api.getConsultant();
    const { data } = response;
    setConsdoctor(data);
    console.log(data, "datas doc");
  };

  const handleClickOpen = () => {
    //dialog open
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    //dialog close
    setOpenDialog(false);
  };

  const handleSubmit = async () => {
    console.log(formData, "SUBMIT");
    const response = await api.postOpd(formData);
    const { data } = response;
    console.log(data, "opd posted data");
    handleClose()
    getOPDpatient()
  };

  const onChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };
  const getSymptomeType = async () => {
    const response = await api.getSetupSymptoms_Type();
    const { data } = response;
    console.log(data, "symptems");
    setSympotoms(data);
  };
  useEffect(() => {
    getSymptomTitle();
    setFormData({
      ...formData,symptoms_type:symptID
    })
  }, [symptID]);
  const getSymptomTitle = async () => {
    console.log(symptID, ":::");
    const response = await api?.getOpd_symptomsTitle(symptID);
    const { data } = response;
    console.log(data, "titlesss");
    setSymptomTitle(data);
  };
  const getDescription = async () => {
    const id = formData?.symptoms;
    console.log(id, "iddddddd");
    if (id) {
      const response = await api.getSymptomeDescriptionByTitleIdOPD(id);
      const { data } = response;
      console.log(data, "data");
      setDescription(data);
    } else {
      console.log("nothing");
    }
  };
  const handleChange = async (e) => {
    const { id, value } = e.target;
    console.log(id, value);
    setFormData({
      ...formData,
      [id]: value,
    });
  };
  const getChargeCategory = async () => {
    const response = await api.getChargeCategory();
    const { data } = response;
    console.log(data, "i.i.i.i.i.i");
    setHospitalCharge(data);
  };
  const getCharge = async () => {
    console.log(chargeCategoryId, "id");
    const response = await api.getCharge_OPD(chargeCategoryId);
    const { data } = response;
    console.log(data, "==");
    setCharge(data);
  };

  const handlegetAmount = async () => {
    // const response = await api.
    console.log(formData?.charge_id, "first");
    const response = await api.getAmountWithCharge(formData?.charge_id);
    const { data } = response;
    console.log(data, "amount and stuffs");
    setFormData({
      ...formData,
      amount:Number(data[0]?.amount),
      apply_charge: Number(data[0]?.apply_charge),
      standard_charge: Number(data[0]?.standard_charge),
      tax:amount[0]?.tax
    });
    setAmount(data);
  };
  useEffect(() => {
    handlegetAmount();
  }, [formData?.charge_id]);
  const getTpa = async () => {
    const response = await api.getTPA_OPD();
    const { data } = response;
    console.log(data, "kkkkk");
    
    setTpa(data);
  };

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
            {/* <input
              placeholder="Search"
              style={{ height: "35px", fontSize: "18px" }}
            ></input> */}
            {/* <select
              style={{ width: "20%", height: "30px" }}
              name="patient_id"
              value={data.patient_id}
              onChange={e => onChange(e)}
            >
              {listPatient &&
                listPatient.map((value) => (
                  <option key={value.patient_id} value={value.patient_id}>
                    {value.patient_name}
                  </option>
                ))}
            </select> */}
            {console.log(data)}
            <select
              style={{
                width: "20%",
                height: "35px",
                borderRadius: "3px",
                border: "1px solid rgba(0,0,0,0.2)",
              }}
              id="patient_id"
              value={data?.patient_id}
              onChange={(e) => onChange(e)}
            >
              {listPatient &&
                listPatient.map((patient) => (
                  <option key={patient.id} value={patient?.id}>
                    {patient.patient_name}
                  </option>
                ))}
            </select>
            {console.log(listPatient,"list patient")}
            <button
              className="btn btn-primary bg-soft ms-3 fw-bold"
              onClick={handleClickOpen}
              style={{ border: "1px solid white" }}
            >
              + New Patient
            </button>
            <OpdPatientDialog
              getAllPatient={getAllPatients}
              setFetchData={setFetchData}
              open={openDialog}
              handleClose={handleDialogClose}
            />
          </Container>
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">
          <Row>
            <Col lg="8">
              <Row>
                {/* <Col>
                <label>created At</label>
                <br />
                <input value={data.created_at} id="created_at" onChange={e=>onChange(e)}>
                  
                </input>
              </Col>
              <Col>
                <label>generated by</label>
                <br />
                <input value={data.generated_by} id="generated_by" onChange={e=>onChange(e)}>
                  
                </input>
              </Col> */}
                {/* <Col>
                <label>Patient ID</label>
                <br />
                <input value={data.patient_id} id="patient_id" onChange={e=>onChange(e)}>
                  
                </input>
              </Col> */}
                {/* <Col>
                <label>Discharged</label>
                <br />
                <input value={data.discharged} id="discharged" onChange={e=>onChange(e)}>
                  
                </input>
              </Col>
              <Col>
                <label>is_ipd_moved</label>
                <br />
                <input value={data.is_ipd_moved} id="is_ipd_moved" onChange={e=>onChange(e)}>
                  
                </input>
              </Col> */}
                {/* <Col lg='3' md='3' sm='12'>
                <label>case Reference id</label>
                <br />
                <input value={data?.case_reference_id} id="case_reference_id" onChange={e=>onChange(e)} type="number" style={{ height: "30px", width: '100%', borderRadius: '5px', border: '1px solid grey'}}>
                  
                </input>
              </Col> */}
                <Col lg="3" md="3" sm="12">
                  <label>Height</label>
                  <br />
                  <input
                    type="number"
                    id="height"
                    value={formData?.height}
                    onChange={handleChange}
                    placeholder=""
                    style={{
                      height: "30px",
                      width: "100%",
                      borderRadius: "3px",
                      border: "1px solid rgba(0,0,0,0.2)",
                    }}
                  ></input>
                </Col>
                <Col lg="3" md="3" sm="12">
                  <label>Weight</label>
                  <br />
                  <input
                    type="number"
                    placeholder=""
                    id="weight"
                    onChange={handleChange}
                    value={formData?.weight}
                    style={{
                      height: "30px",
                      width: "100%",
                      borderRadius: "3px",
                      border: "1px solid rgba(0,0,0,0.2)",
                    }}
                  ></input>
                </Col>
                <Col lg="3" md="3" sm="12">
                  <label>BP</label>
                  <br />
                  <input
                    type="number"
                    placeholder=""
                    id="bp"
                    onChange={handleChange}
                    value={formData?.bp}
                    style={{
                      height: "30px",
                      width: "100%",
                      borderRadius: "3px",
                      border: "1px solid rgba(0,0,0,0.2)",
                    }}
                  ></input>
                </Col>
              </Row>
              <br />
              <Row>
                <Col lg="4" md="4" sm="12">
                  <label>Pulse</label>
                  <br />
                  <input
                    type="number"
                    id="pulse"
                    value={formData?.pulse}
                    onChange={handleChange}
                    placeholder=""
                    style={{
                      height: "30px",
                      width: "100%",
                      borderRadius: "3px",
                      border: "1px solid rgba(0,0,0,0.2)",
                    }}
                  ></input>
                </Col>
                <Col lg="4" md="4" sm="12">
                  <label>Temperature</label>
                  <br />
                  <input
                    type="number"
                    id="temperature"
                    value={formData?.temperature}
                    onChange={handleChange}
                    placeholder=""
                    style={{
                      height: "30px",
                      width: "100%",
                      borderRadius: "3px",
                      border: "1px solid rgba(0,0,0,0.2)",
                    }}
                  ></input>
                </Col>
                <Col lg="4" md="4" sm="12">
                  <label>Respiration</label>
                  <br />
                  <input
                    type="number"
                    id="respiration"
                    value={formData?.respiration}
                    onChange={handleChange}
                    placeholder=""
                    style={{
                      height: "30px",
                      width: "100%",
                      borderRadius: "3px",
                      border: "1px solid rgba(0,0,0,0.2)",
                    }}
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
                      {/* <input
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
                      ></input> */}
                      <select
                        style={{ width: "150px" }}
                        name="symptoms_type"
                        onClick={() => getSymptomeType()}
                        onChange={(e) => setSymptID(e.target.value)}
                      >
                        <option>select</option>
                        {symptomsType.map((symptoms) => (
                          <option key={symptoms?.id} value={symptoms?.id}>
                            {symptoms?.symptoms_type}
                          </option>
                        ))}
                      </select>
                    </Col>
                    <Col lg="4" md="4" sm="12">
                      <label>Symptoms Title</label>
                      <br />
                      {/* <input
                        type="text"
                        placeholder=""
                        id="symptoms"
                        value={formData?.symptoms}
                        style={{
                          width: "100%",
                          height: "30px",
                          border: "1px solid grey",
                          borderRadius: "5px",
                        }}
                      ></input> */}
                      <select
                        style={{ width: "150px" }}
                        onClick={() => getDescription()}
                        id="symptoms"
                        onChange={handleChange}
                      >
                        <option>select</option>
                        {symptomTitle &&
                          symptomTitle.map((symptoms) => (
                            <option key={symptoms?.id} value={symptoms?.id}>
                              {symptoms?.symptoms_title}
                            </option>
                          ))}
                      </select>
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
                        onChange={handleChange}
                        value={description && description[0]?.description}
                      ></input>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <br />
              <Row>
                <Col lg="6" md="6" sm="12">
                  <label>Note</label>
                  <br />
                  <textarea
                    maxLength="infinity"
                    id="note"
                    onChange={handleChange}
                    value={formData?.note}
                    style={{
                      width: "100%",
                      height: "50px",
                      borderRadius: "3px",
                      border: "1px solid rgba(0,0,0,0.2)",
                    }}
                  ></textarea>
                </Col>
                <Col lg="6" md="6" sm="12">
                  <label>Any Known Allergies</label>
                  <br />
                  <textarea
                    maxLength="infinity"
                    id="known_allergies"
                    onChange={handleChange}
                    value={formData?.known_allergies}
                    style={{
                      width: "100%",
                      height: "50px",
                      borderRadius: "3px",
                      border: "1px solid rgba(0,0,0,0.2)",
                    }}
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
                      Appointment Date <span className="text-danger">*</span>
                    </label>
                    <br />
                    <input
                      type="date"
                      id="appointment_date"
                      style={{
                        width: "100%",
                        borderRadius: "3px",
                        border: "1px solid rgba(0,0,0,0.2)",
                      }}
                      value={formData?.appointment_date}
                      onChange={handleChange}
                    ></input>
                  </Col>
                </Row>
                <Row>
                  <Col lg="12">
                    <label>
                      Payment Date <span className="text-danger">*</span>
                    </label>
                    <br />
                    <input
                      type="date"
                      id="payment_date"
                      style={{
                        width: "100%",
                        borderRadius: "3px",
                        border: "1px solid rgba(0,0,0,0.2)",
                      }}
                      value={formData?.payment_date}
                      onChange={handleChange}
                    ></input>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <label>Case</label>
                    <br />
                    <input
                      id="case_type"
                      onChange={handleChange}
                      value={formData?.case_type}
                      placeholder=""
                      style={{
                        width: "100%",
                        borderRadius: "3px",
                        border: "1px solid rgba(0,0,0,0.2)",
                      }}
                    ></input>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <label>Casualty</label>
                    <br />
                    <select
                      id="casualty"
                      style={{
                        width: "100%",
                        height: "30px",
                        borderRadius: "3px",
                        border: "1px solid rgba(0,0,0,0.2)",
                      }}
                      value={formData?.casualty}
                      onChange={handleChange}
                    >
                      <option>select</option>
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </Col>
                  <Col>
                    <label>Old Patient</label>
                    <br />
                    <select
                      style={{
                        width: "100%",
                        height: "30px",
                        borderRadius: "3px",
                        border: "1px solid rgba(0,0,0,0.2)",
                      }}
                      id="patient_old"
                      value={formData?.patient_old}
                      onChange={handleChange}
                    >
                      <option>select</option>
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <label>TPA</label>
                    <br />
                    <select
                      id="tpa_charge"
                      value={formData?.tpa_charge}
                      onClick={() => getTpa()}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        height: "30px",
                        borderRadius: "3px",
                        border: "1px solid rgba(0,0,0,0.2)",
                      }}
                    >
                      <option>select</option>
                      {tpa.map((tpa) => (
                        <option value={tpa?.id}>{tpa?.name}</option>
                      ))}
                    </select>
                  </Col>
                  <Col>
                    <label>Reference</label>
                    <br />
                    <input
                      placeholder=""
                      id="refference"
                      value={formData?.refference}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        height: "30px",
                        borderRadius: "3px",
                        border: "1px solid rgba(0,0,0,0.2)",
                      }}
                    ></input>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <label>
                      Consultant Doctor <span className="text-danger">*</span>
                    </label>
                    <br />
                    <select
                      style={{
                        width: "100%",
                        height: "30px",
                        borderRadius: "3px",
                        border: "1px solid rgba(0,0,0,0.2)",
                      }}
                      id="cons_doctor"
                      onChange={(e) => onChange(e)}
                      value={data?.cons_doctor}
                    >
                      <option>select one</option>
                      {consdoctor &&
                        consdoctor.map((doctor) => (
                          <option key={doctor.id} value={doctor?.id}>
                            {doctor.doctor}
                          </option>
                        ))}
                    </select>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <label>Charge Category</label>
                    <br />
                    <select
                      onClick={() => getChargeCategory()}
                      onChange={(e) => setChargeCategroyId(e?.target?.value)}
                      style={{
                        width: "100%",
                        height: "30px",
                        borderRadius: "3px",
                        border: "1px solid rgba(0,0,0,0.2)",
                      }}
                    >
                      <option>Select</option>
                      {hospitalCharge.map((val) => (
                        <option value={val?.id} key={val?.id}>
                          {val?.charge_type}
                        </option>
                      ))}
                    </select>
                  </Col>
                  <Col>
                    <label>
                      Charge <span className="text-danger">*</span>
                    </label>
                    <br />
                    <select
                      id="charge_id"
                      onChange={handleChange}
                      onClick={() => getCharge()}
                      style={{
                        width: "100%",
                        height: "30px",
                        borderRadius: "3px",
                        border: "1px solid rgba(0,0,0,0.2)",
                      }}
                    >
                      <option>Select</option>
                      {charge &&
                        charge.map((val) => (
                          <option
                            onClick={() => handlegetAmount()}
                            value={val?.id}
                            key={val?.id}
                          >
                            {val?.name}
                          </option>
                        ))}
                    </select>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <label>Tax</label>
                    <br />
                    <input
                      placeholder="%"
                      id="tax"
                      value={amount[0]?.tax}
                      readOnly
                      style={{
                        width: "100%",
                        height: "30px",
                        borderRadius: "3px",
                        border: "1px solid rgba(0,0,0,0.2)",
                      }}
                    ></input>
                  </Col>
                  <Col>
                    <label>Standard Charge(₹)</label>
                    <br />
                    <input
                      id="standard_charge"
                      value={amount[0]?.standard_charge}
                      placeholder=""
                      style={{
                        width: "100%",
                        height: "30px",
                        borderRadius: "3px",
                        border: "1px solid rgba(0,0,0,0.2)",
                      }}
                    ></input>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <label>
                      Applied Charge(₹) <span className="text-danger">*</span>
                    </label>
                    <br />
                    <input
                      id="apply_charge"
                      value={amount[0]?.apply_charge}
                      placeholder=""
                      style={{
                        width: "100%",
                        height: "30px",
                        borderRadius: "3px",
                        border: "1px solid rgba(0,0,0,0.2)",
                      }}
                    ></input>
                  </Col>
                  <Col>
                    <label>
                      Amount(₹) <span className="text-danger">*</span>
                    </label>
                    <br />
                    <input
                      id="amount"
                      value={amount[0]?.amount}
                      placeholder=""
                      style={{
                        width: "100%",
                        height: "30px",
                        borderRadius: "3px",
                        border: "1px solid rgba(0,0,0,0.2)",
                      }}
                    ></input>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <label>Payment Mode</label>
                    <br />
                    <select
                      id="payment_mode"
                      onChange={handleChange}
                      value={formData?.payment_mode}
                      style={{
                        width: "100%",
                        height: "30px",
                        borderRadius: "3px",
                        border: "1px solid rgba(0,0,0,0.2)",
                      }}
                    >
                      <option>select</option>
                      <option value="cash">Cash</option>
                      <option value="upi">UPI</option>
                      <option value="cheque">Cheque</option>
                      <option value="bank transfer">Bank Transfer</option>
                      <option value="online">Online</option>
                    </select>
                  </Col>
                  <Col>
                    <label>
                      Paid Amount(₹) <span className="text-danger">*</span>
                    </label>
                    <br />
                    <input
                      id="amount"
                      value={amount[0]?.amount}
                      placeholder=""
                      style={{
                        width: "100%",
                        height: "30px",
                        borderRadius: "3px",
                        border: "1px solid rgba(0,0,0,0.2)",
                      }}
                    ></input>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <label>Live Consultation</label>
                    <br />
                    <select
                      id="live_consult"
                      onChange={handleChange}
                      value={formData?.live_consult}
                      style={{
                        width: "100%",
                        height: "30px",
                        borderRadius: "3px",
                        border: "1px solid rgba(0,0,0,0.2)",
                      }}
                    >
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
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
            onClick={() => handleSubmit()}
            style={{ marginRight: "3%" }}
          >
            Save
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
