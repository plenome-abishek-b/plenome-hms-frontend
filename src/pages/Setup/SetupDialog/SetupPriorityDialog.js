import * as React from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col, Container, Label, Input, CardBody, Card } from "reactstrap"
import { TextField } from "@material-ui/core"
import TextareaAutosize from "@mui/base/TextareaAutosize"
import PatientDialog from "pages/Appointment/Dialog/PatientDialog"
import { useEffect } from "react"
import api from "services/Api"
import { useState } from "react"

export default function SetupPriorityDialog({
  open,
  handleClose,
  getFrontofficeSetupPrior,
  selectedData
}) {
  const [openPriorityDialog, setopenPriorityDialog] = React.useState(false)
  const [formData,setFormData] = useState({
    priority_status:'',
    Hospital_id:1
  })
  const [validate,setValidate] = useState({
    priority_status:false,
    Hospital_id:1
  })
  const handleClickOpen = () => {
    //dialog open
    setopenPriorityDialog(true)
  }

  const handleDialogClose = () => {
    //dialog close
    setopenPriorityDialog(false)
  }
  useEffect(() => {
    // When selectedData changes, update the form data
    if (selectedData) {
      setFormData({
        priority_status:selectedData?.priority_status || '',
        Hospital_id:1
      });
    } else {
      // Reset form data when selectedData is not available (for addition)
      setFormData({
        priority_status:'',
        Hospital_id:1
      });
    }
  }, [selectedData]);
  const handleFormSubmit = async () =>{
    console.log(formData,"POST");
    if(formData?.priority_status === ''){
      setValidate({...validate,priority_status:true})
      setTimeout(()=>{
      setValidate({...validate,priority_status:false})
      },3000)
    }
    else{
      const response = await api.postSetupFrontOffice_appointmentPriority(formData)
      getFrontofficeSetupPrior()
      handleClose()
    }
  }
  const handleUpdate = async () =>{
    const newData = {
      ...formData,
      id:selectedData?.id
    }
    const response = await api.updateSetupFrontOffice_appointmentPriority(newData)
    getFrontofficeSetupPrior()
    handleClose()
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
          Add Priority
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">
          <Container>
            <Row>
                <label>Priority</label>
                <br />
                <input id='priority_status' style={{borderColor:validate?.priority_status ? 'red':''}} placeholder={validate?.priority_status ? "enter priority status":"prority status"} onChange={handleChange} value={formData?.priority_status} ></input>
            </Row>
            
          </Container>
        </DialogContent>
        <DialogActions>
         { selectedData?.priority_status ? 
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
          Saves
        </button>
            }
        </DialogActions>
      </Dialog>
    </div>
  )
}
