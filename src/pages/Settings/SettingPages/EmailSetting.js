import React, { useState } from "react";
import { Card, CardBody } from "reactstrap";
import { withTranslation } from "react-i18next";
import api from "services/Api";

const EmailSetting = props => {
  const initialEmailValue = {
    smtp_port: '',
    smtp_username: '',
    smtp_password: '',
    smtp_auth: '',
    created_at: '2023-09-09 11:11:11'
  }

  const [emailEngine, setEmailEngine] = useState("select");
  const [formData, setFormData] = useState(initialEmailValue);
  
  const handleEmailEngineChange = event => {
    setEmailEngine(event.target.value);
  };

const onChange = (e) => {
    console.log(e.target.value,"lllll")
    const { value, id } = e.target;
    setFormData({ ...formData, [id]: value });
  };
  
  function handleFormSubmit() {
    api.postEmailSetting(formData).then(resp => {
      console.log(resp,'email response')
    })
  }

  
  

  return (
    <React.Fragment>
      <div className="mt-5 d-flex justify-content-center">
        <Card className="mt-5">
          <CardBody>
            <div className="d-flex justify-content-center">
              <label>Email Engine</label>
            </div>
            <br />
            <div className="d-flex justify-content-center" style={{width: '250px'}}>
              <select
                style={{ width: '100%', height: '30px' }}
                value={emailEngine}
                onChange={handleEmailEngineChange}
              >
                <option value="select">select</option>
                <option value="SendMail">SendMail</option>
                <option value="SMTP">SMTP</option>
              </select>
            </div>
            {emailEngine === "SMTP" && (
              <div className="d-flex flex-column align-items-center" style={{width: '250px'}}>
                <div className="my-2">
                  <label>SMTP Username</label>
                  <br />
                  <input type="text" style={{width: '100%'}} id='smtp_username' onChange={e=>onChange(e)}/>
                </div>
                <div className="my-2">
                  <label>SMTP Password</label>
                  <br />
                  <input type="password" style={{width: '100%'}} id='smtp_password' onChange={e=>onChange(e)}/>
                </div>
                <div className="my-2">
                  <label>SMTP Server</label>
                  <br />
                  <input type="text" style={{width: '100%'}} id='smtp_server' onChange={e=>onChange(e)}/>
                </div>
                <div className="my-2">
                  <label>SMTP Port</label>
                  <br />
                  <input type="text" style={{width: '100%'}} id='smtp_port' onChange={e=>onChange(e)}/>
                </div>
                <div className="my-2">
                  <label>SMTP Security</label>
                  <br />
                  <select style={{width: '100%'}} id="ssl_tls" onChange={e=>onChange(e)}>
                    <option value="off">OFF</option>
                    <option value="ssl">SSL</option>
                    <option value="tsl">TSL</option>
                  </select>
                </div>
                <div className="my-2">
                  <label>SMTP Auth</label>
                  <br />
                  <select style={{width: '100%'}} id="smtp_auth" onChange={e=>onChange(e)}>
                    <option>select</option>
                    <option value="ON">ON</option>
                    <option value="OFF">OFF</option>
                  </select>
                </div>
              </div>
            )}
            <div className="d-flex justify-content-center mt-4">
              <button className="btn-mod" onClick={handleFormSubmit}>Save</button>
            </div>
          </CardBody>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default withTranslation()(EmailSetting);
