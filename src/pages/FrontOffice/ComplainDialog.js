import * as React from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col, Label, Input } from "reactstrap"
import { InputLabel, TextField } from "@mui/material"
import TextArea from "antd/es/input/TextArea"
import api from "services/Api"
import { useState } from "react"

export default function ComplainDialog({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
}) {
  const [complaintype,setComplaintype] = useState([])
  const [source,setSource] = useState([])
  const getComplainType =async() =>{
  const response = await api.getFrontofficeSetupComplainType()
  const {data} = response
  setComplaintype(data)
  console.log(data,"jresponse")
  }
  const getSource = async () =>{
    const response = await api.getFrontofficeSetupSource()
    const {data} = response
    setSource(data)
  }
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className='text-white fw-bold' style={{backgroundColor: '#92A4FF'}}>Add new Complain</DialogTitle>
        <DialogContent>
          <br />
          <Row>
            <Col>
              <label>Complain Type</label><br/>
              {/* <TextField
                id="complaint_type"
                size="small"
                value={data.complaint_type}
                onChange={e => onChange(e)}
              /> */}
              <select onClick={()=>getComplainType()} style={{width:'100%',height:'30px', border: '1px solid grey', borderRadius: '5px'}}>
                <option>select</option>
                {complaintype && complaintype.map((val=>(
                  <option key={val.complaint_type} value={val.complaint_type}>{val.complaint_type}</option>
                )))}
              </select>
            </Col>
            <Col>
              <label>Complain By <span className="text-danger">*</span></label>
              <br />
              <input
                id="complaint_by"
                size="small"
                value={data.complaint_by}
                onChange={e => onChange(e)}
                style={{width:'100%',height:'30px', border: '1px solid grey', borderRadius: '5px'}}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <label>Complain Type ID</label>
              <br />
              <input
                id="complaint_type_id"
                size="small"
                value={data.complaint_type_id}
                onChange={e => onChange(e)}
                style={{width:'100%',height:'30px', border: '1px solid grey', borderRadius: '5px'}}
              />
            </Col>
            <Col>
              <label>Name</label>
              <br />
              <input
                id="name"
                size="small"
                value={data.name}
                onChange={e => onChange(e)}
                style={{width:'100%',height:'30px', border: '1px solid grey', borderRadius: '5px'}}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <label>Source</label>
              {/* <TextField
                id="source"
                size="small"
                value={data.source}
                onChange={e => onChange(e)}
              /> */}
              <select onClick={()=>getSource()} style={{width:'100%',height:'30px', border: '1px solid grey', borderRadius: '5px'}}>
                <option>select</option>
                {source && source.map((val=>(
                  <option key={val.source} value={val.source}>{val.source}</option>
                )))}
              </select>
            </Col>
            <Col>
              <label>Phone</label>
              <br />
              <input
                id="contact"
                size="small"
                value={data.contact}
                onChange={e => onChange(e)}
                style={{width:'100%',height:'30px', border: '1px solid grey', borderRadius: '5px'}}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <label>Description</label>
              <TextArea
                rows={3}
                placeholder="Description"
                id="description"
                value={data.description}
                onChange={e => onChange(e)}
                style={{width:'100%',height:'60px', border: '1px solid grey', borderRadius: '5px'}}
              />
            </Col>
            <Col>
              <label>Today date</label>
              <br />
              <input
                type="date"
                id="date"
                size="small"
                style={{width:'100%',height:'60px', border: '1px solid grey', borderRadius: '5px'}}
                value={data.date}
                onChange={e => onChange(e)}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <label>Action Taken</label>
              <input
                type="text"
                size="small"
                id="action_taken"
                style={{width:'100%',height:'60px', border: '1px solid grey', borderRadius: '5px'}}
                value={data.action_taken}
                onChange={e => onChange(e)}
              ></input>
            </Col>
            <Col>
              <label>Assigned</label>
              <input
                type="text"
                size="small"
                id="assigned"
                value={data.assigned}
                onChange={e => onChange(e)}
                style={{width:'100%',height:'30px', border: '1px solid grey', borderRadius: '5px'}}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <label>Note</label>
              <br />
              <input
                type="text"
                size="small"
                id="note"
                value={data.note}
                onChange={e => onChange(e)}
                style={{width:'100%',height:'30px', border: '1px solid grey', borderRadius: '5px'}}
              />
            </Col>
            <Col>
              <label>Attach Document</label>
              <input
                type="file"
                size="small"
                id="image"
                value={data.image}
                onChange={e => onChange(e)}
                style={{width:'100%',height:'30px'}}
              />
            </Col>
          </Row>
          <br />
        </DialogContent>
        <DialogActions>
          <button className="btn btn-danger" onClick={handleClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={() => handleFormSubmit()}
            autoFocus
          >
            Submit
          </button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
