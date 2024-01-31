import * as React from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col, Container, Label, Input, CardBody, Card } from "reactstrap"
import { TextField } from "@material-ui/core"
import TextareaAutosize from "@mui/base/TextareaAutosize"
import PatientDialog from "pages/Appointment/Dialog/PatientDialog"
import api from "services/Api"
import { useState } from "react"
import { useEffect } from "react"

export default function SetupComplainDialog({
  open,
  handleClose,
  data,
  onChange,
  // handleFormSubmit,
  getFrontSetupComplainType,
  selectedData
}) {
  const [openComplaintDialog, setopenComplaintDialog] = useState(false)
  const [formData,setFormData] = useState({
    complaint_type:'',
    description:'',
    Hospital_id:1
  })
  const [validate,setValidate] = useState({
    complaint_type:false,
    description:false,
  })
  const handleClickOpen = () => {
    //dialog open
    setopenComplaintDialog(true)
  }

  const handleDialogClose = () => {
    //dialog close
    setopenComplaintDialog(false)
  }
  useEffect(() => {
    // When selectedData changes, update the form data
    if (selectedData) {
      setFormData({
        complaint_type:selectedData?.complaint_type || '',
        description:selectedData?.description || '',
        Hospital_id:1
      });
    } else {
      // Reset form data when selectedData is not available (for addition)
      setFormData({
        complaint_type:'',
        description:'',
        Hospital_id:1
      });
    }
  }, [selectedData]);
  const handleFormSubmit = async () =>{
    console.log(formData,"POST");
    if(formData?.complaint_type === ''){
      setValidate({...validate,complaint_type:true})
      setTimeout(()=>{
      setValidate({...validate,visitors_purpose:false})
      },3000)
    }
    else if(formData?.description === ''){
      setValidate({...validate,description:true})
      setTimeout(()=>{
      setValidate({...validate,description:false})
      },3000)
    }
    else{
      const response = await api.postSetupFrontendOffice_complaint_Type(formData)
      getFrontSetupComplainType()
      handleClose()
    }
  }
  const handleUpdate = async () =>{   
    const newData = {
      ...formData,
      id:selectedData?.id
    }
    if(newData?.complaint_type === ''){
      setValidate({...validate,complaint_type:true})
      setTimeout(()=>{
      setValidate({...validate,visitors_purpose:false})
      },3000)
    }
    else if(newData?.description === ''){
      setValidate({...validate,description:true})
      setTimeout(()=>{
      setValidate({...validate,description:false})
      },3000)
    }
    else{
    const response = await api.updateSetupFrontOffice_complaint_Type(newData)
    getFrontSetupComplainType()
    handleClose()
    }
  }
  const handleChange = async (e) =>{
    const {id,value} = e.target
    setFormData({
     ...formData,[id]:value
    })
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
        <DialogTitle
          id="alert-dialog-title"
          className="bg-primary bg-soft text-primary"
        >
          Add Complaint Type
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">
          <Container>
            <Row>
                <label>Complaint Type</label>
                <br />
                <input id='complaint_type' style={{borderColor:validate?.complaint_type ? 'red':''}} placeholder={validate?.complaint_type ? "enter complaint" : "complaint"} onChange={handleChange} value={formData?.complaint_type} ></input>
            </Row>
            <br />
            <Row>
                <label>Description</label>
                <br />
                <textarea id='description' style={{borderColor:validate?.description ? 'red':''}} placeholder={validate?.description ? "enter description" : "description"} onChange={handleChange} value={formData?.description} ></textarea>
            </Row>
          </Container>
        </DialogContent>
        <DialogActions>
          {selectedData?.complaint_type ?
           <button
            className="btn-mod bg-soft btn-md"
            onClick={()=>handleUpdate()}
            style={{ marginRight: "3%" }}
          >
            Save
          </button> :
          <button
          className="btn-mod bg-soft btn-md"
          onClick={()=>handleFormSubmit()}
          style={{ marginRight: "3%" }}
        >
          Save
        </button>
          }
        </DialogActions>
      </Dialog>
    </div>
  )
}
