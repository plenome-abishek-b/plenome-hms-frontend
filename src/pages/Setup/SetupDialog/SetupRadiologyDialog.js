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

export default function SetupPathologyDialog({
  open,
  handleClose,
  data,
  onChange,
  getRadiologyCategory,
  selectedData
  // handleFormSubmit,
}) {
  console.log(selectedData,"select");
  const [formData,setFormData] = useState({
    lab_name:'',
  })
  useEffect(() => {
    // When selectedData changes, update the form data
    if (selectedData) {
      setFormData({
        lab_name: selectedData.lab_name || "",
      });
    } else {
      // Reset form data when selectedData is not available (for addition)
      setFormData({
        lab_name: "",
      });
    }
  }, [selectedData]);
  const handleChange = (event) =>{
    
    const {value,name} = event.target
    // if(selectedData){
    //   console.log(value,"val");
    //   selectedData.lab_name = value
    // }else{
      setFormData({
       ...formData, [name]:value
      })
    // }
    
  }
  console.log(formData,"gg")
  const handleFormSubmit = async () =>{
    try {
      
      console.log(formData,"lab");
      // const data ={
      //   lab_name:formData.lab_name,
      //   // id:selectedData.id
      const response = await api.postSetupRadiologyCategory(formData)
      window.location.reload()
      getRadiologyCategory()
      // }
    // if(response.data){
    } catch (error) {
      window.location.reload()

      console.log(error,"error");
    }
  // }
  }
  const handleFormSubmitUpdate =async () =>{
  
    console.log(formData,selectedData,"kkkk");
    const data ={
      lab_name:formData.lab_name,
      id:selectedData.id
    }
    const response = await api.patchSetupRadiologyCategory(data)
    // window.location.reload()
  getRadiologyCategory()
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
        <DialogTitle id="alert-dialog-title" className="bg-primary bg-soft text-primary">
        Add Radiology Category
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">   
        <Container className="p-2">
            <Row>
                <label>Category Name</label>
                <br />
                <input name="lab_name" onChange={handleChange} value={formData.lab_name}></input>
            </Row>
        </Container>
        </DialogContent>
        <DialogActions>
          {selectedData?.lab_name ?
          <button className="btn-mod bg-soft btn-sm" onClick={()=>handleFormSubmitUpdate(handleClose())} style={{marginRight: '3%'}}>
            Saves
          </button> :
          <button className="btn-mod bg-soft btn-sm" onClick={()=>handleFormSubmit(handleClose())} style={{marginRight: '3%'}}>
          Save
        </button>}
        </DialogActions>
      </Dialog>
    </div>
  )
}
