import React , {useState,useEffect} from 'react';
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

export default function ItemDialog({ open, handleClose , data,
    onChange,
    handleFormSubmit }) {

        const [openItemDialog, setOpenItemDialog] = React.useState(false);
        const [itemCategory , setItemCategory] = useState('')

        useEffect(() => {
            handleCategoryName()
          }, [])

        const handleOpenItemDialog = () => {
            setOpenItemDialog(true);
          };
        
          const handleCloseItemDialog = () => {
            setOpenItemDialog(false);
          };

          const handleCategoryName = async () =>{
            const response = await  api.getInventoryItemCategory()
            const {data} = response
            setItemCategory(data)
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
                    Add Item
                </DialogTitle>
                <DialogContent>
                    <br />
                    <Row>

                        <label>Item</label>
                        <br />
                        <input value={data.name} id="name" onChange={e=>onChange(e)} ></input>

                    </Row>
                    <br />
                    <Row>

                        <label>Item Category</label>
                        <br />
                        <select value={data.item_category} id="item_category" onChange={e=>onChange(e)} >
                            <option>select</option>
                            {itemCategory &&
                itemCategory.map((cate) => (
                  <option key={cate.id} value={cate.id}>
                    {cate.item_category}
                  </option>
                ))}
                        </select>

                    </Row>
                    <br />
                    <Row>

                        <label>Unit</label>
                        <br />
                        <input value={data.unit} id="unit" onChange={e=>onChange(e)} ></input>



                    </Row>
                    <br />
                    <Row>

                        <label>Description</label>
                        <br />
                        <textarea value={data.description} id="description" onChange={e=>onChange(e)} ></textarea>

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