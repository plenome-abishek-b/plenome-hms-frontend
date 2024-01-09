import * as React from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col, Container, Label, Input, CardBody, Card } from "reactstrap"
import { TextField } from "@material-ui/core"
import TextareaAutosize from "@mui/base/TextareaAutosize"
import PatientDialog from "pages/Appointment/Dialog/PatientDialog"
import { useEffect } from "react"
import { useState } from "react"
import api from "services/Api"

export default function SetupFindingCategoryDialog({
  open,
  handleClose,
  data,
  onChange,
  // handleFormSubmit,
  getFindingCategory,
  selectedData
}) {
  const [openFindingCategoryDialog, setOpenFindingCategoryDialog] = React.useState(false)
  const [formData,setFormData] = useState({})
  const [validation,setValidation] = useState(false)
  const handleClickOpen = () => {
    //dialog open
    setOpenFindingCategoryDialog(true)
  }

  const handleDialogClose = () => {
    //dialog close
    setOpenFindingCategoryDialog(false)
  }
  const handleUpdateSubmit = async () =>{
    const newData = {
      ...formData,id:selectedData?.id
    }
   const response = await api.patchSetup_Finding_Category(newData)
   const {data} = response
   getFindingCategory()
  }
  const handleFormSubmit = async () =>{
    try {
      
      if(formData.category === ''){
        setValidation(true)
        setTimeout(() => {
          setValidation(false);
        }, 3000);
      }else{
        console.log(formData,"f");
        const response = await api.postSetup_Finding_Category(formData)
       getFindingCategory()
      //  handleClose()
      //  setValidation(false);
      }
    } catch (error) {
       getFindingCategory()
      handleClose()
    }

  }
  useEffect(() => {
    // When selectedData changes, update the form data
    if (selectedData) {
      setFormData({
        category: selectedData?.category || "",
      });
    } else {
      // Reset form data when selectedData is not available (for addition)
      setFormData({
        category: "",
      });
    }
  }, [selectedData]);
  const handleChange = async (e) =>{
   const {name,value} = e.target
   console.log(name,value);
   setFormData({...formData,[name]:value})
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
          Add Finding category
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">
          <Container className="p-2">
            <Row>
                <label>Finding Category&nbsp;<span style={{color: 'red'}}>*</span></label>
                <br />
                <input type="text" name="category" value={formData?.category} placeholder={validation? "enter categoryname":''} onChange={handleChange} style={{ height: '30px', borderColor: validation ? 'red' : 'inherit'}} className={validation ? 'red-text-input' : ''}></input>

            </Row>
          </Container>
        </DialogContent>
        <DialogActions>
         {selectedData?.category ? <button
            className="btn-mod bg-soft btn-md"
            onClick={()=>handleUpdateSubmit(handleClose())}
            style={{ marginRight: "3%" }}
          >
            Saves
          </button> :
          <button
          className="btn-mod bg-soft btn-md"
          onClick={()=>handleFormSubmit()}
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
