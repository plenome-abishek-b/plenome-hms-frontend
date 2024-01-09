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

export default function SetupBedListDialog({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
}) {


  const [openSetupBedDialog, setOpenSetupBedDialog] = React.useState(false)
  const [bedType, setBedType] = useState('')
  const [bedGroup, setBedGroup] = useState('')

  console.log(bedType, 'bed type');
  console.log(bedGroup, 'bed grp');

  useEffect(() => {
    getTypeBed()
    getGroupBed()
  }, [])


  const getTypeBed = async () => {
    const response = await api.getBedTypeSetup()
    const { data } = response
    console.log(data, "kkkkkkkkkkkkkkkkkkk")
    setBedType(data)
  }

  const getGroupBed = async () => {
    const response = await api.getBedGroupSetup()
    const { data } = response
    console.log(data, "kkkkkkkkkkkkkkkkkkk")
    setBedGroup(data)
  }

  const handleClickOpen = () => {
    //dialog open
    setOpenSetupBedDialog(true)
  }

  const handleDialogClose = () => {
    //dialog close
    setOpenSetupBedDialog(false)
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
        <Label>Name</Label>
            <input
            type="text"
            style={{height: '30px'}} value={data.name} id="name" onChange={e=>onChange(e)}
            >
            </input>
        </Row>
        <br />
        <Row className="p-2">
        <label>Bed Type</label>
        <br />
            <select style={{height: '30px'}} value={data.bed_type_id} id="bed_type_id" onChange={e=>onChange(e)} >
                <option>select</option>
                {bedType &&
                bedType.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
            </select>
        </Row>
        <br />
        <Row className="p-2">
        <label>Bed Group</label>
        <br />
            <select style={{height: '30px'}} value={data.bed_group_id} id="bed_group_id" onChange={e=>onChange(e)} >
            <option>select</option>
            {bedGroup &&
                bedGroup.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.bed_group_name}
                  </option>
                ))}
            </select>
        </Row>
        <br />
        <input type="checkbox"></input>
        &nbsp; <label>Mark as unused</label>
        </DialogContent>
        <DialogActions>
          <button className="btn-mod bg-soft btn-md" onClick={() => handleFormSubmit(handleClose())} style={{marginRight: '3%'}}>
            Save
          </button>
        </DialogActions>
      </Dialog>
    </div>
  )
}