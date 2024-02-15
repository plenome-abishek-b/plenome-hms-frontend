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

export default function SetupInventorySupplierDialog({
  open,
  handleClose,
  data,
  onChange,
  getInventorySupplier,
  selectedData
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
    Hospital_id:1
  })
  const [validate,setValidate] = useState({
    item_supplier:false,
    phone:false,
    email:false,
    address:false,
    contact_person_name:false,
    contact_person_phone:false,
    contact_person_email:false,
    description:false,
    Hospital_id:1
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
  useEffect(() => {
    // When selectedData changes, update the form data
    if (selectedData) {
      setFormData({
        item_supplier: selectedData?.item_supplier || "",
        phone: selectedData?.phone || "",
        email: selectedData?.email || "",
        address: selectedData?.address || "",
        contact_person_name: selectedData?.contact_person_name || "",
        contact_person_phone: selectedData?.contact_person_phone || "",
        contact_person_email: selectedData?.contact_person_email || "",
        description: selectedData?.description || "",
        Hospital_id:1
      });
    } else {
      // Reset form data when selectedData is not available (for addition)
      setFormData({
        item_supplier:'',
        phone:'',
        email:'',
        address:'',
        contact_person_name:'',
        contact_person_phone:'',
        contact_person_email:'',
        description:'',
        Hospital_id:1
      });
    }
  }, [selectedData]);
  const handleFormSubmit =async () =>{
    if(formData?.item_supplier === ''){
      setValidate({...validate,item_supplier:true})
      setTimeout(() => {
        setValidate({...validate,item_supplier:false})
      }, 10000);
    }
    else if(formData?.phone === ''){
      setValidate({...validate,phone:true})
      setTimeout(() => {
        setValidate({...validate,phone:false})
      }, 10000);
    } else if(formData?.email === ''){
      setValidate({...validate,email:true})
      setTimeout(() => {
        setValidate({...validate,email:false})
      }, 10000);
    }else if(formData?.address === ''){
      setValidate({...validate,email:true})
      setTimeout(() => {
        setValidate({...validate,email:false})
      }, 10000);
    }else if(formData?.contact_person_email === ''){
      setValidate({...validate,contact_person_email:true})
      setTimeout(() => {
        setValidate({...validate,contact_person_email:false})
      }, 10000);
    }else if(formData?.contact_person_name === ''){
      setValidate({...validate,contact_person_email:true})
      setTimeout(() => {
        setValidate({...validate,contact_person_email:false})
      }, 10000);
    }else if(formData?.contact_person_phone === ''){
      setValidate({...validate,contact_person_phone:true})
      setTimeout(() => {
        setValidate({...validate,contact_person_phone:false})
      }, 10000);
    }
    else if(formData?.description === ''){
      setValidate({...validate,description:true})
      setTimeout(() => {
        setValidate({...validate,description:false})
      }, 10000);
    }
    else{
      const response = await api.postSetup_Inventory_supplier(formData)
      const {data} = response
      getInventorySupplier()
      handleClose()
    }
  }
  const handleUpdateSubmit = async () =>{
    const newData ={
      ...formData,
      id:selectedData?.id
    }
    const response = await api.updateSetup_Inventory_supplier(newData)
    getInventorySupplier()
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
        Add Item Supplier
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">   
            <Row className="p-2">
                <label>Name<span style={{color: 'red'}}>*</span></label>
                <br />
                <input placeholder={validate?.item_supplier ? "enter item supplier":""} name="item_supplier" onChange={handleChange} value={formData.item_supplier}  style={{height: '30px',width:'100%',borderColor :validate?.item_supplier ? 'red':'inherit', border: '1px solid rgba(0,0,0,0.2)', borderRadius: '3px'}}></input>
            </Row>
            <Row className="p-2">
                <label>Phone<span style={{color: 'red'}}>*</span></label>
                <br />
                <input name="phone" placeholder={validate?.phone? "enter phone number":""} onChange={handleChange} value={formData.phone} style={{height: '30px',width:'100%',borderColor :validate?.phone ? 'red':'inherit', border: '1px solid rgba(0,0,0,0.2)', borderRadius: '3px'}}></input>
            </Row>
            <Row className="p-2">
                <label>Email<span style={{color: 'red'}}>*</span></label>
                <br />
                <input name="email" placeholder={validate?.email ? "enter email":""} onChange={handleChange} value={formData.email} style={{height: '30px',width:'100%',borderColor :validate?.email ? 'red':'inherit', border: '1px solid rgba(0,0,0,0.2)', borderRadius: '3px'}}></input>
            </Row>
            <Row className="p-2">
                <label>Contact Person Name<span style={{color: 'red'}}>*</span></label>
                <br />
                <input name="contact_person_name" placeholder={validate?.contact_person_name ? "enter contact persone name":""} onChange={handleChange} value={formData.contact_person_name} style={{height: '30px',width:'100%',borderColor :validate?.contact_person_name ? 'red':'inherit', border: '1px solid rgba(0,0,0,0.2)', borderRadius: '3px'}}></input>
            </Row>
            <Row className="p-2">
                <label>Address <span style={{color: 'red'}}>*</span></label>
                <br />
                <input name="address" placeholder={validate?.address ? "enter address":""} onChange={handleChange} value={formData.address} style={{height: '70px',borderColor :validate?.contact_person_name ? 'red':'inherit',borderColor :validate?.address ? 'red':'inherit', border: '1px solid rgba(0,0,0,0.2)', borderRadius: '3px'}}></input>
            </Row>
            <Row className="p-2">
                <label>Contact Person Phone<span style={{color: 'red'}}>*</span></label>
                <br />
                <input name="contact_person_phone" placeholder={validate?.contact_person_phone ? "enter contact person phone":""} onChange={handleChange} value={formData.contact_person_phone} style={{height: '30px',width:'100%',borderColor :validate?.contact_person_phone ? 'red':'inherit', border: '1px solid rgba(0,0,0,0.2)', borderRadius: '3px'}}></input>
            </Row>
            <Row className="p-2">
                <label>Contact Person Email<span style={{color: 'red'}}>*</span></label>
                <br />
                <input name="contact_person_email" onChange={handleChange} placeholder={validate?.contact_person_email? "enter contact person email":""} value={formData.contact_person_email} style={{height: '30px',width:'100%',borderColor :validate?.contact_person_email ? 'red':'inherit', border: '1px solid rgba(0,0,0,0.2)', borderRadius: '3px'}}></input>
            </Row>
            <Row className="p-2">
                <label>Description <span style={{color: 'red'}}>*</span></label>
                <br />
                <input name="description" placeholder={validate?.description ? "enter descripiton":""} onChange={handleChange} value={formData.description} style={{height: '70px',borderColor :validate?.description ? 'red':'inherit', border: '1px solid rgba(0,0,0,0.2)', borderRadius: '3px'}}></input>
            </Row>
        </DialogContent>
        <DialogActions>
          {selectedData?.item_supplier ? 
          <button className="btn-mod bg-soft btn-md" onClick={()=>handleUpdateSubmit()} style={{marginRight: '3%'}}>
            update
          </button>: 
          <button className="btn-mod bg-soft btn-md" onClick={()=>handleFormSubmit()} style={{marginRight: '3%'}}>
          Save
        </button>
          }
        </DialogActions>
      </Dialog>
    </div>
  )
}
