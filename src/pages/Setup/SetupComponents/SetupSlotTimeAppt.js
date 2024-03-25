
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
  const [timing, setTiming] = useState([]);
  const [chargeData, setChargeData] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [chargeCategory, setChargeCategory] = useState([]);
  const [timeInputs, setTimeInputs] = useState([]);
  const [charges, setCharges] = useState([]);
  const addNewTimeInputRow = () => {
    console.log(timeInputs, "time");
    setTimeInputs((prevTimeInputs) => [
      ...prevTimeInputs,
      { startTime: "", endTime: "" },
    ]);
  };
  const LoginedDoctor = localStorage.getItem("existingDocotr_id");
 
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
    charge_id: "",
    charge_category: "",
    consult_duration: "",
  });
 
  const handleChange = async (e) => {
    const { name, value } = e.target;
    console.log(name, value, "ee");
    if (name === "charge_id") {
      const response = await api.getAmount_APPT_Slot(value);
      const { data } = response;
      if (data) {
        console.log(data, ":;");
        // Create a new array with the updated object at index 0
        const updatedChargeData = [
          { ...chargeData[0], standard_charge: data[0].standard_charge },
          ...chargeData.slice(1),
        ];
        console.log(updatedChargeData, "lll");
        // Update the state or variable holding chargeData with      the new array
        setChargeData(updatedChargeData);
      }
    }
    console.log(name, value, "both");
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
    const newTimeInputs = data.map((slot) => ({
      startTime: slot.start_time,
      endTime: slot.end_time,
      id:slot.id
    }));
    console.log(newTimeInputs,"tiem")
    setTimeInputs(newTimeInputs)
    setTimeInputs(newTimeInputs, () => {
      // Now you can safely access the updated state
      if (data.length === 0 && data.length > 0) {
        const newTimeInputs = data.map((slot) => ({
          startTime: slot.start_time,
          endTime: slot.end_time,
          id:slot.id
        }));
        setTimeInputs(newTimeInputs);
      }
    });
    setData(data);
 
    if (
      timeInputs.every((input) => !Object.keys(input).length) &&
      data.length > 0
    ) {
      const newTimeInputs = data.map((slot) => ({
        startTime: slot.start_time,
        endTime: slot.end_time,
      }));
 
      setTimeInputs(newTimeInputs);
    } else {
      // setTimeInputs([...timeInputs, { startTime: "", endTime: "" }]);
    }
 
    console.log(formData, "doctor");
 
    const charge_response = await api.getSetupAppointmentSlotChrg(
      formData.doctor
    );
    const { data: data2 } = charge_response;
    console.log(data2, "data2");
    setFormData({ ...formData, consult_duration: data2[0].consult_duration });
    setChargeData(data2);
    setFormData({
      ...formData,
      consult_duration: data2[0].consult_duration,
      charge_id: data2[0]?.id,
    });
    console.log(chargeData, "chrgggg");
    // searchAgain()
  };
  const searchAgain = () => {
    handleSearch();
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
    console.log(start_time, end_time, "time");
    //update time  if(timing[0]?.start_time && timing[0]?.end_time){
    //  console.log(timing,"timing")
    //   }
    // const datas = {
    //   day:formData?.day,
    //   staff_id:Number(formData?.doctor),
    //   global_shift_id:formData?.shift,
    //   start_time:start_time,
    //   end_time:end_time,
    //   hospital_id:1
    // }
    const newData = {
      staff_id: Number(formData?.doctor),
      consult_duration: formData?.consult_duration,
      charge_id: formData?.charge_id,
      Hospital_id: 1,
    };
    console.log(newData, "complete newdata", formData);
    const response = await api.post_Appointment_slot_amount(newData);
    const { data } = response;
    console.log(data,timeInputs, "complete response");
    if (data && start_time && end_time) {
      const timeSlotData = timeInputs.map((input) => ({
        day: formData?.day,
        //  day:'monday',
        staff_id: Number(formData?.doctor),
        global_shift_id: Number(formData?.shift),
        start_time: input?.startTime,
        end_time: input?.endTime,
        Hospital_id: 1,
      }));
 
      console.log(timeSlotData, "timeslot");
      timeSlotData.forEach(async (slotData, index) => {
        console.log(slotData, "showing");
        setTimeout(async () => {
          try {
            const response2 = await api.postSetupApptSlotTime(slotData);
            console.log(response2, "response of timeing");
 
            // Show success toast
            toast.success("Setup appointment slot time added successfully", {
              position: toast.POSITION.TOP_RIGHT,
            });
          } catch (error) {
            console.error("Error:", error);
            // Show error toast
            toast.error("Failed to add setup appointment slot time", {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        }, index * 3000); // Delay each API call by 3 seconds
      });
    }
    // if (data?.status === 'success') {
    // Handle success
    // } else {
    // Handle failure
    // }
    // });
 
    // const { status, data } = response;
 
    // if (status === 201) {
    //   // const newData
    //   const response = await api.post_Appointment_slot_amount()
    //   toast.success("Appointment slot setup successful!", {
    //     position: toast.POSITION.TOP_RIGHT,
    //     autoClose: 500,
    //   });
    setFormSubmitted(true);
    // } else {
    //   // Handle other response statuses if needed
    //   toast.error("Failed to set up appointment slot. Please try again.");
    // }
    // console.log(response, "ress");
    // console.log(data, "appointment response");
  };
  const getAllChargecategory = async () => {
    const response = await api.getChargeCategory();
    const { data } = response;
    console.log(data, "complete charge category");
    setChargeCategory(data);
  };
  const handleCharge = async () => {
    console.log(formData?.charge_category, "categoryid");
    const response = await api?.appointment_chargeName_byid(
      formData?.charge_category
    );
    const { data } = response;
    console.log(data, "charge getting");
    setCharges(data);
  };
  // const handleUpdateTimeInputChange =  (timeType,value) =>{
  //   if(timeType === 'startTime'){
  //     setTiming({
  //       ...timing,
  //       start_time:value
  //     });
  //   }else{
  //     setData({
  //       ...timing,
  //       end_time:value
  //     });
  //   }
  // }
  const handleDeleteSlots = async (id) => {
    console.log(id,timeInputs, "id");
    const userConfirmed = window.confirm('Are you sure you want to delete this slot?');
    console.log(userConfirmed,"delete");
if(userConfirmed && id){
    const rseponse = await api.deleteSetupApptSlotTime(id);
    const response = await api.getSlotTiming(
      formData.day,
      formData.doctor,
      formData.shift
    );
    const { data } = response;
    console.log(data, "datffs");
    const newTimeInputs = data.map((slot) => ({
      startTime: slot.start_time,
      endTime: slot.end_time,
      id:slot.id
    }));
    setTimeInputs(newTimeInputs);
    toast.success("deleted sucessfullyl")
    setData(data);
}else{
  console.log("rejected")
}
   
 
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
                      <label>
                        Day<span className="text-danger ms-1">*</span>
                      </label>
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
                      <label>
                        Doctor<span className="text-danger ms-1">*</span>
                      </label>
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
                        {LoginedDoctor === null
                          ? doctors &&
                            doctors.map((doctor) => (
                              <option key={doctor.id} value={doctor.id}>
                                {doctor.doctor}
                              </option>
                            ))
                          : doctors
                              .filter(
                                (doctor) => doctor.id == Number(LoginedDoctor)
                              )
                              .map((doctor) => (
                                <option key={doctor.id} value={doctor.id}>
                                  {doctor.doctor}
                                </option>
                              ))}
                      </select>
                    </Col>
                    <Col lg="4" sm="12">
                      <label>
                        Shift<span className="text-danger ms-1">*</span>
                      </label>
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
                        name="consult_duration"
                        onChange={handleChange}
                        value={formData?.consult_duration}
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
                        name="charge_category"
                        onChange={handleChange}
                        onClick={() => getAllChargecategory()}
                      >
                        {/* <option>{chargeData[0]?.charge_category_name}</option> */}
                        {/* <option>select</option> */}
                        {chargeData &&
                          chargeData?.map((val) => (
                            <option value={val.charge_category_id}>
                              {val.charge_category_name}
                            </option>
                          ))}
                        {chargeCategory &&
                          chargeCategory
                            .filter(
                              (val) =>
                                !chargeData.some(
                                  (c) => c.charge_category_id === val.id
                                )
                            ) // Filter out existing charge categories
                            .map((val) => (
                              <option key={val.id} value={val.id}>
                                {val.name}
                              </option>
                            ))}
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
                        name="charge_id"
                        onChange={handleChange}
                        onClick={() => handleCharge()}
                      >
                        <option>{chargeData[0]?.charge_name}</option>
                        {chargeData?.map((val) => (
                          <option value={val.id}>{val.name}</option>
                        ))}
                        {charges &&
                          charges
                            .filter(
                              (val) =>
                                !chargeData.some((eg) => eg.id === val.id)
                            )
                            .map((val) => (
                              <option key={val?.id} value={val?.id}>
                                {val?.name}
                              </option>
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
                  {/* {data.length > 0 ? timeInputs.map((timeInput, index) => (
                    <>
                      {data.map((data, index) => (
                        <div key={index}>
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
                                  (data && data.start_time) ||
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
                                  (data && data.end_time) ||
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
                              <i
                                onClick={() => handleDeleteSlots(data.id)}
                                style={{
                                  marginLeft: "30px",
                                  cursor: "pointer",
                                }}
                                className="fas fa-trash-alt fa-lg text-danger"
                              ></i>
                            </Col>
                          </Row>
                        </div>
                      ))}
                    </>
                  ))    :  */}
                 
                  {timeInputs.map((timeInput, index) => (
                    console.log(timeInput,"EE"),
                    <div key={index}>
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
                            value={timeInput.startTime ||
                              "" }
                            onChange={(e) =>
                              handleTimeInputChange(index, "startTime", e.target.value)
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
                            value={timeInput.endTime || ""}
                            onChange={(e) =>
                              handleTimeInputChange(index, "endTime", e.target.value)
                            }
                          />
                          <i
                            onClick={() => handleDeleteSlots(timeInput?.id)}
                            style={{ marginLeft: "30px", cursor: "pointer" }}
                            className="fas fa-trash-alt fa-lg text-danger"
                          ></i>
                        </Col>
                      </Row>
                    </div>
                  ))
                  }
                  {timeInputs && timeInputs.map((val,index)=>(
                     console.log(val,"time inputs")
                  ))}
 
                  <div className="d-flex justify-content-end mt-4">
                    <button className="btn-mod" onClick={()=>addNewTimeInputRow()}>
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
 