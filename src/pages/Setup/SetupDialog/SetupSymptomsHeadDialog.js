import React , {useState,useEffect}from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col, Container, Label, Input } from "reactstrap"
import { TextField } from "@material-ui/core"
import TextareaAutosize from "@mui/base/TextareaAutosize"
import PatientDialog from "pages/Appointment/Dialog/PatientDialog"
import api from "services/Api"

export default function SetupSymptomsDialog({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
}) {
  const [openSetupSupplierDialog, setOpenSetupSupplierDialog] = React.useState(false)
  const [symptomType,setSymptomType] = useState('')

  console.log(symptomType, 'sym')

  useEffect(() => {
    SymptomType()
  }, [])


  const SymptomType = async () => {
    const response = await api.getSymptomTypeSetup()
    const { data } = response
    console.log(data, "kkkkkkkkkkkkkkkkkkk")
    setSymptomType(data)
  }

  const handleClickOpen = () => {
    //dialog open
    setOpenSetupSupplierDialog(true)
  }

  const handleDialogClose = () => {
    //dialog close
   setOpenSetupSupplierDialog(false)
  }
console.log(symptomType,"type")
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
        Add Symptoms Head
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">   
        <Container className="p-2">
            <Row>
                <label>Symptoms Head</label>
                <br />
               <input value={data.symptoms_title} id="symptoms_title" onChange={e=>onChange(e)} ></input>
                
            </Row>
            <br />
            <Row>
                <label>Symptoms Type</label>
                <br />
                <select style={{height:'30px'}} value={data.type} id="type" onChange={e=>onChange(e)} >
                <option>select</option>
                {symptomType &&
                symptomType.map((head) => (
                  <option key={head.id} value={head.id}>
                    {head.symptoms_type}
                  </option>
                ))}
                </select>
            </Row>
            <br />
            <Row>
                <label>Description</label>
                <br />
                <textarea rows={6} value={data.description} id="description" onChange={e=>onChange(e)} ></textarea>
            </Row>
        </Container>
        </DialogContent>
        <DialogActions>
          <button className="btn btn-primary bg-soft btn-md" onClick={()=>handleFormSubmit(handleClose())} style={{marginRight: '3%'}}>
            Save
          </button>
        </DialogActions>
      </Dialog>
    </div>
  )
}