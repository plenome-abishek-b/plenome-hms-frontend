import React , {useState , useEffect} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import TextArea from 'antd/es/input/TextArea';
import { Row, Col } from 'reactstrap';
import api from 'services/Api';

export default function IssueItemDialog({ open, handleClose , data,
    onChange,
    handleFormSubmit}) {

        const [itemCategory , setItemCategory] = useState('')
        const [item , setItem] = useState('')
        const [itemUserType , setItemUserType] = useState('')
        const [itemIssueTo , setItemIssueTo] = useState('')

        console.log(itemUserType,'user');
        console.log(itemIssueTo,'issue');


        useEffect(() => {
            handleItemCategory()
            handleItem()
            handleItemUserType()
            handleItemIssueTo()
          }, [])

          const handleItemCategory = async () =>{
            const response = await  api.getInventoryItemCategory()
            const {data} = response
            setItemCategory(data)
            console.log(data,"data")
          }


          const handleItem = async () =>{
            const response = await  api.getInventoryItem()
            const {data} = response
            setItem(data)
            console.log(data,"data")
          }

          const handleItemUserType = async () =>{
            const response = await  api.getInventoryItemUserType()
            const {data} = response
            setItemUserType(data)
            console.log(data,"data")
          }


          const handleItemIssueTo = async () =>{
            const response = await  api.getInventoryItemIssueto()
            const {data} = response
            setItemIssueTo(data)
            console.log(data,"data")
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
                    Add Issue Item
                </DialogTitle>
                <DialogContent>
                   <Row>
                    <Col>
                    <label>User Type</label>
                    <br />
                    <select style={{width: '100%', height: '30px'}} value={data.issue_type} id="issue_type" onChange={e=>onChange(e)} >
                        <option>select</option>
                        {itemUserType &&
                itemUserType.map((usertype) => (
                  <option key={usertype.id} value={usertype.id}>
                    {usertype.name}
                  </option>
                ))}
                    </select>
                    </Col>
                    <Col>
                    <label>Issue To</label>
                    <br />
                    <select style={{width: '100%', height: '30px'}} value={data.issue_to} id="issue_to" onChange={e=>onChange(e)} >
                        <option>select</option>
                        {itemIssueTo &&
                itemIssueTo.map((issueto) => (
                  <option key={issueto.id} value={issueto.id}>
                    {issueto.name}
                  </option>
                ))}
                    </select>
                    </Col>
                    <Col>
                    <label>Issued By</label>
                    <br />
                    <input style={{width: '100%', height: '30px'}} value={data.issue_by} id="issue_by" onChange={e=>onChange(e)} ></input>
                    </Col>
                   </Row>
                    <br />
                    <Row>
                        <Col>
                        <label>Issue Date</label>
                        <br />
                        <input type='date' style={{width: '100%', height: '30px'}} value={data.issue_date} id="issue_date" onChange={e=>onChange(e)} ></input>
                        
                        </Col>
                        <Col>
                        <label>Return Date</label>
                        <br />
                        <input type='date' style={{width: '100%', height: '30px'}} value={data.return_date} id="return_date" onChange={e=>onChange(e)} ></input>
                        </Col>
                        <Col>
                        <label>Note</label>
                        <br />
                        <textarea style={{width: '100%', height: '30px'}} value={data.note} id="note" onChange={e=>onChange(e)} ></textarea>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                        <label>Item Category</label>
                        <br />
                        <select style={{width: '100%', height: '30px'}} value={data.item_category} id="item_category" onChange={e=>onChange(e)} >
                            <option>select</option>
                            {itemCategory &&
                itemCategory.map((cate) => (
                  <option key={cate.id} value={cate.id}>
                    {cate.item_category}
                  </option>
                ))}
                        </select>
                        </Col>
                        <Col>
                        <label>Item</label>
                        <br />
                        <select style={{width: '100%', height: '30px'}} value={data.item_id} id="item_id" onChange={e=>onChange(e)} >
                            <option>select</option>
                            {item &&
                item.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
                        </select>
                        </Col>
                        <Col>
                        <label>Quantity</label>
                        <br />
                        <input style={{width: '100%', height: '30px'}} value={data.quantity} id="quantity" onChange={e=>onChange(e)} ></input>
                        </Col>
                    </Row>
                </DialogContent>
                <DialogActions>
                    <button className='btn btn-danger' onClick={handleClose}>Cancel</button>
                    <button className='btn btn-primary' onClick={() => handleFormSubmit(handleClose())} autoFocus>
                        Submit
                    </button>
                </DialogActions>
            </Dialog>
        </div>
    );
}