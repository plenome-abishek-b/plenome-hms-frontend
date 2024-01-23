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

export default function SetupRadiologyUnitDialog({
  open,
  handleClose,
  data,
  getRadiologyunit,
  selectedData
}) {
  const [openUnitTypeDialog, setOpenUnitTypeDialog] = React.useState(false)
  const [formData,setFormData] = useState({
   unit_name:'',
   unit_type:'radio'
  })
  const [validate,setValidate] = useState(false)
  const handleFormSubmit =async () =>{
    try {
      if(formData?.unit_name === '' || formData?.unit_name === undefined){
           setValidate(true)
           setTimeout(() =>{
            setValidate(false)
           },3000)
      }else{
        const data = {
          unit_name:formData.unit_name,
          unit_type:'radio'
        }
        console.log(data,"formData");
         
        // window.location.reload()
      const response = await api.postSetupRadiologyUnit(data)
      console.log(response,"res");
      // if(response.data){
        setFormData({unit_name:''})
        getRadiologyunit()
        handleClose()

      }
    } catch (error) {
      console.log(error);
      getRadiologyunit()
      handleClose()
    }
  // }
  }
  const handleFormSubmitUpdate = async () =>{
    const data = {
      ...formData,id:selectedData?.id
    }
    const response = await api.patchSetupRadiologyUnit(data)
    getRadiologyunit()
  }
  useEffect(() => {
    // When selectedData changes, update the form data
    if (selectedData) {
      setFormData({
        unit_name: selectedData.unit_name || "",
  
      });
    } else {
      // Reset form data when selectedData is not available (for addition)
      setFormData({
        unit_name:""
      });
    }
  }, [selectedData]);
  const handleChange = (e) =>{
    const {name,value} = e.target
    setFormData({
      ...formData,
      [name]:value
    })
  }
  

  const handleClickOpen = () => {
    //dialog open
    setOpenUnitTypeDialog(true)
  }

  const handleDialogClose = () => {
    //dialog close
    setOpenUnitTypeDialog(false)
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
          Add Unit Type
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">
          <Container>
            <Row>
                <label>Unit</label>
                <br />
                <input name="unit_name" placeholder={validate? "fill the unit name":""} onChange={handleChange} value={formData.unit_name} type="text" style={{borderColor:validate? 'red' :'inherit'}}></input>
            </Row>
          </Container>
        </DialogContent>
        <DialogActions>
          {selectedData?.unit_name ?<button
            className="btn-mod bg-soft btn-md"
            onClick={()=>handleFormSubmitUpdate(handleClose())}
            style={{ marginRight: "3%" }}
          >
            Saves
          </button>:
          <button
          className="btn-mod bg-soft btn-md"
          onClick={()=>handleFormSubmit()}
          style={{ marginRight: "3%" }}
        >
          Save
        </button>}
        </DialogActions>
      </Dialog>
    </div>
  )
}
