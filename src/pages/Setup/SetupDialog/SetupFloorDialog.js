import React , {useState , useEffect} from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col, Container, Label, Input } from "reactstrap"
import { TextField } from "@material-ui/core"
import TextareaAutosize from "@mui/base/TextareaAutosize"
import PatientDialog from "pages/Appointment/Dialog/PatientDialog"
import api from "services/Api"

export default function SetupFloorDialog({
  open,
  handleClose,
  selectedData,
  getBedFloor
}) {
  const [openSetupFloorDialog, setOpenSetupFloorDialog] = React.useState(false)
  const [formData,setFormData] = useState({
    name:"",
    description:"",
    Hospital_id:1
  })
  useEffect(()=>{
    if(selectedData){
      setFormData({
        name:selectedData?.name,
        description:selectedData?.description
      })
    }else{
      setFormData({
        name: "",
        description:"",
        Hospital_id:1
      })
    }
  },[selectedData])

  const handleClickOpen = () => {
    //dialog open
    setOpenSetupFloorDialog(true)
  }

  const handleDialogClose = () => {
    //dialog close
    setOpenSetupFloorDialog(false)
  }
  const handleSubmit = async () =>{
    console.log(formData,"formData");
   const response = await api.postSetup_bed_floor(formData)
   getBedFloor()
   handleClose()
  }
  const handleUpdate = async () =>{
    const newData = {
      ...formData,
      id:selectedData?.id
    }
    const response = await api?.updateSetup_bed_floor(newData)
    getBedFloor()
    handleClose()
  }
  const handleChange = (e) =>{
    const {name,value} = e.target
    setFormData({
      ...formData,[name]:value
    })
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
        Add Floor
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">
        <Container className="p-2">
            <Row>
                <label>Name<span style={{color: 'red'}}>*</span></label>
                <br />
                <input style={{height: '30px'}} value={formData.name} name="name" onChange={handleChange} ></input>
            </Row>
            <br />
            <Row>
                <label>Description</label>
                <br />
                <textarea style={{height: '50px'}} value={formData.description} name="description" onChange={handleChange} ></textarea>
            </Row>
        </Container>
        </DialogContent>
        <DialogActions>
          {selectedData?.name ?(
 <button className="btn-mod bg-soft btn-md" onClick={() =>handleUpdate()} style={{marginRight: '3%'}}>
 Save
</button>
          ):(
          <button className="btn-mod bg-soft btn-md" onClick={() => handleSubmit()} style={{marginRight: '3%'}}>
            Save
          </button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  )
}