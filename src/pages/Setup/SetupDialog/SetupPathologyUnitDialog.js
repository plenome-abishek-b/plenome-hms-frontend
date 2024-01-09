import * as React from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col, Container, Label, Input, CardBody, Card } from "reactstrap"
import { TextField } from "@material-ui/core"
import TextareaAutosize from "@mui/base/TextareaAutosize"
import PatientDialog from "pages/Appointment/Dialog/PatientDialog"
import { isEmpty } from "lodash"
import { useEffect } from "react"
import { useState } from "react"
import api from "services/Api"

export default function SetupPathologyUnitDialog({
  open,
  handleClose,
  data,
  onChange,
  // handleFormSubmit,
  getSetupPathoUnit,
  selectedData
}) {
  const [openUnitTypeDialog, setOpenUnitTypeDialog] = React.useState(false)
  const [formData,setFormData] = useState()
  const[validate,setValidate] = useState(false)
  const handleClickOpen = () => {
    //dialog open
    setOpenUnitTypeDialog(true)
  }
  const handleChange = (event) =>{
    const {name,value} = event.target
    console.log(name,"g",value,"val and name");
    setFormData({...formData,[name]:value})
  }

  const handleDialogClose = () => {
    //dialog close
    setOpenUnitTypeDialog(false)
  }
  useEffect(() => {
    // When selectedData changes, update the form data
    if (selectedData) {
      console.log(selectedData,"date consoling");
      setFormData({
        unit_name:selectedData?.unit_name,
        unit_type:selectedData?.unit_type
      });
    } else {
      // Reset form data when selectedData is not available (for addition)
      setFormData({
        unit_name: "",
        unit_type: "patho",
      });
    }
  }, [selectedData]);
  const handleFormSubmitUpdate = async () =>{
    const data = {
      ...formData,id:selectedData?.id
    }
    console.log(data,"weeeeeeeee");
    const updateRadiologyParameter = await api.updateStupPathologyUnit(data)
    console.log(updateRadiologyParameter,"e");
    setFormData({
      unit_name: "",
    unit_type: "patho"})
    getSetupPathoUnit()
  }
  const handleFormSubmit = async () =>{
    console.log(formData,"111111111");
    try {
      if(formData?.unit_name == '' || formData?.unit_name == undefined){
        console.log("calling");
       setValidate(true)
       setTimeout(() => {
        setValidate(false);
      }, 3000);
      }else{
        const datas = {...formData,unit_type:'patho'}
      const response = await api.postSetupPathologyUnit(datas)
      console.log(response,"loging response");
      
      getSetupPathoUnit()
      setFormData({ unit_name: "",unit_type: "patho"})
      }
    } catch (error) {
      console.log(error)
      getSetupPathoUnit()
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
                <input type="text" placeholder={validate? "enter unit name":""} name='unit_name' onChange={handleChange} value={formData?.unit_name} style={{borderColor:validate? 'red':'inherit'}}></input>
            </Row>
          </Container>
        </DialogContent>
        <DialogActions>
         {isEmpty(selectedData) === true ? <button
            className="btn-mod bg-soft btn-md"
            onClick={()=>handleFormSubmit()}
            style={{ marginRight: "3%" }}
          >
            Saves
          </button>:
          <button
          className="btn-mod bg-soft btn-md"
          onClick={()=>handleFormSubmitUpdate(handleClose())}
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
