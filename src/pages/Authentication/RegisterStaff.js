import PropTypes, { number } from "prop-types";
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
import * as yup from "yup";
import { useFormik } from "formik";
import { Buffer } from "buffer";
//redux

const RegisterStaff = () => {
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
  const [fileData, setFiledata] = useState();
  const [bufferData, setbufferData] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [newBuffer, setNewbuffer] = useState();
  const [imgFile, setImagefile] = useState();
  const [certFile, setCertfile] = useState();
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
        specialist: staff?.specialist,
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
        specialist: [],
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

  const validationSchema = yup.object().shape({
    contact_no: yup
      .string()
      .matches(/^[0-9]+$/, "Phone number must contain only digits")
      .min(10, "Phone number must be at least 10 digits")
      .max(10, "Phone number must not exceed 10 digits")
      .required("Phone number is required *"),
    email: yup.string().email("Invalid email").required("Email is required *"),
    employee_id: yup.string().required("Staff ID is required *"),
    first_name: yup.string().required("First Name is required *"),
    marital_status: yup.string().required("Marital status is required *"),
    dob: yup.string().required("Date of Birth is required *"),
    image: yup.string().required("Photo is required *"),
    password: yup.string().required("Password is required *"),
    role_id: yup.string().required("Role is required *"),
    pan_number: yup
      .string()
      .matches(/^[A-Za-z]{5}[0-9]{4}[A-Za-z]$/, "Invalid PAN number")
      .required("Pan Number is required *"),
    identification_number: yup
      .string()
      .matches(/^[0-9]+$/, "Identification number must contain only digits")
      .min(12, "Identification number must be at least 12 digits")
      .required("Identification number is required *"),
  });

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
    if (imgFile && certFile) {
      console.log(imgFile, certFile, "both getting");
      const formDataImg = new FormData();
      formDataImg.append("file", imgFile);
      const fileImgUpload = await api.postFiles(formDataImg);
      console.log(fileImgUpload, "fileImgUpload");

      const formDataCert = new FormData();
      formDataCert.append("file", certFile);
      const fileCertUpload = await api.postFiles(formDataCert);
      console.log(fileCertUpload, "fileCertUpload");

      const selectedFiles = certificates.map((cert) => ({
        fileName: fileCertUpload.data.data,
        fileType: fileCertUpload.data.data,
        date: new Date().toISOString().split("T")[0],
      }));

      console.log(newBuffer, "newbufferinside");

      console.log(" ", selectedFiles);
      const datas = {
        ...formData,
        name: `${formData?.first_name}`,
        certificates: selectedFiles,
        other_document_name: formData?.other_document_file,
        image: fileImgUpload.data.data,
        // image: selectedImages
      };
      console.log(datas, "all datas getting");
      const response = await api?.postHRmainModuleHr_Staff(datas);
      console.log(response, "consoling");
      const { data } = response;
      console.log(data, "consoling");
      history.push("/hr");
    } else {
      console.log("both empty");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, typeof value, "both");
    try {
      if (name === "image") {
        console.log("entering");
        const img_file = e.target.files[0];
        console.log(img_file, "image file");
        setImagefile(img_file);
      } else if (name === "certificates") {
        const cert_file = e.target.files[0];
        console.log(cert_file, "cert file");
        setCertfile(cert_file);

        console.log("not working");
      } else if (name === "specialist") {
        setFormData({
          ...formData,
          specialist: JSON.stringify([parseInt(value)]),
        });
      } else {
        console.log("here");
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    } catch {
      console.log("its not coming");
    }
  };

  // const modifiedBuffer = () => {
  //   const bufferString = JSON.stringify({
  //     buffer: "<Buffer " + Array.from(bufferData).map(byte => byte.toString(16).padStart(2, '0')).join(' ') + ">",
  //   });

  //   const afterbuffer = JSON.parse(bufferString).buffer

  //   setNewbuffer(afterbuffer)
  // }

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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: formData,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });
  const history2 = useHistory();
  const toogle2 = () => {
    history2.push("/account/login");
  };

  return (
    <React.Fragment>
      <div
        className="page-content cust-div"
      >
        <Container fluid style={{ width: '80%' }}>
          {/* Render Breadcrumb */}

          {/* <span
            className=" btn-mod  "
            title="back"
            onClick={toogle2}
            style={{
              position: "absolute",
              right: "4%",
              top: "7%",
              cursor: "pointer",
            }}
          ></span> */}
          <div className="bg bg-primary p-4">
            <h4 className="text-white">Add New Staff</h4>
          </div>
          {/* < onSubmit={formik.handleSubmit}> */}
          <Card className="addstaff-text-label ">
            <CardBody>
              <p className="text-danger d-flex justify-content-end fw-bold">
                Fill All the Mandatoty Details (*)
              </p>
              <Row>
                {/* <Col lg="3">
                  <label>
                    Staff ID<span className="text-danger"> *</span>
                  </label>
                  <br />
                  <input
                    placeholder=""
                    name="employee_id"
                    style={{
                      width: "100%",
                      height: "40px",
                      border: "1px solid #8F98B3",
                      borderRadius: "8px",
                    }}
                    onChange={handleChange}
                    value={formData?.employee_id} */}
                {/* // onBlur={formik.handleBlur}
                  ></input> */}
                {/* {formik.touched.employee_id && formik.errors.employee_id ? (
                    <div className="text-danger">
                      {formik.errors.employee_id}
                    </div>
                  ) : null} */}
                {/* </Col> */}
                <Col lg="4" md="4" sm="12">
                  <label>
                    Role<span className="text-danger"> *</span>
                  </label>
                  <br />
                  <select
                    style={{
                      width: "100%",
                      height: "40px",
                      border: "1px solid #8F98B3",
                      borderRadius: "8px",
                    }}
                    name="role_id"
                    onChange={handleChange}
                    onClick={() => getStaffs()}
                    value={formData?.role_id}
                    // onBlur={formik.handleBlur}
                  >
                    <option>
                      {formData?.role ? formData?.role : "select"}
                    </option>
                    {staffRole.map((role) => (
                      <option value={Number(role?.id)}>{role?.name}</option>
                    ))}
                  </select>
                  {/* {formik.touched.role_id && formik.errors.role_id ? (
                    <div className="text-danger">{formik.errors.role_id}</div>
                  ) : null} */}
                </Col>
                <Col lg="4" md="4" sm="12">
                  <label>
                    Designation<span className="text-danger"> *</span>
                  </label>
                  <br />
                  <select
                    style={{
                      width: "100%",
                      height: "40px",
                      border: "1px solid #8F98B3",
                      borderRadius: "8px",
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
                <Col lg="4" md="4" sm="12">
                  <label>
                    Department<span className="text-danger"> *</span>
                  </label>
                  <br />
                  <select
                    style={{
                      width: "100%",
                      height: "40px",
                      border: "1px solid #8F98B3",
                      borderRadius: "8px",
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
              </Row>
              <br />
              <Row>
                {" "}
                <Col lg="4" md="4" sm="12" className=" ">
                  <label>
                    Specialist<span className="text-danger"> *</span>
                  </label>
                  <br />
                  <select
                    style={{
                      width: "100%",
                      height: "40px",
                      border: "1px solid #8F98B3",
                      borderRadius: "8px",
                    }}
                    name="specialist"
                    onChange={handleChange}
                    value={formData.specialist} // Ensure formData.specialist is set to an empty string initially
                  >
                    <option value="">select</option>
                    {specialist.map((staff) => (
                      <option key={staff.id} value={String(staff.id)}>
                        {staff.specialist_name}
                      </option>
                    ))}
                  </select>
                </Col>
                <Col lg="4" md="4" sm="12">
                  <label>
                    First Name<span className="text-danger"> *</span>
                  </label>
                  <br />
                  <input
                    style={{
                      width: "100%",
                      height: "40px",
                      border: "1px solid #8F98B3",
                      borderRadius: "8px",
                    }}
                    name="first_name"
                    onChange={handleChange}
                    value={formData?.first_name}
                  ></input>
                  {/* {formik.touched.first_name && formik.errors.first_name ? (
                    <div className="text-danger">
                      {formik.errors.first_name}
                    </div>
                  ) : null} */}
                </Col>
                <Col lg="4" md="4" sm="12">
                  <label>
                    Last Name<span className="text-danger"> *</span>
                  </label>
                  <br />
                  <input
                    style={{
                      width: "100%",
                      height: "40px",
                      border: "1px solid #8F98B3",
                      borderRadius: "8px",
                    }}
                    name="surname"
                    onChange={handleChange}
                    value={formData?.surname}
                  ></input>
                </Col>
                {/* <Col lg="3" md="12" sm="12">
                  <label>Password<span className="text-danger"> *</span></label>
                  <br />
                  <input
                    style={{
                      width: "100%",
                      height: "40px",
                      border: "1px solid #8F98B3",
                      borderRadius: "8px",
                    }}
                    name="password"
                    onChange={handleChange}
                    value={formData?.password}
                  ></input>
                </Col> */}
              </Row>
              <br />
              <Row>
                {" "}
                <Col lg="4" md="4" sm="12">
                  <label>
                    Father Name<span className="text-danger"> *</span>
                  </label>
                  <br />
                  <input
                    style={{
                      width: "100%",
                      height: "40px",
                      border: "1px solid #8F98B3",
                      borderRadius: "8px",
                    }}
                    name="father_name"
                    onChange={handleChange}
                    value={formData?.father_name}
                    // onBlur={formik.handleBlur}
                  ></input>
                </Col>
                <Col lg="4" md="4" sm="12">
                  <label>
                    Mother Name<span className="text-danger"> *</span>
                  </label>
                  <br />
                  <input
                    style={{
                      width: "100%",
                      height: "40px",
                      border: "1px solid #8F98B3",
                      borderRadius: "8px",
                    }}
                    name="mother_name"
                    onChange={handleChange}
                    value={formData?.mother_name}
                  ></input>
                </Col>
                <Col lg="4" md="4" sm="12">
                  <label>
                    Gender<span className="text-danger"> *</span>
                  </label>
                  <br />
                  <select
                    style={{
                      width: "100%",
                      height: "40px",
                      border: "1px solid #8F98B3",
                      borderRadius: "8px",
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
              </Row>
              <br />
              <Row>
                <Col lg="4" md="4" sm="12">
                  <label>
                    Marital Status<span className="text-danger"> *</span>
                  </label>
                  <br />
                  <select
                    style={{
                      width: "100%",
                      height: "40px",
                      border: "1px solid #8F98B3",
                      borderRadius: "8px",
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
                <Col lg="4" md="4" sm="12">
                  <label>
                    Blood Group<span className="text-danger"> *</span>
                  </label>
                  <br />
                  <select
                    style={{
                      width: "100%",
                      height: "40px",
                      border: "1px solid #8F98B3",
                      borderRadius: "8px",
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
                <Col lg="4" md="4" sm="12">
                  <label>
                    Date of Birth<span className="text-danger"> *</span>
                  </label>
                  <br />
                  <input
                    type="date"
                    style={{
                      width: "100%",
                      height: "40px",
                      border: "1px solid #8F98B3",
                      borderRadius: "8px",
                    }}
                    name="dob"
                    onChange={handleChange}
                    value={formData?.dob}
                  ></input>
                </Col>
              </Row>{" "}
              <br />
              <Row>
                <Col lg="4" md="4" sm="12">
                  <label>
                    Date of Joining<span className="text-danger"> *</span>
                  </label>
                  <br />
                  <input
                    style={{
                      width: "100%",
                      height: "40px",
                      border: "1px solid #8F98B3",
                      borderRadius: "8px",
                    }}
                    type="date"
                    name="date_of_joining"
                    onChange={handleChange}
                    value={formData?.date_of_joining}
                  ></input>
                </Col>
                <Col lg="4" md="4" sm="12">
                  <label>
                    Phone<span className="text-danger"> *</span>
                  </label>
                  <br />
                  <input
                    style={{
                      width: "100%",
                      height: "40px",
                      border: "1px solid #8F98B3",
                      borderRadius: "8px",
                    }}
                    type="tel"
                    name="contact_no"
                    value={formik.values.contact_no}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    maxLength={10}
                    className={`form-control ${
                      formik.touched.contact_no && formik.errors.contact_no
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                  {formik.touched.contact_no && formik.errors.contact_no ? (
                    <div className="text-danger ">
                      {formik.errors.contact_no}
                    </div>
                  ) : null}
                </Col>
                <Col lg="4" md="4" sm="12" className="">
                  <label>
                    Emergency Contact<span className="text-danger"> *</span>
                  </label>
                  <br />
                  <input
                    style={{
                      width: "100%",
                      height: "40px",
                      border: "1px solid #8F98B3",
                      borderRadius: "8px",
                    }}
                    name="emergency_contact_no"
                    onChange={handleChange}
                    value={formData?.emergency_contact_no}
                  ></input>
                </Col>
              </Row>
              <br />
              <Row>
                <Col lg="4" md="4" sm="12">
                  <label>
                    Email<span className="text-danger"> *</span>
                  </label>
                  <br />
                  <input
                    style={{
                      width: "100%",
                      height: "40px",
                      border: "1px solid #8F98B3",
                      borderRadius: "8px",
                    }}
                    type="email"
                    id="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`form-control ${
                      formik.touched.email && formik.errors.email
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-danger">{formik.errors.email}</div>
                  ) : null}
                </Col>
                <Col lg="4" md="4" sm="12" className="">
                  <label>
                    Password<span className="text-danger"> *</span>
                  </label>
                  <br />
                  <div style={{ position: "relative" }}>
                    <input
                      style={{
                        width: "100%",
                        height: "40px",
                        border: "1px solid #8F98B3",
                        borderRadius: "8px",
                        paddingRight: "40px",
                      }}
                      name="password"
                      onChange={handleChange}
                      value={formData.password}
                      type={showPassword ? "text" : "password"}
                    />
                    <button
                      type="button"
                      style={{
                        position: "absolute",
                        right: "0px",
                        top: "0px",
                        border: "none",
                        background: "none",
                        cursor: "pointer",
                        color: "grey",
                      }}
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <i class="fas fa-eye-slash"></i>
                      ) : (
                        <i class="fas fa-eye"></i>
                      )}
                    </button>
                  </div>
                </Col>
                <Col lg="4" md="4" sm="12" className="">
                  <label>
                    Photo<span className="text-danger"> *</span>
                  </label>
                  <br />
                  <input
                    type="file"
                    style={{
                      width: "100%",
                      height: "40px",
                      border: "1px solid #8F98B3",
                      borderRadius: "8px",
                    }}
                    name="image"
                    onChange={handleChange}
                    // value={formData?.image}
                  ></input>
                </Col>
              </Row>
              <br />
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
              <Row>
                <Col lg="4" md="4" sm="12">
                  <label>
                    Qualification<span className="text-danger"> *</span>
                  </label>
                  <br />
                  <textarea
                    style={{
                      width: "100%",
                      height: "40px",
                      border: "1px solid #8F98B3",
                      borderRadius: "8px",
                    }}
                    name="qualification"
                    onChange={handleChange}
                    value={formData?.qualification}
                  ></textarea>
                </Col>
                <Col lg="4" md="4" sm="12">
                  <label>
                    Work Experience<span className="text-danger"> *</span>
                  </label>
                  <br />
                  <textarea
                    style={{
                      width: "100%",
                      height: "40px",
                      border: "1px solid #8F98B3",
                      borderRadius: "8px",
                    }}
                    name="work_exp"
                    onChange={handleChange}
                    value={formData?.work_exp}
                  ></textarea>
                </Col>
                <Col lg="4" md="4" sm="12">
                  <label>
                    Specialization<span className="text-danger"> *</span>
                  </label>
                  <br />
                  <textarea
                    style={{
                      width: "100%",
                      height: "40px",
                      border: "1px solid #8F98B3",
                      borderRadius: "8px",
                    }}
                    name="specialization"
                    onChange={handleChange}
                    value={formData?.specialization}
                  ></textarea>
                </Col>
              </Row>
              <br />
              <Row>
                <Col lg="3" md="3" sm="12">
                  <label>
                    Note<span className="text-danger"> *</span>
                  </label>
                  <br />
                  <textarea
                    style={{
                      width: "100%",
                      height: "40px",
                      border: "1px solid #8F98B3",
                      borderRadius: "8px",
                    }}
                    name="note"
                    onChange={handleChange}
                    value={formData?.note}
                  ></textarea>
                </Col>
                <Col lg="3" md="3" sm="12">
                  <label>
                    PAN Number<span className="text-danger"> *</span>
                  </label>
                  <br />
                  <input
                    style={{
                      width: "100%",
                      height: "40px",
                      border: "1px solid #8F98B3",
                      borderRadius: "8px",
                    }}
                    name="pan_number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.pan_number}
                    className={`form-control ${
                      formik.touched.pan_number && formik.errors.pan_number
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                  {formik.touched.pan_number && formik.errors.pan_number && (
                    <div className="text-danger">
                      {formik.errors.pan_number}
                    </div>
                  )}
                </Col>
                <Col lg="3" md="3" sm="12">
                  <label>
                    National Identification Number
                    <span className="text-danger"> *</span>
                  </label>
                  <br />
                  <input
                    style={{
                      width: "100%",
                      height: "40px",
                      border: "1px solid #8F98B3 ",
                      borderRadius: "8px",
                    }}
                    name="identification_number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    maxLength={12}
                    value={formik.values.identification_number}
                    className={`form-control ${
                      formik.touched.identification_number &&
                      formik.errors.identification_number
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                  {formik.touched.identification_number &&
                    formik.errors.identification_number && (
                      <div className="text-danger">
                        {formik.errors.identification_number}
                      </div>
                    )}
                </Col>
                <Col lg="3" md="3" sm="12">
                  <label>
                    Local Identification Number
                    <span className="text-danger"> *</span>
                  </label>
                  <br />
                  <input
                    style={{
                      width: "100%",
                      height: "40px",
                      border: "1px solid #8F98B3",
                      borderRadius: "8px",
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
                      height: "40px",
                      border: "1px solid grey",
                      borderRadius: "8px",
                    }}
                  ></input>
                </Col> */}
                <div className="d-flex justify-content-end mt-4">
                  {staff ? (
                    <button
                      type="submit"
                      className="btn text-white fw-bold"
                      style={{
                        backgroundColor: "#6070FF",
                        paddingInline: "50px",
                      }}
                      onClick={handleUpdate}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="btn text-white fw-bold"
                      style={{
                        backgroundColor: "#6070FF",
                        paddingInline: "30px",
                      }}
                      onClick={handleSubmit}
                    >
                      Save
                    </button>
                  )}
                </div>
              </Row>
              <br />
              {/* <Row className="mt-3">
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
                                  height: "40px",
                                  border: "1px solid #8F98B3",
                                  borderRadius: "8px",
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
                                  height: "40px",
                                  border: "1px solid #8F98B3",
                                  borderRadius: "8px",
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
                                  height: "40px",
                                  border: "1px solid #8F98B3",
                                  borderRadius: "8px",
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
                                  height: "40px",
                                  border: "1px solid #8F98B3",
                                  borderRadius: "8px",
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
                                  height: "40px",
                                  border: "1px solid #8F98B3",
                                  borderRadius: "8px",
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
                                  height: "40px",
                                  border: "1px solid #8F98B3",
                                  borderRadius: "8px",
                                }}
                              ></input>
                            </Col>
                          </Row>
                          <br />
                          {/* <Row> */}
              {/* <br />
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
                                  height: "40px",
                                  border: "1px solid #8F98B3",
                                  borderRadius: "8px",
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
                                  height: "40px",
                                  border: "1px solid #8F98B3",
                                  borderRadius: "8px",
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
                                  height: "40px",
                                  border: "1px solid #8F98B3",
                                  borderRadius: "8px",
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
                                  height: "40px",
                                  border: "1px solid #8F98B3",
                                  borderRadius: "8px",
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
                                  height: "40px",
                                  border: "1px solid #8F98B3",
                                  borderRadius: "8px",
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
                                  height: "40px",
                                  border: "1px solid #8F98B3",
                                  borderRadius: "8px",
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
                                  height: "40px",
                                  border: "1px solid #8F98B3",
                                  borderRadius: "8px",
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
                                  height: "40px",
                                  border: "1px solid #8F98B3",
                                  borderRadius: "8px",
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
                                  height: "40px",
                                  border: "1px solid #8F98B3",
                                  borderRadius: "8px",
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
                                <h5 className="mt-1">
                                  Certificates{" "}
                                  <span className="text-danger">*</span>
                                </h5>
                              </div>
                              {certificates.map((certificate) => (
                                <div key={certificate.id}>
                                  <div>
                                    <br />
                                    <input
                                      name="certificates"
                                      onChange={handleChange}
                                      type="file" */}
              {/* // onChange={(event) => */}
              {/* //   onChange(certificate.id, event)
                                      // }
                                      // value={formData?.cirt}
                                    />
                                  </div>
                                </div>
                              ))}
                              <br /> */}
              {/* <button
                                onClick={addCertificate}
                                className="btn btn-primary btn-sm"
                              >
                                Add Certificate
                              </button>
                              {/* <button onClick={handleSubmit} className="btn btn-success btn-sm ms-2">Submit</button> */}
              {/* </Row> */}
              {/* </CardBody>
                      </Card>
                      <div className="d-flex justify-content-end">
                        {staff ? (
                          <button
                            type="submit"
                            className="btn text-white fw-bold"
                            style={{ backgroundColor: "#6070FF" }}
                            onClick={handleUpdate}
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            type="submit"
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
              </Row> */}
            </CardBody>
          </Card>
          {/* </> */}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withTranslation()(RegisterStaff);
