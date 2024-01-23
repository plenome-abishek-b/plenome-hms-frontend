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

export default function SetupSpecialistDialog({
  open,
  handleClose,
  getSpecialist,
  selectedData
}) {
  const [openSetupBbDialog, setOpenSetupBbDialog] = React.useState(false)
  const [validate,setValidate] = useState(false)
  const [formData,setFormdata] = useState({
    specialist_name:'',
    is_active:'yes',
    // created_at:'2023-02-12 11:11:11'
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
      >
        <DialogTitle  id="alert-dialog-title" className="bg-primary bg-soft text-primary">
       Add Specialist
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">   
       
        <br />
        <Row className="p-2">
        <Label>Name</Label>
            <input
            name="specialist_name"
            placeholder={validate ? "enter specialist name":""}
            onChange={handleChange}
            value={formData.specialist_name}
            type="text"
            style={{height: '30px',borderColor:validate ? 'red':'inherit'}}
            >

            </input>
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
