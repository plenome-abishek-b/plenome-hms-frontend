import PropTypes from "prop-types"
import React, { useMemo, useState } from "react"
import { Card, CardBody, Col, Container, Row } from "reactstrap"

//Import Breadcrumb
// import Breadcrumbs from "../../components/Common/Breadcrumb"

//i18n
import { withTranslation } from "react-i18next"

import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import { blue } from "@mui/material/colors"
import api from "services/Api"
import { useEffect } from "react"

//redux

const Slot_setupAppointment = props => {
  const [doctor, setDoctor] = useState([])
  const [searchData, setSearchData] = useState([])
  const [chargeCategory, setChargeCategory] = useState([])
  const [chargesName, setChargeName] = useState([])
  const [formData, setFormData] = useState({
    doctor: "",
    shift: "",
    charge_category: "",
    charge_name: "",
  })

  const [shift, setShift] = useState([])
  const [handleSearchdata, setHandleSearchData] = useState([])
  console.log(handleSearchdata, "kk")
  const handleChange = e => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  )
  const [selectedDay, setSelectedDay] = useState(null)

  const [searchText, setSearchText] = useState("")

  const [gridApi, setGridApi] = useState(null)
  const onGridReady = params => {
    setGridApi(params.api)
  }

  const onQuickFilterText = event => {
    gridApi.setQuickFilter(event.target.value)
  }

  const getDoctor = async () => {
    const response = await api.getAppointmentsetupSlotdoctor()
    const { data } = response
    setDoctor(data)
    console.log(data, "setup doctor")
  }
  const getShift = async () => {
    const response = await api.getAppointmentsetupSlotshift(formData.doctor)
    const { data } = response
    setShift(data)
    console.log(data, "dd")
  }
  const handleSearch = async () => {
    const response = await api.getAppointmentsetupSlotconsultation(
      formData.shift
    )
    const { data } = response
    setHandleSearchData(data)
    if (data.length > 0) {
      const updatedChargeName = data[0]?.standard_charge

      setFormData(previousValue => ({
        ...previousValue,
        charge_name: updatedChargeName,
      }))
    }
    const getDaybyshift = await api.getSearchedShifts(
      formData.doctor,
      formData.shift
    )
    const availabledata = getDaybyshift.data
    setSearchData(availabledata)
    console.log(availabledata, "avl")
  }
  console.log(formData)
  // const handleGetDay =async (day) =>{
  //   const getDaybyshift = await api.getSearchedShifts(formData.doctor,formData.shift,day)
  //   const availabledata = getDaybyshift.data
  //   setSearchData(availabledata)
  //   console.log(availabledata,"avl")
  // }
  const handleGetDay = async day => {
    setSelectedDay(day)
    const getDaybyshift = await api.getSearchedShifts(
      formData.doctor,
      formData.shift,
      day
    )
    const availabledata = getDaybyshift.data
    setSearchData(availabledata)
    console.log(availabledata, "avl")
  }
  useEffect(() => {
    console.log(searchData, "cs")
  }, [searchData])
  console.log(searchData, "cs")

  const getChargeCategory = async () => {
    const response = await api.getAppointmentSlotChargeCategoy()
    const { data } = response
    console.log(data, "funfu")
    setChargeCategory(data)
  }
  const chargeName = async () => {
    const response = await api.getAppointmentSlotCharges(
      formData.charge_category
    )
    const { data } = response
    setChargeName(data)
    console.log(data, "ddddwoo")
  }
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>Slots</h4>
          <Card>
            <CardBody>
              <Row>
                <Col lg="6" sm="14">
                  <label>Doctor</label>
                  <br />
                  <select
                    name="doctor"
                    onChange={handleChange}
                    value={formData.doctor}
                    onClick={() => getDoctor()}
                    style={{ width: "100%", height: "35px",border: '1px solid grey', borderRadius: '5px' }}
                  >
                    <option>select</option>
                    {doctor &&
                      doctor.map(doctors => (
                        <option key={doctors.staff_id} value={doctors.staff_id}>
                          {doctors.name}
                        </option>
                      ))}
                  </select>
                </Col>
                <Col lg="6" sm="12">
                  <label>Shift</label>
                  <br />
                  <select
                    name="shift"
                    onChange={handleChange}
                    value={formData.shift}
                    onClick={() => getShift()}
                    style={{ width: "100%", height: "35px",border: '1px solid grey', borderRadius: '5px'  }}
                  >
                    <option>select</option>
                    {shift &&
                      shift.map(shiftname => (
                        <option key={shiftname.id} value={shiftname.id}>
                          {shiftname.name}
                        </option>
                      ))}
                  </select>
                </Col>
              </Row>
              <div className="d-flex justify-content-end">
              <button
                    onClick={() => handleSearch()}
                    style={{ margin: "30px" }}
                    className="btn-mod fw-bold"
                  >
                    search
                  </button>
              </div>
             
              <br />
              <Row>
                <Col lg="3" sm="12">
                  <label>Consultation Duration</label>
                  <br />
                  {/* <option>select</option> */}
                  {/* {handleSearchdata && handleSearchdata.map((searchs=>( */}
                  <input
                    style={{ width: "100%", height: "30px" }}
                    value={handleSearchdata[0]?.consult_duration}
                    onChange={handleChange}
                  />
                  {/* )))}  */}
                </Col>
                <Col lg="3" sm="12">
                  <label>Charge Category</label>
                  <br />
                  <select
                    name="charge_category"
                    value={formData.charge_category}
                    onChange={handleChange}
                    onClick={() => getChargeCategory()}
                    style={{ width: "100%", height: "30px" }}
                  >
                    {/* <option>select</option> */}
                    {/* {handleSearchdata[0]? */}
                    <option>{handleSearchdata[0]?.category_name}</option>:
                    {chargeCategory?.map(val => (
                      <option value={val.id}>{val.name}</option>
                    ))}
                    {/* } */}
                  </select>
                </Col>
                <Col lg="3" sm="12">
                  <label>Charge Name</label>
                  <br />
                  <select
                    name="charge_name"
                    value={formData.charge_name}
                    onChange={handleChange}
                    onClick={() => chargeName()}
                    style={{ width: "100%", height: "30px" }}
                  >
                    {/* <option>select</option> */}
                    <option>{handleSearchdata[0]?.charge_name}</option>
                    {chargesName?.map(name => (
                      <option value={name.standard_charge}>{name.name}</option>
                    ))}
                  </select>
                </Col>
                <Col lg="3" sm="12">
                  <label>Amount</label>
                  <br />
                  <input
                    style={{ width: "100%", height: "30px" }}
                    value={formData.charge_name}
                  />
                </Col>
              </Row>
              <br />
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <h3
                  onClick={() => handleGetDay("Monday")}
                  style={{
                    borderBottom:
                      selectedDay === "Monday" ? "3px solid blue" : "none",
                  }}
                >
                  Monday
                </h3>
                <h3
                  onClick={() => handleGetDay("Tuesday")}
                  style={{
                    borderBottom:
                      selectedDay === "Tuesday" ? "3px solid blue" : "none",
                  }}
                >
                  Tuesday
                </h3>
                <h3
                  onClick={() => handleGetDay("Wednesday")}
                  style={{
                    borderBottom:
                      selectedDay === "Wednesday" ? "3px solid blue" : "none",
                  }}
                >
                  Wednesday
                </h3>
                <h3
                  onClick={() => handleGetDay("Thursday")}
                  style={{
                    borderBottom:
                      selectedDay === "Thursday" ? "3px solid blue" : "none",
                  }}
                >
                  Thursday
                </h3>
                <h3
                  onClick={() => handleGetDay("Friday")}
                  style={{
                    borderBottom:
                      selectedDay === "Friday" ? "3px solid blue" : "none",
                  }}
                >
                  Friday
                </h3>
                <h3
                  onClick={() => handleGetDay("Saturday")}
                  style={{
                    borderBottom:
                      selectedDay === "Saturday" ? "3px solid blue" : "none",
                  }}
                >
                  Saturday
                </h3>
                <h3
                  onClick={() => handleGetDay("Sunday")}
                  style={{
                    borderBottom:
                      selectedDay === "Sunday" ? "3px solid blue" : "none",
                  }}
                >
                  Sunday
                </h3>
              </div>

              <br />

              {/* {searchData && */}
              <div
                className="ag-theme-alpine mt-2"
                style={{
                  height: "20%",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                {searchData && searchData.length > 0 ? (
                  <>
                    <input
                      type="time"
                      value={searchData[0].start_time}
                      style={{
                        width: "400px",
                        height: "40px",
                        fontSize: "24px",
                        textAlign: "center",
                        border: "2px solid #ccc",
                        borderRadius: "8px",
                        outline: "none",
                        backgroundColor: "#f2f2f2",
                        color: "#333",
                      }}
                    />
                    <input
                      type="time"
                      value={searchData[0].end_time}
                      style={{
                        width: "400px",
                        height: "40px",
                        fontSize: "24px",
                        textAlign: "center",
                        border: "2px solid #ccc",
                        borderRadius: "8px",
                        outline: "none",
                        backgroundColor: "#f2f2f2",
                        color: "#333",
                      }}
                    />
                  </>
                ) : (
                  <>
                    {/* <h1>hai</h1> */}
                    <input
                      type="time"
                      value="--:--"
                      style={{
                        width: "400px",
                        height: "40px",
                        fontSize: "24px",
                        textAlign: "center",
                        border: "2px solid #ccc",
                        borderRadius: "8px",
                        outline: "none",
                        backgroundColor: "#f2f2f2",
                        color: "#333",
                      }}
                    />
                    <input
                      type="time"
                      value="--:--"
                      style={{
                        width: "400px",
                        height: "40px",
                        fontSize: "24px",
                        textAlign: "center",
                        border: "2px solid #ccc",
                        borderRadius: "8px",
                        outline: "none",
                        backgroundColor: "#f2f2f2",
                        color: "#333",
                      }}
                    />
                  </>
                )}
                
              </div>
              <div className="d-flex justify-content-center mt-5">
              <button className="btn-mod" style={{width:'150px', height:'38px'}}>Save</button>
              </div>
              

              {/* } */}
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(Slot_setupAppointment)
