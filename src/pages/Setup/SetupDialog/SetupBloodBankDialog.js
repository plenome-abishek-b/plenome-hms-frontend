import * as React from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col, Container, Label, Input } from "reactstrap"
import { TextField } from "@material-ui/core"
import TextareaAutosize from "@mui/base/TextareaAutosize"
import PatientDialog from "pages/Appointment/Dialog/PatientDialog"
import api from "services/Api"
import { useState } from "react"
import { useEffect } from "react"
import { select } from "redux-saga/effects"

export default function SetupBloodBankDialog({
  open,
  handleClose,
  data,
  onChange,
  selectedData,
  getBloodProduct
}) {
  const [openSetupBbDialog, setOpenSetupBbDialog] = React.useState(false)
  const [formData,setFormData] = useState({
    name:'',
    is_blood_group:''
  })
  const [validate,setValidate] = useState({
    name:'',
    is_blood_group:'',
    Hosptal_id:1
  })
  const handleClickOpen = () => {
    //dialog open
    setOpenSetupBbDialog(true)
  }
  useEffect(()=>{
  if(selectedData){
  setFormData({
    name:selectedData?.name || '',
    is_blood_group:selectedData?.is_blood_group || '',
    Hosptal_id:1
  })
  } else{
    setFormData({
      name:'',
      is_blood_group:'',
      Hosptal_id:1
    })
  }
  },[selectedData])

  const handleDialogClose = () => {
    //dialog close
    setOpenCrDialog(false)
  }
  const handleFormSubmit = async () =>{
    if(formData?.name === ''){
      setValidate({
        ...validate,name:true
      })
      setTimeout(()=>{
        setValidate({
          ...validate,name:false
        })
      },3000)
    }
    else if(formData?.is_blood_group === ''){
      setValidate({
        ...validate,is_blood_group:true
      })
      setTimeout(()=>{
        setValidate({
          ...validate,is_blood_group:false
        })
      },3000)
    }
    else{

      const response = await api.postSetup_bloodBank(formData)
      getBloodProduct()
      handleClose()
    }
  }
  const handleUpdate = async () =>{
    const  newData = {
      ...formData,
      id:selectedData?.id
    }
    if(newData?.name === ''){
      setValidate({
        ...validate,name:true
      })
      setTimeout(()=>{
        setValidate({
          ...validate,name:false
        })
      },3000)
    }
    else if(newData?.is_blood_group === ''){
      setValidate({
        ...validate,is_blood_group:true
      })
      setTimeout(()=>{
        setValidate({
          ...validate,is_blood_group:false
        })
      },3000)
    }
    else{
    const response = await api.updateSetup_bloodBank(newData)
    getBloodProduct()
    handleClose()
    }
  }
  const handleChange = (e) =>{
   const {id,value} = e?.target 
   setFormData({...formData,[id]:value})
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
        Add Products
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">   
        <Row className="p-2">
        <Label>Type</Label>
            <select style={{height: '30px',borderColor:validate?.is_blood_group ? 'red':''}} value={formData?.is_blood_group} id="is_blood_group" onChange={handleChange}>
                <option>select</option>
                <option value="1">Blood Group</option>
                <option value="0">component</option>
            </select>
        </Row>
        <br />
        <Row className="p-2">
        <Label>Name</Label>
            <input
            type="text"
            placeholder={validate?.name ? "enter name":"name"}
            style={{height: '30px',borderColor:validate?.name ? 'red':''}}
            value={formData?.name}
            id="name"
            onChange={handleChange}
            >

            </input>
        </Row>
        </DialogContent>
        <DialogActions>
         {selectedData?.name ? <button className="btn-mod bg-soft btn-md" onClick={()=>handleUpdate()} style={{marginRight: '3%'}}>
            Save
          </button> :
          <button className="btn-mod bg-soft btn-md" onClick={()=>handleFormSubmit()} style={{marginRight: '3%'}}>
          Save
        </button> 
          
        }
        </DialogActions>
      </Dialog>
    </div>
  )
}
