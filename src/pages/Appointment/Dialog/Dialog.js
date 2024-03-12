import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
// import { Input, Select } from "@material-ui/core";
import { Row, Col,Input, Label} from "reactstrap";
import PatientDialog from "./PatientDialog";
import { useEffect } from "react";
import api from "services/Api";
import { useState } from "react";
import jsPDF from "jspdf";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PaymentDialog from "pages/Payment/PaymentDialog";
// import "../customToast.css"
// import "./";

export default function AlertDialog({
  open,
  handleClose,
  // data,
  // handleBill,
  selectedData,
  getAppointment,
}) {
  console.log(selectedData, "selected data");
  const [openpatientDialog, setOpenpatientDialog] = React.useState(false);
  const [openpayDialog, setOpenpaydialog] = useState(false);
  const [patients, setPatients] = useState([]);

  const [doctors, setDoctors] = useState([]);
  const [example, setExample] = useState([]);
  const [shift, setShift] = useState([]);
  const [slot, setSlot] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [charge, SetCharge] = useState([]);
  const [priorities, setPriorities] = useState([]);

  useEffect(() => {
    getAllPatient();
    getAllDoctors();

    //  getShifts()
    //  getSlot()
  }, []);

  useEffect(() => {
    handleStuff();
  }, [doctors]);

  useEffect(() => {
    if (selectedData) {
      const dateObject = new Date(selectedData.date);
      const formattedDate = `${dateObject.getFullYear()}-${String(
        dateObject.getMonth() + 1
      ).padStart(2, "0")}-${String(dateObject.getDate()).padStart(2, "0")}`;

      const timeWithoutAMPM = dateObject
        .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        .replace(/\s[AaPp][Mm]$/, "");

      setFormValues({
        date: formattedDate,
        amount: selectedData.amount,
        live_consult: selectedData.live_consult,
        global_shift_id: String(selectedData.shift_id),
        shift_id: String(selectedData.slot_id),
        time: timeWithoutAMPM ? timeWithoutAMPM : "12:00",
        priority: selectedData.priorityID,
        appointment_status: selectedData.appointment_status,
        source: selectedData.source,
        Hospital_id: 1,
      });
    } else {
      setFormValues({
        date: "",
        amount: "",
        live_consult: "",
        global_shift_id: "",
        shift_id: "",
        time: "11:11",
        priority: "",
        appointment_status: "",
        source: "Online",
        Hospital_id: 1,
      });
    }
  }, [selectedData]);

  // useEffect(() => {
  //   if (formSubmitted) {
  //     const timeoutId = setTimeout(() => {
  //       handleClose();
  //       window.location.reload();
  //     },2500);
  //     return () => clearTimeout(timeoutId);
  //   }
  // }, [formSubmitted, handleClose]);
  const initialValues = {
    patient_id: "",
    doctor: "",
    global_shift_id: "",
    date: "",
    shift_id: "",
    priority: "",
    appointment_status: "",
    message: "",
    live_consult: "",
    time: "11:11:11",
    specialist: "",
    source: "Online",
    is_opd: "yes",
    is_ipd: "yes",
    is_queue: 1,
    Hospital_id: 1,
    payment_date: "2023-12-12 11:11:11",
    payment_mode: "",
  };
  const [formValues, setFormValues] = useState({ initialValues });
  const [isEditing, setIsEditing] = useState(true);
  useEffect(() => {
    getApptCharge();
  }, [formValues.doctor]);

  const generatePdf = () => {
    const doc = new jsPDF();
    doc.text("Bill Details", 10, 10);
    doc.text(`Patient Name: ${formValues.patient_name}`, 10, 20);
    doc.text(`Gender: ${formValues.gender}`, 10, 30);
    doc.text(`Doctor Name: ${formValues.doctor}`, 10, 40);
    doc.text(`Doctor Fees: ${formValues.amount}`, 10, 50);
    doc.save("bill.pdf");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

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
      patient_name: patient?.patient_name?.replace("/", ""),
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
          // standard_charge: firstChargeAmount,
          amount: firstChargeAmount,
        }));
      }
    } catch (error) {
      console.error("Error fetching slot charge data:", error);
    }
  };

  const handleClickOpen = () => {
    setOpenpatientDialog(true);
  };
  const handleDialogClose = () => {
    setOpenpatientDialog(false);
  };

  const handleOpenpay = () => {
    setOpenpaydialog(true);
  };
  const handleclosePaydialog = () => {
    setOpenpaydialog(false);
  };

  const handleFetch = (event) => {
    console.log("connection");
  };

  const handleFormSubmit = async () => {
    const Data = {
      ...formValues,
    };
    const response = await api.postAppointment(Data);
    const { status, data } = response;
    console.log(Data, "form values");
    // console.log(data[0].inserted_details[0].mobileno,"diff data");
    // handleOpenpay();

    if (status === 201) {
      const mobilenumber = data[0].inserted_details[0].mobileno;

      const trimmedDate = data[0].inserted_details[0].date.split("T")[0];

      const combinedDateTime = `${trimmedDate}`;

      const formattedDateTime = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }).format(new Date(combinedDateTime));

      const Dates = formattedDateTime;
      const doctorName = data[0].inserted_details[0].doctor_name;
      const formattedDoctorName = doctorName.replace(/(\D)(\d+)/, "$1 ($2)");

      const Patname = " " + data[0].inserted_details[0].patient_name.replace(/\//g, "");

      const email = data[0].inserted_details[0].email;

      // console.log(mobilenumber,Patname,Date,DocName,'sms data');
      const datas = {
        mobilenumber: mobilenumber,
        Patname: Patname,
        Date: Dates,
        DocName: formattedDoctorName,
      };

      const email_datas = {
       email: email,
       Date: Dates,
       name: Patname,
       drname: formattedDoctorName,
       HosName: hos
      };

      const sms_response = await api.postSms(datas);
      // const email_response = await api.postEmail(email_datas)
      toast.success("Appointment booked successfully!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 500,
      });

      setFormSubmitted(true);
      handleClose();
      setFormValues({});

      setTimeout(() => {
        getAppointment();
      }, 800);
    } else {
      toast.error("Failed to set up appointment slot. Please try again.");
    }
  };

  const handleUpdate = async () => {
    const newData = {
      ...formValues,
      id: selectedData?.id,
    };
    const response = await api?.updateAppointment(newData);
    console.log(response, "eeeerespo");
    handleClose();
    if(response.status === 200){
      toast.info("Appointment Updated Successfully!", {
        position: toast.POSITION.TOP_RIGHT,
        className: "toast-message",
        autoClose: 300
      });
    }
    getAppointment();
  };
  const getPriority = async () => {
    const response = await api.getPriorityAppointment_Mainmodule();
    const { data } = response;
    console.log(data, "all priorities");
    setPriorities(data);
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
              className="btn text-white ms-5 fw-bold btn-cust"
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
          <PaymentDialog
            open={openpayDialog}
            handleClose={handleclosePaydialog}
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
                  border: "1px solid rgba(0,0,0,0.2)",
                  borderRadius: "3px",
                }}
                name="patient_id"
                value={formValues.patient_id}
                onChange={handleChange}
              >
                <option>
                  {selectedData?.patient_name
                    ? selectedData?.patient_name
                    : "select"}
                </option>
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
                  border: "1px solid rgba(0,0,0,0.2)",
                  borderRadius: "3px",
                }}
                name="doctor"
                onChange={handleChange}
                value={formValues.doctor}
              >
                <option>
                  {selectedData?.doctor_name
                    ? selectedData?.doctor_name
                    : "select one"}
                </option>
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
              <Input
                style={{
                  width: "100%",
                  height: "35px",
                  border: "1px solid rgba(0,0,0,0.2)",
                  borderRadius: "3px",
                  backgroundColor: "rgba(0,0,0,0.2)",
                }}
                name="amount"
                // value={formValues.standard_charge}
                value={formValues.amount}
                onChange={handleChange}
                type="number"
                readOnly
              ></Input>
            </Col>
            <Input
              hidden
              style={{
                width: "100%",
                height: "35px",
                border: "1px solid rgba(0,0,0,0.2)",
                borderRadius: "3px",
              }}
              name="specialist"
              value={formValues.specialist}
              onChange={handleChange}
            ></Input>
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
                  border: "1px solid rgba(0,0,0,0.2)",
                  borderRadius: "3px",
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
              {selectedData?.date && isEditing ? (
                <Input
                  type="text"
                  style={{
                    width: "100%",
                    height: "35px",
                    border: "1px solid rgba(0,0,0,0.2)",
                    borderRadius: "3px",
                  }}
                  name="date"
                  value={formValues.date}
                  //  onBlur={() => setIsEditing(false)}
                  //  onChange={handleChange}
                  onClick={() => setIsEditing(false)}
                ></Input>
              ) : (
                <Input
                  type="date"
                  style={{
                    width: "100%",
                    height: "35px",
                    border: "1px solid rgba(0,0,0,0.2)",
                    borderRadius: "3px",
                  }}
                  name="date"
                  value={formValues.date}
                  onChange={handleChange}
                ></Input>
              )}
            </Col>
            <Col lg="4" md="4" sm="12">
              <label>
                Time <span className="text-danger">*</span>
              </label>
              <br />
              <Input
                type="time"
                style={{
                  width: "100%",
                  height: "35px",
                  border: "1px solid rgba(0,0,0,0.2)",
                  borderRadius: "3px",
                }}
                name="time"
                value={formValues.time}
                onChange={handleChange}
              ></Input>
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
                  border: "1px solid rgba(0,0,0,0.2)",
                  borderRadius: "3px",
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
                  border: "1px solid rgba(0,0,0,0.2)",
                  borderRadius: "3px",
                }}
                name="priority"
                value={formValues.priority}
                onChange={handleChange}
                onClick={() => getPriority()}
              >
                <option>
                  {selectedData?.priority_status
                    ? selectedData?.priority_status
                    : "select"}
                </option>
                {priorities.map((name) => (
                  <option value={name?.id}>{name?.priority_status}</option>
                ))}
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
                  border: "1px solid rgba(0,0,0,0.2)",
                  borderRadius: "3px",
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
                  border: "1px solid rgba(0,0,0,0.2)",
                  borderRadius: "3px",
                }}
                name="appointment_status"
                value={formValues.appointment_status}
                onChange={handleChange}
              >
                <option>select</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="cancel">Cancel</option>
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
                  border: "1px solid rgba(0,0,0,0.2)",
                  borderRadius: "3px",
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
                  border: "1px solid rgba(0,0,0,0.2)",
                  borderRadius: "3px",
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
            onClick={handleClose}
            className="btn fw-bold text-white"
            style={{ backgroundColor: "#B2533E" }}
          >
            Cancel
          </button>
          {selectedData?.doctor_name ? (
            <button
              onClick={() => {
                handleUpdate();
                // generatePdf();
              }}
              className="btn-mod bg-soft fw-bold"
            >
              UPDATE
            </button>
          ) : (
            <button
              onClick={() => {
                handleFormSubmit();
                generatePdf();
              }}
              className="btn-mod bg-soft fw-bold"
            >
              SUBMIT
            </button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
