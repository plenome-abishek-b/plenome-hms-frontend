import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import { Input, Select } from "@material-ui/core";
import { Row, Col } from "reactstrap";
import PatientDialog from "./PatientDialog";
import { useEffect } from "react";
import api from "services/Api";
import { useState } from "react";
import jsPDF from "jspdf";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles.css";

export default function AlertDialog({
  open,
  handleClose,
  data,
  handleBill,
  getAppointment,
}) {
  const [openpatientDialog, setOpenpatientDialog] = React.useState(false);
  const [patients, setPatients] = useState([]);

  const [doctors, setDoctors] = useState([]);
  const [example, setExample] = useState([]);
  const [shift, setShift] = useState([]);
  const [slot, setSlot] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [charge, SetCharge] = useState([]);

  useEffect(() => {
    getAllPatient();
    getAllDoctors();

    //  getShifts()
    //  getSlot()
  }, []);

  useEffect(() => {
    handleStuff();
  }, [doctors]);

  // useEffect(() => {
  //   if (formSubmitted) {
  //     const timeoutId = setTimeout(() => {
  //       handleClose();
  //       window.location.reload();
  //     },2500);
  //     return () => clearTimeout(timeoutId);
  //   }
  // }, [formSubmitted, handleClose]);

  const [formValues, setFormValues] = useState({
    patient_id: "",
    doctor: "",
    global_shift_id: "",
    date: "",
    shift_id: "",
    priority: "",
    appointment_status: "",
    message: "",
    live_consult: "",
    time: "",
    specialist: "10",
    source: "Online",
    is_opd: "yes",
    is_ipd: "yes",
    is_queue: 1,
    Hospital_id: 1,
    payment_date: "2023-12-12 11:11:11",
    payment_mode: "",
  });

  useEffect(() => {
    getApptCharge();
  }, [formValues.doctor]);

  const generatePdf = () => {
    const doc = new jsPDF();
    doc.text("Bill Details", 10, 10);
    doc.text(`Patient Name: ${formData.patient_name}`, 10, 20);
    doc.text(`Gender: ${formData.gender}`, 10, 30);
    doc.text(`Doctor Name: ${formData.doctor}`, 10, 40);
    doc.text(`Doctor Fees: ${formData.amount}`, 10, 50);
    doc.save("bill.pdf");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
  
    // If the input is the time field, append ':00' to include seconds
    const formattedValue = name === "time" ? `${value}:00` : value;
  
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: formattedValue,
    }));
  };
  

  console.log(formValues, "valll");
  const getAllPatient = async () => {
    const response = await api.getAllPatients();
    const { data } = response;
    console.log(data, "patients");
    setPatients(data);
  };

  const updatedPatientsData = patients.map((patient) => {
    // Remove "/" from the patient_name property
    const updatedPatient = {
      ...patient,
      patient_name: patient.patient_name.replace("/", ""),
    };

    return updatedPatient;
  });

  const getAllDoctors = async () => {
    const response = await api.getApptDoctor();
    const { data } = response;
    console.log(data, "doccccccccccccccc");
    setDoctors(data);
  };
  // const handleStuff =async () => {
  //   console.log("ddddm,m,m,")
  //   if (doctors && doctors.length > 0) {
  //       const exampleArray = await doctors.map(val => ({ staff_id: val.shift_id, name: val.name }));

  //   setExample(exampleArray)
  //   }
  //   else{

  //     console.log("empty")
  //   }
  // }
  const handleStuff = async () => {
    if (doctors && doctors.length > 0) {
      const exampleArray = await doctors.reduce((acc, val) => {
        acc[val.shift_id] = { staff_id: val.staff_id, name: val.name };
        return acc;
      }, {});
      setExample(exampleArray);
      console.log(exampleArray, "dattt");
      return exampleArray; // return the object
    }
    return {}; // return an empty object if there are no doctors
  };

  // if(doctors.length > 0){
  //   console.log("first")
  //   handleStuff()
  // }
  const getShifts = async () => {
    const response = await api.getApptShift(formValues.doctor);
    console.log(response, "lllll");
    const { data } = response;
    console.log(data, "shiffffffffffffffff");
    setShift(data);
  };

  const getSlot = async () => {
    const response = await api.getApptSlot(
      formValues.doctor,
      formValues.global_shift_id,
      formValues.date
    );
    const { data } = response;
    console.log(data, "slot data");
    setSlot(data);
  };

  const getApptCharge = async () => {
    try {
      const response = await api.getSetupApptSlotCharge(formValues.doctor);
      const { data } = response;
      console.log(data, "slot charge data");
      SetCharge(data);

      if (data.length > 0) {
        const firstChargeAmount = data[0].amount;
        setFormValues((prevFormValues) => ({
          ...prevFormValues,
          amount: firstChargeAmount,
        }));
      }
    } catch (error) {
      console.error("Error fetching slot charge data:", error);
    }
  };

  const handleClickOpen = () => {
    //dialog open
    setOpenpatientDialog(true);
  };
  const handleDialogClose = () => {
    //dialog close
    setOpenpatientDialog(false);
  };
  const handleFetch = (event) => {
    console.log("connection");
  };

  const handleFormSubmit = async () => {
    const response = await api.postAppointment(formValues);
    console.log(formValues, "form values");
    const { status, data } = response;
  
    if (status === 201) {
      toast.success("Appointment booked successfully!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 500,
      });
  
      setFormSubmitted(true);
      setFormValues({});
  
      // Delay the execution of getAppointment by one second
      setTimeout(() => {
        getAppointment();
      }, 1000);
      handleClose()
    } else {
      // Handle other response statuses if needed
      toast.error("Failed to set up appointment slot. Please try again.");
    }
  };

  // useEffect(() => {
  //   // When selectedData changes, update the form data
  //   if (selectedData) {
  //     setFormData({
  //       doctor: selectedData?.doctor_name || "",
  //       amount: selectedData?.amount || "",
  //       priority: selectedData?.appointment_status || "",
  //     });
  //   } else {
  //     // Reset form data when selectedData is not available (for addition)
  //     setFormData({
  //       doctor: "",
  //       amount: "",
  //       priority: "",
  //     });
  //   }
  // }, [selectedData]);
  // async function handleFormUpdate() {
  //   try {
  //     const newData = {
  //       ...formData,
  //       id: selectedData?.id,
  //     };
  //     const response = await api.updateSetup_Findings(newData);
  //     console.log(response, "respo");
  //     setTimeout(() => {
  //       getFindings();
  //     }, 500);
  //     handleClose();

  //     // Reload the page after a delay of 1 second
  //     // setTimeout(() => {
  //     //   location.reload();
  //     // }, 1000);
  //   } catch (error) {
  //     console.error("Error updating data:", error);
  //   }
  // }

  console.log(doctors, "docsss");
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "1200px", // Set your width here
            },
          },
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          className="text-white fw-bold"
          style={{
            backgroundColor: "#6070FF",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          Add New Appointment
          <div>
            <button
              className="btn text-white ms-5 fw-bold"
              onClick={handleClickOpen}
              style={{ border: "1px solid white" }}
            >
              + New Patient
            </button>
            <button
              className="btn text-white ms-3 fw-bold"
              onClick={handleClose}
              style={{ border: "1px solid white", backgroundColor: "#B2533E" }}
            >
              X
            </button>
          </div>
          <PatientDialog
            open={openpatientDialog}
            handleClose={handleDialogClose}
            getAllPatient={getAllPatient}
          />
        </DialogTitle>
        <DialogContent className="mt-4">
          <Row>
            <Col lg="12">
              <label className="fs-5">Patient</label>
              <br />
              <select
                style={{
                  width: "100%",
                  height: "35px",
                  borderRadius: "5px",
                  border: "1px solid grey",
                }}
                name="patient_id"
                value={formValues.patient_id}
                onChange={handleChange}
              >
                <option>select</option>
                {updatedPatientsData &&
                  updatedPatientsData.map((patient) => (
                    <option key={patient.id} value={patient.id}>
                      {patient.patient_name}
                    </option>
                  ))}
              </select>
            </Col>
          </Row>
          <br />
          <Row>
            <Col lg="6" md="6" sm="12">
              <label>
                Doctor <span className="text-danger">*</span>
              </label>
              <br />
              <select
                className="select-transition"
                style={{
                  width: "100%",
                  height: "35px",
                  borderRadius: "5px",
                  border: "1px solid grey",
                }}
                name="doctor"
                onChange={handleChange}
                value={formValues.doctor}
              >
                <option>select one</option>
                {doctors &&
                  doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.doctor}
                    </option>
                  ))}
                {/* {Object.values(example).map(doctor => (
    <option key={doctor.staff_id} value={doctor.staff_id}>{doctor.name}</option>
  ))} */}
              </select>
            </Col>
            <Col lg="6" md="6" sm="12">
              <label>
                Doctor Fees <span className="text-danger">*</span>
              </label>
              <input
                style={{
                  width: "100%",
                  height: "35px",
                  borderRadius: "5px",
                  border: "1px solid grey",
                  backgroundColor: "rgba(0,0,0,0.2)",
                }}
                name="amount"
                value={formValues.amount}
                onChange={handleChange}
                type="number"
                readOnly
              ></input>
            </Col>
            <input
              hidden
              style={{
                width: "100%",
                height: "35px",
                borderRadius: "5px",
                border: "1px solid grey",
              }}
              name="specialist"
              value={formValues.specialist}
              onChange={handleChange}
            ></input>
          </Row>
          <br />
          <Row>
            <Col lg="4" md="4" sm="12">
              <label>
                Shift <span className="text-danger">*</span>
              </label>
              <br />
              <select
                style={{
                  width: "100%",
                  height: "35px",
                  borderRadius: "5px",
                  border: "1px solid grey",
                }}
                onClick={() => getShifts()}
                name="global_shift_id"
                value={formValues.global_shift_id}
                onChange={handleChange}
              >
                <option>select one</option>
                {shift &&
                  shift.map((shifts) => (
                    <option
                      key={shifts.global_shift_id}
                      value={shifts.global_shift_id}
                    >
                      {shifts.shift_name}
                    </option>
                  ))}
              </select>
            </Col>
            <Col lg="4" md="4" sm="12">
              <label>
                Date <span className="text-danger">*</span>
              </label>
              <br />
              <input
                type="date"
                style={{
                  width: "100%",
                  height: "35px",
                  borderRadius: "5px",
                  border: "1px solid grey",
                }}
                name="date"
                value={formValues.date}
                onChange={handleChange}
              ></input>
            </Col>
            <Col lg="4" md="4" sm="12">
              <label>
                Time <span className="text-danger">*</span>
              </label>
              <br />
              <input
                type="time"
                style={{
                  width: "100%",
                  height: "35px",
                  borderRadius: "5px",
                  border: "1px solid grey",
                }}
                name="time"
                value={formValues.time}
                onChange={handleChange}
              ></input>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col lg="6" md="6" sm="12">
              <label>
                Slot <span className="text-danger">*</span>
              </label>
              <br />
              <select
                style={{
                  width: "100%",
                  height: "35px",
                  borderRadius: "5px",
                  border: "1px solid grey",
                }}
                onClick={() => getSlot()}
                name="shift_id"
                value={formValues.shift_id}
                onChange={handleChange}
              >
                <option>select one</option>
                {slot &&
                  slot.map((slots) => (
                    <option key={slots.shift_id} value={slots.shift_id}>
                      {slots.slot}
                    </option>
                  ))}
              </select>
            </Col>
            <Col lg="6" md="6" sm="12">
              <label>Priority</label>
              <br />
              <select
                style={{
                  width: "100%",
                  height: "35px",
                  borderRadius: "5px",
                  border: "1px solid grey",
                }}
                name="priority"
                value={formValues.priority}
                onChange={handleChange}
              >
                <option>select</option>
                <option value="Normal">Normal</option>
                <option value="Urgent">Urgent</option>
                <option value="Very Urgent">Very Urgent</option>
              </select>
            </Col>
          </Row>
          <br />
          <Row>
            <Col lg="6" md="6" sm="12">
              <label>Payment</label>
              <br />
              <select
                style={{
                  width: "100%",
                  height: "35px",
                  borderRadius: "5px",
                  border: "1px solid grey",
                }}
                name="payment_mode"
                value={formValues.payment_mode}
                onChange={handleChange}
              >
                <option>select</option>
                <option value="cash">Cash</option>
                <option value="cheque">Cheque</option>
                <option value="upi">UPI</option>
              </select>
            </Col>
            <Col lg="6" md="6" sm="12">
              <label>
                Status <span className="text-danger">*</span>
              </label>
              <br />
              <select
                style={{
                  width: "100%",
                  height: "35px",
                  borderRadius: "5px",
                  border: "1px solid grey",
                }}
                name="appointment_status"
                value={formValues.appointment_status}
                onChange={handleChange}
              >
                <option>select</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Cancel">Cancel</option>
              </select>
            </Col>
          </Row>
          <Row className="mt-4">
            <label>Message</label>
            <Col lg="12" md="12" sm="12">
              <textarea
                style={{
                  width: "100%",
                  height: "60px",
                  borderRadius: "5px",
                  border: "1px solid grey",
                }}
                name="message"
                value={formValues.message}
                onChange={handleChange}
              ></textarea>
            </Col>
          </Row>
          <br />
          <Row>
            <Col lg="12" md="12" sm="12">
              <label>
                Live Consultant <span className="text-danger">*</span>
              </label>
              <br />
              <select
                style={{
                  width: "100%",
                  height: "35px",
                  borderRadius: "5px",
                  border: "1px solid grey",
                }}
                name="live_consult"
                value={formValues.live_consult}
                onChange={handleChange}
              >
                <option>select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </Col>
          </Row>
        </DialogContent>
        <DialogActions
          style={{ alignItems: "center", justifyContent: "center" }}
        >
            
            <button
              className="btn-mod bg-soft btn-md"
              onClick={() => handleFormSubmit()}
              style={{ marginRight: "3%" }}
            >
              Save
            </button>

        </DialogActions>
      </Dialog>
    </div>
  );
}
