import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Row, Col, Container, Label, Input } from "reactstrap";
import { TextField } from "@material-ui/core";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import PatientDialog from "pages/Appointment/Dialog/PatientDialog";
import { useState } from "react";
import api from "services/Api";
import { useEffect } from "react";
import { date } from "yup";
import { Link } from "react-router-dom/cjs/react-router-dom";

export default function SetupPatientDialog({
  open,
  handleClose,
  getSetup_Patient,
  selectedData,
}) {
  const [openSetupBbDialog, setOpenSetupBbDialog] = React.useState(false);
  // const [validate, setValidate] = useState(false);
  const [bloodBank, setBloodBank] = useState([]);
  const [validate,setValidate] = useState({
    patient_name:false,
    age: false,
    dob: false,
    month: false,
    year:false,
    day: false,
    image:false,
    mobileno: false,
    email: false,
    gender: false,
    marital_status: false,
    blood_group: false,
    blood_bank_product_id: null,
    lang_id: null,
    address: false,
    guardian_name: false,
    patient_type: false,
    identification_number: false,
    known_allergies: false,
    note: false,
    insurance_id: false,
    insurance_validity: false
  })
  const [formData, setFormdata] = useState({
    patient_name: "",
    dob: "",
    age: "",
    month: "",
    day: "",
    image: "",
    mobileno: "",
    email: "",
    gender: "",
    marital_status: "",
    blood_group: "",
    blood_bank_product_id: null,
    lang_id: null,
    address: "",
    guardian_name: "",
    patient_type: "",
    identification_number: "",
    known_allergies: "",
    note: "",
    is_ipd: "",
    app_key: "",
    insurance_id: "",
    insurance_validity: "",
    is_dead: "no",
    is_active: "yes",
    disable_at: null,
    pincode: null,
    state_code: null,
    district_code: null,
    emergency_mobile_no: null,
    Hospital_id: 1,
    year: "",
    created_at: "2023-04-27 07:16:32"
  });
  const handleClickOpen = () => {
    //dialog open
    setOpenSetupBbDialog(true);
  };

  const handleDialogClose = () => {
    //dialog close
    setOpenCrDialog(false);
  };
//   useEffect(() => {
//     // When selectedData changes, update the form data
//     if (selectedData) {
//       setFormdata({
//         specialist_name: selectedData?.specialist_name || "",
//         is_active: "yes",
//         Hospital_id: 1,
//       });
//     } else {
//       // Reset form data when selectedData is not available (for addition)
//       setFormdata({
//         specialist_name: "",
//         Hospital_id: 1,
//         is_active: "yes",
//       });
//     }
//   }, [selectedData]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...formData,
      [name]: value,
    });
  };
  const getBloodGroups = async () => {
    const response = await api.getSetup_bloodBank();
    console.log(response.data, "getting all bloodgroups");
    setBloodBank(response.data);
  };
  const handleSubmit = async () => {
     if(formData?.patient_name ===''){ 
      setValidate({...validate,patient_name:true})
      setTimeout(()=>{
        setValidate({...validate,patient_name:false})
      },3000)
    }
    else if(formData.guardian_name === ''){
      setValidate({...validate,guardian_name:true})
      setTimeout(()=>{
        setValidate({...validate,guardian_name:false})
      },3000)
    }
    else if(formData.mobileno === ''){
      setValidate({...validate,mobileno:true})
      setTimeout(()=>{
        setValidate({...validate,mobileno:false})
      },3000)
    }
    else if(formData?.address === ''){
      setValidate({...validate,address:true})
      setTimeout(()=>{
        setValidate({...validate,address:false})
      },3000)
    }
    else if(formData?.year === '' && formData?.month  === ''  && formData?.day === '' ){
      setValidate({...validate,age:true})
      setTimeout(()=>{
        setValidate({...validate,age:false})
      },3000)
    }
    else if(formData?.blood_group === ''){
      setValidate({...validate,blood_group:true})
      setTimeout(()=>{
        setValidate({...validate,blood_group:false})
      },3000)
    }
    else if(formData?.email === ''){
      setValidate({...validate,email:true})
      setTimeout(()=>{
        setValidate({...validate,email:false})
      },3000)
    }
    else if(formData?.dob === ''){
      setValidate({...validate,dob:true})
      setTimeout(()=>{
        setValidate({...validate,dob:false})
      },3000)
    }
    else if(formData?.gender === ''){
      setValidate({...validate,gender:true})
      setTimeout(()=>{
        setValidate({...validate,gender:false})
      },3000)
    }
    else if(formData?.image === ''){
      setValidate({...validate,image:true})
      setTimeout(()=>{
        setValidate({...validate,image:false})
      },3000)
    }
    else if(validate?.insurance_id === ''){
      setValidate({...validate,insurance_id:true})
      setTimeout(()=>{
        setValidate({...validate,insurance_id:false})
      },3000)
    }
    else if(validate?.insurance_validity === ''){
      setValidate({...validate,insurance_validity:true})
      setTimeout(()=>{
        setValidate({...validate,insurance_validity:false})
      },3000)
    }
    else if(validate?.marital_status === ''){
      setValidate({...validate,marital_status:true})
      setTimeout(()=>{
        setValidate({...validate,marital_status:false})
      },3000)

    }
    else if(validate?.note === ''){
      setValidate({...validate,note:true})
      setTimeout(()=>{
        setValidate({...validate,note:false})
      },3000)
    }
    else if(validate?.identification_number === ''){
      setValidate({...validate,identification_number:true})
      setTimeout(()=>{
        setValidate({...validate,identification_number:false})
      },3000)
    }else{
      console.log(formData, "consoling data");
      if (formData.year && formData?.month && formData?.day) {
        const birthday = new Date(formData?.year, formData?.month, formData?.day);
        const currentDate = new Date();
        const age = currentDate.getFullYear() - birthday.getFullYear();
        console.log(age, "consoling age");
        const newData = {
          ...formData,
          age: age,
        };
        console.log(newData, "GETTING YE");
        const response = await api.postSetupHR_patient(newData)
        console.log(response,"posting");
        getSetup_Patient()
        handleClose()
      } else {
        console.log(formData?.year, formData?.month, formData?.day);
      }
    }
    // if(formData?.specialist_name === ''){
    // setValidate(true)
    // setTimeout(()=>{
    // setValidate(false)
    // },10000)
    // }else{
    //   const response = await api.postSetupHR_specialist(formData)
    //   getSpecialist()
    //   handleClose()
    // }
  };
  const handleUpdate = async () => {
    const newData = {
      ...formData,
      id: selectedData?.id,
    };
    if (newData?.specialist_name === "") {
      setValidate(true);
      setTimeout(() => {
        setValidate(false);
      }, 10000);
    } else {
      const response = await api.updateSetupHR_specialist(newData);
      getSpecialist();
      handleClose();
    }
  };

  // return (
  //   <div
  //     style={{
  //       display: "flex",
  //       alignItems: "flex-end",
  //       justifyContent: "flex-end",
  //     }}
  //   >
  //     <Dialog
  //       open={open}
  //       onClose={handleClose}
  //       aria-labelledby="alert-dialog-title"
  //       aria-describedby="alert-dialog-description"
  //       maxWidth="lg"
  //       PaperProps={{
  //         style: {
  //           width: "85%", // adjust the width as needed
  //           height: "auto", // adjust the height as needed
  //           maxHeight: "90vh", // adjust the max height as needed
  //         },
  //       }}
  //     >
  //       <DialogTitle
  //         id="alert-dialog-title"
  //         className="bg-primary bg-soft text-primary"
  //       >
  //         Add Patient
  //       </DialogTitle>
  //       <DialogContent className="mt-4 ms-2">
  //         <br />
  //         <Row className="p-2 flex-start">
  //           <Col>
  //             <Label>Patient name</Label>
  //             <br />
  //             <input
  //               name="patient_name"
  //               placeholder={validate ? "enter specialist name" : ""}
  //               onChange={handleChange}
  //               value={formData.patient_name}
  //               type="text"
  //               style={{
  //                 height: "30px",
  //                 width: "300px",
  //                 borderRadius: "10px",
  //                 borderColor: validate ? "red" : "inherit",
  //               }}
  //             ></input>
  //           </Col>
  //           <Col>
  //             <Label>Guardian name</Label>
  //             <br />
  //             <input
  //               name="guardian_name"
  //               placeholder={validate ? "enter specialist name" : ""}
  //               onChange={handleChange}
  //               value={formData.guardian_name}
  //               type="text"
  //               style={{
  //                 height: "30px",
  //                 borderRadius: "10px",
  //                 width: "300px",
  //                 borderColor: validate ? "red" : "inherit",
  //               }}
  //             ></input>
  //           </Col>
  //         </Row>
  //         <Row>
  //           <Col>
  //             <Label>Gender</Label>
  //             <br />
  //             <select
  //               onChange={handleChange}
  //               value={formData?.gender}
  //               name="gender"
  //               style={{ width: "70px", borderRadius: "10px" }}
  //             >
  //               Gender
  //               <option value="Male">Male</option>
  //               <option value="Female">Female</option>
  //             </select>
  //           </Col>
  //           <Col>
  //             <Label>Date of birth</Label>
  //             <br />
  //             <input
  //               onChange={handleChange}
  //               value={formData?.dob}
  //               name="dob"
  //               type="date"
  //               style={{ width: "120px", height: "35px", borderRadius: "10px" }}
  //             ></input>
  //           </Col>

  //           {/* <div style={{display:'flex'}}> */}
  //           <Col>
  //             <Label></Label>
  //             <br />
  //             <input
  //               onChange={handleChange}
  //               type="number"
  //               value={formData?.year}
  //               placeholder="year"
  //               name="year"
  //               style={{
  //                 marginLeft: "100px",
  //                 marginTop: "8px",
  //                 width: "80px",
  //                 height: "35px",
  //                 borderRadius: "10px",
  //               }}
  //             ></input>
  //           </Col>
  //           <Col>
  //             <Label>Age(yy-mm-dd)</Label>
  //             <br />
  //             <input
  //               onChange={handleChange}
  //               type="number"
  //               name="month"
  //               value={formData?.month}
  //               placeholder="month"
  //               style={{
  //                 marginLeft: "50px",
  //                 width: "80px",
  //                 height: "35px",
  //                 borderRadius: "10px",
  //               }}
  //             ></input>
  //           </Col>
  //           <Col>
  //             <br />
  //             <input
  //               type="number"
  //               onChange={handleChange}
  //               placeholder="day"
  //               name="day"
  //               value={formData?.day}
  //               style={{
  //                 marginRight: "40px",
  //                 marginTop: "8px",
  //                 width: "80px",
  //                 height: "35px",
  //                 borderRadius: "10px",
  //               }}
  //             ></input>
  //           </Col>
  //           <Col>
  //             <Label>Bloodgroup</Label>
  //             <br />
  //             <select
  //               onClick={() => getBloodGroups()}
  //               name="blood_group"
  //               onChange={handleChange}
  //               style={{ width: "70px", borderRadius: "10px" }}
  //             >
  //               <option>select</option>
  //               {bloodBank &&
  //                 bloodBank.map((val) => (
  //                   <option key={val.name} value={val?.name}>
  //                     {val.name}
  //                   </option>
  //                 ))}
  //               {/* <option>Female</option> */}
  //             </select>
  //           </Col>

  //           {/* </div> */}
  //         </Row>
  //         <Row>
  //           <Col>
  //             <Label>Marital status</Label>
  //             <br />
  //             <select
  //               name="marital_status"
  //               onChange={handleChange}
  //               style={{ width: "200px", borderRadius: "10px" }}
  //             >
  //               <option>select</option>
  //               <option value="single">Single</option>
  //               <option value="married">Married</option>
  //               <option value="widowed">Widowed</option>
  //               <option value="separated">Separated</option>
  //               <option value="not specified">Not Specified</option>
  //             </select>
  //           </Col>
  //           <Col>
  //             <Label>Patient photo</Label>
  //             <br />
  //             <input
  //               type="file"
  //               name="image"
  //               onChange={handleChange}
  //               style={{
  //                 marginRight: "40px",
  //                 marginTop: "8px",
  //                 width: "220px",
  //                 height: "35px",
  //               }}
  //             ></input>
  //           </Col>
  //         </Row>
  //         <Row>
  //           <Col>
  //             <Label>Number</Label>
  //             <br />
  //             <input
  //               // type="number"
  //               placeholder="number"
  //               name="mobileno"
  //               onChange={handleChange}
  //               value={formData?.mobileno}
  //               style={{
  //                 height: "30px",
  //                 width: "150px",
  //                 borderRadius: "10px",
  //                 display: "flex",
  //                 justifyContent: "center",
  //               }}
  //             ></input>
  //           </Col>
  //           <Col>
  //             <Label>Email</Label>
  //             <br />
  //             <input
  //               type="email"
  //               placeholder="email"
  //               name="email"
  //               onChange={handleChange}
  //               value={formData?.email}
  //               style={{ height: "30px", width: "200px", borderRadius: "10px" }}
  //             ></input>
  //           </Col>
  //           <Col>
  //             <Label>Address</Label>
  //             <br />
  //             <input
  //               type="text"
  //               name="address"
  //               onChange={handleChange}
  //               value={formData?.address}
  //               placeholder="address"
  //               style={{ height: "30px", width: "250px", borderRadius: "10px" }}
  //             ></input>
  //           </Col>
  //         </Row>
  //         <Row>
  //           <Col>
  //             <Label>Remark</Label>
  //             <br></br>
  //             <input
  //               type="text"
  //               placeholder="remark"
  //               onChange={handleChange}
  //               value={formData?.note}
  //               name="note"
  //               style={{ height: "50px", width: "350px", borderRadius: "10px" }}
  //             ></input>
  //           </Col>
  //           <Col>
  //             <Label>Any known alergies</Label>
  //             <br></br>
  //             <input
  //               type="text"
  //               name="known_allergies"
  //               value={formData?.known_allergies}
  //               onChange={handleChange}
  //               placeholder="any know alergies"
  //               style={{ height: "50px", width: "350px", borderRadius: "10px" }}
  //             ></input>
  //           </Col>
  //         </Row>
  //         <Row>
  //           <Col>
  //             <Label>TPA Id</Label>
  //             <br />
  //             <input
  //               type="text"
  //               name="insurance_id"
  //               value={formData?.insurance_id}
  //               onChange={handleChange}
  //               placeholder="tpa id"
  //               style={{ height: "50px", width: "180px", borderRadius: "10px" }}
  //             ></input>
  //           </Col>
  //           <Col>
  //             <br />
  //             <Label>TPA Validity</Label>
  //             <br />
  //             <input
  //               type="date"
  //               name="insurance_validity"
  //               onChange={handleChange}
  //               value={formData?.insurance_validity}
  //               placeholder="tpa validity"
  //               style={{ height: "50px", width: "180px", borderRadius: "10px" }}
  //             ></input>
  //           </Col>
  //           <Col>
  //             <Label>National Identification Number</Label>
  //             <br />
  //             <input
  //               type="number"
  //               name="identification_number"
  //               onChange={handleChange}
  //               value={formData?.identification_number}
  //               placeholder="national identification number"
  //               style={{ height: "50px", width: "210px", borderRadius: "10px" }}
  //             ></input>
  //           </Col>
  //         </Row>
  //       </DialogContent>
  //       <DialogActions>
  //         {/* {selectedData?.specialist_name ? */}
  //         <button
  //           className="btn-mod bg-soft btn-md"
  //           onClick={() => handleSubmit()}
  //           style={{ marginRight: "3%" }}
  //         >
  //           Saves
  //         </button>
  //         {/* :<button className="btn-mod bg-soft btn-md" onClick={()=>handleSubmit()} style={{marginRight: '3%'}}>
  //         Save
  //       </button>
  //          } */}
  //       </DialogActions>
  //     </Dialog>
  //   </div>
  // );
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
                  placeholder={validate?.patient_name ? 'enter patient name' : 'patient name'}
                  style={{
                    width: "100%",
                    height: "35px",
                    borderRadius: "5px",
                    border: "1px solid grey",
                    borderColor:validate?.patient_name ? 'red' : ''
                  }}
                  value={formData.patient_name}
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
                  value={formData.guardian_name}
                  onChange={handleChange}
                  //   onChange={formik.handleChange}
                  // value={formik.values.guardian_name}
                  placeholder={validate?.guardian_name ? 'enter guardian name' : 'guardian name'}
                  style={{
                    width: "100%",
                    height: "35px",
                    borderRadius: "5px",
                    border: "1px solid grey",
                    borderColor:validate?.guardian_name ? 'red' : ''
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
                    borderRadius: "5px",
                    border: "1px solid grey",
                    borderColor:validate?.gender ? 'red' : ''
                  }}
                  name="gender"
                  value={formData.gender}
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
                  value={formData.dob}
                  onChange={handleChange}
                  placeholder={validate?.dob ? 'enter DOB' : ''}
                  //   onChange={formik.handleChange}
                  // value={formik.values.dob}
                  style={{
                    width: "100%",
                    height: "35px",
                    borderRadius: "5px",
                    border: "1px solid grey",
                    borderColor:validate?.dob ? 'red' : ''
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
                 {/* ( */}
                  <>
                    <input
                      name="year"
                      placeholder={validate?.age ? 'enter year' : 'year'}
                      value={formData.year}
                      onChange={handleChange}
                      style={{
                        width: "80px",
                        height: "35px",
                        borderRadius: "5px",
                        border: "1px solid grey",
                        borderColor:validate?.age ? 'red' : ''
                      }}
                    />
                    <input
                      name="month"
                      value={formData.month}
                      onChange={handleChange}
                      placeholder={validate?.age ? 'enter month' : 'month'}
                      style={{
                        width: "80px",
                        height: "35px",
                        borderRadius: "5px",
                        border: "1px solid grey",
                        borderColor:validate?.age ? 'red' : ''
                      }}
                      className="ms-3"
                    />
                    <input
                      name="day"
                      placeholder={validate?.age ? 'enter day' : 'day'}
                      value={formData.day}
                      onChange={handleChange}
                      style={{
                        width: "80px",
                        height: "35px",
                        borderRadius: "5px",
                        border: "1px solid grey",
                        borderColor:validate?.age ? 'red' : ''
                      }}
                      className="ms-3"
                    />
                  </>
                {/* ) : ( */}
                  {/* <span>Date not selected</span>
                )} */}
                <br />
              </Col>
              {/* <Row>
           

            </Row> */}

              <Col lg="6" md="6" sm="12">
                <label>Blood Group</label>
                <br />
                <select
                onClick={()=>getBloodGroups()}
                  style={{
                    width: "100%",
                    height: "35px",
                    borderRadius: "5px",
                    border: "1px solid grey",
                    borderColor:validate?.blood_group ? 'red' : ''
                  }}
                  name="blood_group"
                  value={formData.blood_group}
                  onChange={handleChange}
                  //  onChange={formik.handleChange}
                  //  value={formik.values.bloodgroup}
                >
                  <option>Select an field</option>
                  {bloodBank &&
                    bloodBank.map((bloodgroup) => (
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
                    borderRadius: "5px",
                    border: "1px solid grey",
                    borderColor:validate?.marital_status ? 'red' : ''
                  }}
                  name="marital_status"
                  value={formData.marital_status}
                  onChange={handleChange}
                  //  onChange={formik.handleChange}
                  //  value={formik.values.gender}
                >
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
                <input type="file" style={{borderColor:validate?.patient_name ? 'red' : ''}} name="image" onChange={handleChange} placeholder={validate?.image ? 'image is required' : ''}
></input>
              </Col>
            </Row>
            <br />
            <Row>
              <Col lg="6" md="6" sm="12">
                <label>Phone</label>
                <br />
                <input
                  placeholder={validate?.mobileno ? 'enter number' : 'number'}
                  type="number"
                  name="mobileno"
                  value={formData.mobileno}
                  onChange={handleChange} // onChange={formik.handleChange}
                  // value={formik.values.number}
                  style={{
                    width: "100%",
                    height: "35px",
                    borderRadius: "5px",
                    border: "1px solid grey",
                    borderColor:validate?.mobileno ? 'red' : ''
                  }}
                ></input>
              </Col>
              <Col lg="6" md="6" sm="12">
                <label>Email</label>
                <br />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  // onChange={formik.handleChange}
                  // value={formik.values.email}
                  placeholder={validate?.email ? 'enter email' : 'email'}
                  style={{
                    width: "100%",
                    height: "35px",
                    borderRadius: "5px",
                    border: "1px solid grey",
                    borderColor:validate?.email ? 'red' : ''
                  }}
                ></input>
              </Col>
            </Row>
            <br />
            <Row>
              <Col lg="6" md="6" sm="12">
                <label>Remarks</label>
                <br />
                <input
                  placeholder={validate?.note ? 'enter remark' : 'remarks'}
                  type="text"
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                  // onChange={formik.handleChange}
                  // value={formik.values.remarks}
                  style={{
                    width: "100%",
                    height: "35px",
                    borderRadius: "5px",
                    border: "1px solid grey",
                    borderColor:validate?.note ? 'red' : ''
                  }}
                ></input>
              </Col>
              <Col lg="6" md="6" sm="12">
                <label>Any know Allergies</label>
                <br />
                <input
                  type="text"
                  name="known_allergies"
                  value={formData.known_allergies}
                  onChange={handleChange}
                  // onChange={formik.handleChange}
                  // value={formik.values.alargies}
                  placeholder={validate?.known_allergies ? 'enter known allergies' : 'alargies'}
                  style={{
                    width: "100%",
                    height: "35px",
                    borderRadius: "5px",
                    border: "1px solid grey",
                    borderColor:validate?.known_allergies ? 'red' : ''
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
                  value={formData.address}
                  onChange={handleChange}
                  // onChange={formik.handleChange}
                  // value={formik.values.address}
                  placeholder={validate?.address ? 'enter address' : 'address'}
                  style={{
                    width: "100%",
                    height: "60px",
                    borderRadius: "5px",
                    border: "1px solid grey",
                    borderColor:validate?.address ? 'red' : ''
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
                  name="insurance_id"
                  value={formData?.insurance_id}
                  onChange={handleChange}
                  placeholder={validate?.insurance_id ? 'enter Insurence Id' : 'insurence id'}
                  // onChange={formik.handleChange}
                  // value={formik.values.tpaId}
                  style={{
                    width: "100%",
                    height: "35px",
                    borderRadius: "5px",
                    border: "1px solid grey",
                  }}
                ></input>
              </Col>
              <Col lg="6" md="6" sm="12">
                <label>TPA Validity</label>
                <br />
                <input
                  name="insurance_validity"
                  value={formData.insurance_validity}
                  onChange={handleChange}
                  placeholder={validate?.insurance_validity ? 'enter insurence validity' : 'insurence validity'}
                  // onChange={formik.handleChange}
                  // value={formik.values.tpa_validity}
                  type="date"
                  style={{
                    width: "100%",
                    height: "35px",
                    borderRadius: "5px",
                    border: "1px solid grey",
                    borderColor:validate?.insurance_validity ? 'red' : ''
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
                  value={formData.identification_number}
                  onChange={handleChange}
                  // onChange={formik.handleChange}
                  // value={formik.values.NIN}
                  placeholder={validate?.identification_number ? 'enter identification number' : 'identification number'}
                  style={{
                    width: "100%",
                    height: "35px",
                    borderRadius: "5px",
                    border: "1px solid grey",
                    borderColor:validate?.identification_number ? 'red' : ''
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
                    borderRadius: "5px",
                    border: "1px solid grey",
                  }}
                ></input>
              </Col>
              <Col>
                <label>ABHA Number</label>
                <br />
                <input
                  style={{
                    width: "100%",
                    height: "35px",
                    borderRadius: "5px",
                    border: "1px solid grey",
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
              onClick={() => handleSubmit()}
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
