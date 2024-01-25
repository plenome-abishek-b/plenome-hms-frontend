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

export default function SetupPurposeDialog({
  open,
  handleClose,
  selectedData,
  getFrontSetupPurpose
}) {
  const [formData,setFormData] = useState({
    visitors_purpose:'',
    description:'',
    Hospital_id:1
  })
  const [validate,setValidate] = useState({
    visitors_purpose:false,
    description:false,
  })
  useEffect(() => {
    // When selectedData changes, update the form data
    if (selectedData) {
      setFormData({
        visitors_purpose:selectedData?.visitors_purpose || '',
        description:selectedData?.description || '',
        Hospital_id:1
      });
    } else {
      // Reset form data when selectedData is not available (for addition)
      setFormData({
        visitors_purpose:'',
        description:'',
        Hospital_id:1
      });
    }
  }, [selectedData]);

  const handleFormSubmit = async () =>{
    console.log(formData,"POST");
    if(formData?.visitors_purpose === ''){
      setValidate({...validate,visitors_purpose:true})
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
      const response = await api.postSetupFrontOffice_Porpose(formData)
      getFrontSetupPurpose()
      handleClose()
    }
  }
  const handleUpdate = async () =>{   
    const newData = {
      ...formData,
      id:selectedData?.id
    }
    const response = await api.updateSetupFrontOffice_purpose(newData)
    getFrontSetupPurpose()
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
          Add purpose
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">
          <Container>
            <Row>
                <label>Purpose</label>
                <br />
                <input id='visitors_purpose' style={{borderColor:validate?.visitors_purpose ? 'red':''}} placeholder={validate?.visitors_purpose ? "enter purpose" : "visting purpose"} onChange={handleChange} value={formData?.visitors_purpose} ></input>
            </Row>
            <br />
            <Row>
                <label>Description</label>
                <br />
                <textarea id='description' style={{borderColor:validate?.description ? 'red':''}} onChange={handleChange} placeholder={validate?.description ? "enter description" : "description"} value={formData?.description} ></textarea>
            </Row>
          </Container>
        </DialogContent>
        <DialogActions>
          {selectedData?.visitors_purpose ?
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
