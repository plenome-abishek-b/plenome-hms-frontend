import * as React from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col, Container, Label, Input, CardBody, Card } from "reactstrap"
import { TextField } from "@material-ui/core"
import TextareaAutosize from "@mui/base/TextareaAutosize"
import PatientDialog from "pages/Appointment/Dialog/PatientDialog"

export default function SetupTaxCategoryDialog({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
}) {
  const [openTaxCategoryDialog, setOpenTaxCategoryDialog] = React.useState(false)

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
                <input type="text" placeholder="" id="name" value={data.name} onChange={e=>onChange(e)} style={{ height: '35px',
                  border: "1px solid rgba(0,0,0,0.2)",
                  borderRadius: "3px", }}></input>
            </Row>
            <br />
            <Row>
                <label>Percentage<span className="text-danger">*</span></label>
                <br />
                <input type="number" placeholder="%" id="percentage" value={data.percentage} onChange={e=>onChange(e)} style={{ height: '35px',
                  border: "1px solid rgba(0,0,0,0.2)",
                  borderRadius: "3px",}}></input>
            </Row>
          </Container>
        </DialogContent>
        <DialogActions>
          <button
            className="btn-mod bg-soft btn-md"
            onClick={()=>handleFormSubmit(handleClose())}
            style={{ marginRight: "3%" }}
          >
            Save
          </button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
