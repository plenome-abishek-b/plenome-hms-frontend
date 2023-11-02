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
import PatientDialog from "pages/Appointment/Dialog/PatientDialog"
import { useEffect } from "react"
import api from "services/Api"
import { useState } from "react"

export default function ApptDialog({ open, handleClose, data }) {
  const [openpatientDialog, setOpenpatientDialog] = React.useState(false)
  const [patients, setPatients] = useState([])

  const [doctors, setDoctors] = useState([])
  const [example, setExample] = useState([])
  const [shift, setShift] = useState([])
  const [slot, setSlot] = useState([])

  useEffect(() => {
    getAllPatient()
    getAllDoctors()

    //  getShifts()
    //  getSlot()
  }, [])

  useEffect(() => {
    handleStuff()
  }, [doctors])

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
    const response = await api.getDoctor()
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
        <DialogTitle id="alert-dialog-title" className="text-primary">
          Add New Appointment
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <button className="btn btn-primary" onClick={handleClickOpen}>
              + New Patient
            </button>
            <PatientDialog
              open={openpatientDialog}
              handleClose={handleDialogClose}
            />
          </div>
        </DialogTitle>
        <DialogContent className="mt-2">
          <Row>
            <Col>
              <label>Patient</label>
              <br />
              <select
                style={{ width: "200px", height: "35px" }}
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
            <Col>
              <label>Doctor</label>
              <br />
              <select
                style={{ width: "100%", height: "35px" }}
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
            <Col>
              <label>Doctor Fees</label>
              <input
                style={{ width: "100%", height: "35px" }}
                name="amount"
                value={formValues.amount}
                onChange={handleChange}
              ></input>
            </Col>
            <input
              hidden
              style={{ width: "100%", height: "35px" }}
              name="specialist"
              value={formValues.specialist}
              onChange={handleChange}
            ></input>
            <Col>
              <label>Shift</label>
              <br />
              <select
                style={{ width: "100%", height: "35px" }}
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
            <Col>
              <label>Date</label>
              <br />
              <input
                type="date"
                style={{ width: "100%", height: "35px" }}
                name="date"
                value={formValues.date}
                onChange={handleChange}
              ></input>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <label>Slot</label>
              <br />
              <select
                style={{ width: "100%", height: "35px" }}
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
            <Col>
              <label>Priority</label>
              <br />
              <select
                style={{ width: "100%", height: "35px" }}
                name="priority"
                value={formValues.priority}
                onChange={handleChange}
              >
                <option value="Normal">Normal</option>
                <option value="Urgent">Urgent</option>
                <option value="Very Urgent">Very Urgent</option>
              </select>
            </Col>
            <Col>
              <label>Payment</label>
              <br />
              <select style={{ width: "100%", height: "35px" }}>
                <option>Cash</option>
                <option>Cheque</option>
                <option>UPI</option>
              </select>
            </Col>
            <Col>
              <label>Status</label>
              <br />
              <select
                style={{ width: "100%", height: "35px" }}
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
            <Col>
              <textarea
                style={{ width: "100%", height: "35px" }}
                name="message"
                value={formValues.message}
                onChange={handleChange}
              ></textarea>
            </Col>
            <Col>
              <label>Live Consultant</label>
              <br />
              <select
                style={{ width: "100%", height: "35px" }}
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
          <button onClick={handleClose} className="btn btn-danger bg-soft">
            Cancel
          </button>
          <button
            onClick={() => handleFormSubmit(handleClose())}
            className="btn btn-primary bg-soft"
          >
            Submit
          </button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
