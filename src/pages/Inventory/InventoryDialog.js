import React , {useState,useEffect} from 'react';
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

export default function InventoryDialog({ open, handleClose , data,
    onChange,
    handleFormSubmit}) {

        const [openItemStockDialog, setOpenItemStockDialog] = React.useState(false);
        const [itemCategory , setItemCategory] = useState('')
        const [item , setItem] = useState('')
        const [itemSupplier , setItemSupplier] = useState('')
        const [itemStore , setItemStore] = useState('')

        console.log(item,'item');


        useEffect(() => {
            handleItemCategory()
            handleItem()
            handleItemsupplier()
            handleItemStore()
          }, [])



        const handleOpenItemDialog = () => {
            setOpenItemStockDialog(true);
          };
        
          const handleCloseItemDialog = () => {
            setOpenItemStockDialog(false);
          };

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

          const handleItemsupplier = async () =>{
            const response = await  api.getInventoryItemSupplier()
            const {data} = response
            setItemSupplier(data)
            console.log(data,"data")
          }


          const handleItemStore = async () =>{
            const response = await  api.getInventoryItemStore()
            const {data} = response
            setItemStore(data)
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
                <DialogTitle id="alert-dialog-title" className="text-white fw-bold" style={{backgroundColor: '#92A4FF', height: '60px'}}>
                    Add Item stock
                </DialogTitle>
                <br />
                <DialogContent>
                    <Row>
                        <Col>
                            <label>Item Category <span className="text-danger">*</span></label>
                            <br />
                            <select style={{width: '100%', height: '30px' ,borderRadius: '5px', border: "1px solid grey"}} value={data.item_category} id="item_category" onChange={e=>onChange(e)} >
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
                        <label>Item <span className="text-danger">*</span></label>
                            <br />
                            <select style={{width: '100%', height: '30px' ,borderRadius: '5px', border: "1px solid grey"}} value={data.item_id} id="item_id" onChange={e=>onChange(e)} >
                                <option>select</option>
                                {item &&
                item.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
                            </select>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                        <label>Supplier <span className="text-danger">*</span></label>
                            <br />
                            <select style={{width: '100%', height: '30px' ,borderRadius: '5px', border: "1px solid grey"}} value={data.item_supplier} id="item_supplier" onChange={e=>onChange(e)} >
                                <option>select</option>
                                {itemSupplier &&
                itemSupplier.map((itemsupplier) => (
                  <option key={itemsupplier.id} value={itemsupplier.id}>
                    {itemsupplier.item_supplier}
                  </option>
                ))}
                            </select>
                        </Col>
                        <Col>
                        <label>Store</label>
                            <br />
                            <select style={{width: '100%', height: '30px' ,borderRadius: '5px', border: "1px solid grey"}} value={data.item_store} id="item_store" onChange={e=>onChange(e)} >
                                <option>select</option>
                                {itemStore &&
                itemStore.map((itemstore) => (
                  <option key={itemstore.id} value={itemstore.id}>
                    {itemstore.item_store}
                  </option>
                ))}
                            </select>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                        <label>Quantity <span className="text-danger">*</span></label>
                        <br />
                        <input style={{width: '100%', height: '30px' ,borderRadius: '5px', border: "1px solid grey"}} value={data.quantity} id="quantity" onChange={e=>onChange(e)} ></input>
                        </Col>
                        <Col>
                        <label>Purchase price <span className="text-danger">*</span></label>
                        <br />
                        <input style={{width: '100%', height: '30px' ,borderRadius: '5px', border: "1px solid grey"}} value={data.purchase_price} id="purchase_price" onChange={e=>onChange(e)} ></input>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                        <label>Date</label>
                        <br />
                        <input type='date' style={{width: '100%', height: '30px' ,borderRadius: '5px', border: "1px solid grey"}} value={data.date} id="date" onChange={e=>onChange(e)} ></input>
                        </Col>
                        <Col>
                        <label>Description</label>
                        <br />
                        <textarea style={{width: '100%', height: '30px' ,borderRadius: '5px', border: "1px solid grey"}} value={data.description} id="description" onChange={e=>onChange(e)} ></textarea>
                        </Col>
                    </Row>
                    <br />
                    <label>Attach Document</label>
                    <br />
                    <input type='file' style={{width: '100%' , height: '30px'}} value={data.attachment} id="attachment" onChange={e=>onChange(e)} ></input>

                </DialogContent>
                <DialogActions>
                    <button className='btn btn-danger' onClick={handleClose}>Cancel</button>
                    <button className='btn-mod' onClick={() => handleFormSubmit(handleClose())} autoFocus>
                        Submit
                    </button>
                </DialogActions>
            </Dialog>
        </div>
    );
}