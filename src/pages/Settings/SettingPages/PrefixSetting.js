import React, { useState, useEffect } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Button,
  Label,
  Input,
  FormFeedback,
  Form,
  CardTitle,
  Table,
  Nav,
  NavItem,
  NavLink,
  TabPane,
  TabContent,
  CardText,
} from "reactstrap"

import { Link, withRouter } from "react-router-dom"

import classnames from "classnames"
import api from "services/Api"

const PrefixSetting = () => {

  const [formData, setFormData] = useState('');
  const [datas, setDatas] = useState(null)
  console.log(datas, "prefixessss")

  useEffect(() => {
    getPrefix()
  }, [])

  const getPrefix = async () => {
    const response = await api.getPrefixSetting()
    const { data } = response
    console.log(data, "prefix data")
    setDatas(data)
  }

  const onChange = (e) => {
    console.log(e.target.value,"llll")
    const { value, id } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  console.log(formData,'formdata');
  
  function handleFormSubmit() {
    api.postPrefixSetting(formData).then(resp => {
      console.log(resp,'prefix response')
    })
  }
  return (
    <React.Fragment>
      <div className="page-content">
        <h4 style={{marginLeft: '218px', position: 'relative', bottom: '30px'}}>Prefix Setting</h4>
        <br />
        <Container lg="12" style={{ marginLeft: "18%", position: 'relative', bottom: '50px' }} className="p-3">
          <Row>
            <Col>
              <label>IPD No</label>
              <br />
              <Input
                style={{ width: "60%", }}
                id=""
                placeholder={
                  datas && datas.length > 0 && datas[0].type === "IPD NO"
                    ? datas[0].prefix
                    : "Loading..."
                }
                onChange={e=>onChange(e)}
              ></Input>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <label>OPD No</label>
              <br />
              <Input
                id=""
                placeholder={
                  datas && datas.length > 0 && datas[1].type === "OPD NO"
                    ? datas[1].prefix
                    : "Loading..."
                }
                onChange={e=>onChange(e)}
                style={{ width: "60%" }}
              ></Input>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <label>IPD Prescription</label>
              <br />
              <Input
                id="3"
                // placeholder={
                //   datas &&
                //   datas.length > 0 &&
                //   datas[2].type === "ipd_prescription"
                //     ? datas[2].prefix
                //     : "Loading..."
                // }
                onChange={e=>onChange(e)}
                style={{ width: "60%" }}
              ></Input>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <label>OPD Prescription</label>
              <br />
              <Input  id="4"
                // placeholder={
                //   datas &&
                //   datas.length > 0 &&
                //   datas[3].type === "opd_prescription"
                //     ? datas[3].prefix
                //     : "Loading..."
                // }
                onChange={e=>onChange(e)}
                 style={{ width: "60%" }}></Input>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <label>Appointment</label>
              <br />
              <Input id=""
                placeholder={
                  datas &&
                  datas.length > 0 &&
                  datas[2].type === "APPOINTMENT"
                    ? datas[2].prefix
                    : "Loading..."
                } 
                onChange={e=>onChange(e)}
                style={{ width: "60%" }}></Input>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <label>Pharmacy Bill</label>
              <br />
              <Input id="5"
                // placeholder={
                //   datas &&
                //   datas.length > 0 &&
                //   datas[5].type === "pharmacy_billing"
                //     ? datas[5].prefix
                //     : "Loading..."
                // } 
                onChange={e=>onChange(e)}
                style={{ width: "60%" }}></Input>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <label>Operation Reference No</label>
              <br />
              <Input id="6"
                // placeholder={
                //   datas &&
                //   datas.length > 0 &&
                //   datas[6].type === "operation_theater_reference_no"
                //     ? datas[6].prefix
                //     : "Loading..."
                // } 
                onChange={e=>onChange(e)}
                style={{ width: "60%" }}></Input>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <label>Blood Bank Bill</label>
              <br />
              <Input id="7"
                // placeholder={
                //   datas &&
                //   datas.length > 0 &&
                //   datas[7].type === "blood_bank_billing"
                //     ? datas[7].prefix
                //     : "Loading..."
                // } 
                onChange={e=>onChange(e)}
                style={{ width: "60%" }}></Input>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <label>Ambulance Call Bill</label>
              <br />
              <Input id="8"
                // placeholder={
                //   datas &&
                //   datas.length > 0 &&
                //   datas[8].type === "ambulance_call_billing"
                //     ? datas[8].prefix
                //     : "Loading..."
                // } 
                onChange={e=>onChange(e)}
                style={{ width: "60%" }}></Input>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <label>Radiology Bill</label>
              <br />
              <Input id="9"
                // placeholder={
                //   datas &&
                //   datas.length > 0 &&
                //   datas[9].type === "radiology_billing"
                //     ? datas[9].prefix
                //     : "Loading..."
                // } 
                onChange={e=>onChange(e)}
                style={{ width: "60%" }}></Input>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <label>Pathology Bill</label>
              <br />
              <Input id="10"
                // placeholder={
                //   datas &&
                //   datas.length > 0 &&
                //   datas[10].type === "pathology_billing"
                //     ? datas[10].prefix
                //     : "Loading..."
                // } 
                onChange={e=>onChange(e)}
                style={{ width: "60%" }}></Input>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <label>OPD Checkup ID</label>
              <br />
              <Input id="11"
                // placeholder={
                //   datas &&
                //   datas.length > 0 &&
                //   datas[11].type === "checkup_id"
                //     ? datas[11].prefix
                //     : "Loading..."
                // } 
                onChange={e=>onChange(e)}
                style={{ width: "60%" }}></Input>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <label>Pharmacy Purchase No</label>
              <br />
              <Input id="12"
                // placeholder={
                //   datas &&
                //   datas.length > 0 &&
                //   datas[12].type === "purchase_no"
                //     ? datas[12].prefix
                //     : "Loading..."
                // } 
                onChange={e=>onChange(e)}
                style={{ width: "60%" }}></Input>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <label>Transaction ID</label>
              <br />
              <Input id="13"
                // placeholder={
                //   datas &&
                //   datas.length > 0 &&
                //   datas[13].type === "transaction_id"
                //     ? datas[13].prefix
                //     : "Loading..."
                // } 
                onChange={e=>onChange(e)}
                style={{ width: "60%" }}></Input>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <label>Birth Record Reference No</label>
              <br />
              <Input id="14"
                // placeholder={
                //   datas &&
                //   datas.length > 0 &&
                //   datas[14].type === "birth_record_reference_no"
                //     ? datas[14].prefix
                //     : "Loading..."
                // } 
                onChange={e=>onChange(e)}
                style={{ width: "60%" }}></Input>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <label>Death Record Reference No</label>
              <br />
              <Input  id="15"
                // placeholder={
                //   datas &&
                //   datas.length > 0 &&
                //   datas[15].type === "death_record_reference_no"
                //     ? datas[15].prefix
                //     : "Loading..."
                // } 
                onChange={e=>onChange(e)}
                style={{ width: "60%" }}></Input>
            </Col>
          </Row>
          <br />
          
        </Container>
        <div style={{position: 'absolute', right: '270px',bottom: '80px'}}>
            <button className="btn text-white fw-bold" style={{backgroundColor: '#7070FF'}} onClick={handleFormSubmit}>Save</button>
          </div>
      </div>
    </React.Fragment>
  )
}

export default withRouter(PrefixSetting)
