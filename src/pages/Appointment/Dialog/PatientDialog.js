import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import { Input, Select } from "@material-ui/core";
import { Row, Col } from "reactstrap";
import { useEffect } from "react";
import api from "services/Api";
import { useState } from "react";
// import { Formik } from "formik"
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as yup from "yup";

export default function PatientDialog({ open, handleClose, getAllPatient }) {
  const [bloodgroupData, setBloodgroupData] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    handleBloodgroups();
  }, []);

  const [isDateSelected, setIsDateSelected] = useState(false);

  const getCurrentDateTime = () => {
    const currentDate = new Date();
    return `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${currentDate
      .getDate()
      .toString()
      .padStart(2, "0")} ${currentDate
      .getHours()
      .toString()
      .padStart(2, "0")}:${currentDate
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${currentDate
      .getSeconds()
      .toString()
      .padStart(2, "0")}`;
  };

  const validationSchema = yup.object().shape({
    mobileno: yup
      .string()
      .matches(/^[0-9]+$/, "Phone number must contain only digits")
      .min(10, "Phone number must be at least 10 digits")
      .required("Phone number is required *"),
    email: yup.string().email("Invalid email").required("Email is required *"),
  });

  const [formValues, setFormValues] = useState({
    patient_name: "",
    guardian_name: "",
    day: "",
    image: "",
    gender: "Male",
    dob: "",
    age: "",
    is_ipd: "",
    is_opd: "",
    patient_type: "",
    app_key: "",
    is_dead: "no",
    is_active: "yes",
    created_at: getCurrentDateTime(),
    blood_group: "",
    marital_status: "single",
    mobileno: "",
    month: "",
    email: "",
    address: "",
    note: "",
    known_allergies: "",
    insurence_id: "",
    insurence_validity: "",
    identification_number: "",
    ABHA_number: "",
  });

  const handleBloodgroups = async () => {
    const response = await api.getBloodgroups();
    const { data } = response;
    setBloodgroupData(data);
    console.log(data, "data");
  };

  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    const formattedDateTime = formatDateTime(formValues.insurence_validity);
    const updatedFormValues = {
      ...formValues,
      insurence_validity: formattedDateTime,
      created_at: getCurrentDateTime(),
    };

    try {
      const response = await api.postPatients(updatedFormValues);

      setFormSubmitted(true);
      setFormValues({});
      getAllPatient();
      handleClose();
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const formatDateTime = (dateTimeString) => {
    const dateObject = new Date(dateTimeString);
    return `${dateObject.getFullYear()}-${(dateObject.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${dateObject
      .getDate()
      .toString()
      .padStart(2, "0")} ${dateObject
      .getHours()
      .toString()
      .padStart(2, "0")}:${dateObject
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${dateObject
      .getSeconds()
      .toString()
      .padStart(2, "0")}`;
  };

  const handledobChange = (event) => {
    const { name, value } = event.target;

    if (name === "dob") {
      const currentDate = new Date();
      const selectedDate = new Date(value);

      let age = currentDate.getFullYear() - selectedDate.getFullYear();
      const monthDiff = currentDate.getMonth() - selectedDate.getMonth();
      const dayDiff = currentDate.getDate() - selectedDate.getDate();

      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
      }

      // Calculate the absolute difference in months and days
      const absMonthDiff = Math.abs(monthDiff);
      const absDayDiff = Math.abs(dayDiff);

      // Handle the special case when the age is -1
      if (age === -1) {
        setFormValues((prevValues) => ({
          ...prevValues,
          age: "0",
          month: "0",
          day: "0",
          dob: value,
        }));
      } else {
        setFormValues((prevValues) => ({
          ...prevValues,
          age: age.toString(),
          month: absMonthDiff.toString(),
          day: absDayDiff.toString(),
          dob: value,
        }));
      }

      setIsDateSelected(true); // Set isDateSelected to true
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  const formik = useFormik({
    initialValues: formValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div>
      <form>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          sx={{
            "& .MuiDialog-container": {
              "& .MuiPaper-root": {
                width: "100%",
                maxWidth: "1200px", // Set your width here
              },
            },
          }}
        >
          <DialogTitle
            id="alert-dialog-title"
            className="text-white fw-bold"
            style={{ backgroundColor: "#6070FF" }}
          >
            Add Patient
          </DialogTitle>
          <DialogContent className="mt-4 ms-2">
            <Row>
              <Col lg="6" md="6" sm="12">
                <label>
                  Name <span className="text-danger">*</span>
                </label>
                <br />
                <input
                  type="text"
                  name="patient_name"
                  placeholder=""
                  style={{
                    width: "100%",
                    height: "35px",
                    borderRadius: "3px",
                    border: "1px solid rgba(0,0,0,0.2)",
                  }}
                  value={formValues.patient_name}
                  onChange={handleChange}
                  //   onChange={formik.handleChange}
                  // value={formik.values.name}
                ></input>
              </Col>
              <Col lg="6" md="6" sm="12">
                <label>Guardian Name</label>
                <br />
                <input
                  type="text"
                  name="guardian_name"
                  value={formValues.guardian_name}
                  onChange={handleChange}
                  //   onChange={formik.handleChange}
                  // value={formik.values.guardian_name}
                  placeholder=""
                  style={{
                    width: "100%",
                    height: "35px",
                    borderRadius: "3px",
                    border: "1px solid rgba(0,0,0,0.2)",
                  }}
                ></input>
              </Col>
            </Row>
            <br />
            <Row>
              <Col lg="6" md="6" sm="12">
                <label>Gender</label>
                <br />
                <select
                  style={{
                    width: "100%",
                    height: "35px",
                    borderRadius: "3px",
                    border: "1px solid rgba(0,0,0,0.2)",
                  }}
                  name="gender"
                  value={formValues.gender}
                  onChange={handleChange}
                  // onChange={formik.handleChange}
                  // value={formik.values.gender}
                >
                  <option>select</option>
                  <option value="Male">Male</option>
                  <option valeu="Female">Female</option>
                  <option value="Transgeder">Transgender</option>
                </select>
              </Col>
              <Col lg="6" md="6" sm="12">
                <label>Date of Birth</label>
                <br />
                <input
                  type="date"
                  name="dob"
                  value={formValues.dob}
                  onChange={handledobChange}
                  //   onChange={formik.handleChange}
                  // value={formik.values.dob}
                  style={{
                    width: "100%",
                    height: "35px",
                    borderRadius: "3px",
                    border: "1px solid rgba(0,0,0,0.2)",
                  }}
                ></input>
              </Col>
            </Row>
            <br />
            <Row>
              <Col lg="6" md="6" sm="12">
                <label>
                  Age <span className="text-danger">*</span>
                </label>
                <br />
                {isDateSelected ? (
                  <>
                    <input
                      name="age"
                      value={formValues.age}
                      onChange={handledobChange}
                      style={{
                        width: "80px",
                        height: "35px",
                        borderRadius: "3px",
                        border: "1px solid rgba(0,0,0,0.2)",
                      }}
                    />
                    <input
                      name="month"
                      value={formValues.month}
                      onChange={handledobChange}
                      style={{
                        width: "80px",
                        height: "35px",
                        borderRadius: "3px",
                        border: "1px solid rgba(0,0,0,0.2)",
                      }}
                      className="ms-3"
                    />
                    <input
                      name="day"
                      value={formValues.day}
                      onChange={handledobChange}
                      style={{
                        width: "80px",
                        height: "35px",
                        borderRadius: "3px",
                        border: "1px solid rgba(0,0,0,0.2)",
                      }}
                      className="ms-3"
                    />
                  </>
                ) : (
                  <span>Date not selected</span>
                )}
                <br />
              </Col>
              {/* <Row>
           

            </Row> */}

              <Col lg="6" md="6" sm="12">
                <label>Blood Group</label>
                <br />
                <select
                  style={{
                    width: "100%",
                    height: "35px",
                    borderRadius: "3px",
                    border: "1px solid rgba(0,0,0,0.2)",
                  }}
                  name="blood_group"
                  value={formValues.blood_group}
                  onChange={handleChange}
                  //  onChange={formik.handleChange}
                  //  value={formik.values.bloodgroup}
                >
                  <option>Select an field</option>
                  {bloodgroupData &&
                    bloodgroupData.map((bloodgroup) => (
                      <option key={bloodgroup.name} value={bloodgroup.name}>
                        {bloodgroup.name}
                      </option>
                    ))}
                </select>
              </Col>
            </Row>
            <br />
            <Row>
              <Col lg="6" md="6" sm="12">
                <label>Marital Status</label>
                <select
                  style={{
                    width: "100%",
                    height: "35px",
                    borderRadius: "3px",
                    border: "1px solid rgba(0,0,0,0.2)",
                  }}
                  name="marital_status"
                  value={formValues.marital_status}
                  onChange={handleChange}
                  //  onChange={formik.handleChange}
                  //  value={formik.values.gender}
                >
                  <option>select</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="widowed">Widowed</option>
                  <option value="seperated">Separated</option>
                  <option value="not_specified">Not Specified</option>
                </select>
              </Col>
              <Col lg="6" md="6" sm="12">
                <label style={{ width: "100%", borderRadius: "5px" }}>
                  Patient Photo
                </label>
                <input type="file" name="image" placeholder=""></input>
              </Col>
            </Row>
            <br />
            <Row>
              <Col lg="6" md="6" sm="12">
                <label>Phone</label>
                <br />
                <input
                  type="number"
                  name="mobileno"
                  value={formik.values.mobileno}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder=""
                  style={{
                    width: "100%",
                    height: "35px",
                    borderRadius: "3px",
                    border: "1px solid rgba(0,0,0,0.2)",
                  }}
                />
                {formik.touched.mobileno && formik.errors.mobileno ? (
                  <div className="text-danger">{formik.errors.mobileno}</div>
                ) : null}
              </Col>
              <Col lg="6" md="6" sm="12">
                <label>Email</label>
                <br />
                <input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder=""
                  style={{
                    width: "100%",
                    height: "35px",
                    borderRadius: "3px",
                    border: "1px solid rgba(0,0,0,0.2)",
                  }}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="error">{formik.errors.email}</div>
                ) : null}
              </Col>
            </Row>
            <br />
            <Row>
              <Col lg="6" md="6" sm="12">
                <label>Remarks</label>
                <br />
                <input
                  type="text"
                  name="note"
                  value={formValues.note}
                  onChange={handleChange}
                  // onChange={formik.handleChange}
                  // value={formik.values.remarks}
                  placeholder=""
                  style={{
                    width: "100%",
                    height: "35px",
                    borderRadius: "3px",
                    border: "1px solid rgba(0,0,0,0.2)",
                  }}
                ></input>
              </Col>
              <Col lg="6" md="6" sm="12">
                <label>Any know Allergies</label>
                <br />
                <input
                  type="text"
                  name="known_allergies"
                  value={formValues.known_allergies}
                  onChange={handleChange}
                  // onChange={formik.handleChange}
                  // value={formik.values.alargies}
                  placeholder=""
                  style={{
                    width: "100%",
                    height: "35px",
                    borderRadius: "3px",
                    border: "1px solid rgba(0,0,0,0.2)",
                  }}
                ></input>
              </Col>
            </Row>
            <br />
            <Row>
              <Col lg="12" md="12" sm="12">
                <label>Address</label>
                <br />
                <textarea
                  type="text"
                  name="address"
                  value={formValues.address}
                  onChange={handleChange}
                  // onChange={formik.handleChange}
                  // value={formik.values.address}
                  placeholder=""
                  style={{
                    width: "100%",
                    height: "60px",
                    borderRadius: "3px",
                    border: "1px solid rgba(0,0,0,0.2)",
                  }}
                ></textarea>
              </Col>
            </Row>
            <br />
            <Row>
              <Col lg="6" md="6" sm="12">
                <label>TPA ID</label>
                <br />
                <input
                  type="text/number"
                  name="insurence_id"
                  value={formValues.insurence_id}
                  onChange={handleChange}
                  // onChange={formik.handleChange}
                  // value={formik.values.tpaId}
                  placeholder=""
                  style={{
                    width: "100%",
                    height: "35px",
                    borderRadius: "3px",
                    border: "1px solid rgba(0,0,0,0.2)",
                  }}
                ></input>
              </Col>
              <Col lg="6" md="6" sm="12">
                <label>TPA Validity</label>
                <br />
                <input
                  name="insurence_validity"
                  value={formValues.insurence_validity}
                  onChange={handleChange}
                  // onChange={formik.handleChange}
                  // value={formik.values.tpa_validity}
                  type="datetime-local"
                  placeholder=""
                  style={{
                    width: "100%",
                    height: "35px",
                    borderRadius: "3px",
                    border: "1px solid rgba(0,0,0,0.2)",
                  }}
                ></input>
              </Col>
            </Row>
            <br />
            <Row>
              <Col lg="12" md="12" sm="12">
                <label>National Identification Number</label>
                <br />
                <input
                  type="text/number"
                  name="identification_number"
                  value={formValues.NIN}
                  onChange={handleChange}
                  // onChange={formik.handleChange}
                  // value={formik.values.NIN}
                  placeholder=""
                  style={{
                    width: "100%",
                    height: "35px",
                    borderRadius: "3px",
                    border: "1px solid rgba(0,0,0,0.2)",
                  }}
                ></input>
              </Col>
            </Row>
            <br />
            <br />
            <h5 className="fw-bold">Additional Identifiers</h5>

            <br />
            <Row>
              <Col>
                <label>ABHA Address</label>
                <br />
                <input
                  style={{
                    width: "100%",
                    height: "35px",
                    borderRadius: "3px",
                    border: "1px solid rgba(0,0,0,0.2)",
                  }}
                ></input>
              </Col>
              <Col>
                <label>ABHA Number</label>
                <br />
                <input
                  name="ABHA_number"
                  value={formValues.ABHA_number}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    height: "35px",
                    borderRadius: "3px",
                    border: "1px solid rgba(0,0,0,0.2)",
                  }}
                ></input>
              </Col>
            </Row>
            <br />
            <br />
            <Row className="d-flex justify-content-center">
              <Col className="d-flex justify-content-center">
                <button className="btn-mod fw-bold">Verify ABHA</button>
                <button className="btn-mod ms-3 fw-bold">Patient Queue</button>
                <Link to="/account/aadhar">
                  <button className="btn-mod ms-3 fw-bold">Create ABHA</button>
                </Link>
              </Col>
            </Row>
          </DialogContent>

          <DialogActions
            style={{
              alignItems: "flex-end",
              justifyContent: "flex-end",
              marginRight: "20px",
            }}
          >
            <button
              onClick={() => handleSubmit(handleClose())}
              // onClick={handleClose}
              className="btn-mod bg-soft fw-bold"
              type="submit"
            >
              Save
            </button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  );
}
