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
  const [formData,setFormData] = useState({
    charge_type:"",
    category:"",
    date:"",
    opd_id:"",
    qty:"",
    charge_id:"",
    standard_charge:"",
    tpa_charge:"",
    tax:"",
    apply_charge:"",
    amount:"",
    note:"",
    Hospital_id:1
  })
  const [charges,setCharges] = useState([])
  console.log(chargeCategory,'cname')
  console.log(chargeType,'ctype')



  const handleChange = (e) =>{
    const {id,value} = e.target
    setFormData({...formData,[id]:value})
   }


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
    console.log(formData?.charge_type)
    const response = await  api.getChargeCategoryBychargeType()
    const {data} = response
    setchargeName(data)
    console.log(data,"data")
  }

  const getChargeType = async () => {
    const response = await api.getSetup_chargeType_setup();
    console.log(response, "loging charge type");
    //  setTableData(response.data)
    setchargeType(response.data);
  }
  const getCharge = async () => {
    console.log(formData.charge_type, "id");
    const response = await api.getChargeCategoryBychargeType(formData.charge_type);
    const { data } = response;
    console.log(data, "==");
    setCharge(data);
  };
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
        <DialogTitle id="alert-dialog-title" className="text-white fw-bold" style={{backgroundColor: '#92A4FF', height: '60px'}}>
        Add Charges
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">
          <Row>
            <Col lg='3' sm='12'>
                <label>Charge Type <span className="text-danger">*</span></label>
                <br />
                <select onClick={()=>getChargeType()} style={{width: '100%', height: '30px' , borderRadius: '5px', border: "1px solid grey"}} id='charge_type' onChange={handleChange} value={formData.charge_type} >
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
                <label>Charge Category <span className="text-danger"></span></label>
                <br />
                <select style={{width: '100%', height: '30px' , borderRadius: '5px', border: "1px solid grey"}} id='category' onChange={handleChange} value={formData.category} onClick={()=>getCharge()} >
                    <option >Select</option>
                    {charges && charges.map((charge) => (
                    <option key={charge.id} value={charge.id}>
                      {charge.name}
                    </option>
                  ))}
                </select>
            </Col>
            <Col lg='3' sm='12'>
                <label>Charge Name <span className="text-danger">*</span></label>
                <br />
                <select style={{width: '100%', height: '30px' , borderRadius: '5px', border: "1px solid grey"}} id='charge_id' onChange={handleChange} value={formData.name} onClick={()=>getCharges()} >
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
                <input placeholder="" style={{width: '100%', height: '30px' , borderRadius: '5px', border: "1px solid grey"}} id='standard_charge' onChange={handleChange} value={formData.standard_charge} ></input>
            </Col>
            <Col lg='3' sm='12'>
                <label className="mt-2">TPA Charge(₹)</label>
                <br />
                <input placeholder="" style={{width: '100%', height: '30px' , borderRadius: '5px', border: "1px solid grey"}} id='tpa_charge' onChange={handleChange} value={formData.tpa_charge} ></input>
            </Col>
            <Col lg='3' sm='12'>
                <label className="mt-2">Qty<span className="text-danger">*</span></label>
                <br />
                <input placeholder="" style={{width: '100%', height: '30px' , borderRadius: '5px', border: "1px solid grey"}} id='qty' onChange={handleChange} value={formData.qty} ></input>
            </Col>
          </Row>
          <br />
          <Row className="mt-4">
            <Col>
                <label>Total(₹)</label>
            </Col>
            <Col>
                <input type="text" style={{border: 'none', borderBottom: '1px solid gray', textAlign: 'end', width: '100%' , borderRadius: '5px', border: "1px solid grey"}} placeholder="0"></input>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
                <label>Tax(₹)</label>
            </Col>
            <Col>
                <input type="text" style={{border: 'none', borderBottom: '1px solid gray', textAlign: 'end', width: '100%' , borderRadius: '5px', border: "1px solid grey"}} placeholder="0" id='tax' onChange={handleChange} value={formData.tax} ></input>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
                <label>Net Amount(₹)</label>
            </Col>
            <Col>
                <input type="text" style={{border: 'none', borderBottom: '1px solid gray', textAlign: 'end', width: '100%' , borderRadius: '5px', border: "1px solid grey"}} placeholder="0" id='amount' onChange={handleChange} value={formData.amount} ></input>
            </Col>
            
          </Row>
          <br />
          <Row>
            <Col lg='9'>
                <label>Charge Note</label>
                <br />
                <textarea style={{width: '100%' , borderRadius: '5px', border: "1px solid grey"}} id='note' onChange={handleChange} value={formData.note} ></textarea>
            </Col>
            <Col lg='3'>
                <label>Date <span className="text-danger">*</span></label>
                <br />
                <input placeholder="" type="date" style={{width:'100%', height: '30px' , borderRadius: '5px', border: "1px solid grey"}} id='date' onChange={handleChange} value={formData.date} ></input>
            </Col>
          </Row>
        </DialogContent>
        <DialogActions>
          <button className="btn-mod bg-soft btn-md" onClick={()=>handleFormSubmit()} style={{marginRight: '3%'}}>
            Save
          </button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
