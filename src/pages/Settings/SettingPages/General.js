import React, { useState } from "react"
import { Row, Col, Card, CardBody, Container } from "reactstrap"
import GeneralDialog from "../SettingDialog/GeneralDialog"
import api from "services/Api"

function General() {
  const initialGeneralValue = {
    name: '',
    email: '',
    phone: '',
    address: '',
    start_month: '',
    date_format: '',
    languages: '',
    currency: '',
    currency_symbol: '',
    mini_logo: 'yes',
    cron_secret_key: 'sdsdsdsd',
    doctor_restriction: '',
    superadmin_restriction: '',
    patient_panel: 'xxxxxx',
    mobile_api_url: '',
    app_primary_color_code: 'dssdsd',
    app_secondary_color_code: 'sdsdsd',
    app_logo: 'new',
    zoom_api_key: 'ssss',
    zoom_api_secret: 'sdss',
    created_at: '2023-09-09 11:11:11'
    }

  const [openDialog, setOpenDialog] = useState('')
  const [formData, setFormData] = useState(initialGeneralValue);

  const handleClickOpen = () => {
    setOpenDialog(true);
  }

  const handleClose = () => {
    setOpenDialog(false);
  }

  const onChange = (e) => {
    console.log(e.target.value,"lllll")
    const { value, id } = e.target;
    setFormData({ ...formData, [id]: value });
  };
  
  function handleFormSubmit() {
    api.postGeneralSetting(formData).then(resp => {
      console.log(resp,'general response')
    })
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Row>
          <Col lg="12">
            <Card>
              <CardBody>
                <h4>General Settings</h4>
                <br />
                <Container>
                  <Row>
                    <Col lg="2">
                      <label>Hospital Name</label>
                    </Col>
                    <Col lg="4">
                      <input style={{ width: "100%" }} id="name" onChange={e=>onChange(e)}></input>
                    </Col>
                    <Col lg="2">
                      <label>Hospital Code</label>
                    </Col>
                    <Col lg="4">
                      <input style={{ width: "100%" }}></input>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col lg="2">
                      <label>Address</label>
                    </Col>
                    <Col lg="10">
                      <textarea style={{ width: "100%" }} id="address" onChange={e=>onChange(e)}/>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col lg="2">
                      <label>Phone</label>
                    </Col>
                    <Col lg="4">
                      <input style={{ width: "100%" }} id="phone" onChange={e=>onChange(e)}></input>
                    </Col>
                    <Col lg="2">
                      <label>Email</label>
                    </Col>
                    <Col lg="4">
                      <input style={{ width: "100%" }} id="email" onChange={e=>onChange(e)}></input>
                    </Col>
                  </Row>
                  <br />
                  <hr style={{height: '0.1px'}}/>
                  <br />
                  <Row>
                    <Col lg="2">
                      <label>Hospital Logo</label>
                    </Col>
                    <Col lg="4">
                      <input type="file" style={{ width: "100%" }} onChange={e=>onChange(e)}></input>
                    </Col>
                    <Col lg="2">
                      <label>Hospital Small Logo</label>
                    </Col>
                    <Col lg="4">
                      <input type="file" style={{ width: "100%" }} onChange={e=>onChange(e)}></input>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col lg='2'>
                      <label>Theme</label>
                    </Col>
                    <Col lg='4'>
                      <input type="file" style={{ width: "100%" }} id="theme" onChange={e=>onChange(e)}></input>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <h4>Language</h4>
                    <br />
                    <Col lg="2">
                      <label>Language</label>
                    </Col>
                    <Col lg="4">
                      <input id="languages" onChange={e=>onChange(e)}></input>
                    </Col>
                    <Col lg="2">
                      <label>Language RTL Text Mode</label>
                    </Col>
                    <Col lg="4">
                      <input type="radio"></input>&nbsp;
                      <label>Disabled</label>
                      <br />
                      <input type="radio"></input>&nbsp;
                      <label>Enabled</label>
                    </Col>
                  </Row>
                  <br />
                  <hr style={{height: '0.1px'}}></hr>
                  <br />
                  <Row>
                    <h4>Date Time</h4>
                    <Col lg="6">
                      <label>Date Format</label>
                      <br />
                      <input type="date" style={{ width: "100%" }} id="date_format" onChange={e=>onChange(e)}></input>
                    </Col>

                    <Col lg="6">
                      <label>Time Zone</label>
                      <br />
                      <select style={{ width: "100%" }}>
                        <option value="Hawaii">(GMT-10:00) Hawaii</option>
                        <option value="Alaska">(GMT-09:00) Alaska</option>
                        <option value="Pacific Time (US &amp; Canada)">
                          (GMT-08:00) Pacific Time (US &amp; Canada)
                        </option>
                        <option value="Arizona">(GMT-07:00) Arizona</option>
                        <option value="Mountain Time (US &amp; Canada)">
                          (GMT-07:00) Mountain Time (US &amp; Canada)
                        </option>
                        <option
                          value="Central Time (US &amp; Canada)"
                          selected="selected"
                        >
                          (GMT-06:00) Central Time (US &amp; Canada)
                        </option>
                        <option value="Eastern Time (US &amp; Canada)">
                          (GMT-05:00) Eastern Time (US &amp; Canada)
                        </option>
                        <option value="Indiana (East)">
                          (GMT-05:00) Indiana (East)
                        </option>
                        <option value="" disabled="disabled">
                          -------------
                        </option>
                        <option value="International Date Line West">
                          (GMT-11:00) International Date Line West
                        </option>
                        <option value="Midway Island">
                          (GMT-11:00) Midway Island
                        </option>
                        <option value="Samoa">(GMT-11:00) Samoa</option>
                        <option value="Tijuana">(GMT-08:00) Tijuana</option>
                        <option value="Chihuahua">(GMT-07:00) Chihuahua</option>
                        <option value="Mazatlan">(GMT-07:00) Mazatlan</option>
                        <option value="Central America">
                          (GMT-06:00) Central America
                        </option>
                        <option value="Guadalajara">
                          (GMT-06:00) Guadalajara
                        </option>
                        <option value="Mexico City">
                          (GMT-06:00) Mexico City
                        </option>
                        <option value="Monterrey">(GMT-06:00) Monterrey</option>
                        <option value="Saskatchewan">
                          (GMT-06:00) Saskatchewan
                        </option>
                        <option value="Bogota">(GMT-05:00) Bogota</option>
                        <option value="Lima">(GMT-05:00) Lima</option>
                        <option value="Quito">(GMT-05:00) Quito</option>
                        <option value="Caracas">(GMT-04:30) Caracas</option>
                        <option value="Atlantic Time (Canada)">
                          (GMT-04:00) Atlantic Time (Canada)
                        </option>
                        <option value="La Paz">(GMT-04:00) La Paz</option>
                        <option value="Santiago">(GMT-04:00) Santiago</option>
                        <option value="Newfoundland">
                          (GMT-03:30) Newfoundland
                        </option>
                        <option value="Brasilia">(GMT-03:00) Brasilia</option>
                        <option value="Buenos Aires">
                          (GMT-03:00) Buenos Aires
                        </option>
                        <option value="Georgetown">
                          (GMT-03:00) Georgetown
                        </option>
                        <option value="Greenland">(GMT-03:00) Greenland</option>
                        <option value="Mid-Atlantic">
                          (GMT-02:00) Mid-Atlantic
                        </option>
                        <option value="Azores">(GMT-01:00) Azores</option>
                        <option value="Cape Verde Is.">
                          (GMT-01:00) Cape Verde Is.
                        </option>
                        <option value="Casablanca">(GMT) Casablanca</option>
                        <option value="Dublin">(GMT) Dublin</option>
                        <option value="Edinburgh">(GMT) Edinburgh</option>
                        <option value="Lisbon">(GMT) Lisbon</option>
                        <option value="London">(GMT) London</option>
                        <option value="Monrovia">(GMT) Monrovia</option>
                        <option value="Amsterdam">(GMT+01:00) Amsterdam</option>
                        <option value="Belgrade">(GMT+01:00) Belgrade</option>
                        <option value="Berlin">(GMT+01:00) Berlin</option>
                        <option value="Bern">(GMT+01:00) Bern</option>
                        <option value="Bratislava">
                          (GMT+01:00) Bratislava
                        </option>
                        <option value="Brussels">(GMT+01:00) Brussels</option>
                        <option value="Budapest">(GMT+01:00) Budapest</option>
                        <option value="Copenhagen">
                          (GMT+01:00) Copenhagen
                        </option>
                        <option value="Ljubljana">(GMT+01:00) Ljubljana</option>
                        <option value="Madrid">(GMT+01:00) Madrid</option>
                        <option value="Paris">(GMT+01:00) Paris</option>
                        <option value="Prague">(GMT+01:00) Prague</option>
                        <option value="Rome">(GMT+01:00) Rome</option>
                        <option value="Sarajevo">(GMT+01:00) Sarajevo</option>
                        <option value="Skopje">(GMT+01:00) Skopje</option>
                        <option value="Stockholm">(GMT+01:00) Stockholm</option>
                        <option value="Vienna">(GMT+01:00) Vienna</option>
                        <option value="Warsaw">(GMT+01:00) Warsaw</option>
                        <option value="West Central Africa">
                          (GMT+01:00) West Central Africa
                        </option>
                        <option value="Zagreb">(GMT+01:00) Zagreb</option>
                        <option value="Athens">(GMT+02:00) Athens</option>
                        <option value="Bucharest">(GMT+02:00) Bucharest</option>
                        <option value="Cairo">(GMT+02:00) Cairo</option>
                        <option value="Harare">(GMT+02:00) Harare</option>
                        <option value="Helsinki">(GMT+02:00) Helsinki</option>
                        <option value="Istanbul">(GMT+02:00) Istanbul</option>
                        <option value="Jerusalem">(GMT+02:00) Jerusalem</option>
                        <option value="Kyiv">(GMT+02:00) Kyiv</option>
                        <option value="Minsk">(GMT+02:00) Minsk</option>
                        <option value="Pretoria">(GMT+02:00) Pretoria</option>
                        <option value="Riga">(GMT+02:00) Riga</option>
                        <option value="Sofia">(GMT+02:00) Sofia</option>
                        <option value="Tallinn">(GMT+02:00) Tallinn</option>
                        <option value="Vilnius">(GMT+02:00) Vilnius</option>
                        <option value="Baghdad">(GMT+03:00) Baghdad</option>
                        <option value="Kuwait">(GMT+03:00) Kuwait</option>
                        <option value="Moscow">(GMT+03:00) Moscow</option>
                        <option value="Nairobi">(GMT+03:00) Nairobi</option>
                        <option value="Riyadh">(GMT+03:00) Riyadh</option>
                        <option value="St. Petersburg">
                          (GMT+03:00) St. Petersburg
                        </option>
                        <option value="Volgograd">(GMT+03:00) Volgograd</option>
                        <option value="Tehran">(GMT+03:30) Tehran</option>
                        <option value="Abu Dhabi">(GMT+04:00) Abu Dhabi</option>
                        <option value="Baku">(GMT+04:00) Baku</option>
                        <option value="Muscat">(GMT+04:00) Muscat</option>
                        <option value="Tbilisi">(GMT+04:00) Tbilisi</option>
                        <option value="Yerevan">(GMT+04:00) Yerevan</option>
                        <option value="Kabul">(GMT+04:30) Kabul</option>
                        <option value="Ekaterinburg">
                          (GMT+05:00) Ekaterinburg
                        </option>
                        <option value="Islamabad">(GMT+05:00) Islamabad</option>
                        <option value="Karachi">(GMT+05:00) Karachi</option>
                        <option value="Tashkent">(GMT+05:00) Tashkent</option>
                        <option value="Chennai">(GMT+05:30) Chennai</option>
                        <option value="Kolkata">(GMT+05:30) Kolkata</option>
                        <option value="Mumbai">(GMT+05:30) Mumbai</option>
                        <option value="New Delhi">(GMT+05:30) New Delhi</option>
                        <option value="Kathmandu">(GMT+05:45) Kathmandu</option>
                        <option value="Almaty">(GMT+06:00) Almaty</option>
                        <option value="Astana">(GMT+06:00) Astana</option>
                        <option value="Dhaka">(GMT+06:00) Dhaka</option>
                        <option value="Novosibirsk">
                          (GMT+06:00) Novosibirsk
                        </option>
                        <option value="Sri Jayawardenepura">
                          (GMT+06:00) Sri Jayawardenepura
                        </option>
                        <option value="Rangoon">(GMT+06:30) Rangoon</option>
                        <option value="Bangkok">(GMT+07:00) Bangkok</option>
                        <option value="Hanoi">(GMT+07:00) Hanoi</option>
                        <option value="Jakarta">(GMT+07:00) Jakarta</option>
                        <option value="Krasnoyarsk">
                          (GMT+07:00) Krasnoyarsk
                        </option>
                        <option value="Beijing">(GMT+08:00) Beijing</option>
                        <option value="Chongqing">(GMT+08:00) Chongqing</option>
                        <option value="Hong Kong">(GMT+08:00) Hong Kong</option>
                        <option value="Irkutsk">(GMT+08:00) Irkutsk</option>
                        <option value="Kuala Lumpur">
                          (GMT+08:00) Kuala Lumpur
                        </option>
                        <option value="Perth">(GMT+08:00) Perth</option>
                        <option value="Singapore">(GMT+08:00) Singapore</option>
                        <option value="Taipei">(GMT+08:00) Taipei</option>
                        <option value="Ulaan Bataar">
                          (GMT+08:00) Ulaan Bataar
                        </option>
                        <option value="Urumqi">(GMT+08:00) Urumqi</option>
                        <option value="Osaka">(GMT+09:00) Osaka</option>
                        <option value="Sapporo">(GMT+09:00) Sapporo</option>
                        <option value="Seoul">(GMT+09:00) Seoul</option>
                        <option value="Tokyo">(GMT+09:00) Tokyo</option>
                        <option value="Yakutsk">(GMT+09:00) Yakutsk</option>
                        <option value="Adelaide">(GMT+09:30) Adelaide</option>
                        <option value="Darwin">(GMT+09:30) Darwin</option>
                        <option value="Brisbane">(GMT+10:00) Brisbane</option>
                        <option value="Canberra">(GMT+10:00) Canberra</option>
                        <option value="Guam">(GMT+10:00) Guam</option>
                        <option value="Hobart">(GMT+10:00) Hobart</option>
                        <option value="Melbourne">(GMT+10:00) Melbourne</option>
                        <option value="Port Moresby">
                          (GMT+10:00) Port Moresby
                        </option>
                        <option value="Sydney">(GMT+10:00) Sydney</option>
                        <option value="Vladivostok">
                          (GMT+10:00) Vladivostok
                        </option>
                        <option value="Magadan">(GMT+11:00) Magadan</option>
                        <option value="New Caledonia">
                          (GMT+11:00) New Caledonia
                        </option>
                        <option value="Solomon Is.">
                          (GMT+11:00) Solomon Is.
                        </option>
                        <option value="Auckland">(GMT+12:00) Auckland</option>
                        <option value="Fiji">(GMT+12:00) Fiji</option>
                        <option value="Kamchatka">(GMT+12:00) Kamchatka</option>
                        <option value="Marshall Is.">
                          (GMT+12:00) Marshall Is.
                        </option>
                        <option value="Wellington">
                          (GMT+12:00) Wellington
                        </option>
                        <option value="Nuku'alofa">
                          (GMT+13:00) Nuku'alofa
                        </option>
                      </select>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col lg='2'>
                      <label>Start Month</label>
                    </Col>
                    <Col lg='4'>
                      <input id="start_month" onChange={e=>onChange(e)}></input>
                    </Col>
                  </Row>
                  <hr style={{height: '0.1px'}}></hr>
                  <br />
                  <Row>
                    <h4>Currency</h4>
                    <Col lg="2">
                      <label>Currency</label>
                    </Col>
                    <Col lg="4">
                      <select style={{ width: "100%", height: "30px" }} id="currency" onChange={e=>onChange(e)}>
                        <option>select currency</option>
                        <option value="AFN">AFN</option>
                        <option value="ALL">ALL</option>
                        <option value="DZD">DZD</option>
                        <option value="AOA">AOA</option>
                        <option value="ARS">ARS</option>
                        <option value="AMD">AMD</option>
                        <option value="AWG">AWG</option>
                        <option value="AUD">AUD</option>
                        <option value="AZN">AZN</option>
                        <option value="BSD">BSD</option>
                        <option value="BHD">BHD</option>
                        <option value="BDT">BDT</option>
                        <option value="BBD">BBD</option>
                        <option value="BYR">BYR</option>
                        <option value="BEF">BEF</option>
                        <option value="BZD">BZD</option>
                        <option value="BMD">BMD</option>
                        <option value="BTN">BTN</option>
                        <option value="BTC">BTC</option>
                        <option value="BOB">BOB</option>
                        <option value="BAM">BAM</option>
                        <option value="BWP">BWP</option>
                        <option value="BRL">BRL</option>
                        <option value="GBP">GBP</option>
                        <option value="BND">BND</option>
                        <option value="BGN">BGN</option>
                        <option value="BIF">BIF</option>
                        <option value="KHR">KHR</option>
                        <option value="CAD">CAD</option>
                        <option value="CVE">CVE</option>
                        <option value="KYD">KYD</option>
                        <option value="XOF">XOF</option>
                        <option value="XAF">XAF</option>
                        <option value="XPF">XPF</option>
                        <option value="CLP">CLP</option>
                        <option value="CNY">CNY</option>
                        <option value="COP">COP</option>
                        <option value="KMF">KMF</option>
                        <option value="CDF">CDF</option>
                        <option value="CRC">CRC</option>
                        <option value="HRK">HRK</option>
                        <option value="CUC">CUC</option>
                        <option value="CZK">CZK</option>
                        <option value="DKK">DKK</option>
                        <option value="DJF">DJF</option>
                        <option value="DOP">DOP</option>
                        <option value="XCD">XCD</option>
                        <option value="EGP">EGP</option>
                        <option value="ERN">ERN</option>
                        <option value="EEK">EEK</option>
                        <option value="ETB">ETB</option>
                        <option value="EUR">EUR</option>
                        <option value="FKP">FKP</option>
                        <option value="FJD">FJD</option>
                        <option value="GMD">GMD</option>
                        <option value="GEL">GEL</option>
                        <option value="DEM">DEM</option>
                        <option value="GHS">GHS</option>
                        <option value="GIP">GIP</option>
                        <option value="GRD">GRD</option>
                        <option value="GTQ">GTQ</option>
                        <option value="GNF">GNF</option>
                        <option value="GYD">GYD</option>
                        <option value="HTG">HTG</option>
                        <option value="HNL">HNL</option>
                        <option value="HKD">HKD</option>
                        <option value="HUF">HUF</option>
                        <option value="ISK">ISK</option>
                        <option value="INR">INR</option>
                        <option value="IDR">IDR</option>
                        <option value="IRR">IRR</option>
                        <option value="IQD">IQD</option>
                        <option value="ILS">ILS</option>
                        <option value="ITL">ITL</option>
                        <option value="JMD">JMD</option>
                        <option value="JPY">JPY</option>
                        <option value="JOD">JOD</option>
                        <option value="KZT">KZT</option>
                        <option value="KES">KES</option>
                        <option value="KPW">KPW</option>
                        <option value="KRW">KRW</option>
                        <option value="KWD">KWD</option>
                        <option value="KGS">KGS</option>
                        <option value="LAK">LAK</option>
                        <option value="LVL">LVL</option>
                        <option value="LBP">LBP</option>
                        <option value="LSL">LSL</option>
                        <option value="LRD">LRD</option>
                        <option value="LYD">LYD</option>
                        <option value="LTL">LTL</option>
                        <option value="MOP">MOP</option>
                        <option value="MKD">MKD</option>
                        <option value="MGA">MGA</option>
                        <option value="MWK">MWK</option>
                        <option value="MYR">MYR</option>
                        <option value="MVR">MVR</option>
                        <option value="MRO">MRO</option>
                        <option value="MUR">MUR</option>
                        <option value="MXN">MXN</option>
                        <option value="MDL">MDL</option>
                        <option value="MNT">MNT</option>
                        <option value="MAD">MAD</option>
                        <option value="MZM">MZM</option>
                        <option value="MMK">MMK</option>
                        <option value="NAD">NAD</option>
                        <option value="NPR">NPR</option>
                        <option value="ANG">ANG</option>
                        <option value="NZD">NZD</option>
                        <option value="NIO">NIO</option>
                        <option value="NGN">NGN</option>
                        <option value="KPW">KPW</option>
                        <option value="NOK">NOK</option>
                        <option value="OMR">OMR</option>
                        <option value="PKR">PKR</option>
                        <option value="PAB">PAB</option>
                        <option value="PGK">PGK</option>
                        <option value="PYG">PYG</option>
                        <option value="PEN">PEN</option>
                        <option value="PHP">PHP</option>
                        <option value="PLN">PLN</option>
                        <option value="QAR">QAR</option>
                        <option value="ROL">ROL</option>
                        <option value="RUB">RUB</option>
                        <option value="RWF">RWF</option>
                        <option value="SHP">SHP</option>
                        <option value="WST">WST</option>
                        <option value="STD">STD</option>
                        <option value="SAR">SAR</option>
                        <option value="RSD">RSD</option>
                        <option value="SCR">SCR</option>
                        <option value="SLL">SLL</option>
                        <option value="SGD">SGD</option>
                        <option value="SKK">SKK</option>
                        <option value="SIT">SIT</option>
                        <option value="SBD">SBD</option>
                        <option value="SOS">SOS</option>
                        <option value="ZAR">ZAR</option>
                        <option value="LKR">LKR</option>
                        <option value="SDG">SDG</option>
                        <option value="SRD">SRD</option>
                        <option value="SZL">SZL</option>
                        <option value="SEK">SEK</option>
                        <option value="CHF">CHF</option>
                        <option value="SYP">SYP</option>
                        <option value="TWD">TWD</option>
                        <option value="TJS">TJS</option>
                        <option value="TZS">TZS</option>
                        <option value="THB">THB</option>
                        <option value="TOP">TOP</option>
                        <option value="TTD">TTD</option>
                        <option value="TND">TND</option>
                        <option value="TRY">TRY</option>
                        <option value="TMT">TMT</option>
                        <option value="UGX">UGX</option>
                        <option value="UAH">UAH</option>
                        <option value="AED">AED</option>
                        <option value="USD">USD</option>
                        <option value="UYU">UYU</option>
                        <option value="UZS">UZS</option>
                        <option value="VUV">VUV</option>
                        <option value="VEF">VEF</option>
                        <option value="VND">VND</option>
                        <option value="YER">YER</option>
                        <option value="ZMK">ZMK</option>
                        <option value="ZWD">ZWD</option>
                      </select>
                    </Col>
                    <Col lg="2">
                      <label>Currency Symbol</label>
                    </Col>
                    <Col lg="4">
                      <input style={{ width: "100%", height: "30px" }} id="currency_symbol" onChange={e=>onChange(e)}></input>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col lg="2">
                      <label>Credit Limit</label>
                    </Col>
                    <Col lg="4">
                      <input style={{ width: "100%", height: "30px" }}></input>
                    </Col>
                    <Col lg="2">
                      <label>Time Format</label>
                    </Col>
                    <Col lg="4">
                      <select style={{ width: "100%", height: "30px" }}>
                        <option>select</option>
                        <option>12 Hour</option>
                        <option>24 Hour</option>
                      </select>
                    </Col>
                  </Row>
                  <br />
                  <hr style={{height: '0.1px'}}></hr>
                  <br />
                  <Row>
                    <div>
                      <h4>Mobile App</h4>
                      <div className="d-flex justify-content-end">
                        <button className="btn btn-primary" onClick={handleClickOpen}>
                          Register Your Android App
                        </button>
                      </div>
                      <GeneralDialog open={openDialog} handleClose={handleClose}/>
                    </div>

                    <Col lg="2">
                      <br />
                      <label>Mobile App Api URL</label>
                    </Col>
                    <Col lg="10">
                      <br />
                      <input style={{ width: "100%" }} id="mobile_api_url" onChange={e=>onChange(e)}></input>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col lg='2'>
                      <label>Mobile App Primary Color Code</label>
                    </Col>
                    <Col lg='4'>
                      <input  style={{ width: "100%" }}></input>
                    </Col>
                    <Col lg='2'>
                      <label>Mobile App Secondary Color code</label>
                    </Col>
                    <Col lg='4'>
                      <input  style={{ width: "100%" }}></input>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg='2'>
                      <label>Mobile App Logo</label>
                    </Col>
                    <Col lg='4'>
                      <input type="file"></input>
                    </Col>
                  </Row>
                  <br />
                  <br />
                  <Row>
                    <h4>Miscellaneous</h4>
                    <Col lg='3'>
                      <label>Doctor Restriction Mode</label>
                    </Col>
                    <Col>
                      <input type="radio" id="doctor_restriction" name="doctor-restriction" value="disabled"></input>&nbsp;
                      <label for="doctor_restriction">Disabled</label>
                      <br />
                      <input type="radio" id="doctor_restriction" name="doctor-restriction" value="enabled"></input>&nbsp;
                      <label for="doctor_restriction">Enabled</label>
                    </Col>
                    <Col lg='3'>
                      <label>Super Admin Visibility</label>
                    </Col>
                    <Col>
                      <input type="radio"></input>&nbsp;
                      <label>Disabled</label>
                      <br />
                      <input type="radio"></input>&nbsp;
                      <label>Enabled</label>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                  <Col lg='3'>
                      <label>Patient Panel</label>
                    </Col>
                    <Col>
                      <input type="radio"></input>&nbsp;
                      <label>Disabled</label>
                      <br />
                      <input type="radio"></input>&nbsp;
                      <label>Enabled</label>
                    </Col>
                  </Row>
                  <div className="d-flex justify-content-end">
                    <button className="btn btn-primary" onClick={handleFormSubmit}>Save</button>
                  </div>
                </Container>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  )
}

export default General
