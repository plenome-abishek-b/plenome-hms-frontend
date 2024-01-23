import PropTypes from "prop-types";
import React from "react";
import { Container } from "reactstrap";
import {Row, Col} from "reactstrap";
//Import Breadcrumb

//i18n
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import api from "services/Api";
import { useState } from "react";

//redux

const PatientQueue = props => {
  const [doctorData,setdoctorData] = useState(null)
  const [shiftData,setShiftData] = useState (null)
  const [slotData,setSlotData] = useState(null)
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedShift,setSelectedShift] = useState("")
  const [selectedDate,setSelectedDate] = useState("")
  const [selectedSlot,setSelectedSlot] = useState("")
  const [searchedResult,setSearchedResult] = useState([])
  console.log(shiftData,"llllllll")
  useEffect(()=>{
   handleDoctor()
  },[])
const handleSearch =async () =>{
  const response = await api.getPatients(selectedDoctor,selectedShift,selectedDate,selectedSlot)
  console.log(selectedDoctor,selectedShift,selectedDate,selectedSlot,"poooo")
  const {data} = response
  console.log(data)
  setSearchedResult(data)
}
console.log(selectedDoctor,selectedShift,selectedDate,selectedSlot)
  const handleDoctor =async () =>{
 const response = await api.getDoctor()
 const {data} = response;
 setdoctorData(data)
  }
  const handleShift = async () =>{
    const response = await api.getShiftdatas(selectedDoctor)
    const {data} = response
    setShiftData(data)
    console.log(data)
  }
  const handleSlot = async () =>{
    const response = await api.getSlotdatas(selectedDoctor,selectedShift)
    const {data} = response
    setSlotData(data)
    console.log(data)
  }
  console.log("first",selectedDoctor,selectedShift)
  const handleDoctorChange = (event) => {
    console.log(event.target.value,"selcteddoctor")
    setSelectedDoctor(event.target.value);
  }; 
  const handleShiftChange = (event) =>{
    console.log(event.target.value,"selected shift")
    setSelectedShift(event.target.value)
  }
  const handleDateInput = (event) =>{
    console.log(event.target.value)
    setSelectedDate(event.target.value)
    
  }
  const handleSlotChange = (event) =>{
    console.log(event.target.value)
    setSelectedSlot(event.target.value)
  }
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* {/ Render Breadcrumb /} */}
          <h4>Patient Queue</h4>
          <div className="card p-4">
            <Row className="mt-2 ms-4">
                <Col lg='3' md='3' sm='3'>
                    <label style={{fontSize: '15px'}}>Doctor <span className="text-danger">*</span></label>
                    <br />
                    <select style={{width: '80%', height: '35px', borderRadius: '5px'}}
                    value={selectedDoctor}
                    onChange={handleDoctorChange}
                    >
                      <option>Select an option</option>
                    {doctorData && doctorData.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name}
                    </option>
                  ))}
                    </select>
                </Col>
                <Col lg='3' md='3' sm='3'>
                    <label style={{fontSize: '15px'}}>shift <span className="text-danger">*</span></label>
                    <br />
                    <select style={{width: '80%', height: '35px', borderRadius: '5px'}} onClick={()=>handleShift()} 
                    value={selectedShift}
                    onChange={handleShiftChange}>
                      <option>select an option</option>
                      {shiftData && shiftData.map((shift)=>(
                        <option key={shift.id} value={shift.global_shift_id}>{shift.name}</option>
                      ))}
                    </select>
                </Col>
                <Col lg='3' md='3' sm='3'>
                    <label style={{fontSize: '15px'}}>Date <span className="text-danger">*</span></label>
                    <br />
                    <input value={selectedDate}
                  onInput={handleDateInput} type="date" style={{width: '80%', height: '35px', borderRadius: '5px', border: '1px solid grey'}}></input>
                </Col>
                <Col lg='3' md='3' sm='3'>
                    <label style={{fontSize: '15px'}}>Slot <span className="text-danger">*</span></label>
                    <br />
                    <select style={{width: '80%', height: '35px', borderRadius: '5px'}}
                    onClick={()=>handleSlot()}
                    value={selectedSlot}
                    onChange={handleSlotChange}>
                      {}
                        <option>select an option</option>
                            {slotData && slotData.map((slot)=>(
                        <option key={slot.id} value={slot.slotId}>{slot.start_time} - {slot.end_time}</option>
                      ))}

                    </select>
                </Col>
            </Row>
            <br />
            <div style={{display: 'flex', justifyContent: 'flex-end' ,alignItems: 'flex-end'}} className="mt-4">
            <button className="btn-mod bg-soft" style={{marginRight:'10px'}}>Reorder Queue</button>
                <button className="btn-mod bg-soft" onClick={()=>handleSearch()}>Search</button>

            </div>
          </div>
            {searchedResult && searchedResult.map((result)=>(
          <div key="id">
           Appointment status : <h4>{result.appointment_status}</h4>
                 Patient Name  :<h4>{result.patient_name}</h4>
                       age    :<h4>{result.age}</h4>
                        Date  :<h4>{result.date}</h4>
                        meet  :<h4>{result.source}</h4>
       <hr></hr>
          </div>
            ))}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withTranslation()(PatientQueue);