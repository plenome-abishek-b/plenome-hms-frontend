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
  selectedData
}) {

  const [bedFloor, setbedFloor] = useState('')
  const [formData,setFormData] = useState({
        name: "",
        color: "",
        description: "",
        floor: "",
        is_active: 0,
        Hospital_id:1
  })
 


  const getFloorCate = async () => {
    const response = await api.getSetup_bed_floor()
    const { data } = response
    console.log(data, "kkkkkkkkkkkkkkkkkkk")
    setbedFloor(data)
  }
   useEffect(()=>{
    if(selectedData){
      setFormData({
        name:selectedData?.name,
        color:selectedData?.color,
        description:selectedData?.description,
        floor:selectedData?.floor,
        Hospital_id:1
      })
    }else{
      
    }
   },[selectedData])

 

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
            <input type="text" style={{height: '30px'}} value={formData.name} id="name" onChange={e=>onChange(e)} ></input>
        </Row>
        <br />
        <Row className="p-2">
            <label>Floor</label>
            <br />
            <select  style={{height: '30px'}} value={formData.floor} id="floor" onChange={e=>onChange(e)} >
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
            <input type="color"  style={{height: '30px'}} value={formData.color} id="color" onChange={e=>onChange(e)} ></input>

        </Row>
        <br />
        <Row className="p-2">
            <label>Description</label>
            <br />
            <textarea style={{height: '50px'}} value={formData.description} id="description" onChange={e=>onChange(e)} ></textarea>
        </Row>
        </DialogContent>
        <DialogActions>
          <button className="btn-mod bg-soft btn-md" onClick={() => handleFormSubmit()} style={{marginRight: '3%'}}>
            Save
          </button>
        </DialogActions>
      </Dialog>
    </div>
  )
}