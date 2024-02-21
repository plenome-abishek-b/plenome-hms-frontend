import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";

// //Import Scrollbar
import SimpleBar from "simplebar-react";

// MetisMenu
import MetisMenu from "metismenujs";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

//i18n
import { withTranslation } from "react-i18next";

const SidebarContent = (props) => {
  const [modules, setModules] = useState([
    { id: 'dashboard', name: 'Dashboard', enabled: true },
    { id: 'billing', name: 'Billing', enabled: true },
  ]);
  

  const handleToggle = (moduleId) => {
    setModules((prevModules) =>
      prevModules.map((module) =>
        module.id === moduleId ? { ...module, enabled: !module.enabled } : module
      )
    );
  };

  // console.log(props,"prop")
  const location = useLocation(); 
  const userData = location.state ? location.state.userData : null;

  // console.log(userData, "userdata");

  const ref = useRef();

  useEffect(() => {
    ref.current.recalculate();
  });

  
  useEffect(() => {
    const pathName = props.location.pathname;

    const initMenu = () => {
      new MetisMenu("#side-menu");
      let matchingMenuItem = null;
      const ul = document.getElementById("side-menu");
      const items = ul.getElementsByTagName("a");
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i];
          break;
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem);
      }
    };

    initMenu();
  }, [props.location.pathname]);

  useEffect(() => {
    ref.current.recalculate();
  });

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }

  function activateParentDropdown(item) {
    item.classList.add("active");
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }

  return (
    <React.Fragment>
      
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            {/* <li className="menu-title">{props.t("Menu")} </li> */}

            <li>
              <Link to="/dashboard">
                <i className="fas fa-desktop"></i>
                <span className="ms-2 fw-bold">Dashboard</span>
              </Link>
            </li>
            {/* <ul className="sub-menu"> */}
            <li className>
              <Link to="/billing">
                <i className="fas fa-file-invoice"></i>
                <span className="ms-2 fw-bold">Billing</span>
              </Link>
            </li>
            <li>
              <Link to="/appointment">
                <i className="fas fa-calendar"></i>
                <span className="ms-2 fw-bold">Appointment</span>
              </Link>
            </li>
            <li>
              <Link to="/opd">
                <i className="fas fa-stethoscope"></i>
                <span className="ms-2 fw-bold">OPD-Out Patient</span>
              </Link>
            </li>
            <li>
              <Link to="/ipd">
                <i className="fas fa-procedures"></i>
                <span className="ms-2 fw-bold">IPD-In Patient</span>
              </Link>
            </li>
            {/* <li>
              <Link to="/pharmacy">
                <i className="fas fa-mortar-pestle"></i>
                <span className="ms-2 fw-bold">Pharmacy</span>
              </Link>
            </li> */}
            {/* </ul> */}

            {/* <li>
              <Link to="/pathology">
                <i className="fas fa-flask"></i>
                <span className="ms-2 fw-bold">Pathology</span>
              </Link>
            </li>

            <li>
              <Link to="/radiology">
                <i className="fas fa-microscope"></i>
                <span className="ms-2 fw-bold">Radiology</span>
              </Link>
            </li>
            <li>
              <Link to="/bloodbank">
                <i className="fas fa-tint"></i>
                <span className="ms-2 fw-bold">Blood Bank</span>
              </Link>
            </li>

            <li>
              <Link to="/ambulance" className="">
                <i className="fas fa-ambulance"></i>
                <span className="ms-2 fw-bold">Ambulance</span>
              </Link>
            </li>
            <li>
              <Link to="/frontoffice">
                <i className="fas fa-hospital-alt"></i>
                <span className="ms-2 fw-bold">Front Office</span>
              </Link>
            </li>
            <li>
              <Link to="#" className="has-arrow">
                <i className="fas fa-birthday-cake"></i>
                <span className="ms-2 fw-bold">Birth & Death Record</span>
              </Link>
              <ul>
                <li>
                  <Link to="/birthrecord">{props.t("Birth Record")}</Link>
                </li>
                <li>
                  <Link to="/deathrecord">{props.t("Death Record")}</Link>
                </li>
              </ul>
            </li> */}
            <li>
              <Link to="/hr">
                <i className="fas fa-sitemap"></i>
                <span className="ms-2 fw-bold">Human Resource</span>
              </Link>
            </li>
            {/* <li>
              <Link to="/tpa">
                <i className="fas fa-umbrella"></i>
                <span className="ms-2 fw-bold">TPA Management</span>
              </Link>
            </li> */}
            {/* <li>
              <Link to="#" className="has-arrow">
                <i className="fas fa-money-bill"></i>
                <span className="ms-2 fw-bold">Finance</span>
              </Link>
              <ul>
                <li>
                  <Link to="/income">{props.t("Income")}</Link>
                </li>
                <li>
                  <Link to="/expenses">{props.t("Expenses")}</Link>
                </li>
              </ul>
            </li> */}
            {/* <li>
              <Link
                to="#"
                className="has-arrow"
                style={{ pointerEvents: "none" }}
              >
                <i className="fas fa-video"></i>
                <span className="ms-2 fw-bold">Live Consultation</span>
              </Link>
              <ul>
                <li>
                  <Link to="/liveconsult">{props.t("Live Consultation")}</Link>
                </li>
                <li>
                  <Link to="/livemeeting">{props.t("Live Meeting")}</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="#" className="has-arrow">
                <i className="far fa-newspaper"></i>
                <span className="ms-2 fw-bold">Certificate</span>
              </Link>
              <ul>
                <li>
                  <Link to="/certificate">{props.t("certificate")}</Link>
                </li>
                <li>
                  <Link to="/Patient_id_card">
                    {props.t("Patient ID Card")}
                  </Link>
                </li>
                <li>
                  <Link to="/Staff_ID_Card">{props.t("Staff ID Card")}</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/referral">
                <i className="fas fa-users"></i>
                <span className="ms-2 fw-bold">Referral</span>
              </Link>
            </li> */}
            <li>
              <Link to="#" className="has-arrow">
                <i className="fas fa-print"></i>
                <span className="ms-2 fw-bold">Reports</span>
              </Link>
              <ul>
                <li>
                  <Link to="/opdreport">{props.t("OPD Report")}</Link>
                </li>
                <li>
                  <Link to="/ipdreport">{props.t("IPD Report")}</Link>
                </li>
                <li>
                  <Link to="/opdbalancereport">
                    {props.t("OPD Balance Report")}
                  </Link>
                </li>
                <li>
                  <Link to="/ipdbalancereport">
                    {props.t("IPD Balance Report")}
                  </Link>
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
                {/* <li>
                  <Link to="/bloodreport">{props.t("Blood Issue Report")}</Link>
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
                <li>
                  <Link to="/dailytransactionreport">
                    {props.t("Daily Transaction Report")}
                  </Link>
                </li>
                <li>
                  <Link to="/alltransactionreport">
                    {props.t("Transaction Report")}
                  </Link>
                </li>
                <li>
                  <Link to="/pharmacybillreport">
                    {props.t("Pharmacy Bill Report")}
                  </Link>
                </li>
                <li>
                  <Link to="/patientbillreport">
                    {props.t("Patient Bill Report")}
                  </Link>
                </li> */}
                {/* <li>
                  <Link to="/incomereport">{props.t("Income Report")}</Link>
                </li>
                <li>
                  <Link to="/expensereport">{props.t("Expense Report")}</Link>
                </li>
                <li>
                  <Link to="/payrollreport">{props.t("Payroll Report")}</Link>
                </li>
                <li>
                  <Link to="/birthreport">{props.t("Birth Report")}</Link>
                </li>
                <li>
                  <Link to="/deathreport">{props.t("Death Report")}</Link>
                </li>
                <li>
                  <Link to="/otreport">{props.t("OT Report")}</Link>
                </li>
                <li>
                  <Link to="/blooddonorreport">
                    {props.t("Blood Donor Report")}
                  </Link>
                </li>
                <li>
                  <Link to="/bloodissuereport">
                    {props.t("Blood Issue Report")}
                  </Link>
                </li>
                <li>
                  <Link to="/staffattendancereport">
                    {props.t("Staff Attendance Report")}
                  </Link>
                </li>
                <li>
                  <Link to="/componentissuereport">
                    {props.t("Component Issue Report")}
                  </Link>
                </li>
                <li>
                  <Link to="/inventorystockreport">
                    {props.t("Inventory Stock Report")}
                  </Link>
                </li>
                <li>
                  <Link to="/inventoryissuereport">
                    {props.t("Inventory Issue Report")}
                  </Link>
                </li>
                <li>
                  <Link to="/inventoryitemreport">
                    {props.t("Inventory Item Report")}
                  </Link>
                </li>
                <li>
                  <Link to="/audittrailreport">
                    {props.t("Audit Trail Report")}
                  </Link>
                </li> */}
                <li>
                  <Link to="/incomegroupreport">
                    {props.t("Income Group Report")}
                  </Link>
                </li>
                <li>
                  <Link to="/expensegroupreport">
                    {props.t("Expense Group Report")}
                  </Link>
                </li>
                {/* <li>
                  <Link to="/tpareport">{props.t("TPA Report")}</Link>
                </li>
                <li>
                  <Link to="/referralreport">{props.t("Referral Report")}</Link>
                </li> */}
                <li>
                  <Link to="/patientvisitreport">
                    {props.t("Patient Visit Report")}
                  </Link>
                </li>
                <li>
                  <Link to="/patientlogincreds">
                    {props.t("Patient Login Credentials")}
                  </Link>
                </li>
                {/* <li>
                  <Link to="/ambulancereport">
                    {props.t("Ambulance Call Report")}
                  </Link>
                </li> */}
              </ul>
            </li>
            {/* <li>
              <Link to="/inventory">
                <i className="fas fa-luggage-cart"></i>
                <span className="ms-2 fw-bold">Inventory</span>
              </Link>
            </li>
            <li>
              <Link to="/message" style={{ pointerEvents: "none" }}>
                <i className="far fa-envelope"></i>
                <span className="ms-2 fw-bold">Messaging</span>
              </Link>
            </li>
            <li>
              <Link to="/frontcms">
                <i className="fa fa-solar-panel"></i>
                <span className="ms-2 fw-bold">Front CMS</span>
              </Link>
            </li>
            <li>
              <Link to="/download">
                <i className="fas fa-download"></i>
                <span className="ms-2 fw-bold">Download</span>
              </Link>
            </li> */}
            <li>
              <Link to="/account/aadhar">
              <i class="fas fa-address-card"></i>
                <span className="ms-2 fw-bold">ABHA Registration</span>
              </Link>
            </li>
            <li>
              <Link to="/linkcarecontext">
              <i class="fas fa-link"></i>
                <span className="ms-2 fw-bold">Link Care-context</span>
              </Link>
            </li>
            <li>
              <Link to="/discovercarecontext">
              <i class="fas fa-book-open"></i>
                <span className="ms-2 fw-bold">Discover Care-context</span>
              </Link>
            </li>
            <li>
              <Link to="/consentrequest">
              <i class="fas fa-hand-holding-medical"></i>
                <span className="ms-2 fw-bold">Consent Request</span>
              </Link>
            </li>
            <li>
              <Link to="#" className="has-arrow">
                <i className="fas fa-cogs"></i>
                <span className="ms-2 fw-bold">Setup</span>
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
                  <Link to="#" className="has-arrow">
                    {props.t("Appointment")}
                  </Link>
                  <ul style={{ marginLeft: "-30px" }}>
                    <li>
                      <Link to="/setupslotappointment">
                        {props.t("Slots")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/onlineappointment/globalshift">
                        {props.t("Shift")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/setupdoctorglobalshift">
                        {props.t("Doctor Shift")}
                      </Link>
                    </li>
                  </ul>
                </li>
                {/* <li>
                  <Link to="/setupbloodbank">{props.t("Blood Bank")}</Link>
                </li> */}
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
                          <Link to="/setupbed">{props.t("Bed Status")}</Link>
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
                {/* <li>
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
                      <Link to="/doseinterval">{props.t("Dose Interval")}</Link>
                    </li>
                    <li>
                      <Link to="/doseduration">{props.t("Dose Duration")}</Link>
                    </li>
                  </ul>
                </li> */}
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
                {/* ////////// */}
                <li>
                  <Link to="#" className="has-arrow">
                    {props.t("Patients")}
                  </Link>
                  <ul style={{ marginLeft: "-30px" }}>
                    <li>
                      <Link to="/setupPatient">
                        {props.t("Patient list")}
                      </Link>
                    </li>
                    {/* <li>
                      <Link to="/operations">{props.t("Operation")}</Link>
                    </li> */}
                  </ul>
                </li>
                {/* ////////////// */}
                {/* <li>
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
                </li> */}
                {/* <li>
                  <Link to="#" className="has-arrow">
                    {props.t("Radiology")}
                  </Link>
                  <ul style={{ marginLeft: "-30px" }}>
                    <li>
                      <Link to="/setupradiology">{props.t("Radiology")}</Link>
                    </li>
                    <li>
                      <Link to="/setupradiologyparameter">
                        {props.t("Radiology parameter")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/setupradiologyunit">
                        {props.t("Radiology unit")}
                      </Link>
                    </li>
                  </ul>
                </li> */}
                <li>
                  <Link to="#" className="has-arrow">
                    {props.t("Symptoms")}
                  </Link>
                  <ul style={{ marginLeft: "-30px" }}>
                    <li>
                      <Link to="/setup/symptomshead">
                        {props.t("Symptoms Head")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/setup/symptomstype">
                        {props.t("Symptoms Types")}
                      </Link>
                    </li>
                  </ul>
                </li>
               
                <li>
                  <Link to="#" className="has-arrow">
                    {props.t("Human Resource")}
                  </Link>
                  <ul style={{ marginLeft: "-30px" }}>
                    <li>
                      <Link to="/human-resource-setup/leave-type">
                        {props.t("Leave Type")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/human-resource-setup/department">
                        {props.t("Department")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/human-resource-setup/designation">
                        {props.t("Designation")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/human-resource-setup/specialist">
                        {props.t("Specialist")}
                      </Link>
                    </li>
                  </ul>
                </li>
                {/* <li>
                  <Link to="#" className="has-arrow">
                    {props.t("Front Office")}
                  </Link>
                  <ul style={{ marginLeft: "-30px" }}>
                    <li>
                      <Link to="/frontoffice-setup/purpose-list">
                        {props.t("Purpose")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/frontoffice-setup/source">
                        {props.t("Source")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/frontoffice-setup/complain-type">
                        {props.t("Complain Type")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/frontoffice-setup/appointment-priority">
                        {props.t("Appointment Priority")}
                      </Link>
                    </li>
                  </ul>
                </li> */}
                <li>
                  <Link to="#" className="has-arrow">
                    {props.t("Inventory")}
                  </Link>
                  <ul style={{ marginLeft: "-30px" }}>
                    <li>
                      <Link to="/setupinventorycategory">
                        {props.t("Inventeroy Category")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/setupinventorystore">
                        {props.t("Inventory Store")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/setupinventorysupplier">
                        {props.t("Inventory Supplier")}
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  );
};

export default withRouter(withTranslation()(SidebarContent));
