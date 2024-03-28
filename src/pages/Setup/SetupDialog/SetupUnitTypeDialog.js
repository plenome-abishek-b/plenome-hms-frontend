import * as React from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col, Container, Label, Input, CardBody, Card } from "reactstrap"
import { TextField } from "@material-ui/core"
import TextareaAutosize from "@mui/base/TextareaAutosize"
import PatientDialog from "pages/Appointment/Dialog/PatientDialog"
import api from "services/Api"
import { toast, Toaster } from "react-hot-toast"
import { useEffect } from "react"
import { useState } from "react"
 
export default function SetupUnitTypeDialog({
  open,
  handleClose,
  selectedData,
  getUnit
}) {
  console.log(selectedData,"selectedData")
  const [openUnitTypeDialog, setOpenUnitTypeDialog] = React.useState(false)
  const [formData,setFormData] = useState({
    unit:'',
    Hospital_id:1
  })
  const handleChange = async (e) =>{
  const {name,value} = e.target
    setFormData({...formData,[name]:value})
  }
  const handleSubmit = async () =>{
    const response = await api.postUnitType(formData)
    const {data} = response
    // if(data){
      getUnit()
      toast.success("Created Successfully", {
        duration: 3000,
        style: {
            width: "500px",
            backgroundColor: "lightblue",
            fontSize: "15px",
            height: '100px'
        },
    });
    handleClose()
    // }
  }
  const handleUpdate = async () =>{
    const wholedata = {
      ...formData,
      id:selectedData?.id
    }
    const response = await api.updateUnitType(wholedata)
    const {data} = response;
    if(data){
      toast.success("Created Successfully", {
        duration: 3000,
        style: {
            width: "500px",
            backgroundColor: "lightblue",
            fontSize: "15px",
            height: '100px'
        },
    });
        getUnit()
      handleClose()
    }
  }
  useEffect(()=>{
    if(selectedData){
      setFormData({
        ...formData,
        unit:selectedData?.unit
      })
    }
  },[selectedData])
  const handleClickOpen = () => {
    //dialog open
    setOpenUnitTypeDialog(true)
  }
 
  const handleDialogClose = () => {
    //dialog close
    setOpenUnitTypeDialog(false)
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
          Add Unit Type
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">
          <Container>
            <Row>
                <label>Unit<span className="text-danger ms-1">*</span></label>
                <br />
                <input type="text" placeholder="" name="unit" value={formData?.unit} onChange={handleChange} style={{ height: '35px', border: '1px solid rgba(0,0,0,0.2)', borderRadius: '3px' }}></input>
            </Row>
          </Container>
        </DialogContent>
        <DialogActions>
         {selectedData?.unit ?
          (<button
            className="btn-mod bg-soft btn-md"
            onClick={()=>handleUpdate()}
            style={{ marginRight: "3%" }}
          >
            Update
          </button>):(<button
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
