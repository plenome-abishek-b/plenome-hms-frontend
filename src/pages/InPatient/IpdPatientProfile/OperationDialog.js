import * as React from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col, Container } from "reactstrap"
import { TextField } from "@material-ui/core"
import TextareaAutosize from "@mui/base/TextareaAutosize"
import PatientDialog from "pages/Appointment/Dialog/PatientDialog"
import api from "services/Api"
import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

export default function OperationDialog({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
}) {
  const [openCrDialog, setOpenCrDialog] = React.useState(false)
  const [operationCategory,setOperationCategory] = useState([])
  const [categoryName,setCategoryName] = useState([])
  const [doctor,setDoctor] = useState([])
   const {ipdno} = useParams()
  const [formValue,setFormValue] = useState({
    operation_type:'',
    operation_id:'',
    // option_type:'',
    date:'',
    consultant_doctor:'',
    ass_consultant_1:'',
    ass_consultant_2:'',
    anesthetist:'',
    anesthetist_type:'',
    ot_technician:'',
    ot_assistant:'',
    remark:'',
    result:'',
    created_at:'2000-12-11 11:11:11',
    ipd_details_id:ipdno
  })
 
  const handleClickOpen = () => {
    //dialog open
    setOpenCrDialog(true)
  }
  useEffect(()=>{
  getOperationCategory()
  getDoctor()
  },[])
  const getDoctor = async ()=>{
   const response = await api.getDoctor()
   const {data} = response
   console.log(data,"docc")
   setDoctor(data)
  }
 const getOperationCategory = async () =>{
  const response = await api.getOperationCategorys()
  const {data} = response
  setOperationCategory(data)
  console.log(data,"operation category")
 }
  const handleDialogClose = () => {
    //dialog close
    setOpenCrDialog(false)
  }
   const handleChange = (event) =>{
     const {value,name} =event.target
     setFormValue({
...formValue,[name] : value
     })
   }
   const getOperationName = async ()=>{
    const response = await api.getIpdOperationName(formValue.operation_id)
    const {data} = response;
    console.log(data,"category,name")
    setCategoryName(data)
   }
   const handleSubmit = async () =>{
     const response = await api.postOperation(formValue)
   }
   console.log(formValue,"form Value")
   
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
      >
        <DialogTitle id="alert-dialog-title" className="bg-primary bg-soft text-primary">
        Add Operation
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">
          <Row>
            <Col lg='6' sm='12'>
                <label>Operation Category</label>
                <br />
                <select  name="operation_id" style={{width: '100%', height: '30px'}} onChange={handleChange} value={formValue.operation_id}>

                    <option>Select</option>
                    {operationCategory && operationCategory.map((val=>(
                      <option key={val.id} value={val.id}>{val.category}</option>
                    )))}
                </select> 
            </Col>
            <Col lg='6' sm='12'>
            <label>Operation Name</label>
                <br />
                <select name="operation_type" onChange={handleChange} value={formValue.operation_type} style={{width: '100%', height: '30px'}} onClick={()=>getOperationName()}>
                    <option>Select</option>
                    {categoryName && categoryName.map((val=>(
                      <option key={val.operation}>{val.operation}</option>
                    )))}
                </select>
            </Col>
           
            <Col lg='6' sm='12'>
                <label>Operation Date</label>
                <br />
                <input name="date" value={formValue.date} onChange={handleChange} style={{width: '100%', height: '30px'}}></input>
            </Col>
            <Col lg='6' sm='12'>
                <label>Consultant Doctor</label>
                <br />
                <select style={{width: '100%', height: '30px'}} name="consultant_doctor" onChange={handleChange} value={formValue.consultant_doctor}>
                    <option>Select</option>
                    {doctor && doctor.map((val=>(
                      <option key={val.staff_id} value={val.staff_id} >{val.name}</option>
                    )))}
                </select>
            </Col>
            <Col lg='6' sm='12'>
                <label>Assignment Cunsoltant 1</label>
                <br />
                <input  name="ass_consultant_1" onChange={handleChange} value={formValue.ass_consultant_1} style={{width: '100%', height: '30px'}}></input>
            </Col>
            <Col lg='6' sm='12'>
                <label>Assignment Cunsoltant 2</label>
                <br />
                <input name="ass_consultant_2" onChange={handleChange} value={formValue.ass_consultant_2} style={{width: '100%', height: '30px'}}></input>
            </Col>
            <Col lg='6' sm='12'>
                <label>Anasthetist</label>
                <br />
                <input name="anesthetist" onChange={handleChange} value={formValue.anesthetist} style={{width: '100%', height: '30px'}}></input>
            </Col>
            <Col lg='6' sm='12'>
                <label>Anasthetist Type</label>
                <br />
                <input name="anesthetist_type" onChange={handleChange} value={formValue.anesthetist_type} style={{width: '100%', height: '30px'}}></input>
            </Col>
            <Col lg='6' sm='12'>
                <label>OT Technician</label>
                <br />
                <input name="ot_technician" onChange={handleChange} value={formValue.ot_technician} style={{width: '100%', height: '30px'}}></input>
            </Col>
            <Col lg='6' sm='12'>
                <label>OT Assistant</label>
                <br />
                <input name="ot_assistant" onChange={handleChange} value={formValue.ot_assistant} style={{width: '100%', height: '30px'}}></input>
            </Col>
            <Col lg='6' sm='12'>
                <label>Remark</label>
                <br />
                <input name="remark" onChange={handleChange} value={formValue.remark} style={{width: '100%', height: '30px'}}></input>
            </Col>
            <Col lg='6' sm='12'>
                <label>Result</label>
                <br />
                <input name="result" onChange={handleChange} value={formValue.result} style={{width: '100%', height: '30px'}}></input>
            </Col>
          </Row>
          <br />
          <Row>
      
             
          </Row>
        </DialogContent>
        <DialogActions>
          <button className="btn btn-primary bg-soft btn-md" onClick={handleSubmit} style={{marginRight: '3%'}}>
            Save
          </button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
// onClick={()=>handleSubmit(handleClose())} 