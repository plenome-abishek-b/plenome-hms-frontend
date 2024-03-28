import * as React from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col, Container, Label, Input, CardBody, Card } from "reactstrap"
import { TextField } from "@material-ui/core"
import TextareaAutosize from "@mui/base/TextareaAutosize"
import PatientDialog from "pages/Appointment/Dialog/PatientDialog"
import { useState } from "react"
import api from "services/Api"
import { useEffect } from "react"
import toast from "react-hot-toast"

export default function SetupTaxCategoryDialog({
  open,
  handleClose,
  data,
  onChange,
  selectedData,
  getTaxCategory,
  handleFormSubmit,
}) {
  const [openTaxCategoryDialog, setOpenTaxCategoryDialog] = React.useState(false)
  const [formData,setFormData] = useState({
    name: '',
    percentage: '',
    Hospital_id:1
  })
  const handleChange = (e) =>{
   const {name,value} = e.target
   setFormData({...formData,[name]:value})
  }
 const handleSubmit = async () =>{
  const response = await api.postTaxCategory(formData)
  const {data} = response
  console.log(data,'oww')
  // if(data){
    toast.success("created successfully");
    getTaxCategory();
    handleClose();
  // }
  }
  useEffect(()=>{
    if(selectedData){
      setFormData({
        name:selectedData?.name,
        percentage:selectedData?.percentage,
        Hospital_id:1
      })
    }
  },[selectedData])
  const handleUpdate = async () =>{
    const datas = {
      ...formData,
      id:selectedData?.id
    }
    const response = await api.updateTaxCategory(datas)
    const {data} = response;
    if(data){
    toast.success("updated successfully");
      getTaxCategory();
      handleClose();
    }
  }

  const handleClickOpen = () => {
    //dialog open
    setOpenTaxCategoryDialog(true)
  }

  const handleDialogClose = () => {
    //dialog close
    setOpenTaxCategoryDialog(false)
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
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "600px", // Set your width here
            },
          },
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          className="bg-primary text-white"
        >
          Add Tax Category
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">
          <Container>
            <Row>
                <label>Name<span className="text-danger">*</span></label>
                <br />
                <input type="text" placeholder="" name="name" value={formData.name} onChange={handleChange} style={{ height: '35px',
                  border: "1px solid rgba(0,0,0,0.2)",
                  borderRadius: "3px", }}></input>
            </Row>
            <br />
            <Row>
                <label>Percentage<span className="text-danger">*</span></label>
                <br />
                <input type="number" placeholder="%" name="percentage" value={formData.percentage} onChange={handleChange} style={{ height: '35px',
                  border: "1px solid rgba(0,0,0,0.2)",
                  borderRadius: "3px",}}></input>
            </Row>
          </Container>
        </DialogContent>
        <DialogActions>
        {selectedData?.name ?
        ( <button
            className="btn-mod bg-soft btn-md"
            onClick={()=>handleUpdate()}
            style={{ marginRight: "3%" }}
          >
            Update
          </button>):
           ( <button
            className="btn-mod bg-soft btn-md"
            onClick={()=>handleSubmit()}
            style={{ marginRight: "3%" }}
          >
            Save
          </button>)
}
        </DialogActions>
      </Dialog>
    </div>
  )
}
