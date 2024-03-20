
import * as React from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col, Container } from "reactstrap"
import { TextField } from "@material-ui/core"
import TextareaAutosize from "@mui/base/TextareaAutosize"
import PatientDialog from "pages/Appointment/Dialog/PatientDialog"
import { useState } from "react"
import api from "services/Api"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { useEffect } from "react"

export default function OpdTimelineDialog({
  open,
  handleClose,
  getTimeline,
  selectedData,
  data,
  onChange,
  handleFormSubmit,
}) {
  console.log(selectedData,"completeSelectedDATA")
  const [openCrDialog, setOpenCrDialog] = React.useState(false)
  const [docChange,setDocChange] = useState(true);
  const [dateisThere,setDateisThere] = useState(true);
  const params = useParams()
  const handleClickOpen = () => {
    //dialog open
    setOpenCrDialog(true)
  }

  const handleDialogClose = () => {
    //dialog close
    setOpenCrDialog(false)
  }
  const pid = params.pid
  const [formValue,setFormValue] = useState({
    patient_id:pid,
    title:'',
    timeline_date:'',
    description:'',
    document:'',
    status:'yes',
    generated_users_type:'staff',
    Hospital_id:1
  })
  function formatDate(originalDate) {
    const formattedDate = new Date(originalDate)?.toISOString()?.split('T')[0];
    return formattedDate;
  }
  useEffect(()=>{
    if(selectedData?.patient_id){
      setFormValue({
        patient_id:selectedData?.patient_id,
        title:selectedData?.title,
        description:selectedData?.description,
        document:String(selectedData?.document),
        timeline_date:formatDate(selectedData?.timeline_date),
        // timeline_date:selectedData?.timeline_date,
        status:'yes',
        generated_users_type:'staff',
        Hospital_id:1
      })
    }
  },[selectedData]) 
  const handleChange = (event) =>{
   const {name,value} = event.target
     setFormValue({...formValue,[name]:value})
  }
  const handleSubmit = async() =>{
    console.log(formValue,"value")
 const response = await api.postOPD_timeline(formValue)
 getTimeline()
 handleClose()
  }
  const changeDocument = () =>{
    setDocChange(false)
  }
  const handleDate = () =>{
    setDateisThere(false)
  }
  const handleUpdate = async () =>{
    const data = {
      ...formValue,
      id:selectedData?.id
    }
     const response = await api.updateOPD_timeline(data)
     console.log(response?.data,"updating")
     getTimeline()
     handleClose()
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
      >
        <DialogTitle id="alert-dialog-title" className="text-white fw-bold" style={{backgroundColor: '#92A4FF', height: '60px'}}>
        Add Timeline
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">
          <Row>
            <label>Title <span className="text-danger">*</span></label>
            <br />
            <input name="title" onChange={handleChange} value={formValue?.title} placeholder="" style={{width: '100%', height: '30px' , borderRadius: '5px', border: "1px solid grey"}}></input>
          </Row>
          <br/>
          <Row>
            <label>Date <span className="text-danger">*</span></label>
            <br />
          { selectedData?.timeline_date && dateisThere ? <input name="timeline_date" onChange={handleChange} value={formValue?.timeline_date} type="input" style={{width: '100%', height: '30px' , borderRadius: '5px', border: "1px solid grey"}} onClick={()=>handleDate()}></input> :
           <input name="timeline_date" onChange={handleChange} value={formValue?.timeline_date} type="date" style={{width: '100%', height: '30px' , borderRadius: '5px', border: "1px solid grey"}}></input>}
          </Row>
          <br />
          <Row>
            <label>Description</label>
            <br />
            <textarea name="description" onChange={handleChange} value={formValue?.description} style={{width: '100%', height: '30px' , borderRadius: '5px', border: "1px solid grey"}}></textarea>
          </Row>
          <br />
          <Row >
          <label>Attach Document</label>
          {selectedData?.document && docChange ? <input onChange={handleChange} name="document" value={formValue?.document} onClick={()=>changeDocument()} type="input"></input> : <input onChange={handleChange} name="document" type="file"></input>}
          </Row>
          <div className="mt-4">
          <label>visible to this person</label>
          <input type="checkbox" className="ms-2"></input>
          </div>
          
         
        </DialogContent>
        <DialogActions>
         {selectedData?.patient_id ? (<button className="btn-mod bg-soft btn-md" onClick={()=>handleUpdate()} style={{marginRight: '3%'}}>
            UPDATE
          </button>):(
          <button className="btn-mod bg-soft btn-md" onClick={()=>handleSubmit()} style={{marginRight: '3%'}}>
          Save
        </button> )
        }
        </DialogActions>
      </Dialog>
    </div>
  )
}