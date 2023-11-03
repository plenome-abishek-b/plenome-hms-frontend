import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import {Row, Col} from "reactstrap";
//Import Breadcrumb

//i18n
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import api from "services/Api";

//redux

const DoctorWise = props => {
  const [datas,setDatas] = useState(null)
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [doctorwiseData,setdoctorWise] = useState(null)
  const doctorWiseAppointment = async () =>{
    const response = await api.getDoctorwiseAppoinment(selectedDoctor,selectedDate)
    const {data} = response
    setdoctorWise(data)
    
    console.log(selectedDoctor,selectedDate,"allllllll") 
  }
  console.log(doctorwiseData,"ffyyyyy")
  const handleDoctorChange = (event) => {
    console.log(event.target.value,"selcteddoctor")
    setSelectedDoctor(event.target.value);
  };
  const handleDateInput = (event) => {
    console.log(event.target.value,"dateee")
    setSelectedDate(event.target.value);
  };
  useEffect(()=>{
    fetchDoctors()
  },[]) 
  const fetchDoctors = async () =>{
    const response = await api.getDoctor()
    const {data} = response
    console.log(data,"doooooooo")
    setDatas(data)
    // const name = data.map((value)=>{
    //   setDatas(value.name)
    // })
    
    // setDatas(data)
  } 
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* {/ Render Breadcrumb /} */}
          <h4>Doctor Wise Appointment</h4>
          <div className="card p-4">
            <Row className="ms-4 mt-2">
                <Col lg='6' md='6' sm='12'>
                    <label style={{fontSize: '15px'}}>Doctor <span className="text-danger">*</span></label>
                    <br />
                    <select
                  style={{ width: "80%", height: "35px",borderRadius: '5px', border: '1px solid grey' }}
                  value={selectedDoctor}
                  onChange={handleDoctorChange}
                >
                    <option value="">Select a doctor</option>

                    {datas && datas.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name}
                    </option>
                  ))}
                    </select>
                </Col>
                <Col Col lg='6' md='6' sm='12'>
                    <label style={{fontSize: '15px'}}>Date <span className="text-danger">*</span></label>
                    <br />
                    <input value={selectedDate}
                  onInput={handleDateInput} type="date" style={{width: '80%', height: '35px', borderRadius: '5px', border: '1px solid grey'}}></input>
                </Col>
            </Row>
            <br />
            <div style={{display: 'flex', justifyContent: 'flex-end' ,alignItems: 'flex-end'}} className="mt-4">
                <button className="btn btn-primary bg-soft" onClick={()=>doctorWiseAppointment()}>Search</button>
            </div>
          </div>
          {doctorwiseData === null || doctorwiseData.length === 0 ?
             <div className="card p-4">
           <h4>No data found</h4>
          </div>
          :
          doctorwiseData.map((name)=>(
          <div className="card p-4" key="id">
          Appointment status : <h4>{name.appointment_status}</h4>
               Patient Name  :<h4>{name.patient_name}</h4>
             Appointment Date:<h4>{name.date}</h4>
                      Gender  :<h4>{name.gender}</h4>
        </div>
          ))
         
          }
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withTranslation()(DoctorWise);