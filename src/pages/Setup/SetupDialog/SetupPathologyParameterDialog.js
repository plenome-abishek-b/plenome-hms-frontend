import React , {useState,useEffect} from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col, Container, Label, Input } from "reactstrap"
import { TextField } from "@material-ui/core"
import TextareaAutosize from "@mui/base/TextareaAutosize"
import PatientDialog from "pages/Appointment/Dialog/PatientDialog"
import api from "services/Api"

export default function SetupPathologyParameterDialog({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
}) {


  const [openParameterDialog, setOpenParameterDialog] = React.useState(false)
  const [pathUnit,setpathUnit] = useState('')

  console.log(pathUnit,'unit');

  useEffect(() => {
    handlePathoSetupUnit()
  }, [])


  const handlePathoSetupUnit = async () =>{
    const response = await  api.getPathologySetupUnit()
    const {data} = response
    setpathUnit(data)
    console.log(data,"data")
  }

  const handleClickOpen = () => {
    //dialog open
    setOpenParameterDialog(true)
  }

  const handleDialogClose = () => {
    //dialog close
    setOpenParameterDialog(false)
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
          Add Pathology Category
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">
          <Container className="p-2">
            <Row>
              <label>Parameter Name</label>
              <br />
              <input id='parameter_name' onChange={e=>onChange(e)} value={data.parameter_name} ></input>
            </Row>
            <br />
            <Row>
              <label>Reference Range</label>
              <br />
              <input id='reference_range' onChange={e=>onChange(e)} value={data.reference_range} ></input>
            </Row>
            <br />
            <Row>
              <label>Unit</label>
              <br />
              <select id='unit_name' onChange={e=>onChange(e)} value={data.unit_name} >
                <option>select</option>
                {pathUnit && pathUnit.map((pathounit => (
                    <option key={pathounit.id} value={pathounit.id}>
                      {pathounit.unit_name}
                    </option>
                  )))}
              </select>
            </Row>
            <br />
            <Row>
              <label>Description</label>
              <br />
              <input id='description' onChange={e=>onChange(e)} value={data.description} ></input>
            </Row>
          </Container>
        </DialogContent>
        <DialogActions>
          <button
            className="btn btn-primary bg-soft btn-sm"
            onClick={() => handleFormSubmit(handleClose())}
            style={{ marginRight: "3%" }}
          >
            Save
          </button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
