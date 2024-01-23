import React , {useState,useEffect}from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Row, Col } from 'reactstrap';
import { TextField } from "@mui/material";
import api from 'services/Api';

export default function Referraldialog({ open, handleClose,data,onChange,
    handleFormSubmit }) {

        const [payee,setPayee] = useState('')
        const [patientType,setPatientType] = useState('')
        const [patient,setPatient] = useState('')
        const [bill,setBill] = useState('')

        console.log(patientType,'pt')

        useEffect(()=>{
            handlePayee()
            handlePatientType()
            handlePatient()
            handleBill()
            
            // handleBloodgroups()
          
          },[])
        
          const handlePayee = async () =>{
            const response = await  api.getReferralPersonDetails()
            const {data} = response
            setPayee(data)
            console.log(data,"data")
          }
        
          const handlePatientType = async () =>{
            const response = await  api.getPatientTypeDetails()
            const {data} = response
            setPatientType(data)
            console.log(data,"data")
          }
        
          const handlePatient = async () =>{
            const response = await  api.getAllPatients()
            const {data} = response
            setPatient(data)
            console.log(data,"data")
          }

          const handleBill = async () => {
          const response = await api.getReferralPaymentDetails()
          const {data} = response
          setBill(data)  
          console.log(data,"data")       
         }

         const handleClickOpen = () => {
            //dialog open
            setOpenDialog(true)
          }
        
          const handleDialogClose = () => {
            //dialog close
            setOpenDialog(false)
          }

    return (
        <div>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <div>
                        <select style={{ width: "20%", height: "30px" }}
              id="patient_id"
              value={data.patient_id}
              onChange={e=>onChange(e)} >
                            <option>select</option>
                            {patient &&
                patient.map((patients) => (
                  <option key={patients.id} value={patients.id}>
                    {patients.patient_name}
                  </option>
                ))}
                        </select>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <Row>
                       <label>Patient Type</label>
                       <br />
                       <select style={{ width: "100%", height: "30px" }} id="patient_type" >
                        <option>select</option>
                        {patientType && patientType.map((type) => (
                    <option key={type.name} value={type.name}>
                      {type.name}  
                    </option>
                  ))}
                       </select>
                    </Row>
                    <br />
                    <Row>
                        <label>Bill No/Case ID</label>
                        <br />
                        <select id="billing_id" >
                            <option>select</option>
                            {bill && bill.map((bills) => (
                    <option key={bills.name} value={bills.name}>
                      {bills.Bill_No}  
                    </option>
                  ))}
                        </select>
                    </Row>
                    <br />
                    <Row>
                        <label>Patient Bill Amount</label>
                        <br />
                        <input value={data.bill_amount} id="bill_amount" onChange={e=>onChange(e)} ></input>
                    </Row>
                    <br />
                    <Row>
                    <label>Payee</label>
                    <br />
                        <select id="referral_person_id" >
                            <option>select</option>
                            {payee && payee.map((pay) => (
                    <option key={pay.name} value={pay.name}>
                      {pay.name}
                    </option>
                  ))}
                        </select>
                    </Row>
                    <br />
                    <Row>
                        <label>Commission Percentage</label>
                        <br />
                        <input value={data.percentage} id="percentage" onChange={e=>onChange(e)} ></input>
                    </Row>
                    <br />
                    <Row>
                        <label>Commission Amount</label>
                        <br />
                        <input value={data.amount} id="amount" onChange={e=>onChange(e)} ></input>
                    </Row>
                </DialogContent>
                <DialogActions>
                    <button className='btn btn-danger' onClick={handleClose}>Cancel</button>
                    <button className='btn-mod' autoFocus onClick={() => handleFormSubmit()} >
                        Save
                    </button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

