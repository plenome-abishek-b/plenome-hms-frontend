import * as React from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col, Container } from "reactstrap"
import { TextField } from "@material-ui/core"
import TextareaAutosize from "@mui/base/TextareaAutosize"


export default function OpdPaymentDialog({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
}) {
  const [openCrDialog, setOpenCrDialog] = React.useState(false)

  const handleClickOpen = () => {
    //dialog open
    setOpenCrDialog(true)
  }

  const handleDialogClose = () => {
    //dialog close
    setOpenCrDialog(false)
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
 {console.log(data,"fufu")}
        <DialogTitle id="alert-dialog-title" className="bg-primary bg-soft text-primary">
        Add Payments
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">
          <Row>
            <Col lg='6' sm='12'>
             <label>Date</label>
             <br />
             <input type="text" style={{width: '100%', height: '30px'}} id="payment_date" name="payment_date" onChange={e=>onChange(e)} value={data.payment_date}></input>
            </Col>
            <Col lg='6' sm='12'> 
            <label>Amount(₹)</label>
            <br />
            <input placeholder="100" style={{width: '100%', height: '30px'}} id="amount" onChange={e=>onChange(e)} value={data.amount}></input>
            </Col>
          </Row>
          <br />
          <Row>
            <Col lg='6' sm='12'>
                <label>Payment Mode</label>
                <br />
                <select style={{width: '100%', height: '30px'}} id="payment_mode" name="payment_mode" onChange={e=>onChange(e)} value={data.payment_mode}>
                  <option>select</option>
                    <option value="UPI">UPI</option>
                    <option value="Cash">Cash</option>
                    <option value="Gpay">Gpay</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Online">Online</option>
                </select>
            </Col>
           </Row>
           <br />
           <Row>
           <Col lg='12' sm='12'>
                <label>Note</label>
                <br />
                <textarea style={{width: '100%'}} id="note" onChange={e=>onChange(e)} value={data.note} ></textarea>
            </Col>
           </Row>
        </DialogContent>
        <DialogActions>
          <button className="btn btn-primary bg-soft btn-md" onClick={()=>handleFormSubmit(handleClose())} style={{marginRight: '3%'}}>
            Save
          </button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
