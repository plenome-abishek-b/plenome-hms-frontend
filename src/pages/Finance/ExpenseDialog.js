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

export default function ExpenseDialog({ open, handleClose }) {
const [expenseHead,setExpenseHead] = useState([])
const [formData,setFormData] = useState({
    name:'',
    exp_head_id:'',
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

const handleSubmit =async () =>{
const response = await api.postFinanceModuleExpenses(formData)
const {data} = response
console.log(data,"ressss")
}
const getExpenseHead =async () =>{
  const response = await api.getExpenceHead()
  const {data} = response
  setExpenseHead(data)
  console.log(data,"res")
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
                    Add Expense Details
                </DialogTitle>
                <DialogContent>
                <Row>
                        <Col>
                            <label>Expense Head</label>
                            <br />
                            <select name="exp_head_id" value={formData.exp_head_id} onChange={handleChangle} onClick={getExpenseHead} style={{width: '100%', height: '30px'}}>
                                <option>select</option>
                                {expenseHead && expenseHead.map((val=>(
                                    <option key={val.id} value={val.id}>{val.exp_category}</option>
                                )))}
                            </select>
                        </Col>
                           <Col>
                            <label>Name</label>
                            <br />
                            <input name="name" onChange={handleChangle} value={formData.name} style={{width: '100%', height: '30px'}}></input>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <label>Invoice No</label>
                            <br />
                            <input type="number" name="invoice_no" onChange={handleChangle} value={formData.invoice_no} style={{width: '100%', height: '30px'}}></input>
                        </Col>
                        <Col>
                            
                            <label>Today Date</label>
                            <br />
                            <input type='date' name="date" onChange={handleChangle} value={formData.date} style={{width: '100%', height: '30px'}}></input>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <label>Amount</label>
                            <br />
                            <input type="number" name="amount" onChange={handleChangle} value={formData.amount} style={{width: '100%', height: '30px'}}></input>
                        </Col>
                        <Col>
                            <label>Attach Document</label>
                            <br />
                            <input type='file' name="documents" onChange={handleChangle} value={formData.documents} style={{width: '100%', height: '30px'}}></input>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        
                        <label>Description</label>
                        <br />
                        <textarea name="note" onChange={handleChangle} value={formData.note} type="text" style={{width: '100%', height: '60px'}}></textarea>
                        
                    </Row>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleClose} className='btn btn-danger'>Cancel</button>
                    <button onClick={()=>handleSubmit(handleClose())} autoFocus className='btn btn-primary'>
                        Submit
                    </button>
                </DialogActions>
            </Dialog>
        </div>
    );
}