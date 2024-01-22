import * as React from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col, Container, Label, Input } from "reactstrap"
import { TextField } from "@material-ui/core"
import TextareaAutosize from "@mui/base/TextareaAutosize"
import PatientDialog from "pages/Appointment/Dialog/PatientDialog"
import { useState } from "react"
import api from "services/Api"
import { useEffect } from "react"
import { date } from "yup"

export default function SetupPatientDialog({
  open,
  handleClose,
  getSpecialist,
  selectedData
}) {
  const [openSetupBbDialog, setOpenSetupBbDialog] = React.useState(false)
  const [validate,setValidate] = useState(false)
  const [formData,setFormdata] = useState({
    patient_name:'',
    dob:'',
    age:'',
    month:'',
    day:'',
    image:'',
    mobileno:'',
    email:'',
    gender:'',
    marital_status:'',
    blood_group:'',
    blood_bank_product_id:null,
    lang_id: null,
    address:'',
    guardian_name:'',
    patient_type:'',
    identification_number:'',
    known_allergies:'',
    note:'',
    is_ipd:'',
    app_key:'',
    insurance_id:'',
    insurance_validity:'',
    is_dead:'',
    is_active:'yes',
    disable_at:null,
    pincode:null,
    state_code:null,
    district_code:null,
    emergency_mobile_no:null,
    Hospital_id:1
  })
  const handleClickOpen = () => {
    //dialog open
    setOpenSetupBbDialog(true)
  }

  const handleDialogClose = () => {
    //dialog close
    setOpenCrDialog(false)
  }
  useEffect(() => {
    // When selectedData changes, update the form data
    if (selectedData) {
      setFormdata({
        specialist_name: selectedData?.specialist_name || "",
        is_active:"yes",
        Hospital_id:1,
      });
    } else {
      // Reset form data when selectedData is not available (for addition)
      setFormdata({
        specialist_name:'',
        Hospital_id:1,
        is_active:"yes"
      });
    }
  }, [selectedData]);
  const handleChange = (e) =>{
    const {name,value} = e.target
    setFormdata({
      ...formData,
      [name]:value
    })
  }
  const handleSubmit =async () =>{
    if(formData?.specialist_name === ''){
    setValidate(true)
    setTimeout(()=>{
    setValidate(false)
    },10000)
    }else{
      const response = await api.postSetupHR_specialist(formData)
      getSpecialist()
      handleClose()
    }
  }
  const handleUpdate = async () =>{
    const newData ={
      ...formData,
      id:selectedData?.id
    }
    if(newData?.specialist_name === ''){
      setValidate(true)
      setTimeout(()=>{
      setValidate(false)
      },10000)
      }else{
   const response = await api.updateSetupHR_specialist(newData)
   getSpecialist()
   handleClose()
      }
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-end",
      }}
    >
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg"
        PaperProps={{
            style: {
              width: "85%", // adjust the width as needed
              height: "auto", // adjust the height as needed
              maxHeight: "80vh" // adjust the max height as needed
            }
          }}
      >
        <DialogTitle  id="alert-dialog-title" className="bg-primary bg-soft text-primary">
       Add Patient
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">   
       
        <br />
        <Row className="p-2 flex-start">
            <Col>
        <Label>Patient name</Label>
        <br />
            <input
            name="patient_name"
            placeholder={validate ? "enter specialist name":""}
            onChange={handleChange}
            value={formData.patient_name}
            type="text"
            style={{height:'30px',width:'300px',borderRadius:'10px',borderColor:validate ? 'red':'inherit'}}
            >

            </input>
            </Col>
            <Col>
            <Label>Guardian name</Label>
            <br/>
<input
name="guardian_name"
placeholder={validate ? "enter specialist name":""}
onChange={handleChange}
value={formData.guardian_name}
type="text"
style={{height:'30px',borderRadius:'10px',width:'300px',borderColor:validate ? 'red':'inherit'}}
>
            </input>
            </Col>
            </Row>
            <Row>
                <Col>
                <Label>Gender</Label>
                <br/>
                <select onChange={handleChange} value={formData?.gender} name="gender" style={{width:'70px',borderRadius:'10px'}}>Gender
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                </Col>
                <Col>
                <Label>Date of birth</Label>
                <br/>
                <input onChange={handleChange} value={formData?.dob} name="dob" type="date" style={{width:'120px',height:'35px',borderRadius:'10px'}}></input>
                </Col>
            
                {/* <div style={{display:'flex'}}> */}
                <Col>
                <Label></Label>
                <br/>
                <input onChange={handleChange} type="number" placeholder="year" name="year" style={{marginLeft:'100px',marginTop:'8px',width:'80px',height:'35px',borderRadius:'10px'}}></input>
                </Col>
                <Col>
                <Label>Age(yy-mm-dd)</Label>
                     <br/>
                <input onChange={handleChange} type="number" value={formData?.month} placeholder="month" name="month" style={{marginLeft:'50px',width:'80px',height:'35px',borderRadius:'10px'}}></input>
                </Col>
                <Col>
                <br/>
                <input type="number" placeholder="day" name="day" value={formData?.day} style={{marginRight:'40px',marginTop:'8px', width:'80px',height:'35px',borderRadius:'10px'}}></input>
                </Col>
                <Col>
                <Label>Bloodgroup</Label>
                 <br/>        
                <select name="blood_group" style={{width:'70px',borderRadius:'10px'}}>
                    <option>select</option>
                    {/* <option>Female</option> */}
                </select>
                </Col>
                
                {/* </div> */}
            </Row>
            <Row>
                <Col>
            <Label>Marital status</Label>
                 <br/>  
            <select name="marital_status" onChange={handleChange} style={{width:'200px',borderRadius:'10px'}}>
                    <option>select</option>
                    {/* <option>Female</option> */}
                </select>
                </Col>
                <Col>
                <Label>Patient photo</Label>
                <br/>
                <input type="file"  style={{marginRight:'40px',marginTop:'8px', width:'220px',height:'35px'}}></input>
                </Col>
            </Row>
            <Row>
                <Col>
                <Label>Number</Label>
                <br/>
                <input type="number" placeholder="number" style={{height:'30px',width:"150px",borderRadius:'10px',display:'flex', justifyContent:'center'}}></input>
                </Col>
                <Col>
                <Label>Email</Label>
                <br/>
                <input type="email" placeholder="email" style={{height:'30px',width:"200px",borderRadius:'10px'}}></input>
                </Col>
                <Col>
                <Label>Address</Label>
                <br/>
                <input type="text" placeholder="address" style={{height:'30px',width:"250px",borderRadius:'10px'}}></input>
                </Col>  
            </Row>
            <Row>
                <Col>
                <Label>Remark</Label>
                <br></br>
                <input type="text" placeholder="remark" style={{height:'50px',width:"350px",borderRadius:'10px'}}></input>
                </Col>
                <Col>
                <Label>Any known alergies</Label>
                <br></br>
                <input type="text" placeholder="any know alergies" style={{height:'50px',width:"350px",borderRadius:'10px'}}></input>
                </Col>
            </Row>
            <Row>
                <Col>
                <Label>TPA Id</Label>
                <br/>
                <input type="text" placeholder="tpa id" style={{height:'50px',width:"180px",borderRadius:'10px'}}></input>
                </Col>
                <Col>
                <br/>
                <Label>TPA Validity</Label>
                <br/>
                <input type="date" placeholder="tpa validity" style={{height:'50px',width:"180px",borderRadius:'10px'}}></input>
                </Col>
                <Col>
                <Label>National Ientification Number</Label>
                <br/>
                <input type="text" placeholder="national identification number" style={{height:'50px',width:"210px",borderRadius:'10px'}}></input>
                </Col>
            </Row>

       
        </DialogContent>
        <DialogActions>
          {selectedData?.specialist_name ?
          <button className="btn-mod bg-soft btn-md" onClick={()=>handleUpdate()} style={{marginRight: '3%'}}>
            Saves
          </button>:
          <button className="btn-mod bg-soft btn-md" onClick={()=>handleSubmit()} style={{marginRight: '3%'}}>
          Save
        </button>
           }
        </DialogActions>
      </Dialog>
    </div>
  )
}
