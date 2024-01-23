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

export default function SetupInventoryCategoryDialog({
  open,
  handleClose,
  // handleSubmit,
  formValue,
  selectedData,
  getInventoryCategory
}) {
  const [openSetupOperationDialog, setOpenSetupOperationDialog] = React.useState(false)
  const [formData,setFormData] = useState({})
  const [validate,setValidate] = useState({
  item_category: false,
  is_active:"yes",
  description: false,
  Hospital_id:1
  })
    
  const handleClickOpen = () => {
    //dialog open
    setOpenSetupOperationDialog(true)
  }
  const handleChange =(e) =>{
    const {name,value} = e.target
    setFormData({...formData,[name]:value})
  }

  const handleDialogClose = () => {
    //dialog close
    setOpenSetupOperationDialog(false)
  }
  useEffect(() => {
    // When selectedData changes, update the form data
    if (selectedData) {
      setFormData({
        item_category: selectedData?.item_category || "",
        is_active: "yes",
        description: selectedData?.description || "",
        Hospital_id:1
      });
    } else {
      // Reset form data when selectedData is not available (for addition)
      setFormData({
        item_category: "",
        is_active:"yes",
        description: "",
        Hospital_id:1
      });
    }
  }, [selectedData]);
  
  const handleSubmit = async () =>{
    if(formData?.item_category === ''){
     setValidate({...validate,item_category:true})
     setTimeout(() => {
      setValidate({...validate,item_category:false});
    }, 10000);
    }
    else if(formData?.description === ''){
     setValidate({...validate,description:true})
     setTimeout(() => {
      setValidate({...validate,description:false})
     }, 10000);
    }else{
      const response = await api?.postSetup_Inventory_Category(formData)
      handleClose()
      getInventoryCategory()
    }
  }
  const handleUpdate = async () =>{
    const newData = {
      ...formData,
      id:selectedData?.id
    }
    const response = await api.patchSetup_Inventory_Category(newData)
    handleClose()
    getInventoryCategory()
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
        Add Inventory Category
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">   
            <Row className="p-2">
                <label>Item Category<span style={{color: 'red'}}>*</span></label>
                <br />
                <input name="item_category" placeholder={validate?.item_category ? "enter item category":""} value={formData?.item_category} onChange={handleChange}  style={{height: '30px',width:'100%',borderColor :validate?.item_category ? 'red':'inherit'}}></input>
            </Row>
            <Row className="p-2">
                <label>Description<span style={{color: 'red'}}>*</span></label>
                <br />
                <input name="description" placeholder={validate?.description ? "enter description":""} value={formData?.description} onChange={handleChange} style={{height: '70px',borderColor :validate?.description ? 'red':'inherit'}}></input>
            </Row>
        </DialogContent>
        <DialogActions>
          {selectedData?.item_category ? 
          <button className="btn-mod bg-soft btn-md" onClick={()=>handleUpdate()} style={{marginRight: '3%'}}>
            Saves
          </button>:
             <button className="btn-mod bg-soft btn-md" onClick={()=>handleSubmit()} style={{marginRight: '3%'}}>
             Save
           </button>
          }
        </DialogActions>
      </Dialog>
    </div>
  )
}
