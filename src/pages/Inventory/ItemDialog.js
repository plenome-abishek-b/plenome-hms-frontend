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
                <DialogTitle id="alert-dialog-title" className="text-white fw-bold" style={{backgroundColor: '#92A4FF', height: '60px'}}>
                    Add Item
                </DialogTitle>
                <DialogContent>
                    <br />
                    <Row>

                        <label>Item <span className="text-danger">*</span></label>
                        <br />
                        <input value={data.name} id="name" onChange={e=>onChange(e)} style={{width: '100%', height: '30px' ,borderRadius: '5px', border: "1px solid grey"}}></input>

                    </Row>
                    <br />
                    <Row>

                        <label>Item Category <span className="text-danger">*</span></label>
                        <br />
                        <select value={data.item_category} id="item_category" onChange={e=>onChange(e)} style={{width: '100%', height: '30px' ,borderRadius: '5px', border: "1px solid grey"}} >
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

                        <label>Unit <span className="text-danger">*</span></label>
                        <br />
                        <input value={data.unit} id="unit" onChange={e=>onChange(e)} style={{width: '100%', height: '30px' ,borderRadius: '5px', border: "1px solid grey"}}></input>



                    </Row>
                    <br />
                    <Row>

                        <label>Description <span className="text-danger">*</span></label>
                        <br />
                        <textarea value={data.description} id="description" onChange={e=>onChange(e)} style={{width: '100%', height: '30px' ,borderRadius: '5px', border: "1px solid grey"}}></textarea>

                    </Row>
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