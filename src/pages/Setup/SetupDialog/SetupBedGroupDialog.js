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

export default function SetupBedGroupDialog({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
}) {
  const [openSetupBedgroupDialog, setOpenSetupBedgroupDialog] = React.useState(false)
  const [bedFloor, setbedFloor] = useState('')

  useEffect(() => {
    getFloorCate()
  }, [])


  const getFloorCate = async () => {
    const response = await api.getBedFloorSetup()
    const { data } = response
    console.log(data, "kkkkkkkkkkkkkkkkkkk")
    setbedFloor(data)
  }


  const handleClickOpen = () => {
    //dialog open
    setOpenSetupBedgroupDialog(true)
  }

  const handleDialogClose = () => {
    //dialog close
    setOpenSetupBedgroupDialog(false)
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
        Add Bed Group
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">   
        <Row className="p-2">
            <label>Name<span style={{color: 'red'}}>*</span></label>
            <br />
            <input type="text" style={{height: '30px'}} value={data.name} id="name" onChange={e=>onChange(e)} ></input>
        </Row>
        <br />
        <Row className="p-2">
            <label>Floor</label>
            <br />
            <select  style={{height: '30px'}} value={data.floor} id="floor" onChange={e=>onChange(e)} >
            <option>select</option>
            {bedFloor &&
                bedFloor.map((floorSet) => (
                  <option key={floorSet.id} value={floorSet.id}>
                    {floorSet.name}
                  </option>
                ))}
            </select>
        </Row>
        <br />
        <Row className="p-2">
            <label>Color</label>
            <br />
            <input type="color"  style={{height: '30px'}} value={data.color} id="color" onChange={e=>onChange(e)} ></input>

        </Row>
        <br />
        <Row className="p-2">
            <label>Description</label>
            <br />
            <textarea style={{height: '50px'}} value={data.description} id="description" onChange={e=>onChange(e)} ></textarea>
        </Row>
        </DialogContent>
        <DialogActions>
          <button className="btn btn-primary bg-soft btn-md" onClick={() => handleFormSubmit(handleClose())} style={{marginRight: '3%'}}>
            Save
          </button>
        </DialogActions>
      </Dialog>
    </div>
  )
}