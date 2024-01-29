import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import { Row, Col } from "reactstrap";
//Import Breadcrumb

//i18n
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import api from "services/Api";

//redux

const DoctorWise = (props) => {
  const [datas, setDatas] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [doctorwiseData, setdoctorWise] = useState(null);

  const doctorWiseAppointment = async () => {
    try {
      const response = await api.getDoctorwiseAppoinment(
        selectedDoctor,
        selectedDate
      );
      const { data } = response;
      const formattedData = data.map((appointment) => ({
        ...appointment,
        date: formatDateTime(appointment.date),
      }));

      setdoctorWise(formattedData);

      console.log(formattedData, "formattedData");

      console.log(selectedDoctor, selectedDate, "allllllll");
    } catch (error) {
      console.error("Error fetching doctor-wise appointments:", error);
    }
  };

  function formatDateTime(dateTimeString) {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };

    const formattedDateTime = new Date(dateTimeString).toLocaleString(
      "en-US",
      options
    );
    return formattedDateTime;
  }

  console.log(doctorwiseData, "ffyyyyy");
  const handleDoctorChange = (event) => {
    console.log(event.target.value, "selcteddoctor");
    setSelectedDoctor(event.target.value);
  };
  const handleDateInput = (event) => {
    console.log(event.target.value, "dateee");
    setSelectedDate(event.target.value);
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    const response = await api.getDoctor();
    const { data } = response;
    console.log(data, "doooooooo");
    setDatas(data);
    // const name = data.map((value)=>{
    //   setDatas(value.name)
    // })

    // setDatas(data)
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* {/ Render Breadcrumb /} */}
          <h4>Doctor Wise Appointment</h4>
          <div className="card p-4">
            <Row className="ms-4 mt-2">
              <Col lg="6" md="6" sm="12">
                <label style={{ fontSize: "15px" }}>
                  Doctor <span className="text-danger">*</span>
                </label>
                <br />
                <select
                  style={{
                    width: "80%",
                    height: "35px",
                    borderRadius: "5px",
                    border: "1px solid grey",
                  }}
                  value={selectedDoctor}
                  onChange={handleDoctorChange}
                >
                  <option value="">Select a doctor</option>

                  {datas &&
                    datas.map((doctor) => (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.doctor}
                      </option>
                    ))}
                </select>
              </Col>
              <Col Col lg="6" md="6" sm="12">
                <label style={{ fontSize: "15px" }}>
                  Date <span className="text-danger">*</span>
                </label>
                <br />
                <input
                  value={selectedDate}
                  onInput={handleDateInput}
                  type="date"
                  style={{
                    width: "80%",
                    height: "35px",
                    borderRadius: "5px",
                    border: "1px solid grey",
                  }}
                ></input>
              </Col>
            </Row>
            <br />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
              className="mt-4"
            >
              <button
                className="btn-mod bg-soft"
                onClick={() => doctorWiseAppointment()}
              >
                Search
              </button>
            </div>
          </div>
          {doctorwiseData === null || doctorwiseData.length === 0 ? (
            <div className="card p-4" style={{border: '5px solid grey'}}>
              <h4>No data found</h4>
            </div>
          ) : (
            doctorwiseData.map((name, index) => (
              <div className="card p-4" key={index} style={{border: '3px solid grey'}}>
                <h5 style={{ color: "blue", marginBottom: "10px" }}>
                  Patient Name: {name.patient_name}
                </h5>
                <h5 style={{ color: "green", marginBottom: "10px" }}>
                  Appointment Date: {name.date}
                </h5>
                <h5 style={{ color: "purple", marginBottom: "10px" }}>
                  Email: {name.email}
                </h5>
                <h5 style={{ color: "orange", marginBottom: "10px" }}>
                  Source: {name.source}
                </h5>
              </div>
            ))
          )}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withTranslation()(DoctorWise);
