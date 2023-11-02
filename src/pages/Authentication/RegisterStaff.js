import React, { useState, useEffect } from "react"
import {
  Row,
  Col,
  CardBody,
  Card,
  Container,
  Input,
  Label,
  NavItem,
  NavLink,
  UncontrolledCollapse,
} from "reactstrap"
import { Link } from "react-router-dom"
import { Select } from "@mui/material"
import api from "services/Api"

function RegisterStaff() {
  const initialStaffValues = {
    staff_id: null,
    specialist: "",
    employee_id: "",
    qualification: "xx",
    work_exp: "0",
    specialization: "nothing",
    name: "",
    surname: "",
    father_name: "",
    mother_name: "",
    emergency_contact_no: "",
    contact_no: "",
    marital_status: "",
    local_address: "",
    permanent_address: "",
    note: "",
    image: "",
    gender: "",
    blood_group: "null",
    account_title: "null",
    bank_account_no: "null",
    bank_name: "null",
    ifsc_code: "null",
    bank_branch: "null",
    payscale: "null",
    basic_salary: "null",
    epf_no: "null",
    contract_type: "null",
    shift: "null",
    location: "null",
    facebook: "null",
    twitter: "null",
    linkedin: "null",
    instagram: "null",
    resume: "null",
    joining_letter: "null",
    resignation_letter: "null",
    other_document_name: "null",
    other_document_file: "null",
    user_id: "1",
    is_active: "1",
    verification_code: "",
    zoom_api_key: "",
    zoom_api_secret: "",
    created_at: "2023-02-04 11:11:11",
    pan_number: "",
    identification_number: "",
    local_identification_number: "",
    email: "",
    password: "",
    lang_id: "1",
    role_id: "",
  }

  const [data, setData] = useState(initialStaffValues)
  const [role, setRole] = useState()
  const [designation, setDesignation] = useState()
  const [specialist, setSpecialist] = useState()

  const handleChange = e => {
    //catch the parameters when changed.
    const { value, id } = e.target
    setData({ ...data, [id]: value })
  }

  const handleFormSubmit = async () => {
    const response = await api.postStaff(data)
    const staff_data = response.data
    console.log(staff_data.data, "staff id")

    setData(prevFormData => ({
      ...prevFormData,
      staff_id: staff_data.data,
    }))

    console.log(data, "after1111")

    await handleStaffRole(staff_data.data)
  }

  const handleStaffRole = async staffId => {
    const staffRoleData = {
      ...data,
      staff_id: staffId,
    }

    const new_response = await api.postStaffrole(staffRoleData)
    setData(initialStaffValues)
  }

  useEffect(() => {
    getRoles()
    getSpecialists()
    getDesignations()
  }, [])

  const getRoles = async () => {
    const response = await api.getRole()
    const { data } = response
    setRole(data)
  }

  const getDesignations = async () => {
    const response = await api.getDesignation()
    const { data } = response
    setDesignation(data)
  }

  const getSpecialists = async () => {
    const response = await api.getSpecialist()
    const { data } = response
    setSpecialist(data)
  }

  return (
    <React.Fragment>
      <Container fluid>
        <div className="home-btn d-none d-sm-block">
          <Link to="/" className="text-dark">
            <i className="bx bx-home h2" />
          </Link>
        </div>
        <div
          className="account-pages my-5 pt-sm-5 bg-primary bg-soft
        
        "
        >
          <Container>
            <Card>
              <CardBody>
                <div className="bg-primary">
                  <Row>
                    <Col className="col-9">
                      <div className="text-white p-5">
                        <h4 className="text-white">Register here</h4>
                        <p>Signup for New Account</p>
                      </div>
                    </Col>
                    <Col className="col-2 align-self-end p-3">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/4228/4228730.png"
                        alt=""
                        className="img-fluid"
                      />
                    </Col>
                  </Row>
                </div>
                <Row className="mt-3">
                  <Col lg="3" md="3" sm="12">
                    <Label>
                      Staff ID<span style={{ color: "red" }}> *</span>
                    </Label>
                    <br />
                    <Input
                      id="employee_id"
                      onChange={handleChange}
                      value={data.employee_id}
                    ></Input>
                  </Col>
                  <Col lg="3" md="3" sm="12">
                    <Label>
                      Role<span style={{ color: "red" }}> *</span>
                    </Label>
                    <br />
                    <select
                      style={{ width: "100%", height: "37px" }}
                      id="role_id"
                      onChange={handleChange}
                      value={data.role_id}
                    >
                      <option>select</option>
                      {role &&
                        role.map(roles => (
                          <option key={roles.id} value={roles.id}>
                            {roles.name}
                          </option>
                        ))}
                    </select>
                  </Col>
                  <Col lg="3" md="3" sm="12">
                    <Label>Designation</Label>
                    <br />
                    <select
                      style={{ width: "100%", height: "37px" }}
                      id="designation"
                      onChange={handleChange}
                      value={data.designation}
                    >
                      <option>Select</option>
                      {designation &&
                        designation.map(designations => (
                          <option
                            key={designations.staff_designation_id}
                            value={designations.staff_designation_id}
                          >
                            {designations.designation}
                          </option>
                        ))}
                    </select>
                  </Col>
                  <Col lg="3" md="3" sm="12">
                    <Label>Department</Label>
                    <br />
                    <select style={{ width: "100%", height: "37px" }}>
                      <option>Select</option>
                      <option>Doctor</option>
                    </select>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col lg="3" md="3" sm="12">
                    <Label>specialist</Label>
                    <br />
                    <select style={{ width: "100%", height: "37px" }}>
                      <option>select</option>
                      {specialist &&
                        specialist.map(specialists => (
                          <option key={specialists.id} value={specialists.id}>
                            {specialists.specialist_name}
                          </option>
                        ))}
                    </select>
                  </Col>
                  <Col lg="3" md="3" sm="12">
                    <Label>
                      First Name<span style={{ color: "red" }}> *</span>
                    </Label>
                    <br />
                    <Input
                      id="name"
                      onChange={handleChange}
                      value={data.name}
                    ></Input>
                  </Col>
                  <Col lg="3" md="3" sm="12">
                    <Label>Last Name</Label>
                    <br />
                    <Input
                      id="surname"
                      onChange={handleChange}
                      value={data.surname}
                    ></Input>
                  </Col>
                  <Col lg="3" md="3" sm="12">
                    <Label>Father Name</Label>
                    <br />
                    <Input
                      id="father_name"
                      value={data.father_name}
                      onChange={handleChange}
                    ></Input>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col lg="3" md="3" sm="12">
                    <Label>Mother Name</Label>
                    <br />
                    <Input
                      id="mother_name"
                      onChange={handleChange}
                      value={data.mother_name}
                    ></Input>
                  </Col>
                  <Col lg="3" md="3" sm="12">
                    <Label>Gender</Label>
                    <br />
                    <select
                      style={{ width: "100%", height: "37px" }}
                      id="gender"
                      onChange={handleChange}
                      value={data.gender}
                    >
                      <option>select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Transgender">Transgender</option>
                    </select>
                  </Col>
                  <Col lg="3" md="3" sm="12">
                    <Label>Marital Status</Label>
                    <br />
                    <select
                      style={{ width: "100%", height: "37px" }}
                      id="marital_status"
                      onChange={handleChange}
                      value={data.marital_status}
                    >
                      <option>select</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Unmarried">Unmarried</option>
                    </select>
                  </Col>
                  <Col lg="3" md="3" sm="12">
                    <Label>
                      Date Of Birth<span style={{ color: "red" }}> *</span>
                    </Label>
                    <br />
                    <Input
                      type="date"
                      id="dob"
                      onChange={handleChange}
                      value={data.dob}
                    ></Input>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col lg="3" md="3" sm="12">
                    <Label>Date of Joining</Label>
                    <br />
                    <Input type="date"></Input>
                  </Col>
                  <Col lg="3" md="3" sm="12">
                    <Label>
                      Phone<span style={{ color: "red" }}> *</span>
                    </Label>
                    <br />
                    <Input
                      id="contact_no"
                      onChange={handleChange}
                      value={data.contact_no}
                    ></Input>
                  </Col>
                  <Col lg="3" md="3" sm="12">
                    <Label>Emergency Contact</Label>
                    <br />
                    <Input
                      id="emergency_contact_no"
                      onChange={handleChange}
                      value={data.emergency_contact_no}
                    ></Input>
                  </Col>
                  <Col lg="3" md="3" sm="12">
                    <Label>Photo</Label>
                    <br />
                    <Input
                      type="file"
                      id="image"
                      onChange={handleChange}
                      value={data.image}
                    ></Input>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col lg="3" md="3" sm="12">
                    <Label>
                      Email<span style={{ color: "red" }}> *</span>
                    </Label>
                    <br />
                    <Input
                      id="email"
                      onChange={handleChange}
                      value={data.email}
                    ></Input>
                  </Col>
                  <Col lg="3" md="3" sm="12">
                    <Label>
                      Password<span style={{ color: "red" }}> *</span>
                    </Label>
                    <br />
                    <Input
                      id="password"
                      onChange={handleChange}
                      value={data.password}
                      type="password"
                    ></Input>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col lg="6" md="6" sm="12">
                    <Label>Current Address</Label>
                    <br />
                    <textarea
                      style={{ width: "100%", height: "70px" }}
                      maxLength={300}
                      id="local_address"
                      onChange={handleChange}
                      value={data.local_address}
                    ></textarea>
                  </Col>
                  <Col lg="6" md="6" sm="12">
                    <Label>Permanent Address</Label>
                    <br />
                    <textarea
                      style={{ width: "100%", height: "70px" }}
                      maxLength={200}
                      id="permanent_address"
                      onChange={handleChange}
                      value={data.permanent_address}
                    ></textarea>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col lg="3" md="3" sm="12">
                    <Label>Qualification</Label>
                    <br />
                    <Input
                      id="qualification"
                      onChange={handleChange}
                      value={data.qualification}
                    ></Input>
                  </Col>
                  <Col lg="3" md="3" sm="12">
                    <Label>Work Experience</Label>
                    <br />
                    <Input
                      id="work_exp"
                      onChange={handleChange}
                      value={data.work_exp}
                    ></Input>
                  </Col>
                  <Col lg="3" md="3" sm="12">
                    <Label
                      id="specialization"
                      onChange={handleChange}
                      value={data.specialization}
                    >
                      Specialization
                    </Label>
                    <br />
                    <Input></Input>
                  </Col>
                  <Col lg="3" md="3" sm="12">
                    <Label>Note</Label>
                    <br />
                    <Input
                      id="note"
                      onChange={handleChange}
                      value={data.note}
                    ></Input>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col lg="3" md="3" sm="12">
                    <Label>PAN Number</Label>
                    <br />
                    <Input
                      id="pan_number"
                      onChange={handleChange}
                      value={data.pan_number}
                    ></Input>
                  </Col>
                  <Col lg="3" md="3" sm="12">
                    <Label>National Identification Number</Label>
                    <br />
                    <Input
                      id="identification_number"
                      onChange={handleChange}
                      value={data.identification_number}
                    ></Input>
                  </Col>
                  <Col lg="3" md="3" sm="12">
                    <Label>Local Identification Number</Label>
                    <br />
                    <Input
                      id="local_identification_number"
                      onChange={handleChange}
                      value={data.local_identification_number}
                    ></Input>
                  </Col>
                  <Col lg="3" md="3" sm="12">
                    <Label>Reference Contact</Label>
                    <br />
                    <Input></Input>
                  </Col>
                </Row>
              </CardBody>
              <div
                className="d-flex justify-content-end mb-4"
                style={{ marginRight: "30px" }}
              >

                <button
                  className="btn btn-primary"
                  onClick={handleFormSubmit}
                  style={{ width: "100px", height: "50px" }}
                >
                  Save
                </button>

              </div>
            </Card>
          </Container>
        </div>
      </Container>
    </React.Fragment>
  )
}

export default RegisterStaff
