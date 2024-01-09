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

export default function SetupInventorySupplierDialog({
  open,
  handleClose,
  data,
  onChange,
//   handleFormSubmit,
}) {
  const [openSetupOperationDialog, setOpenSetupOperationDialog] = React.useState(false)
  const [formData,setFormData] = useState({
    item_supplier:'',
    phone:'',
    email:'',
    address:'',
    contact_person_name:'',
    contact_person_phone:'',
    contact_person_email:'',
    description:'',
    created_at:'2021-10-22 11:11:11'
  })
  const handleClickOpen = () => {
    //dialog open
    setOpenSetupOperationDialog(true)
  }

  const handleDialogClose = () => {
    //dialog close
    setOpenSetupOperationDialog(false)
  }
  const handleChange =  (e) =>{
   const {value,name} = e.target
    setFormData({
        ...formData,
        [name]:value
    })
  }
  const handleFormSubmit =async () =>{
    const response = await api.postInvestmentSupplier_setup(formData)
    const {data} = response
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
        Add Item Supplier
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">   
            <Row className="p-2">
                <label>Name<span style={{color: 'red'}}>*</span></label>
                <br />
                <input name="item_supplier" onChange={handleChange} value={formData.item_supplier}  style={{height: '30px',width:'100%'}}></input>
            </Row>
            <Row className="p-2">
                <label>Phone<span style={{color: 'red'}}>*</span></label>
                <br />
                <input name="phone" onChange={handleChange} value={formData.phone} style={{height: '30px',width:'100%'}}></input>
            </Row>
            <Row className="p-2">
                <label>Email<span style={{color: 'red'}}>*</span></label>
                <br />
                <input name="email" onChange={handleChange} value={formData.email} style={{height: '30px',width:'100%'}}></input>
            </Row>
            <Row className="p-2">
                <label>Contact Person Name<span style={{color: 'red'}}>*</span></label>
                <br />
                <input name="contact_person_name" onChange={handleChange} value={formData.contact_person_name} style={{height: '30px',width:'100%'}}></input>
            </Row>
            <Row className="p-2">
                <label>Address <span style={{color: 'red'}}>*</span></label>
                <br />
                <input name="address" onChange={handleChange} value={formData.address} style={{height: '70px'}}></input>
            </Row>
            <Row className="p-2">
                <label>Contact Person Phone<span style={{color: 'red'}}>*</span></label>
                <br />
                <input name="contact_person_phone" onChange={handleChange} value={formData.contact_person_phone} style={{height: '30px',width:'100%'}}></input>
            </Row>
            <Row className="p-2">
                <label>Contact Person Email<span style={{color: 'red'}}>*</span></label>
                <br />
                <input name="contact_person_email" onChange={handleChange} value={formData.contact_person_email} style={{height: '30px',width:'100%'}}></input>
            </Row>
            <Row className="p-2">
                <label>Description <span style={{color: 'red'}}>*</span></label>
                <br />
                <input name="description" onChange={handleChange} value={formData.description} style={{height: '70px'}}></input>
            </Row>
        </DialogContent>
        <DialogActions>
          <button className="btn-mod bg-soft btn-md" onClick={()=>handleFormSubmit(handleClose())} style={{marginRight: '3%'}}>
            Save
          </button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
