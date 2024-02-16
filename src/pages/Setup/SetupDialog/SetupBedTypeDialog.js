import React , {useState , useEffect} from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col, Container, Label, Input } from "reactstrap"
import { TextField } from "@material-ui/core"
import TextareaAutosize from "@mui/base/TextareaAutosize"
import PatientDialog from "pages/Appointment/Dialog/PatientDialog"
import { select } from "redux-saga/effects"
import api from "services/Api"

export default function SetupBedTypeDialog({
  open,
  handleClose,
 selectedData,
 getBedTypeList
}) {
  const [openSetupBedtypeDialog, setOpenSetupBedtypeDialog] = React.useState(false)
  const [formData,setFormData] = useState({
    name:''
  })
  const [validate,setValidate] = useState(false)
  const handleClickOpen = () => {
    //dialog open
    setOpenSetupBedtypeDialog(true)
  }

  const handleDialogClose = () => {
    //dialog close
    setOpenSetupBedtypeDialog(false)
  }
  useEffect(()=>{
   if(selectedData){
    setFormData({
      name:selectedData?.name
    })
   }else{
    setFormData({
      name:''
    })
   }
  },[selectedData])
  const handleChange = (e) =>{
  const {id,value} = e.target
  console.log(id,value,"loging");
  setFormData({
   ...formData,[id]:value
  })
  } 
  const handleFormSubmit =async () =>{
    console.log(formData,"formData");
    if(formData?.name === undefined){
     setValidate(true)
     setTimeout(()=>{
      setValidate(false)
     },3000)
    }else{
      const response = await api?.postSetupBedType(formData)
      const {data} = response
      console.log(data,"submitting");
      getBedTypeList()
      handleClose()
    }
  }
  const handleUpdate = async () =>{
    const data ={
      ...formData,
      id:selectedData?.id
    }
    console.log(data,"updateing");
    const response = await api.updateSetup_bed_Type(data)
    getBedTypeList()
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
        <DialogTitle id="alert-dialog-title" className="bg-primary bg-soft text-primary">
        Add Bed Type
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">   
            <Row className="p-2">
                <label>Name <span style={{color: 'red'}}>*</span></label>
                <br />
                <input style={{height: '30px',borderColor:validate?'red':''}} placeholder={validate? 'Enter name':''} type="text" value={formData.name} id="name" onChange={handleChange} ></input>
            </Row>
        </DialogContent>
        <DialogActions>
          {selectedData?.name ? (
          <button className="btn-mod bg-soft btn-md" onClick={() => handleUpdate()} style={{marginRight: '3%'}}>
     Save
          </button>
          ):(
            <button className="btn-mod bg-soft btn-md" onClick={() => handleFormSubmit()} style={{marginRight: '3%'}}>
     Save
          </button>
          )}
           
        </DialogActions>
      </Dialog>
    </div>
  )
}