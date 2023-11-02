import React , {useState,useEffect} from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col, Container } from "reactstrap"
import { TextField } from "@material-ui/core"
import TextareaAutosize from "@mui/base/TextareaAutosize"
import PatientDialog from "pages/Appointment/Dialog/PatientDialog"
import api from "services/Api"

export default function OpdChargeDialog({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
}) {
  const [openCrDialog, setOpenCrDialog] = React.useState(false)
  const [chargeCategory,setchargeCategory] = useState('')
  const [chargeName,setchargeName] = useState('')
  const [chargeType,setchargeType] = useState('')

  console.log(chargeCategory,'cname')
  console.log(chargeType,'ctype')



  useEffect(() => {
    handleChargeCategory()
    handleChargeName()
    handleChargeType()
  }, [])


  const handleClickOpen = () => {
    //dialog open
    setOpenCrDialog(true)
  }

  const handleDialogClose = () => {
    //dialog close
    setOpenCrDialog(false)
  }


  const handleChargeCategory = async () =>{
    const response = await  api.getChargeCategory()
    const {data} = response
    setchargeCategory(data)
    console.log(data,"data")
  }

  const handleChargeName = async () =>{
    const response = await  api.getChargeName()
    const {data} = response
    setchargeName(data)
    console.log(data,"data")
  }

  const handleChargeType = async () =>{
    const response = await  api.getChargeType()
    const {data} = response
    setchargeType(data)
    console.log(data,"data")
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
                <select style={{width: '100%', height: '30px'}} id='charge_type' onChange={e=>onChange(e)} value={data.charge_type} >
                    <option>Select</option>
                    {chargeType && chargeType.map((ctype) => (
                    <option key={ctype.id} value={ctype.id}>
                      {ctype.charge_type}
                    </option>
                  ))}
                </select>
            </Col>
            {console.log(chargeCategory,"charge category")}
            <Col lg='3' sm='12'>
                <label>Charge Category</label>
                <br />
                <select style={{width: '100%', height: '30px'}} id='category' onChange={e=>onChange(e)} value={data.category} >
                    <option >Select</option>
                    {chargeCategory && chargeCategory.map((ccategory) => (
                      
                    <option key={ccategory.id} value={ccategory.id}>
                      {ccategory.name}
                    </option>
                  ))}
                </select>
            </Col>
            <Col lg='3' sm='12'>
                <label>Charge Name</label>
                <br />
                <select style={{width: '100%', height: '30px'}} id='name' onChange={e=>onChange(e)} value={data.name} >
                    <option>Select</option>
                    {chargeName && chargeName.map((cname) => (
                    <option key={cname.id} value={cname.id}>
                      {cname.name}
                    </option>
                  ))}
                </select>
            </Col>
            <Col lg='3' sm='12'>
                <label>Standard Charge(₹)</label>
                <br />
                <input placeholder="" style={{width: '100%', height: '30px'}} id='standard_charge' onChange={e=>onChange(e)} value={data.standard_charge} ></input>
            </Col>
            <Col lg='3' sm='12'>
                <label className="mt-2">TPA Charge(₹)</label>
                <br />
                <input placeholder="" style={{width: '100%', height: '30px'}} id='tpa_charge' onChange={e=>onChange(e)} value={data.tpa_charge} ></input>
            </Col>
            <Col lg='3' sm='12'>
                <label className="mt-2">Qty</label>
                <br />
                <input placeholder="" style={{width: '100%', height: '30px'}} id='qty' onChange={e=>onChange(e)} value={data.qty} ></input>
            </Col>
          </Row>
          <br />
          <Row className="mt-4">
            <Col>
                <label>Total(₹)</label>
            </Col>
            <Col>
                <input type="text" style={{border: 'none', borderBottom: '1px solid gray', textAlign: 'end', width: '100%'}} placeholder="0"></input>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
                <label>Tax(₹)</label>
            </Col>
            <Col>
                <input type="text" style={{border: 'none', borderBottom: '1px solid gray', textAlign: 'end', width: '100%'}} placeholder="0" id='tax' onChange={e=>onChange(e)} value={data.tax} ></input>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
                <label>Net Amount(₹)</label>
            </Col>
            <Col>
                <input type="text" style={{border: 'none', borderBottom: '1px solid gray', textAlign: 'end', width: '100%'}} placeholder="0" id='amount' onChange={e=>onChange(e)} value={data.amount} ></input>
            </Col>
            
          </Row>
          <br />
          <Row>
            <Col lg='9'>
                <label>Charge Note</label>
                <br />
                <textarea style={{width: '100%'}} id='note' onChange={e=>onChange(e)} value={data.note} ></textarea>
            </Col>
            <Col lg='3'>
                <label>Date</label>
                <br />
                <input placeholder="" type="date" style={{width:'100%', height: '30px'}} id='date' onChange={e=>onChange(e)} value={data.date} ></input>
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
