import React, { useEffect, useRef, useState } from "react"

// //Import Scrollbar
import SimpleBar from "simplebar-react"

// MetisMenu
import MetisMenu from "metismenujs"
import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"

const SidebarContentDoctor = props => {
//   console.log(props,"prop")
  // console.log(userData, 'userdata')

  const ref = useRef()
  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {
    const pathName = props.location.pathname
  
    const initMenu = () => {
      new MetisMenu("#side-menu")
      let matchingMenuItem = null
      const ul = document.getElementById("side-menu")
      const items = ul.getElementsByTagName("a")
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i]
          break
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem)
      }
    }
  
    initMenu()
  }, [props.location.pathname])
  

  useEffect(() => {
    ref.current.recalculate()
  })

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300
      }
    }
  }

  function activateParentDropdown(item) {
    item.classList.add("active")
    const parent = item.parentElement
    const parent2El = parent.childNodes[1]
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show")
    }

    if (parent) {
      parent.classList.add("mm-active")
      const parent2 = parent.parentElement

      if (parent2) {
        parent2.classList.add("mm-show") // ul tag

        const parent3 = parent2.parentElement // li tag

        if (parent3) {
          parent3.classList.add("mm-active") // li
          parent3.childNodes[0].classList.add("mm-active") //a
          const parent4 = parent3.parentElement // ul
          if (parent4) {
            parent4.classList.add("mm-show") // ul
            const parent5 = parent4.parentElement
            if (parent5) {
              parent5.classList.add("mm-show") // li
              parent5.childNodes[0].classList.add("mm-active") // a tag
            }
          }
        }
      }
      scrollElement(item)
      return false
    }
    scrollElement(item)
    return false
  }

  return(
    <React.Fragment>
         <SimpleBar className="h-100" ref={ref}>
          <div id="sidebar-menu">

            <ul className="metismenu list-unstyled" id="side-menu">
              <li className="menu-title">{props.t("Menu")} </li>
              
              <li>
                <Link to="/#" className="active">
                  <i className="fas fa-desktop"></i>
                  <span className="ms-2">Dashboard</span>
                </Link>

                {/* <ul className="sub-menu"> */}
                
                  <Link to="/billing">
                    <i className="fas fa-file-invoice"></i>
                    <span>Billing</span>
                  </Link>
               
                <li>
                  <Link to="/appointment">
                    <i className="fas fa-calendar"></i>
                    {props.t("Appointment")}
                  </Link>
                </li>
                <li>
                  <Link to="/opd">
                    <i className="fas fa-stethoscope"></i>
                    {props.t("OPD-Out Patient")}
                  </Link>
                </li>
                <li>
                  <Link to="/ipd">
                    <i className="fas fa-procedures"></i>
                    {props.t("IPD-In Patient")}
                  </Link>
                </li>
                {/* </ul> */}
              </li>
            
              <li>
                <Link to="/pathology">
                  <i className="fas fa-flask"></i>
                  <span>{props.t("Pathology")}</span>
                </Link>
              </li>

              <li>
                <Link to="/radiology">
                  <i className="fas fa-microscope"></i>
                  <span>{props.t("Radiology")}</span>
                </Link>
              </li>
              <li>
                <Link to="/bloodbank">
                  <i className="fas fa-tint"></i>
                  <span>{props.t("Blood Bank")}</span>
                </Link>
              </li>

              <li>
                <Link to="/ambulance" className="">
                  <i className="fas fa-ambulance"></i>
                  <span>{props.t("Ambulance")}</span>
                </Link>
                <li>
                  <Link to="#" className="has-arrow">
                    <i className="fa fa-birthday-cake"></i>
                    <span>{props.t("Birth & Death Record")}</span>
                  </Link>
                  <ul className="sub-menu" style={{ marginLeft: "-6px" }}>
                    <li>
                      <Link to="/birthrecord">{props.t("Birth Record")}</Link>
                    </li>
                    <li>
                      {" "}
                      <Link to="/deathrecord">{props.t("Death Record")}</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/hr">
                    <i className="fas fa-sitemap"></i>
                    <span>{props.t("Human Resource")}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/tpa">
                    <i className="fas fa-umbrella"></i>
                    {props.t("TPA Management")}
                  </Link>
                </li>
                <li>
                  <Link to="#" className="has-arrow">
                    <i className="fas fa-money-bill"></i>
                    {props.t("Finance")}
                  </Link>
                  <ul style={{ marginLeft: "-30px" }}>
                    <li>
                      <Link to="/income">{props.t("Income")}</Link>
                    </li>
                    <li>
                      <Link to="/expenses">{props.t("Expenses")}</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link
                    to="#"
                    className="has-arrow"
                    style={{ pointerEvents: "none" }}
                  >
                    <i className="fas fa-video"></i>
                    <span>{props.t("Live Consultation")}</span>
                  </Link>
                  <ul style={{ marginLeft: "-30px" }}>
                    <li>
                      <Link to="/liveconsult">
                        {props.t("Live Consultation")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/livemeeting">{props.t("Live Meeting")}</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/certificate" style={{ pointerEvents: "none" }}>
                    <i className="far fa-newspaper"></i>
                    {props.t("Certificate")}
                  </Link>
                </li>
                <li>
                  <Link to="#" className="has-arrow">
                    <i className="fas fa-print"></i>
                    {props.t("Reports")}
                  </Link>
                  <ul style={{ marginLeft: "-30px" }}>
                    <li>
                      <Link to="/opdreport">{props.t("OPD Report")}</Link>
                    </li>
                    <li>
                      <Link to="ipdreport">{props.t("IPD Report")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("OPD Balance Report")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("IPD Balance Report")}</Link>
                    </li>
                    <li>
                      <Link to="/opddischargedreport">
                        {props.t("OPD Discharged Report")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/ipddischargedreport">
                        {props.t("IPD Discharged Report")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/bloodreport">
                        {props.t("Blood Issue Report")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/pathologyreport">
                        {props.t("Pathology Report")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/radiologyreport">
                        {props.t("Radiology Report")}
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/message" style={{ pointerEvents: "none" }}>
                    <i className="far fa-envelope"></i>
                    {props.t("Messaging")}
                  </Link>
                </li>
                <li>
                  <Link to="/download">
                    <i className="fas fa-download"></i>
                    {props.t("download")}
                  </Link>
                </li>
                <li>
                  <Link to="#" className="has-arrow">
                    <i className="fas fa-cogs"></i>
                    {props.t("Setup")}
                  </Link>
                  <ul style={{ marginLeft: "-30px" }}>
                    <li>
                      <Link to="/settings">{props.t("Settings")}</Link>
                    </li>
                    <li>
                      <Link to="#" className="has-arrow">
                        {props.t("Hospital Charges")}
                      </Link>
                      <ul style={{ marginLeft: "-30px" }}>
                        <li>
                          <Link to="/setupcharges">{props.t("Charges")}</Link>
                        </li>
                        <li>
                          <Link to="/chargecategory">
                            {props.t("Charge Category")}
                          </Link>
                        </li>
                        <li>
                          <Link to="/charges/chargetype">
                            {props.t("Charge Type")}
                          </Link>
                        </li>
                        <li>
                          <Link to="/taxcategory">
                            {props.t("Tax Category List")}
                          </Link>
                        </li>
                        <li>
                          <Link to="/unittype">{props.t("Unit Type")}</Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link to="/setupbloodbank">{props.t("Blood Bank")}</Link>
                    </li>
                    <li>
                      <Link to="/setupbed" className="has-arrow">
                        {props.t("Bed")}
                      </Link>
                      <ul style={{ marginLeft: "-30px" }}>
                      
                        <li>
                          <Link to="/bed">{props.t("Bed List")}</Link>
                        </li>
                        <li>
                          <Link to="/bedtype">{props.t("Bed Type")}</Link>
                        </li>
                        <li>
                          <Link to="/bedgroup">{props.t("Bed Group")}</Link>
                        </li>
                        <li>
                          <Link to="/floor">{props.t("Floor")}</Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link to="#" className="has-arrow">
                        {props.t("Findings")}
                      </Link>
                      <ul style={{ marginLeft: "-30px" }}>
                        <li>
                          <Link to="/findings">{props.t("Finding")}</Link>
                        </li>
                        <li>
                          <Link to="/findingcategory">
                            {props.t("Findings Category")}
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link to="#" className="has-arrow">
                        {props.t("Pharmacy")}
                      </Link>
                      <ul style={{ marginLeft: "-30px" }}>
                        <li>
                          <Link to="/medicinecategory">
                            {props.t("Medicine Category")}
                          </Link>
                        </li>
                        <li>
                          <Link to="/medicinedosage">
                            {props.t("Medicine Dosage")}
                          </Link>
                        </li>
                        <li>
                          <Link to="/supplier">{props.t("Supplier")}</Link>
                        </li>
                        <li>
                          <Link to="/doseinterval">
                            {props.t("Dose Interval")}
                          </Link>
                        </li>
                        <li>
                          <Link to="/doseduration">
                            {props.t("Dose Duration")}
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link to="#" className="has-arrow">
                        {props.t("Operations")}
                      </Link>
                      <ul style={{ marginLeft: "-30px" }}>
                        <li>
                          <Link to="/setupoperation">
                            {props.t("Operation Category")}
                          </Link>
                        </li>
                        <li>
                          <Link to="/operations">{props.t("Operation")}</Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link to="/pathologysetup" className="has-arrow">
                        {props.t("Pathology")}
                      </Link>
                      <ul style={{ marginLeft: "-30px" }}>
                        <li>
                          <Link to="/pathologysetupunit">
                            {props.t("Pathology Unit")}
                          </Link>
                        </li>
                        <li>
                          <Link to="/pathologyparameter">
                            {props.t("Pathology Parameter")}
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </li>
            </ul>
          </div>
        </SimpleBar>
    </React.Fragment>
  )
}

export default withRouter(withTranslation()(SidebarContentDoctor))