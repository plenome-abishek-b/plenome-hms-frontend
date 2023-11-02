import * as React from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col, Container } from "reactstrap"
import { TextField } from "@material-ui/core"
import TextareaAutosize from "@mui/base/TextareaAutosize"
import PatientDialog from "pages/Appointment/Dialog/PatientDialog"
import { useEffect } from "react"
import api from "services/Api"
import { useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

export default function ChargeDialog({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
}) {
  const [openCrDialog, setOpenCrDialog] = React.useState(false)
  const [chargeType,setChargeType] = useState([])
  const[charge_catgory,setChargeCategory] = useState([])
  const [chargeName,setChargeName] = useState([])
 useEffect(()=>{
  handleCharges()
 },[])
 const {ipdno} =useParams()
 const [formValue,setaFormValue] = useState({
   charge_type:'',
   charge_catgory:'',
   charge_id:'',
   standard_charge:'',
   tpa_charge:'',
   qty:'',
   amount:'',
   tax:'',
   ipd_id:ipdno,
   apply_charge:'',
   note:'',
   date:'',
   created_at:'2012-11-12 11:11:11'
 })
const handleCharges = async() =>{
   const response = await api.getIpdChargeType()
   console.log(response,"charge ype")
   const {data} = response
   setChargeType(data)
   console.log(data,"handle Charge ... ... ...")
}
const handleCharge_category = async ()=>{
   const response = await api.getIpdChargeCategory(formValue.charge_type)
   const {data} = response
   setChargeCategory(data)
   console.log(data,"charge_categoryyyyy")
}

const handleChargeName = async ()=>{
  const response = await api.getIpdChargeName(formValue.charge_catgory)
  const {data} = response
  setChargeName(data)
  console.log(data,"category name ..")
}
const handleSubmit = async () =>{
  const response = await api.postCharges(formValue)
}
console.log(formValue,"wwww")

  const handleClickOpen = () => {
    //dialog open
    setOpenCrDialog(true)
  }

  const handleDialogClose = () => {
    //dialog close
    setOpenCrDialog(false)
  }
  const handleChange = (event)=>{
   const {name,value} = event.target
   setaFormValue({
    ...formValue,[name]:value
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
        Add Charges
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">
          <Row>
            <Col lg='3' sm='12'>
                <label>Charge Type</label>
                <br />
                <select style={{width: '100%', height: '30px'}} name="charge_type" onChange={handleChange} value={formValue.charge_type}>
                  <option>Select</option>
                  {chargeType && chargeType.map((val=>(
                    <option key={val.id} value={val.id}>{val.charge_type}</option>
                  )))}
                </select>
            </Col>
            <Col lg='3' sm='12'>
                <label>Charge Category</label>
                <br />
                <select style={{width: '100%', height: '30px'}} onClick={()=>handleCharge_category()} name="charge_catgory" onChange={handleChange} value={formValue.charge_catgory}>
                  <option >Select</option>
                  {charge_catgory && charge_catgory.map((val=>(
                    <option key={val.id} value={val.id}>{val.name}</option>
                  )))}

                </select>
            </Col>
            <Col lg='3' sm='12'>
                <label>Charge Name</label>
                <br />
                <select name="charge_id" style={{width: '100%', height: '30px'}} onClick={()=>handleChargeName()} onChange={handleChange} value={formValue.charge_id}>
                    <option>Select</option>
                    {chargeName && chargeName.map((val=>(
                      <option key={val.id} value={val.id}>{val.name}</option>
                    )))}
                </select>
            </Col>
            <Col lg='3' sm='12'>
                <label>Standard Charge(₹)</label>
                <br />
                <input placeholder="" name="standard_charge" onChange={handleChange} value={formValue.standard_charge} style={{width: '100%', height: '30px'}}></input>
            </Col>
            <Col lg='3' sm='12'>
                <label className="mt-2">TPA Charge(₹)</label>
                <br />
                <input name="tpa_charge" onChange={handleChange} value={formValue.tpa_charge} placeholder="" style={{width: '100%', height: '30px'}}></input>
            </Col>
            <Col lg='3' sm='12'>
                <label className="mt-2">Qty</label>
                <br />
                <input placeholder="" name="qty" onChange={handleChange} value={formValue.qty} style={{width: '100%', height: '30px'}}></input>
            </Col>
          </Row>
          <br />
          <Row className="mt-4">
            <Col>
                <label>Total(₹)</label>
            </Col>
            <Col>
                <input type="text" name="apply_charge" onChange={handleChange} value={formValue.apply_charge} style={{border: 'none', borderBottom: '1px solid gray', textAlign: 'end', width: '100%'}} placeholder="0"></input>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
                <label>Tax(₹)</label>
            </Col>
            <Col>
                <input type="text" name="tax" onChange={handleChange} value={formValue.tax} style={{border: 'none', borderBottom: '1px solid gray', textAlign: 'end', width: '100%'}} placeholder="0"></input>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
                <label>Net Amount(₹)</label>
            </Col>
            <Col>
                <input name="amount" onChange={handleChange} value={formValue.amount} type="text" style={{border: 'none', borderBottom: '1px solid gray', textAlign: 'end', width: '100%'}} placeholder="0"></input>
            </Col>
            
          </Row>
          <br />
          <Row>
            <Col lg='9'>
                <label>Charge Note</label>
                <br />
                <textarea name="note" onChange={handleChange} value={formValue.note} style={{width: '100%'}}></textarea>
            </Col>
            <Col lg='3'>
                <label>Date</label>
                <br />
                <input name="date" onChange={handleChange} value={formValue.date} placeholder="" type="date" style={{width:'100%', height: '30px'}}></input>
            </Col>
          </Row>
        </DialogContent> 
        <DialogActions>
          <button className="btn btn-primary bg-soft btn-md" onClick={()=>handleSubmit(handleClose())} style={{marginRight: '3%'}}>
            Save
          </button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
