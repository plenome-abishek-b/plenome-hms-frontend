import React, { useState, useEffect } from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col } from "reactstrap"
import { TextField } from "@mui/material"
import api from "services/Api"

export default function Referralpersondialog({ open, handleClose, data , onChange,
  handleFormSubmit}) {

    const [category,setCategory] = useState('')

    useEffect(()=>{

      handleCategory()
        
      
      },[])
    
      const handleCategory = async () =>{
        const response = await  api.getReferralCategoryDetails()
        const {data} = response
        setCategory(data)
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
          <h4>Add Person</h4>
        </DialogTitle>
        <DialogContent>
          <Row>
            <Col>
              <Row>
                <Col>
                  <label>Referrer Name</label>
                  <br />
                  <input value={data.name} id="name" onChange={e=>onChange(e)} ></input>
                </Col>
                <Col>
                    <label>Referrer Contact</label>
                    <br />
                    <input value={data.contact} id="contact" onChange={e=>onChange(e)} ></input>
                </Col>
              </Row>
              <Row>
                <Col>
                    <label>Contact Person Name</label>
                    <br />
                    <input value={data.person_name} id="person_name" onChange={e=>onChange(e)} ></input>
                </Col>
                <Col>
                    <label>Contact Person Phone</label>
                    <br />
                    <input value={data.person_phone} id="person_phone" onChange={e=>onChange(e)} ></input>
                </Col>
              </Row>
              <Row>
                <Col>
                    <label>Category</label>
                    <br />
                    <select id="category_id" >
                        <option>select</option>
                        {category && category.map((cats) => (
                    <option key={cats.name} value={cats.name}>
                      {cats.name}  
                    </option>
                  ))}
                    </select>
                </Col>
                <Col>
                    <label>Standard Commission</label>
                    <br />
                    <input value={data.standard_commission} id="standard_commission" onChange={e=>onChange(e)} ></input>
                </Col>
              </Row>
              <Row>
                <label>Address</label>
                <br />
                <input value={data.address} id="address" onChange={e=>onChange(e)} ></input>
              </Row>
            </Col>
            <Col>
                <div>
                    <p>Commission for Modules(%)</p>
                    <Row>
                        <label>OPD</label>
                        <br />
                        <input  ></input>
                    </Row>
                    <br />
                    <Row>
                        <label>IPD</label>
                        <br />
                        <input  ></input>
                    </Row>
                    <br />
                    <Row>
                        <label>Pharmacy</label>
                        <br />
                        <input  ></input>
                    </Row>
                    <br />
                    <Row>
                        <label>Pathology</label>
                        <br />
                        <input  ></input>
                    </Row>
                    <br />
                    <Row>
                        <label>Radiology</label>
                        <br />
                        <input ></input>
                    </Row>
                    <br />
                    <Row>
                        <label>Blood Bank</label>
                        <br />
                        <input  ></input>
                    </Row>
                    <br />
                    <Row>
                        <label>Ambulance</label>
                        <br />
                        <input  ></input>
                    </Row>
                </div>
            </Col>
          </Row>
        </DialogContent>
        <DialogActions>
          <button className="btn btn-danger" onClick={handleClose}>
            Cancel
          </button>
          <button className="btn-mod" autoFocus onClick={() => handleFormSubmit()} >
            Save
          </button>
        </DialogActions>
      </Dialog>
    </div>
  )
}