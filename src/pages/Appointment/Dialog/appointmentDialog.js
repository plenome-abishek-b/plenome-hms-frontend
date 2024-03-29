import * as React from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { TextField } from "@mui/material"
import { Input, Select } from "@material-ui/core"
import { Row, Col } from "reactstrap"
import PatientDialog from "./PatientDialog"
import { useEffect } from "react"
import api from "services/Api"
import { useState } from "react"
import jsPDF from 'jspdf';


export default function AlertDialog({ open, handleClose, data, handleBill }) {
  const [openpatientDialog, setOpenpatientDialog] = React.useState(false)
  const [patients, setPatients] = useState([])

  const [doctors, setDoctors] = useState([])
  const [example, setExample] = useState([])
  const [shift, setShift] = useState([])
  const [slot, setSlot] = useState([])
  const [formSubmitted, setFormSubmitted] = useState(false);



  useEffect(() => {
    getAllPatient()
    getAllDoctors()

    //  getShifts()
    //  getSlot()
  }, [])

  useEffect(() => {
    handleStuff()
  }, [doctors])

  useEffect(() => {
    if (formSubmitted) {
      const timeoutId = setTimeout(() => {
        handleClose(); // Close the dialog
        // window.location.reload(); // Refresh the component
      }); // 2 seconds
      return () => clearTimeout(timeoutId); // Clean up the timeout on component unmount
    }
  }, [formSubmitted, handleClose]);


  const [formValues, setFormValues] = useState({
    patient_id: "",
    doctor: "",
    amount: "",
    global_shift_id: "",
    date: "",
    shift_id: "",
    priority: "",
    appointment_status: "",
    message: "",
    live_consult: "",
    time: "",
    specialist: "",
    source: "",
    is_opd: "",
    is_ipd: "",
    created_at: "2023-02-11 11:11:11",
    is_queue: 1,
  })

  const generatePdf = () => {
    const doc = new jsPDF();
    doc.text("Bill Details", 10, 10);
    doc.text(`Patient Name: ${formData.patient_name}`, 10, 20);
    doc.text(`Gender: ${formData.gender}`, 10, 30);
    doc.text(`Doctor Name: ${formData.doctor}`, 10, 40);
    doc.text(`Doctor Fees: ${formData.amount}`, 10, 50);
    doc.save('bill.pdf');
  }
  


  const handleChange = event => {
    console.log(event.target, "oooo")
    const { name, value } = event.target
    console.log(name, value, "change")
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    })
    // handleClose()
  }
  console.log(formValues, "valll")
  const getAllPatient = async () => {
    const response = await api.getAllPatients()
    const { data } = response
    console.log(data, "ppppppp")
    setPatients(data)
  }
  const getAllDoctors = async () => {
    const response = await api.getApptDoctor()
    const { data } = response
    console.log(data, "doccccccccccccccc")
    setDoctors(data)
  }
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
        acc[val.shift_id] = { staff_id: val.staff_id, name: val.name }
        return acc
      }, {})
      setExample(exampleArray)
      console.log(exampleArray, "dattt")
      return exampleArray // return the object
    }
    return {} // return an empty object if there are no doctors
  }

  // if(doctors.length > 0){
  //   console.log("first")
  //   handleStuff()
  // }
  const getShifts = async () => {
    const response = await api.getShiftdatas(formValues.doctor)
    console.log(response, "lllll")
    const { data } = response
    console.log(data, "shiffffffffffffffff")
    setShift(data)
  }
  const getSlot = async () => {
    const response = await api.getSlotdatas(
      formValues.doctor,
      formValues.global_shift_id
    )
    const { data } = response
    console.log(data, "daaaaaaaaaaddd")
    setSlot(data)
  }

  const handleClickOpen = () => {
    //dialog open
    setOpenpatientDialog(true)
  }
  const handleDialogClose = () => {
    //dialog close
    setOpenpatientDialog(false)
  }
  const handleFetch = event => {
    console.log("connection")
  }
  const handleFormSubmit = async () => {
    const response = await api.postAppointment(formValues)
    const { data } = response
    console.log(data, "appointment response")
    setFormSubmitted(true);
  }

  console.log(example.undefined, "datttc")
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xl"

      >
        <DialogTitle id="alert-dialog-title" className="text-white fw-bold" style={{ backgroundColor: '#6070FF' }}>
          Add New Appointment
          <button className="btn text-white ms-3 fw-bold" onClick={handleClickOpen} style={{ border: '1px solid white' }}>
            + New Patient
          </button>
          <PatientDialog
            open={openpatientDialog}
            handleClose={handleDialogClose}
          />
        </DialogTitle>
        <DialogContent className="mt-4">
          <Row>
            <Col lg='12'>
              <label className="fs-5">Patient</label>
              <br />
              <select
                style={{ width: "100%", height: "35px", borderRadius: '5px', border: "1px solid grey" }}
                name="patient_id"
                value={formValues.patient_id}
                onChange={handleChange}
              >
                {patients &&
                  patients.map(patient => (
                    <option key={patient.id} value={patient.id}>
                      {patient.patient_name}
                    </option>
                  ))}
              </select>
            </Col>
          </Row>
          <br />
          <Row>
            <Col lg='3' md='6' sm='12'>
              <label>Doctor <span className="text-danger">*</span></label>
              <br />
              <select
                style={{ width: "100%", height: "35px", borderRadius: '5px', border: "1px solid grey" }}
                name="doctor"
                onChange={handleChange}
                value={formValues.doctor}
              >
                <option>select one</option>
                {doctors &&
                  doctors.map(doctor => (
                    <option key={doctor.staff_id} value={doctor.staff_id}>
                      {doctor.name}
                    </option>
                  ))}
                {/* {Object.values(example).map(doctor => (
    <option key={doctor.staff_id} value={doctor.staff_id}>{doctor.name}</option>
  ))} */}
              </select>
            </Col>
            <Col lg='3' md='6' sm='12'>
              <label>Doctor Fees <span className="text-danger">*</span></label>
              <input
                style={{ width: "100%", height: "35px", borderRadius: '5px', border: "1px solid grey" }}
                name="amount"
                value={formValues.amount}
                onChange={handleChange}
                type="number"
              ></input>
            </Col>
            <input
              hidden
              style={{ width: "100%", height: "35px", borderRadius: '5px', border: "1px solid grey" }}
              name="specialist"
              value={formValues.specialist}
              onChange={handleChange}
            ></input>
            <Col lg='3' md='6' sm='12'>
              <label>Shift <span className="text-danger">*</span></label>
              <br />
              <select
                style={{ width: "100%", height: "35px", borderRadius: '5px', border: "1px solid grey" }}
                onClick={() => getShifts()}
                name="global_shift_id"
                value={formValues.global_shift_id}
                onChange={handleChange}
              >
                <option>select one</option>
                {shift &&
                  shift.map(shifts => (
                    <option
                      key={shifts.global_shift_id}
                      value={shifts.global_shift_id}
                    >
                      {shifts.name}
                    </option>
                  ))}
              </select>
            </Col>
            <Col lg='3' md='6' sm='12'>
              <label>Date <span className="text-danger">*</span></label>
              <br />
              <input
                type="date"
                style={{ width: "100%", height: "35px", borderRadius: '5px', border: "1px solid grey" }}
                name="date"
                value={formValues.date}
                onChange={handleChange}
              ></input>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col lg='3' md='6' sm='12'>
              <label>Slot <span className="text-danger">*</span></label>
              <br />
              <select
                style={{ width: "100%", height: "35px", borderRadius: '5px', border: "1px solid grey" }}
                onClick={() => getSlot()}
                name="shift_id"
                value={formValues.shift_id}
                onChange={handleChange}
              >
                <option>select one</option>
                {slot &&
                  slot.map(slots => (
                    <option key={slots.id} value={slots.id}>
                      {slots.start_time}-{slots.end_time}
                    </option>
                  ))}
              </select>
            </Col>
            <Col lg='3' md='6' sm='12'>
              <label>Priority</label>
              <br />
              <select
                style={{ width: "100%", height: "35px", borderRadius: '5px', border: "1px solid grey" }}
                name="priority"
                value={formValues.priority}
                onChange={handleChange}
              >
                <option value="Normal">Normal</option>
                <option value="Urgent">Urgent</option>
                <option value="Very Urgent">Very Urgent</option>
              </select>
            </Col>
            <Col lg='3' md='6' sm='12'>
              <label>Payment</label>
              <br />
              <select style={{ width: "100%", height: "35px", borderRadius: '5px', border: "1px solid grey" }}>
                <option>Cash</option>
                <option>Cheque</option>
                <option>UPI</option>
              </select>
            </Col>
            <Col lg='3' md='6' sm='12'>
              <label>Status <span className="text-danger">*</span></label>
              <br />
              <select
                style={{ width: "100%", height: "35px", borderRadius: '5px', border: "1px solid grey" }}
                name="appointment_status"
                value={formValues.appointment_status}
                onChange={handleChange}
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Cancel">Cancel</option>
              </select>
            </Col>
          </Row>
          <Row className="mt-4">
            <label>Message</label>
            <Col lg='12' md='12' sm='12'>
              <textarea
                style={{ width: "100%", height: "60px", borderRadius: '5px', border: "1px solid grey" }}
                name="message"
                value={formValues.message}
                onChange={handleChange}
              ></textarea>
            </Col>
          </Row>
          <br />
          <Row>
            <Col lg='12' md='12' sm='12'>
              <label>Live Consultant <span className="text-danger">*</span></label>
              <br />
              <select
                style={{ width: "100%", height: "35px", borderRadius: '5px', border: "1px solid grey" }}
                name="live_consult"
                value={formValues.live_consult}
                onChange={handleChange}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </Col>
          </Row>
        </DialogContent>
        <DialogActions
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <button onClick={handleClose} className="btn fw-bold text-white" style={{ backgroundColor: '#B2533E' }}>
            Cancel
          </button>
          <button
            onClick={() => {
              handleFormSubmit(handleClose());
              generatePdf();
            }}
            className="btn-mod bg-soft fw-bold"
          >
            SUBMIT
          </button>



        </DialogActions>
      </Dialog>
    </div>
  )
}
