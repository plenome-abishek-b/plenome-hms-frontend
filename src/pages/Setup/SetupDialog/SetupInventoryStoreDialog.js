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

export default function SetupInventoryStoreDialog({
  open,
  handleClose,
  data,
  // onChange,
  // handleFormSubmit,
  getInventoryStore,
  selectedData

}) {
  const [openSetupOperationDialog, setOpenSetupOperationDialog] = React.useState(false)
  const [formValue,setFormValue] = useState({
    item_store:'',
    code:'',
    description:'',
    Hospital_id:1
  })
  const [validate, setValidate] = useState({
    item_store: false,
    code: false,
    description: false,
    Hospital_id:1
  });
  const handleClickOpen = () => {
    //dialog open
    setOpenSetupOperationDialog(true)
  }

  const handleDialogClose = () => {
    //dialog close
    setOpenSetupOperationDialog(false)
  }
  useEffect(() => {
    // When selectedData changes, update the form data
    if (selectedData) {
      setFormValue({
        item_store: selectedData?.item_store || "",
        code: selectedData?.code || "",
        description: selectedData?.description || "",
        Hospital_id:1
      });
    } else {
      // Reset form data when selectedData is not available (for addition)
      setFormValue({
        item_store: "",
        code:"",
        description: "",
        Hospital_id:1
      });
    }
  }, [selectedData]);
  const handleChange =  (e) =>{
    const {value,name} = e.target
    setFormValue({
        ...formValue,
        [name]:value
    })
  }
  const handleSubmit = async () =>{
    if(formValue?.item_store === ''){
    setValidate({...validate,item_store:true})
    setTimeout(() => {
      setValidate({...validate,item_store:false})
    }, 10000);
    }else if(formValue?.code === ''){
      // if(formData?.code){
        setValidate({...validate,code:true})
        setTimeout(() => {
          setValidate({...validate,code:false})
        }, 10000);
    }else if(formValue?.description === ''){
      setValidate({...validate,description:true})
      setTimeout(() => {
        setValidate({...validate,description:false})
      }, 10000);
    }else{
      const response = await api.postSetup_Inventory_store(formValue)
      const {data} = response
      getInventoryStore()
      handleClose()
    }
  }
  const handleUpdate = async () =>{
    const newData = {
      ...formValue,
      id:selectedData?.id
    }
    console.log(newData,"new data only");
    if(newData?.item_store === ''){
      setValidate({...validate,item_store:true})
      setTimeout(() => {
        setValidate({...validate,item_store:false})
      }, 10000);
      }else if(newData?.code === ''){
        // if(formData?.code){
          setValidate({...validate,code:true})
          setTimeout(() => {
            setValidate({...validate,code:false})
          }, 10000);
      }else if(newData?.description === ''){
        setValidate({...validate,description:true})
        setTimeout(() => {
          setValidate({...validate,description:false})
        }, 10000);
      }else{
   const response = await api.updateSetup_Inventory_store(newData)
   getInventoryStore()
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
        <DialogTitle id="alert-dialog-title" className="bg-primary bg-soft text-primary">
        Add Item Story
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">   
            <Row className="p-2">
                <label>Item Store Name<span style={{color: 'red'}}>*</span></label>
                <br />
                <input placeholder={validate?.item_store ? "enter item store":""} onChange={handleChange} name="item_store" value={formValue.item_store} style={{height: '30px',width:'100%',borderColor :validate?.item_store ? 'red':'inherit'}}></input>
            </Row>
            <Row className="p-2">
                <label>Item Store Code<span style={{color: 'red'}}>*</span></label>
                <br />
                <input placeholder={validate?.code ? "enter code":""} onChange={handleChange} name="code" value={formValue.code} style={{height: '30px',width:'100%',borderColor :validate?.code ? 'red':'inherit'}}></input>
            </Row>
            <Row className="p-2">
                <label>description <span style={{color: 'red'}}>*</span></label>
                <br />
                <input placeholder={validate?.description ? "enter discription":""} onChange={handleChange} name="description" value={formValue.description}  style={{height: '70px',borderColor :validate?.description ? 'red':'inherit'}}></input>
            </Row>
        </DialogContent>
        <DialogActions>
          {selectedData?.item_store ? 
          <button className="btn-mod bg-soft btn-md" onClick={()=>handleUpdate()} style={{marginRight: '3%'}}>
            Saves
          </button> :
           <button className="btn-mod bg-soft btn-md" onClick={()=>handleSubmit()} style={{marginRight: '3%'}}>
           Save
         </button>
         }
        </DialogActions>
      </Dialog>
    </div>
  )
}
