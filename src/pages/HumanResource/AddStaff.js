import PropTypes from "prop-types";
import React, { useState, useRef } from "react";
import {
  Row,
  Col,
  Container,
  Card,
  CardBody,
  UncontrolledCollapse,
  Button,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";
import api from "services/Api";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import { format } from "prettier";
import { useEffect } from "react";

//redux

const AddStaff = () => {
  const history = useHistory();
  const location = useLocation();
  const { staff } = location.state || {};
  console.log(staff, "props");
  const [certificates, setCertificates] = useState([
    { id: 1, file: null, fileName: "", fileType: "", date: "" },
  ]);
  const [staffRole, setStaffRole] = useState([]);
  const [designation, setDesignation] = useState([]);
  const [department, setDepartment] = useState([]);
  const [specialist, setSpecialist] = useState([]);
  const [bloodGroup, setBloodGroup] = useState([]);
  const [formData, setFormData] = useState({
    employee_id: "",
    role_id: "",
    specialization: "",
    staff_designation_id: "",
    department_id: "",
    specialist: "",
    surname: "",
    first_name: "",
    father_name: "",
    mother_name: "",
    gender: "",
    password: "",
    marital_status: "",
    dob: "",
    date_of_joining: "",
    contact_no: "",
    emergency_contact_no: "",
    email: "",
    local_address: "",
    permanent_address: "",
    local_identification_number: "",
    identification_number: "",
    pan_number: "",
    note: "",
    pan_number: "",
    epf_no: "",
    location: "",
    basic_salary: "",
    contract_type: "",
    qualification: "",
    epf_no: "",
    shift: "",
    contract_type: "",
    bank_account_no: "",
    account_title: "",
    bank_name: "",
    ifsc_code: "",
    bank_branch: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    zoom_api_key: "",
    zoom_api_secret: "",
    instagram: "",
    work_exp: "",
    image: "",
    other_document_file: "",
    joining_letter: "",
    resignation_letter: "",
    resume: "",
    blood_group: "",
    lang_id: 4,
    user_id: 0,
    is_active: 1,
    verification_code: "",
    payscale: "medium",
    other_document_name: "",
    languagesKnown: "[4,59]",
    hospital_id: 1,
    // certificates:''
  });

  useEffect(() => {
    if (staff) {
      var dob = new Date(staff?.dob);
      const joindate = new Date(staff?.date_of_joining);
      var DobOnly = dob.toISOString().split("T")[0];
      // Extract the date portion
      var JoindateOnly = joindate.toISOString().split("T")[0];
      setFormData({
        employee_id: staff?.employee_id,
        specialization: staff?.specialization,
        role_id: staff?.taffRoleID,
        role: staff?.role_name,
        staff_designation_id: staff?.staff_designation_id,
        department_id: staff?.department_id,
        department: staff?.department_name,
        specialist: String(staff?.specialist),
        surname: staff?.surname,
        first_name: staff?.name,
        father_name: staff?.father_name,
        mother_name: staff?.mother_name,
        gender: staff?.gender,
        password: staff?.password,
        marital_status: staff?.marital_status,
        dob: DobOnly,
        date_of_joining: JoindateOnly,
        contact_no: staff?.contact_no,
        emergency_contact_no: staff?.emergency_contact_no,
        email: staff?.email,
        local_address: staff?.local_address,
        permanent_address: staff?.permanent_address,
        local_identification_number: staff?.local_identification_number,
        identification_number: staff?.identification_number,
        pan_number: staff?.pan_number,
        note: staff?.note,
        // // pan_number:'',
        epf_no: staff?.epf_no,
        location: staff?.location,
        basic_salary: staff?.basic_salary,
        contract_type: staff?.contract_type,
        qualification: staff?.qualification,
        // // epf_no:'',
        shift: staff?.shift,
        contract_type: staff?.contract_type,
        bank_account_no: staff?.bank_account_no,
        account_title: staff?.account_title,
        bank_name: staff?.bank_name,
        ifsc_code: staff?.ifsc_code,
        bank_branch: staff?.bank_branch,
        facebook: staff?.facebook,
        twitter: staff?.twitter,
        linkedin: staff?.linkedin,
        zoom_api_key: staff?.zoom_api_key,
        zoom_api_secret: staff?.zoom_api_secret,
        instagram: staff?.instagram,
        work_exp: staff?.work_exp,
        image: staff?.image,
        other_document_file: staff?.other_document_file,
        joining_letter: staff?.joining_letter,
        resignation_letter: staff?.resignation_letter,
        resume: staff?.resume,
        name: staff?.name,
        blood_group: staff?.blood_group,
        date_of_leaving: null,
        designation: staff?.designation,
        lang_id: 4,
        user_id: 0,
        is_active: 1,
        verification_code: "",
        payscale: "medium",
        other_document_name: staff?.other_document_name,
        languagesKnown: "[4,59]",
        hospital_id: 1,
      });
    } else {
      setFormData({
        employee_id: "",
        specialization: "",
        role_id: "",
        staff_designation_id: "",
        department_id: "",
        specialist: "",
        surname: "",
        first_name: "",
        father_name: "",
        mother_name: "",
        gender: "",
        password: "",
        marital_status: "",
        dob: "",
        date_of_joining: "",
        contact_no: "",
        emergency_contact_no: "",
        email: "",
        local_address: "",
        permanent_address: "",
        local_identification_number: "",
        identification_number: "",
        pan_number: "",
        note: "",
        pan_number: "",
        epf_no: "",
        location: "",
        basic_salary: "",
        contract_type: "",
        qualification: "",
        epf_no: "",
        shift: "",
        contract_type: "",
        bank_account_no: "",
        account_title: "",
        bank_name: "",
        ifsc_code: "",
        bank_branch: "",
        facebook: "",
        twitter: "",
        linkedin: "",
        zoom_api_key: "",
        zoom_api_secret: "",
        instagram: "",
        work_exp: "",
        image: "",
        other_document_file: "",
        joining_letter: "",
        resignation_letter: "",
        resume: "",
        blood_group: "",
        lang_id: 4,
        user_id: 0,
        is_active: 1,
        verification_code: "",
        payscale: "medium",
        other_document_name: "",
        languagesKnown: "[4,59]",
        hospital_id: 1,
      });
    }
  }, []);
  const onChange = (id, event) => {
    const selectedFile = event.target.files[0];
    const fileName = selectedFile.name;
    const fileType = selectedFile.type;
    const date = new Date().toLocaleDateString();

    setCertificates((prevCertificates) => {
      return prevCertificates.map((cert) =>
        cert.id === id
          ? { ...cert, file: selectedFile, fileName, fileType, date }
          : cert
      );
    });
  };

  const addCertificate = () => {
    const newCertificate = {
      id: certificates.length + 1,
      file: null,
      fileName: "",
      fileType: "",
      date: "",
    };
    setCertificates([...certificates, newCertificate]);
  };

  const handleSubmit = async () => {
    const selectedFiles = certificates.map((cert) => ({
      fileName: cert.fileName,
      fileType: cert.fileType,
      date: cert.date,
    }));
    console.log(" ", selectedFiles);
    const datas = {
      ...formData,
      name: `${formData?.first_name}`,
      certificates: selectedFiles,
      other_document_name: formData?.other_document_file,
    };
    console.log(datas, "all datas getting");
    // const filteredObject = Object.fromEntries(
    //   Object.entries(datas).filter(([key, value]) => value !== "")
    // );
    const response = await api?.postHRmainModuleHr_Staff(datas);
    console.log(response, "consoling");
    const { data } = response;
    console.log(data, "consoling");
    history.push("/hr");
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const getStaffs = async () => {
    const response = await api.getRolePermission();
    const { data } = response;
    console.log(data, "role");
    setStaffRole(data);
  };
  const getHrDesignation = async () => {
    const response = await api?.getHrMainModuleDesignation();
    const { data } = response;
    setDesignation(data);
  };
  const getDepartment = async () => {
    const response = await api?.getHrMainModuleDepartment();
    const { data } = response;
    setDepartment(data);
  };
  const getSpecialist = async () => {
    const response = await api?.getHrMainModuleSpecialist();
    const { data } = response;
    setSpecialist(data);
  };
  const getBloodgroup = async () => {
    const response = await api?.getSetup_bloodBank();
    const { data } = response;
    setBloodGroup(data);
  };
  const handleUpdate = async () => {
    console.log(formData);
    const newdata = {
      ...formData,
      id: staff?.id,
    };
    const response = await api.updateHrMainModule(newdata);
    console.log(response, "gettign ye");
    history.push("/hr");
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <h4 className="text-primary">Basic Information</h4>
          <p className="text-danger d-flex justify-content-end fw-bold">
            Fill all the Mandatory details( * )
          </p>
          <Card>
            <CardBody>
              <Row>
                <Col lg="3">
                  <label>
                    Staff ID<span className="text-danger">*</span>
                  </label>
                  <br />
                  <input
                    placeholder=""
                    name="employee_id"
                    style={{
                      width: "100%",
                      height: "30px",
                      border: "1px solid rgba(0,0,0,0.2)",
                      borderRadius: "3px",
                    }}
                    onChange={handleChange}
                    value={formData?.employee_id}
                  ></input>
                </Col>
                <Col lg="3" md="12" sm="12">
                  <label>
                    Role<span className="text-danger">*</span>
                  </label>
                  <br />
                  <select
                    style={{
                      width: "100%",
                      height: "30px",
                      border: "1px solid rgba(0,0,0,0.2)",
                      borderRadius: "3px",
                    }}
                    name="role_id"
                    onChange={handleChange}
                    onClick={() => getStaffs()}
                    value={formData?.role_id}
                  >
                    <option>
                      {formData?.role ? formData?.role : "select"}
                    </option>
                    {staffRole.map((role) => (
                      <option value={Number(role?.id)}>{role?.name}</option>
                    ))}
                  </select>
                </Col>
                <Col lg="3" md="12" sm="12">
                  <label>Designation</label>
                  <br />
                  <select
                    style={{
                      width: "100%",
                      height: "30px",
                      border: "1px solid rgba(0,0,0,0.2)",
                      borderRadius: "3px",
                    }}
                    name="staff_designation_id"
                    onChange={handleChange}
                    onClick={() => getHrDesignation()}
                    value={formData?.staff_designation_id}
                  >
                    <option>
                      {formData?.designation ? formData?.designation : "select"}
                    </option>
                    {designation.map((des) => (
                      <option value={Number(des?.id)}>
                        {des?.designation}
                      </option>
                    ))}
                  </select>
                </Col>
                <Col lg="3" md="12" sm="12">
                  <label>Department</label>
                  <br />
                  <select
                    style={{
                      width: "100%",
                      height: "30px",
                      border: "1px solid rgba(0,0,0,0.2)",
                      borderRadius: "3px",
                    }}
                    name="department_id"
                    onChange={handleChange}
                    onClick={() => getDepartment()}
                    value={formData?.department_id}
                  >
                    <option>
                      {formData?.department ? formData?.department : "select"}
                    </option>
                    {department.map((dep) => (
                      <option value={Number(dep?.id)}>
                        {dep?.department_name}
                      </option>
                    ))}
                  </select>
                </Col>
                <Col lg="3" md="12" sm="12" className="mt-3">
                  <label>Specialist</label>
                  <br />
                  <select
                    style={{
                      width: "100%",
                      height: "30px",
                      border: "1px solid rgba(0,0,0,0.2)",
                      borderRadius: "3px",
                    }}
                    name="specialist"
                    onChange={handleChange}
                    onClick={() => {
                      getSpecialist();
                    }}
                    value={formData?.specialist}
                  >
                    <option>select</option>
                    {specialist.map((staff) => (
                      <option value={String(staff?.id)}>
                        {staff?.specialist_name}
                      </option>
                    ))}
                  </select>
                </Col>
              </Row>
              <br />
              <Row>
                <Col lg="3" md="12" sm="12">
                  <label>
                    First Name<span className="text-danger">*</span>
                  </label>
                  <br />
                  <input
                    style={{
                      width: "100%",
                      height: "30px",
                      border: "1px solid rgba(0,0,0,0.2)",
                      borderRadius: "3px",
                    }}
                    name="first_name"
                    onChange={handleChange}
                    value={formData?.first_name}
                  ></input>
                </Col>
                <Col lg="3" md="12" sm="12">
                  <label>Last Name</label>
                  <br />
                  <input
                    style={{
                      width: "100%",
                      height: "30px",
                      border: "1px solid rgba(0,0,0,0.2)",
                      borderRadius: "3px",
                    }}
                    name="surname"
                    onChange={handleChange}
                    value={formData?.surname}
                  ></input>
                </Col>

                <Col lg="3" md="12" sm="12">
                  <label>Father Name</label>
                  <br />
                  <input
                    style={{
                      width: "100%",
                      height: "30px",
                      border: "1px solid rgba(0,0,0,0.2)",
                      borderRadius: "3px",
                    }}
                    name="father_name"
                    onChange={handleChange}
                    value={formData?.father_name}
                  ></input>
                </Col>
                <Col lg="3" md="12" sm="12">
                  <label>Mother Name</label>
                  <br />
                  <input
                    style={{
                      width: "100%",
                      height: "30px",
                      border: "1px solid rgba(0,0,0,0.2)",
                      borderRadius: "3px",
                    }}
                    name="mother_name"
                    onChange={handleChange}
                    value={formData?.mother_name}
                  ></input>
                </Col>
              </Row>
              <br />
              <Row>
                <Col lg="3" md="12" sm="12">
                  <label>
                    Gender<span className="text-danger">*</span>
                  </label>
                  <br />
                  <select
                    style={{
                      width: "100%",
                      height: "30px",
                      border: "1px solid rgba(0,0,0,0.2)",
                      borderRadius: "3px",
                    }}
                    name="gender"
                    onChange={handleChange}
                    value={formData.gender}
                  >
                    <option>Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </Col>
                <Col lg="3" md="12" sm="12">
                  <label>
                    Marital Status<span className="text-danger">*</span>
                  </label>
                  <br />
                  <select
                    style={{
                      width: "100%",
                      height: "30px",
                      border: "1px solid rgba(0,0,0,0.2)",
                      borderRadius: "3px",
                    }}
                    name="marital_status"
                    onChange={handleChange}
                    value={formData?.marital_status}
                  >
                    <option>Select</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Widowed">Widowed</option>
                    <option value="Separated">Separated</option>
                    <option value="Not specified">Not Specified</option>
                  </select>
                </Col>
                <Col lg="3" md="12" sm="12">
                  <label>Blood Group</label>
                  <br />
                  <select
                    style={{
                      width: "100%",
                      height: "30px",
                      border: "1px solid rgba(0,0,0,0.2)",
                      borderRadius: "3px",
                    }}
                    name="blood_group"
                    onChange={handleChange}
                    onClick={() => getBloodgroup()}
                    value={formData?.blood_group}
                  >
                    <option>Select</option>
                    {bloodGroup.map((blood) => (
                      <option value={blood?.id}>{blood?.name}</option>
                    ))}
                  </select>
                </Col>
                <Col>
                  <label>
                    Date of Birth<span className="text-danger">*</span>
                  </label>
                  <br />
                  <input
                    type="date"
                    style={{
                      width: "100%",
                      height: "30px",
                      border: "1px solid rgba(0,0,0,0.2)",
                      borderRadius: "3px",
                    }}
                    name="dob"
                    onChange={handleChange}
                    value={formData?.dob}
                  ></input>
                </Col>
              </Row>
              <br />
              <Row>
                <Col lg="3" md="12" sm="12">
                  <label>Date of Joining</label>
                  <br />
                  <input
                    style={{
                      width: "100%",
                      height: "30px",
                      border: "1px solid rgba(0,0,0,0.2)",
                      borderRadius: "3px",
                    }}
                    type="date"
                    name="date_of_joining"
                    onChange={handleChange}
                    value={formData?.date_of_joining}
                  ></input>
                </Col>
                <Col lg="3" md="12" sm="12">
                  <label>
                    Phone<span className="text-danger">*</span>
                  </label>
                  <br />
                  <input
                    style={{
                      width: "100%",
                      height: "30px",
                      border: "1px solid rgba(0,0,0,0.2)",
                      borderRadius: "3px",
                    }}
                    name="contact_no"
                    onChange={handleChange}
                    value={formData?.contact_no}
                  ></input>
                </Col>
                <Col lg="3" md="12" sm="12">
                  <label>Emergency Contact</label>
                  <br />
                  <input
                    style={{
                      width: "100%",
                      height: "30px",
                      border: "1px solid rgba(0,0,0,0.2)",
                      borderRadius: "3px",
                    }}
                    name="emergency_contact_no"
                    onChange={handleChange}
                    value={formData?.emergency_contact_no}
                  ></input>
                </Col>
                <Col lg="3" md="12" sm="12">
                  <label>
                    Photo<span className="text-danger">*</span>
                  </label>
                  <br />
                  <input
                    type="file"
                    style={{
                      width: "100%",
                      height: "30px",
                      border: "1px solid rgba(0,0,0,0.2)",
                      borderRadius: "3px",
                    }}
                    name="image"
                    onChange={handleChange}
                    // value={formData?.image}
                  ></input>
                </Col>
              </Row>
              <br />
              <Row>
                <Col lg="3" md="12" sm="12">
                  <label>
                    Email<span className="text-danger">*</span>
                  </label>
                  <br />
                  <input
                    style={{
                      width: "100%",
                      height: "30px",
                      border: "1px solid rgba(0,0,0,0.2)",
                      borderRadius: "3px",
                    }}
                    name="email"
                    onChange={handleChange}
                    value={formData?.email}
                  ></input>
                </Col>
                <Col lg="3" md="12" sm="12">
                  <label>
                    Password<span className="text-danger">*</span>
                  </label>
                  <br />
                  <input
                    style={{
                      width: "100%",
                      height: "30px",
                      border: "1px solid rgba(0,0,0,0.2)",
                      borderRadius: "3px",
                    }}
                    name="password"
                    onChange={handleChange}
                    value={formData?.password}
                  ></input>
                </Col>
              </Row>
              {/* <Row>
                <Col lg="6" md="12" sm="12">
                  <label>Current Address</label>
                  <textarea
                    style={{
                      width: "100%",
                      height: "50px",
                      border: "1px solid grey",
                      borderRadius: "8px",
                    }}
                    name="local_address"
                    onChange={handleChange}
                    value={formData?.local_address}
                  ></textarea>
                </Col>
                <Col lg="6" md="12" sm="12">
                  <label>Permanent Address</label>
                  <textarea
                    style={{
                      width: "100%",
                      height: "50px",
                      border: "1px solid grey",
                      borderRadius: "8px",
                    }}
                    name="permanent_address"
                    onChange={handleChange}
                    value={formData?.permanent_address}
                  ></textarea>
                </Col>
              </Row> */}
              <br />
              <Row>
                <Col lg="3" md="12" sm="12">
                  <label>Qualification</label>
                  <br />
                  <textarea
                    style={{
                      width: "100%",
                      height: "50px",
                      border: "1px solid rgba(0,0,0,0.2)",
                      borderRadius: "3px",
                    }}
                    name="qualification"
                    onChange={handleChange}
                    value={formData?.qualification}
                  ></textarea>
                </Col>
                <Col lg="3" md="12" sm="12">
                  <label>Work Experience</label>
                  <br />
                  <textarea
                    style={{
                      width: "100%",
                      height: "50px",
                      border: "1px solid rgba(0,0,0,0.2)",
                      borderRadius: "3px",
                    }}
                    name="work_exp"
                    onChange={handleChange}
                    value={formData?.work_exp}
                  ></textarea>
                </Col>
                <Col lg="3" md="12" sm="12">
                  <label>Specialization</label>
                  <br />
                  <textarea
                    style={{
                      width: "100%",
                      height: "50px",
                      border: "1px solid rgba(0,0,0,0.2)",
                      borderRadius: "3px",
                    }}
                    name="specialization"
                    onChange={handleChange}
                    value={formData?.specialization}
                  ></textarea>
                </Col>
                <Col lg="3" md="12" sm="12">
                  <label>Note</label>
                  <br />
                  <textarea
                    style={{
                      width: "100%",
                      height: "50px",
                      border: "1px solid rgba(0,0,0,0.2)",
                      borderRadius: "3px",
                    }}
                    name="note"
                    onChange={handleChange}
                    value={formData?.note}
                  ></textarea>
                </Col>
              </Row>
              <br />
              <Row>
                <Col lg="3" md="12" sm="12">
                  <label>PAN Number</label>
                  <br />
                  <input
                    style={{
                      width: "100%",
                      height: "30px",
                      border: "1px solid rgba(0,0,0,0.2)",
                      borderRadius: "3px",
                    }}
                    name="pan_number"
                    onChange={handleChange}
                    value={formData?.pan_number}
                  ></input>
                </Col>
                <Col lg="3" md="12" sm="12">
                  <label>National Identification Number</label>
                  <br />
                  <input
                    style={{
                      width: "100%",
                      height: "30px",
                      border: "1px solid rgba(0,0,0,0.2)",
                      borderRadius: "3px",
                    }}
                    name="identification_number"
                    onChange={handleChange}
                    value={formData?.identification_number}
                  ></input>
                </Col>
                <Col lg="3" md="12" sm="12">
                  <label>Local Identification Number</label>
                  <br />
                  <input
                    style={{
                      width: "100%",
                      height: "30px",
                      border: "1px solid rgba(0,0,0,0.2)",
                      borderRadius: "3px",
                    }}
                    name="local_identification_number"
                    onChange={handleChange}
                    value={formData?.local_identification_number}
                  ></input>
                </Col>
                {/* <Col lg="3" md="12" sm="12">
                  <label>Reference Contact</label>
                  <br />
                  <input
                    style={{
                      width: "100%",
                      height: "30px",
                      border: "1px solid grey",
                      borderRadius: "8px",
                    }}
                  ></input>
                </Col> */}
              </Row>
              <br />
              <Row className="mt-3">
                <Col>
                  <div>
                    <h4>Add Other Details</h4>
                    <div
                      id="toggler"
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <Button color="primary" style={{ marginBottom: "1rem" }}>
                        <i className="fas fa-caret-down fa-lg"></i>
                      </Button>
                    </div>

                    <UncontrolledCollapse toggler="#toggler">
                      <Card>
                        <CardBody>
                          <div className="bg-primary bg-soft p-2">
                            <h5 className="mt-1 ms-1">Payroll</h5>
                          </div>
                          <Row className="mt-3">
                            <Col lg="4">
                              <label>EPF No</label>
                              <br />
                              <input
                                style={{
                                  width: "100%",
                                  height: "30px",
                                  border: "1px solid rgba(0,0,0,0.2)",
                                  borderRadius: "3px",
                                }}
                                name="epf_no"
                                onChange={handleChange}
                                value={formData?.epf_no}
                              ></input>
                            </Col>
                            <Col lg="4">
                              <label>Basic Salary</label>
                              <br />
                              <input
                                style={{
                                  width: "100%",
                                  height: "30px",
                                  border: "1px solid rgba(0,0,0,0.2)",
                                  borderRadius: "3px",
                                }}
                                name="basic_salary"
                                onChange={handleChange}
                                value={formData?.basic_salary}
                              ></input>
                            </Col>
                            <Col lg="4">
                              <label>Contract Type</label>
                              <br />
                              <select
                                style={{
                                  width: "100%",
                                  height: "30px",
                                  border: "1px solid rgba(0,0,0,0.2)",
                                  borderRadius: "3px",
                                }}
                                name="contract_type"
                                onChange={handleChange}
                                value={formData?.contract_type}
                              >
                                <option>Select</option>
                                <option value="permanent">Permanent</option>
                                <option value="probation">Probation</option>
                              </select>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col lg="4">
                              <label>Work Shift</label>
                              <br />
                              <input
                                style={{
                                  width: "100%",
                                  height: "30px",
                                  border: "1px solid rgba(0,0,0,0.2)",
                                  borderRadius: "3px",
                                }}
                                name="shift"
                                onChange={handleChange}
                                value={formData?.shift}
                              ></input>
                            </Col>
                            <Col lg="4">
                              <label>Work Location</label>
                              <br />
                              <input
                                style={{
                                  width: "100%",
                                  height: "30px",
                                  border: "1px solid rgba(0,0,0,0.2)",
                                  borderRadius: "3px",
                                }}
                                name="location"
                                value={formData?.location}
                                onChange={handleChange}
                              ></input>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <div className="bg-primary bg-soft p-2 mb-3">
                              <h5 className="mt-1 ms-2">Leaves</h5>
                            </div>
                            <Col lg="4">
                              <label>Summer Vacation</label>
                              <br />
                              <input
                                placeholder="Number of leaves"
                                style={{
                                  width: "100%",
                                  height: "30px",
                                  border: "1px solid rgba(0,0,0,0.2)",
                                  borderRadius: "3px",
                                }}
                              ></input>
                            </Col>
                          </Row>
                          <br />
                          {/* <Row> */}

                          <br />
                          <Row>
                            <div className="bg-primary bg-soft p-2 mb-3">
                              <h5 className="mt-1 ms-2">
                                Bank Account Details
                              </h5>
                            </div>
                            <Col lg="4">
                              <label>Account Title</label>
                              <br />
                              <input
                                style={{
                                  width: "100%",
                                  height: "30px",
                                  border: "1px solid rgba(0,0,0,0.2)",
                                  borderRadius: "3px",
                                }}
                                name="account_title"
                                onChange={handleChange}
                                value={formData?.account_title}
                              ></input>
                            </Col>

                            <Col lg="4">
                              <label>Bank Account No.</label>
                              <br />
                              <input
                                style={{
                                  width: "100%",
                                  height: "30px",
                                  border: "1px solid rgba(0,0,0,0.2)",
                                  borderRadius: "3px",
                                }}
                                name="bank_account_no"
                                onChange={handleChange}
                                value={formData?.bank_account_no}
                              ></input>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col lg="4">
                              <label>Account Name</label>
                              <br />
                              <input
                                style={{
                                  width: "100%",
                                  height: "30px",
                                  border: "1px solid rgba(0,0,0,0.2)",
                                  borderRadius: "3px",
                                }}
                                name="bank_name"
                                onChange={handleChange}
                                value={formData?.bank_name}
                              ></input>
                            </Col>
                            <Col lg="4">
                              <label>IFSC Code</label>
                              <br />
                              <input
                                style={{
                                  width: "100%",
                                  height: "30px",
                                  border: "1px solid rgba(0,0,0,0.2)",
                                  borderRadius: "3px",
                                }}
                                name="ifsc_code"
                                onChange={handleChange}
                                value={formData?.ifsc_code}
                              ></input>
                            </Col>
                            <Col lg="4">
                              <label>Bank Branch Name</label>
                              <br />
                              <input
                                style={{
                                  width: "100%",
                                  height: "30px",
                                  border: "1px solid rgba(0,0,0,0.2)",
                                  borderRadius: "3px",
                                }}
                                name="bank_branch"
                                onChange={handleChange}
                                value={formData?.bank_branch}
                              ></input>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <div className="bg-primary bg-soft p-2 mb-3">
                              <h5 className="mt-1">Social Media Link</h5>
                            </div>
                            <Col lg="6">
                              <label>Facebook URL</label>
                              <br />
                              <input
                                style={{
                                  width: "100%",
                                  height: "30px",
                                  border: "1px solid rgba(0,0,0,0.2)",
                                  borderRadius: "3px",
                                }}
                                name="facebook"
                                onChange={handleChange}
                                value={formData?.facebook}
                              ></input>
                            </Col>
                            <Col lg="6">
                              <label>Twitter URL</label>
                              <br />
                              <input
                                style={{
                                  width: "100%",
                                  height: "30px",
                                  border: "1px solid rgba(0,0,0,0.2)",
                                  borderRadius: "3px",
                                }}
                                name="twitter"
                                onChange={handleChange}
                                value={formData?.twitter}
                              ></input>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col lg="6">
                              <label>Linkedin URL</label>
                              <br />
                              <input
                                style={{
                                  width: "100%",
                                  height: "30px",
                                  border: "1px solid rgba(0,0,0,0.2)",
                                  borderRadius: "3px",
                                }}
                                name="linkedin"
                                onChange={handleChange}
                                value={formData?.linkedin}
                              ></input>
                            </Col>
                            <Col lg="6">
                              <label>Instagram URL</label>
                              <br />
                              <input
                                style={{
                                  width: "100%",
                                  height: "30px",
                                  border: "1px solid rgba(0,0,0,0.2)",
                                  borderRadius: "3px",
                                }}
                                name="instagram"
                                onChange={handleChange}
                                value={formData?.instagram}
                              ></input>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <div className="bg-primary bg-soft  p-2 mb-3">
                              <h5 className="mt-1">Upload Documents</h5>
                            </div>
                            <Col lg="4">
                              <p>1. Resume</p>
                              <input
                                type="file"
                                name="resume"
                                onChange={handleChange}
                              ></input>
                            </Col>
                            <Col lg="4">
                              <p>3.Joining Letter</p>
                              <input
                                type="file"
                                name="joining_letter"
                                onChange={handleChange}
                              ></input>
                            </Col>
                            <Col lg="4">
                              <p>3.Resignation Letter</p>
                              <input
                                type="file"
                                name="resignation_letter"
                                onChange={handleChange}
                              ></input>
                            </Col>
                            <Col lg="4">
                              <p>4.Other Documents</p>
                              <input
                                name="other_document_file"
                                onChange={handleChange}
                                type="file"
                              ></input>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <div>
                              <div className="bg-primary bg-soft p-2 mb-3">
                                <h5 className="mt-1">Certificates</h5>
                              </div>
                              {certificates.map((certificate) => (
                                <div key={certificate.id}>
                                  <div>
                                    <br />
                                    <input
                                      name="certificates"
                                      onChange={handleChange}
                                      type="file"
                                      onChange={(event) =>
                                        onChange(certificate.id, event)
                                      }
                                      // value={formData?.cirt}
                                    />
                                  </div>
                                </div>
                              ))}
                              <br />
                              <button
                                onClick={addCertificate}
                                className="btn btn-primary btn-sm"
                              >
                                Add Certificate
                              </button>
                              {/* <button onClick={handleSubmit} className="btn btn-success btn-sm ms-2">Submit</button> */}
                            </div>
                          </Row>
                        </CardBody>
                      </Card>
                      <div className="d-flex justify-content-end">
                        {staff ? (
                          <button
                            className="btn text-white fw-bold"
                            style={{ backgroundColor: "#6070FF" }}
                            onClick={handleUpdate}
                          >
                            Saves
                          </button>
                        ) : (
                          <button
                            className="btn text-white fw-bold"
                            style={{ backgroundColor: "#6070FF" }}
                            onClick={handleSubmit}
                          >
                            Save
                          </button>
                        )}
                      </div>
                    </UncontrolledCollapse>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withTranslation()(AddStaff);
