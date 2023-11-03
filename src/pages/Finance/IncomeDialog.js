import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Row, Col, Input } from 'reactstrap';
import { TextField } from '@mui/material';
import TextArea from 'antd/es/input/TextArea';
import api from 'services/Api';
import { useState } from 'react';

export default function AlertDialog({ open, handleClose }) {
    const [incomeHead,setIncomeHead] = useState([])

    const [formData,setFormData] = useState({
        name:'',
        inc_head_id:'',
        invoice_no:'',
        date:'',
        amount:'',
        note:'',
        document:'',
        is_deleted:'no',
        generated_by:'1',
        is_active:'yes',
        created_at:'2021-02-20 11:11:11' 
    })
    const handleChangle = (e) =>{
   const {name,value} = e.target
   setFormData({
    ...formData,
    [name]:value
   })
    }
 console.log(formData,"d")
const handleGetIncomeHead = async() =>{
 const response = await api.getIncomeHead()
 const {data} = response
 setIncomeHead(data)
}
const handleSubmit =async () =>{
const response = await api.postFinanceModuleIncome(formData)
const {data} = response
console.log(data,"ressss")
}
    return (
        <div>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" className="text-white fw-bold" style={{backgroundColor: '#377fc7', height: '60px'}} >
                    Add Income details
                </DialogTitle>
                <br />
                <DialogContent>

                    <Row>
                        <Col>
                            <label>Income Head <span className="text-danger">*</span></label>
                            <br />
                            <select onChange={handleChangle} value={formData.inc_head_id} onClick={()=>handleGetIncomeHead()} name="inc_head_id" style={{width: '100%', height: '30px' ,borderRadius: '5px', border: "1px solid grey"}}>
                                <option>select</option>
                                {incomeHead.map((val=>(
                                <option key={val.id} value={val.id}>{val.income_category}</option>
                                )))}
                            </select>
                        </Col>
                        <Col>
                            <label>Name <span className="text-danger">*</span></label>
                            <br />
                            <input name="name" onChange={handleChangle} value={formData.name} style={{width: '100%', height: '30px' ,borderRadius: '5px', border: "1px solid grey"}}></input>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <label>Invoice No</label>
                            <br />
                            <input type="number" name="invoice_no" onChange={handleChangle} value={formData.invoice_no} style={{width: '100%', height: '30px' ,borderRadius: '5px', border: "1px solid grey"}}></input>
                        </Col>
                        <Col>
                            
                            <label>Today Date <span className="text-danger">*</span></label>
                            <br />
                            <input type='date' name="date" onChange={handleChangle} value={formData.date} style={{width: '100%', height: '30px' ,borderRadius: '5px', border: "1px solid grey"}}></input>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <label>Amount <span className="text-danger">*</span></label>
                            <br />
                            <input type="number" name="amount" onChange={handleChangle} value={formData.amount} style={{width: '100%', height: '30px' ,borderRadius: '5px', border: "1px solid grey"}}></input>
                        </Col>
                        <Col>
                            <label>Attach Document</label>
                            <br />
                            <input type='file' name="documents" onChange={handleChangle} value={formData.documents} style={{width: '100%', height: '30px' ,borderRadius: '5px'}}></input>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                        <label>Description</label>
                        <br />
                        <textarea name="note" onChange={handleChangle} value={formData.note} type="text" style={{width: '100%', height: '30px' ,borderRadius: '5px', border: "1px solid grey"}}></textarea>
                        </Col>
                    </Row>
                </DialogContent>
                <DialogActions className='d-flex justify-content-center'>
                    <button className='btn btn-danger fw-bold' onClick={handleClose}>Cancel</button>
                    <button className='btn btn-primary fw-bold' onClick={()=>handleSubmit(handleClose())} autoFocus>
                        Submit
                    </button>
                </DialogActions>
            </Dialog>
        </div>
    );
}