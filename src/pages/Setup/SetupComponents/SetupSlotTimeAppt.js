import React from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import { useEffect, useState } from "react";
import api from "services/Api";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SetupSlotAppt() {
  const [doctors, setDoctor] = useState([]);
  const [shift, setShift] = useState([]);
  const [data, setData] = useState([]);
  const [chargeData, setChargeData] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [timeInputs, setTimeInputs] = useState([]);

  const addNewTimeInputRow = () => {
    setTimeInputs((prevTimeInputs) => [
      ...prevTimeInputs,
      { startTime: "", endTime: "" },
    ]);
  };

  const handleTimeInputChange = (index, field, value) => {
    const updatedTimeInputs = [...timeInputs];
    updatedTimeInputs[index][field] = value;
    setTimeInputs(updatedTimeInputs);
  };

  const [formData, setFormData] = useState({
    doctor: "",
    shift: "",
    day: "",
    start_time: "",
    end_time: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const getDoctor = async () => {
    const response = await api.getApptDoctor();
    const { data } = response;
    setDoctor(data);
    console.log(data, "setup doctors");
  };

  const getShift = async () => {
    const response = await api.getApptShift(formData.doctor);
    const { data } = response;
    setShift(data);
    console.log(data, "dd");
  };

  const handleSearch = async () => {
    const response = await api.getSlotTiming(
      formData.day,
      formData.doctor,
      formData.shift
    );
    const { data } = response;
    console.log(data, "datffs");
    setData(data);

    if (data.length > 0) {
      const { start_time, end_time } = data[0];

      setTimeInputs([
        ...timeInputs,
        { startTime: start_time, endTime: end_time },
      ]);
    } else {
      setTimeInputs([...timeInputs, { startTime: "", endTime: "" }]);
    }

    console.log(formData, "doctor");

    const charge_response = await api.getSetupAppointmentSlotChrg(
      formData.doctor
    );
    const { data: data2 } = charge_response;
    setChargeData(data2);
    console.log(chargeData, "chrgggg");
  };

  const handleFormSubmit = async () => {
    console.log(formData, "formdata");
    const staff_id = formData.doctor;
    console.log(staff_id, "staffid");

    const global_shift_id = formData.shift;
    console.log(global_shift_id, "shiftid");

    const Hospital_id = "1";

    const start_time = timeInputs[0]?.startTime || "";
    const end_time = timeInputs[0]?.endTime || "";

    const response = await api.postSetupApptSlotTime(
      formData,
      staff_id,
      global_shift_id,
      start_time,
      end_time,
      Hospital_id
    );

    const { status, data } = response;

    if (status === 201) {
      toast.success("Appointment slot setup successful!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 500,
      });
      setFormSubmitted(true);
    } else {
      // Handle other response statuses if needed
      toast.error("Failed to set up appointment slot. Please try again.");
    }
    console.log(response, "ress");
    console.log(data, "appointment response");
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <ToastContainer />
                  <Row>
                    <Col lg="4">
                      <label>Day<span className="text-danger ms-1">*</span></label>
                      <br />
                      <select
                        name="day"
                        onChange={handleChange}
                        value={formData.day}
                        style={{
                          width: "100%",
                          height: "35px",
                          border: "1px solid rgba(0,0,0,0.2)",
                          borderRadius: "3px",
                        }}
                      >
                        <option>select</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                      </select>
                    </Col>
                    <Col lg="4">
                      <label>Doctor<span className="text-danger ms-1">*</span></label>
                      <br />
                      <select
                        name="doctor"
                        onChange={handleChange}
                        value={formData.doctor}
                        onClick={() => getDoctor()}
                        style={{
                          width: "100%",
                          height: "35px",
                          border: "1px solid rgba(0,0,0,0.2)",
                          borderRadius: "3px",
                        }}
                      >
                        <option>select</option>
                        {doctors &&
                          doctors.map((doctors) => (
                            <option key={doctors.id} value={doctors.id}>
                              {doctors.doctor}
                            </option>
                          ))}
                      </select>
                    </Col>
                    <Col lg="4" sm="12">
                      <label>Shift<span className="text-danger ms-1">*</span></label>
                      <br />
                      <select
                        name="shift"
                        onChange={handleChange}
                        value={formData.shift}
                        onClick={() => getShift()}
                        style={{
                          width: "100%",
                          height: "35px",
                          border: "1px solid rgba(0,0,0,0.2)",
                          borderRadius: "3px",
                        }}
                      >
                        <option>select</option>
                        {shift &&
                          shift.map((shiftname) => (
                            <option
                              key={shiftname.global_shift_id}
                              value={shiftname.global_shift_id}
                            >
                              {shiftname.shift_name}
                            </option>
                          ))}
                      </select>
                    </Col>
                  </Row>
                  <div className="d-flex justify-content-end mt-3">
                    <button className="btn-mod" onClick={handleSearch}>
                      Search
                    </button>
                  </div>
                  <Row>
                    <Col>
                      <label>Consultation Duration</label>
                      <br />
                      <input
                        style={{
                          width: "100%",
                          height: "35px",
                          border: "1px solid rgba(0,0,0,0.2)",
                          borderRadius: "3px",
                        }}
                        value={chargeData[0]?.consult_duration}
                      ></input>
                    </Col>
                    <Col>
                      <label>Charge Category</label>
                      <br />
                      <select
                        style={{
                          width: "100%",
                          height: "35px",
                          border: "1px solid rgba(0,0,0,0.2)",
                          borderRadius: "3px",
                        }}
                        onChange={handleChange}
                      >
                        {/* <option>select</option> */}
                        <option>{chargeData[0]?.charge_category_name}</option>
                        {chargeData?.map((val) => (
                          <option value={val.id}>{val.name}</option>
                        ))}
                        <option>select</option>
                      </select>
                    </Col>
                    <Col>
                      <label>Charge</label>
                      <br />
                      <select
                        style={{
                          width: "100%",
                          height: "35px",
                          border: "1px solid rgba(0,0,0,0.2)",
                          borderRadius: "3px",
                        }}
                        onChange={handleChange}
                      >
                        <option>{chargeData[0]?.charge_name}</option>
                        {chargeData?.map((val) => (
                          <option value={val.id}>{val.name}</option>
                        ))}
                        <option>select</option>
                      </select>
                    </Col>
                    <Col>
                      <label>Amount</label>
                      <br />
                      <input
                        style={{
                          width: "100%",
                          height: "35px",
                          border: "1px solid rgba(0,0,0,0.2)",
                          borderRadius: "3px",
                          backgroundColor: "#f0f0f0",
                        }}
                        value={chargeData[0]?.standard_charge}
                        readOnly={true}
                      ></input>
                    </Col>
                  </Row>
                  <br />
                  <br />
                  <label className="fw-bold">Time Duration</label>
                  {timeInputs.map((timeInput, index) => (
                    <Row
                      key={index}
                      className="mt-3"
                      style={{ marginLeft: "90px" }}
                    >
                      <Col>
                        <input
                          type="time"
                          style={{
                            width: "70%",
                            height: "35px",
                            border: "1px solid rgba(0,0,0,0.2)",
                            borderRadius: "3px",
                            backgroundColor: "#f0f0f0",
                          }}
                          value={
                            timeInput.startTime ||
                            (data[0] && data[0].start_time) ||
                            ""
                          }
                          onChange={(e) =>
                            handleTimeInputChange(
                              index,
                              "startTime",
                              e.target.value
                            )
                          }
                        />
                      </Col>
                      <Col>
                        <input
                          type="time"
                          style={{
                            width: "70%",
                            height: "35px",
                            border: "1px solid rgba(0,0,0,0.2)",
                            borderRadius: "3px",
                            backgroundColor: "#f0f0f0",
                          }}
                          value={
                            timeInput.endTime ||
                            (data[0] && data[0].end_time) ||
                            ""
                          }
                          onChange={(e) =>
                            handleTimeInputChange(
                              index,
                              "endTime",
                              e.target.value
                            )
                          }
                        />
                      </Col>
                    </Row>
                  ))}

                  <div className="d-flex justify-content-end mt-4">
                    <button className="btn-mod" onClick={addNewTimeInputRow}>
                      + Add Time Slot
                    </button>
                    <button className="btn-mod ms-2" onClick={handleFormSubmit}>
                      Save
                    </button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default SetupSlotAppt;
