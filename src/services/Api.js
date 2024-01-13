import axios from "axios";
import { toast } from "react-toastify";

// const baseNestURL = "http://13.200.35.19:310";
const baseNestURL = "http://localhost:4000";

// const mURL = process.env.REACT_APP_MURL || "http://localhost:3000"
// const baseNodeURL = "http://13.200.35.19:3101";
const baseNodeURL = "http://localhost:4000";

const baseNestSetupandMainURL = "http://localhost:5000";
const baseNestSetupURL = "http://13.200.35.19:3102";


// const http2 = axios.create({
//   baseURL: baseNestURL,
// });

const http = axios.create({
  baseURL: baseNodeURL,
});

const http3 = axios.create({
  baseURL: baseNestSetupandMainURL,
});
const http4 = axios.create({
  baseURL: baseNestSetupURL,
});


// const http4 = axios.create({
//   baseURL: baseNestMainURL,
// })

// ...

const URL = {
  USERS_URL: "table",
  SIGNUP_URL: "Signup",
  LOGIN_URL: "Login",
  // TOKEN_URL: "tokens",
  IPD_URL: "/api/patient",
  FRONT_OFFICE_URL: "/api/frontoffice/visitors_book",
  COMPLAIN_URL: "/api/frontoffice/complaint",
  OPD_URL: "/api/outpatient/opd_details",
  IPD_URL: "/api/ipd_details",
  BLOOD_URL: "/setup-blood-bank-products",
  CONSULTANT_DOC_URL: "/api/nurse_Roles",
  CALL_LOG_URL: "/api/frontoffice/call_log",
  PHARMACY_BILL_URL: "/api/pharmacyBasicBill",
  PHARMACY_MEDS_URL: "/api/pharmacyMedicine",
  PHARMACY_BILL_GEN_URL: "/api/pharmacyTransaction",
  PHARMACY_BILL_DETAIL_URL: "/api/pharmacyBillDetails",
  PHARMACY_PURCHASE_URL: "/api/pharmacyPurchase",

  APPOINTMENT_URL: "/add-appointment",
  DOCTOR_WISE_URL: "/api/user_Roles",
  DOCTOR_APPOINTMENT_URL: "/api/appointment/add_appointment",
  SHIFT_WISE_URL: "/api/appointmentShift",
  APPT_SHIFT_URL: "/internal-appointment-shift",
  APPT_SLOT_URL: "/internal-appointment-slot",
  APPT_SLOT_CHARGE: "/setup_appt_slot_amount",
  SLOT_WISE_URL: "/api/patienQueueSlot",
  PATIENT_SEARCH_URL: "/api/appointment/add_patient",
  ADD_PATIENT_URL: "/setup-patient-new-patient",
  ADD_APPOINTMENT_URL: "/add-appointment",

  CHARGES_URL: "/setup-hospital-charge-charges",
  CHARGES_CATEGORY_URL: "/setup-hospital-charges-charge-category",
  CHARGE_TYPE_URL: "/setup-hospital-charges-charge-type-master",
  SETUP_CHARGE_CATEGORY_URL: "/setup-hospital-charges-charge-category/bytype/",
  SETUP_CHARGE_NAME: "/setup-hospital-charge-charges",
  SETUP_TAX_URL: "/setup-hospital-charges-tax-category",
  SETUP_UNIT_URL: "/setup-hospital-charges-unit-type",
  SETUP_PHARMACY_CTGRY_URL: "/api/medicine_Category",
  SETUP_MED_DOSAGE_URL: "/api/medicineDosage",
  SETUP_MED_SUPPLIER_URL: "/api/medicine_Supplier",
  SETUP_DOSAGE_URL: "/api/dosageInterval",
  SETUP_DOSAGE_DURATION_URL: "/api/dosageDuration",

  OPD_PAYMENT_URL: "/api/outpatient/payment",
  OPD_TIMELINE_URL: "/api/outpatient/timeline",
  OPD_MEDICATION_URL: "/api/outpatient/medication",
  OPD_DOSAGE_URL: "/api/outpatient/dosage",
  OPD_MEDICINE_CATEGORY_URL: "/api/outpatient/medicineCategory",
  OPD_MEDICINE_NAME_URL: "/api/outpatient/medicineName",
  OPD_OPERATION_URL: "/api/outpatient/operations",
  OPD_OPERATION_CATEGORY_URL: "/api/outpatient/operationCategory",
  OPD_OPERATION_NAME_URL: "/api/outpatient/operationName",
  OPD_CHARGE_URL: "/api/outpatient/patientcharges",
  OPD_CHARGE_CATEGORY_URL: "/api/outpatient/chargeCategory",
  OPD_CHARGE_NAME_URL: "/api/outpatient/chargeName",
  OPD_CHARGE_TYPE_URL: "/api/outpatient/chargeType",
  OPD_LAB_INVEST_URL: "/api/outpatient/labInvest",
  OPD_TREATMENT_HISTORY_URL: "/api/outpatient/treatmentHistory",
  OPD_VISITS: "/api/outpatient/visits",

  DISCHARGE_URL: "/api/dischargedPatient",

  NURSE_NOTE_URL: "/api/nursenote",
  CONSULTENT_URL: "/api/consultant_register",
  IPD_DETAILS_URL: "/api/ipd_patientdetails",
  POST_PAYMENT: "/api/payments",
  TIMELINE_URL: "/api/timeline",
  OPERATION_CATEGORY: "/api/operationCategory",
  OPERATION_NAME: "/api/operationName",
  OPERATION_URL: "/api/operation",
  MEDICINE_CATEGORY: "/api/medicineCategory",
  MEDICINE_NAME: "api/medicineName",
  MEDICINE_DOSAGE: "/api/medicineDosage",
  MEDICATION_URL: "/api/medication",
  CHARGE_TYPES_URL: "/api/chargeType",
  CHARGE_CATEGORY_URL: "/api/chargeCategory",
  CHARGE_NAME_URL: "/api/chargeName",
  CHARGE_URL: "/api/charge",
  PRESCRIPTION_TEST_URL: "/api/prescriptionTest",
  PRESCRIPTION_DETAILS_URL: "/api/prescripationDetails",
  PRESCRIPTION_BASIC_URL: "/api/prescriptionBasic",
  DOSAGE_DURATION_URL: "/api/dosageDuration",
  DOSAGE_INTERVEL_URL: "/api/dosageIntervel",
  FINDING_CATEGORY_URL: "/api/findingCategory",
  FINDINGS_URL: "/api/findings",
  RADIOLOGYS_URL: "/api/radiologys",
  PATHOLOGYS_URL: "/api/pathology",
  DISCHARGE_URL: "/api/dischargedPatient",
  BED_HISTORY_URL: "/api/bedHistory",
  TREATMENT_HISTORY_URL: "/api/treatmentHistory",
  LABINVESTIGATION_URL: "/api/labinvestigation",
  NURSE_WISE_RRL: "/api/nurse_Roles",
  RADIOLOGY_CATEGORY_URL: "/api/radio_category_name",
  RADIOLOGY_TEST_PARAMETESRS: "/api/radio_test_parameter_name",
  RADIOLOGY_POST: "/api/radiology_details",

  IPD_DISCHARED_REPORT_URL: "/api/ipdDischargedReport",
  ADD_STAFF_URL: "/api/addstaff",
  ADD_SPECIALIST_URL: "/api/specialist",
  ADD_DESIGNATION_URL: "/api/designation",
  STAFF_ROLE_URL: "/api/user_Roles",
  AUTH_LOGIN_URL: "/api/authlogin",
  PATIENT_URL: "/api/appointment/add_patient",

  SETUP_CHARGE_TYPE_URL: "/api/chargetype",

  RADILOGY_CATEGORY_URL: "/api/radiologyCategory",
  RADIOLOGY_UNIT_URL: "/api/radiologyunit",
  RADILOGY_PARAMETER_URL: "/api/radiology_parameter",
  SEARCH_BY_PRESCRIPTION: "/api/search_by_prescriptionno",
  RADIOLOGY_TRANSACTIONS: "/api/radiologyTransactions",
  RADIOLOGY_BILLING: "/api/radiologyBilling",
  RADIOLOGY_BILLING: "/api/radiologyBilling",

  RADILOGY_PARAMETER_URL: "/api/radiology_parameter",
  SEARCH_BY_PRESCRIPTION: "/api/search_by_prescriptionno",
  RADIOLOGY_TRANSACTIONS: "/api/radiologyTransactions",
  RADIOLOGY_BILLING: "/api/radiologyBilling",

  RADILOGY_PARAMETER_URL: "/api/radiology_parameter",
  SEARCH_BY_PRESCRIPTION: "/api/search_by_prescriptionno",
  RADIOLOGY_TRANSACTIONS: "/api/radiologyTransactions",
  RADIOLOGY_BILLING: "/api/radiologyBilling",
  RADIOLOGY_REPORT: "/api/radiologyReport",

  ROLE_BASED_URL: "/api/rolebased",
  AMBULANCE_CALL_REPORT: "/api/ambulancecallreport",
  AMBULANCE_COLLECTED_BY: "/api/ambulancecollectedby",
  AMBULANCE_VEHICLE_MODEL: "/api/ambulanceVehiclemodel",

  INVENTORY_SETUP_CATEGORY: "/api/setup_inventory_category",
  INVENTORY_SETUP_SUPPLIER: "/api/setupInventory_supplier",
  INVENTORY_SETUP_STORE: "/api/setupinventory_store",

  IPD_DISCHARGED_REPORT_URL: "/api/dischargedReport",
  IPD_REPORTS: "/api/ipdReport",
  OPD_REPORTS: "/api/opdReport",
  OPD_DISCHARGED_REPORT_URL: "/api/opdDischargedReport",
  OPD_BALANCED_REPORT: "/api/opdbalancedreport",
  IPD_BALANCE_REPORT: "/api/ipdbalancedreport",
  FINDING_URL: "/api/findings_report",
  SYMPTOMS_URL: "/api/symptoms",

  NEW_APPOINTMENT_SHIFT_URL: "/api/newappointmentshift",
  NEW_APPOINTMENT_SLOT_URL: "/api/newappointmetnslot",
  APPOINTMENT_SETUP_SHIFTS: "/internal-appointment-shift",
  APPOINTMENT_SETUP_SLOT_DOCTOR: "/api/appointmentsetupdoctor",
  APPOINTMENT_SETUP_SLOT_SHIFT: "/internal-appointment-slot",
  APPOINTMETN_SETUP_SLOT_CONSULTATION: "/api/appointmentsetupConsultation",
  APPOINTMENT_SETUP_SLOT_GETSEARCH: "/api/appointmentsetupsearch",
  APPOINTMENT_SETUP_SLOT_CHARGECATEGORY:
    "/api/appointmentsetupslotchargecategory",
  APPOINTMENT_SETUP_SLOT_CHARGES: "/appointmentsetupslotcharges",
  APPOINTMENT_SETUP_DOCTORSHIFT: "/api/appointmentsetupdoctorshift",
  FINANCE_SETUP_INCOMEHEAD: "/api/financeicomehead",
  FINANCE_SETUP_EXPENCEHEAD: "/api/financeexpensehead",
  FINANCE_INCOME: "/api/financeMainmoduleIncome",
  FINANCE_EXPENCE: "/api/financeMainmoduleExpenses",
  HR_SETUP_LEAVE_TYPE: "/api/leaveTypes",
  HR_SETUP_DEPARTMENT: "/api/departments",
  HR_SETUP_DESIGNATION: "/api/designation",
  HR_SETUP_SPECIALIST: "/api/specialist",

  FRONT_OFFICE_PURPOSE: "/api/frontofficesetup/purpose",
  FRONT_OFFICE_SETUP_SOURCE: "/api/frontofficesetup/source",
  FRONT_OFFICE_SETUP_COMPLAINTYPE: "/api/frontofficesetup/complaintype",
  FRONT_OFFICE_SETUP_PRIORITY: "/api/frontofficesetup/priority",
  FRONT_OFFICE_RECEIVER: "/api/frontoffice/recieved_postal",
  FRONT_OFFICE_DISPATCHl: "/api/frontoffice/dispatch_postal",

  SETUP_FLOOR_URL: "/api/bedFloorSetup",
  SETUP_BED_GROUP_URL: "/api/bedGroupSetup",
  SETUP_BED_TYPE_URL: "/api/bedTypeSetup",
  SETUP_BED_URL: "/api/bedListSetup",
  SETUP_BED_STATUS_URL: "/api/bedStatusSetup",

  PATHOLOGY_TEST_URL: "/api/pathology/test",
  PATHOLOGY_BILL_URL: "/api/pathology/bill",
  PATHOLOGY_GENERATE_BILL_URL: "/api/pathology/generateBill",
  PATHOLOGY_CATEGORY_NAME_URL: "/api/pathology/categoryName",
  PATHOLOGY_CHARGE_CATEGORY_URL: "/api/pathology/chargeCategory",
  PATHOLOGY_CHARGE_NAME_URL: "/api/pathology/chargeName",
  PATHOLOGY_TEST_PARAMETER_NAME_URL: "/api/pathology/testParameterName",
  PATHOLOGY_TEST_NAME_URL: "/api/pathology/testName",
  PATHOLOGY_REPORT_URL: "/api/pathology/report",
  PATHOLOGY_TRANSACTION_URL: "/api/pathology/transaction",
  PATHOLOGY_SEARCH_BY_PRESCRIPTION_URL: "/api/pathology/searchByPrescription",
  PATHOLOGY_SETUP_CATEGORY_URL: "/api/pathology/setupCategory",
  PATHOLOGY_SETUP_UNIT_URL: "/api/pathology/setupUnit",
  PATHOLOGY_SETUP_PARAMETER_URL: "/api/pathology/setupParameter",
  //Inventory
  INVENTORY_ITEM_URL: "/api/inventory/item",
  INVENTORY_ITEM_CATEGORY_URL: "/api/inventory/itemCategory",
  INVENTORY_ITEM_STOCK_URL: "/api/inventory/itemStock",
  INVENTORY_ITEM_SUPPLIER_URL: "/api/inventory/itemSupplier",
  INVENTORY_ITEM_STORE_URL: "/api/inventory/itemStore",
  INVENTORY_ISSUE_ITEM_URL: "/api/inventory/issueItem",
  INVENTORY_ISSUE_TO_URL: "/api/inventory/issueTo",
  INVENTORY_ISSUE_USER_TYPE_URL: "/api/inventory/issueUserType",

  SETUP_SYMPTOM_TYPE_URL: "/api/symptomTypeSetup",
  SETUP_SYMPTOM_HEAD_URL: "/api/symptomHeadSetup",
  SETUP_BLOOD_BANK_URL: "/api/setup_bloodbank",

  GENERAL_SETTING_URL: "/api/general/settings",

  SETUP_SMS_SETTING_URL: "/api/sms_settings",
  SETUP_PAYMENT_SETTING_URL: "/api/paymentSetting",
  SETUP_ROLE_SETTING_URL: "/api/rolesetting",
  SETUP_ROLE_URL: "/api/role_setup",
  EMAIL_SETTING_URL: "/api/email_settings",
  USER_PATIENT_SETTING_URL: "/api/userpatientsetting",
  USER_STAFF_SETTING_URL: "/api/userstaffsetting",
  PREFIX_SETTING_URL: "/api/prefixsetting",

  PATIENT_CREDS_URL: "/api/patientcredsreport",
  BIRTH_REPORT_URL: "/api/birthreport",
  DEATH_REPORT_URL: "/api/deathreport",
  INCOME_REPORT_URL: "/api/incomereport",
  EXPENSE_REPORT_URL: "/api/expensereport",
  INCOME_GROUP_REPORT_URL: "/api/incomegroupreport",

  EXPENSE_GROUP_REPORT_URL: "/api/expensegroupreport",
  INVENTORY_ISSUE_REPORT_URL: "/api/inventoryissuereport",
  INVENTORY_ITEM_REPORT_URL: "/api/inventoryitemreport",
  INVENTORY_ITEM_STOCK_REPORT_URL: "/api/inventorystockreport",
  TRANSACTION_REPORT_URL: "/api/transactionreport",
  DAILY_TRANSACTION_REPORT_URL: "/api/dailytransaction",
  COLLECTED_BY_URL: "/api/collectedby",
  AUDIT_TRAIL_REPORT_URL: "/api/audittrailreport",
  PHARMACY_BILL_REPORT_URL: "/api/pharmacybillreport",
  TPA_REPORT_URL: "/api/tpareport",
  PATIENT_VISIT_REPORT_URL: "/api/patientvisitreport",
  PATIENT_BILL_REPORT_URL: "/api/patientbillreport",
  RADIOLOGY_REPORT_NAME_URL: "/api/radiology_name",
  RADILOGY_REPORT_CATEGORY_URL: "/api/radiologyCategory",
  RADIOLOGY_PATIENT_REPORT: "/api/radiologypatientreport",
  PATHOLOGY_REPORT: "/api/pathologyReport",
  PATHOLOGY_CATEGORY_REPORT: "/api/pathologyCategory",
  PATHOLOGY_NAME_REPORT: "/api/pathologyName",
  CERTIFICATE_URL: "/api/certificate",
  STAFF_ATTENDANCE_URL: "/api/staffattendancereport",
  PAYROLL_REPORT: "/api/payrollReport",
  AMBULANCE_REPORT: "/api/ambulanceCallReport",
  AMBULANCE_COLLECTEDBY_REPORT: "/api/ambulanceCollectedBy",
  AMBULANCE_VEHICLE_MODEL_REPORT: "/api/ambulanceVehicleModel",
  BLOOD_ISSUE_REPORT: "/api/bloodIssueReport",
  BLOOD_DONOR_REPORT: "/api/bloodDonorReport",
  BLOOD_DONOR: "/api/bloodDonorDetails",
  OT_REPORT: "/api/OTReport",
  COMPONENT_ISSUE_REPORT: "/api/componentIssueReport",
  COMPONENT_REPORT: "/api/componentReport",
  REFERRAL_PAYMENT_REPORT: "/api/referralReport",
  PAYEE_REPORT: "/api/payee",
  PATIENT_TYPE_REPORT: "/api/patientType",
  TPA_MANAGEMENT_REPORT: "/api/TPAManagement",
  TPA_REPORT: "/api/TPAReport",
  PATHOLOGY_REPORT: "/api/pathologyReport",
  PATHOLOGY_CATEGORY_REPORT: "/api/pathologyCategory",
  PATHOLOGY_NAME_REPORT: "/api/pathologyName",
  DOWNLOAD_CENTER: "/api/downloadCenter",
  REFERRAL_PAYMENT: "/api/referralPayment",
  REFERRAL_PERSON: "/api/referralPerson",
  REFERRAL_CATEGORY: "/api/referralCategory",
  BIRTH_RECORD_URL: "/api/birthrecord",
  CERTIFICATE_URL: "/api/certificateoverview",
  CERTIFICATE_TEMP_URL: "/api/certificatetemplate",
  DEATH_RECORD: "/api/deathRecord",
  OPD_DETAILS_BILLING_URL: "/api/opd/details",

  AMBULANCE_CALL_GET_URL: "/api/ambulanceCall",
  AMBULANCE_CALL_POST_URL: "/api/ambulanceCallPost",
  AMBULANCE_LIST_URL: "/api/ambulanceList",
  PATHOLOGY_BILL_URL: "/api/pathology/bill",
  RADIOLOGY_BILLING_URL: "/api/billing/radiology",
  BLOOD_ISSUE_BILLING_URL: "/api/billing/bloodIssue",
  RADIOLOGY_REPORT_BILLING_URL: "/api/billing/radiologyReport",
  BLOOD_ISSUE_BILLING_BAG_URL: "/api/billing/bloodissue/bag",
  TRANSACTION_URL: "/api/billing/transaction",
  BLOOD_COMPONENT_ISSUE_BILLING_URL: "/api/billing/bloodComponentIssue",

  DASHBOARD_DATA_URL: "/api/dashCalc",
  STAFF_COUNT_URL: "/api/staffCount",
  GRAPH_URL: "/api/graph",

  ABHA_GENERATE_OTP: "/abha_generate_otp",
  ABHA_VERIFY_OTP: "/abha_verify_otp",
  ABHA_CHECK_MOBILE_OTP: "/abha_check_and_generate_mobile_otp",
  ABHA_VERIFY_MOBILE_OTP: "/abha_verify_mobile_otp",
  ABHA_CREATE_ID: "/abha_create_health_id_by_aadhar",
  ABHA_DOWNLOAD_CARD: "/download_abha_card_getcard",
  ABHA_QR_CODE: "/download_abha_card_qrcode",
  ABHA_PNG_CARD: "/download_abha_card_pngcard",
  ABHA_SVG_CARD: "/download_abha_card_svgcard",
  ABHA_GET_PROFILE: "/abha_get_profile",
  ABHA_UPDATE_PROFILE: "/abha_update_profile",
  ABHA_ADDRESS_CREATION: "/abha_address_by_abha_number_auth_methods",
  ABHA_ADDRESS_MOBILE_OTP: "/abha_address_by_abha_number_conform_credential",
  ABHA_MOBILE_AUTH: "/abha_address_by_abha_number_init",
  ABHA_PHR_ADDRESS_SUGGESTION:
    "/abha_address_creation_by_mobile_abha_adress_suggestion",
  ABHA_PHR_ADDRESS_CREATION: "/abha_address_by_abha_number_create",
  ABHA_M1_LINK: "/m1_verification_byotp_fetch_modes",
  ABHA_M1_OTP: "/m1_verification_byotp_mobile_otp_init",
  ABHA_VERIFY_M1_OTP: "/m1_verification_byotp_auth_conform",

  SETUP_APPT_SLOT_TIMING: "/setup-appt-slot-timimgs",
  SETUP_APPT_SLOT_CHARGES: "/setup_appt_slot_amount",
  SETUP_APPT_SHIFT: "/setup-appointment-shift",
  SETUP_APPT_GLOBAL_SHIFT: "/setup-appointment-doctor-shift",

  APPT_DOC_URL: "/internal-appointment-staff",
  SETUP_RADIOLOGY_CATEGORY:"/setup-radiology-radiology-category",
  SETUP_RADIOLOGY_UNIT:'/setup-radiology-unit',
  SETUP_RADIOLOGY_PARAMETER:'/setup-radiology-radiology-parameter',
  SETUP_PATHOLOGY_CATEGORY:'/setup-pathology-pathology-category',
  SETUP_PATHOLOGY_UNIT:'/setup-pathology-unit',
  SETUP_PATHOLOGY_PARMETER:'/setup-pathology-pathology-parameter',
  SETUP_FINDINGS:'/setup-findings-finding',
  SETUP_FINDING_CATEGORY:'/findings_category',
  SETUP_CHARGE_TYPE_MASTER:'/setup-hospital-charges-charge-type-master',
  SETUP_CHARGE_TYPE_MODULE:'/setup-hospital-charges-charge-type-module'
};

function getStaffcountData(roleId) {
  console.log("roleId:", roleId);

  const url = `${URL.STAFF_COUNT_URL}?roleId=${roleId}`;
  console.log("url:", url);

  return http.get(url);
}

function getApptShift(id, data={}){
  const url = `${URL.APPT_SHIFT_URL}/${id}`;
  console.log(url, 'urll')
  return http3.get(url,data);
}

function getApptSlot(staff_id, global_shift_id, date,data = {}){
  const url = `${URL.APPT_SLOT_URL}?staff_id=${staff_id}&global_shift_id=${global_shift_id}&date=${date}`
  return http3.get(url, data)
}

// function getApptCharge(data = {}){  
//   const url = `${URL.}?staff_id=${staff_id}`
//   return http3.get()
// }

function getApptDoctor(data = {}){
  return http3.get(URL.APPT_DOC_URL, data)
}

function getGraphData(year, month) {
  console.log("year:", year);
  console.log("month:", month);
  const url = `${URL.GRAPH_URL}?year=${year}&month=${month}`;
  console.log("url:", url);

  return http.get(url);
}

function getDashboardData(data = {}) {
  return http.get(URL.DASHBOARD_DATA_URL, data);
}

function getSetupBloodBank(data = {}) {
  return http.get(URL.SETUP_BLOOD_BANK_URL, data);
}

function getOpdBillingDetails(data = {}) {
  return http.get(URL.OPD_DETAILS_BILLING_URL, data);
}

function postSetupBloodBank(data = {}) {
  return http.post(URL.SETUP_BLOOD_BANK_URL, data);
}

function getRoleBased(emails) {
  const data = { params: { email: emails } };
  return http.get(URL.ROLE_BASED_URL, data);
}

function getBloodBank(data = {}) {
  return http.get(URL, BLOOD_URL, data);
}

function postAuthUsers(data = {}) {
  return http.post(URL.AUTH_LOGIN_URL, data);
}

function getUser(data = {}) {
  return http.get(URL.USERS_URL, data);
}

function postStaffrole(data) {
  return http.post(URL.STAFF_ROLE_URL, data);
}

function getDesignation(data = {}) {
  return http.get(URL.ADD_DESIGNATION_URL, data);
}

function getSpecialist(data = {}) {
  return http.get(URL.ADD_SPECIALIST_URL, data);
}

function getDischargePatients() {
  return http.get(URL.DISCHARGE_URL);
}

function postUser(data = {}) {
  return http.post(URL.USERS_URL, data);
}

function getIpdDischargedReport(data = {}) {
  return http.get(URL.IPD_DISCHARED_REPORT_URL, data);
}

function postStaff(data = {}) {
  return http.post(URL.ADD_STAFF_URL, data);
}

// function getUser(data = {}) {
//   return http.get(URL.USERS_URL, data);
// };

// function postUser(data = {}) {
//   return http.post(URL.USERS_URL, data);
// };

// function deleteUser(data = {}) {
//   return http.delete(URL.USERS_URL, data);
// };

function postSetupChargeType(data = {}) {
  return http.post(URL.SETUP_CHARGE_TYPE_URL, data);
}

// function getSetupChargeType(data = {}){
//   return http.get(URL.SETUP_CHARGE_TYPE_URL, data)
// }

function postLogin(data = {}) {
  return http.get(URL.TOKEN_URL, data);
}

function getNurses(data = {}) {
  return http.get(URL.NURSE_WISE_RRL, data);
}

function postIpdUser(data = {}) {
  return http.post(URL.IPD_URL, data);
}

function getIpdUser(data = {}) {
  return http.get(URL.IPD_URL, data);
}

function postVisitor(data = {}) {
  return http.post(URL.FRONT_OFFICE_URL, data);
}

function getVisitor(data = {}) {
  return http.get(URL.FRONT_OFFICE_URL, data);
}

function postComplaint(data = {}) {
  return http.post(URL.COMPLAIN_URL, data);
}

function getComplaint(data = {}) {
  return http.get(URL.COMPLAIN_URL, data);
}

// function postAppointment(data = {}){
//   return http.post(URL.ADD_APPOINTMENT_URL,data)
// }

// function getAppointment(data = {}){
//   return http.get(URL.ADD_APPOINTMENT_URL,data)
// }

function postPatient(data = {}) {
  return http.post(URL.PATIENT_URL, data);
}

function getPatient(doctor, shift, date, slot) {
  const data = {
    params: { doctor: doctor, shift: shift, date: date, slot: slot },
  };
  return http.get(URL.PATIENT_SEARCH_URL, data);
}

function getOpd(data = {}) {
  return http.get(URL.OPD_URL, data);
}

function postOpd(data = {}) {
  return http.post(URL.OPD_URL, data);
}

function getIpd(data = {}) {
  return http.get(URL.IPD_URL, data);
}

function postIpd(data = {}) {
  return http.post(URL.IPD_URL, data);
}

function getBloodgroups(data = {}) {
  return http3.get(URL.BLOOD_URL, data);
}

function getConsultant(data = {}) {
  return http.get(URL.CONSULTANT_DOC_URL, data);
}

function postConstant(data) {
  return http.post(URL.CONSULTENT_URL, data);
}

function postCallLog(data = {}) {
  return http.post(URL.CALL_LOG_URL, data);
}

function getCallLog(data = {}) {
  return http.get(URL.CALL_LOG_URL, data);
}

function getPharmacyBill(data = {}) {
  return http.get(URL.PHARMACY_BILL_URL, data);
}

function postPharmacyBill(data = {}) {
  return http.post(URL.PHARMACY_BILL_URL, data);
}

function getPharmacyMeds(data = {}) {
  return http.get(URL.PHARMACY_MEDS_URL, data);
}

function postPharmacyMeds(data = {}) {
  return http.post(URL.PHARMACY_MEDS_URL, data);
}

function postPharmacyBillDetails(data = {}) {
  return http.post(URL.PHARMACY_BILL_GEN_URL, data);
}

function postPharmacyBillTransaction(data = {}) {
  return http.post(URL.PHARMACY_BILL_DETAIL_URL, data);
}

function getPharmacyPurchase(data = {}) {
  return http.get(URL.PHARMACY_PURCHASE_URL, data);
}

function postPharmacyPurchase(data = {}) {
  return http.post(URL.PHARMACY_PURCHASE_URL, data);
}

function getAppointment(data = {}) {
  return http3.get(URL.APPOINTMENT_URL, data);
}

function getRole(data = {}) {
  return http.get(URL.DOCTOR_WISE_URL, data);
}

function getDoctor(data = {}) {
  return http.get(URL.CONSULTANT_DOC_URL, data);
}
function getDoctorwiseAppoinment(doctor, date) {
  const data = { params: { doctor: doctor, date: date } };
  return http.get(URL.DOCTOR_APPOINTMENT_URL, data);
}

function getShiftdatas(shiftId) {
  console.log(shiftId, "ssss");
  const data = { params: { shiftId: shiftId } };
  return http.get(URL.SHIFT_WISE_URL, data);
}
function getSlotdatas(doctor, shift) {
  console.log(doctor, shift, "uuuuuuu");
  const data = { params: { staffId: doctor, shift: shift } };
  return http.get(URL.SLOT_WISE_URL, data);
}
function getPatients(doctor, shift, date, slot) {
  const data = {
    params: { doctor: doctor, shift: shift, date: date, slot: slot },
  };
  return http.get(URL.PATIENT_SEARCH_URL, data);
}
function postPatients(patients) {
  console.log(patients, "patients");
  return http3.post(URL.ADD_PATIENT_URL, patients);
}
function getAllPatients(data = {}) {
  return http3.get(URL.ADD_PATIENT_URL, data);
}
function postAppointment(formValues) {
  return http3.post(URL.ADD_APPOINTMENT_URL, formValues);
}

function getCharges(data = {}) {
  return http3.get(URL.CHARGES_URL, data);
}

function postCharges(data = {}) {
  return http3.post(URL.CHARGES_URL, data);
}

function getChargeCategory(data = {}) {
  return http3.get(URL.CHARGES_CATEGORY_URL, data);
}

function postChargeCategory(data = {}) {
  return http3.post(URL.CHARGES_CATEGORY_URL, data);
}

function getChargetype(data = {}) {
  return http3.get(URL.CHARGE_TYPE_URL, data);
}

		
function getSetupChargeCategory(id,data = {}) {
    const url = `${URL.SETUP_CHARGE_CATEGORY_URL}${id}`;
    return http3.get(url, data);
}
  

function getSetupChargeName(data = {}) {
  return http3.get(URL.SETUP_CHARGE_NAME, data);
}

function getTaxCategory(data = {}) {
  return http3.get(URL.SETUP_TAX_URL, data);
}

function postTaxCategory(data = {}) {
  return http3.post(URL.SETUP_TAX_URL, data);
}

function getUnitType(data = {}) {
  return http3.get(URL.SETUP_UNIT_URL, data);
}

function postUnitType(data = {}) {
  return http3.post(URL.SETUP_UNIT_URL, data);
}

function getPharmacyCtgry(data = {}) {
  return http.get(URL.SETUP_PHARMACY_CTGRY_URL, data);
}

function postPharmacyCtgry(data = {}) {
  return http.post(URL.SETUP_PHARMACY_CTGRY_URL, data);
}

function getMedDosage(data = {}) {
  return http.get(URL.SETUP_MED_DOSAGE_URL, data);
}

function postMedDosage(data = {}) {
  return http.post(URL.SETUP_MED_DOSAGE_URL, data);
}

function getMedSupplier(data = {}) {
  return http.get(URL.SETUP_MED_SUPPLIER_URL, data);
}

function postMedSupplier(data = {}) {
  return http.post(URL.SETUP_MED_SUPPLIER_URL, data);
}

function getDosageInterval(data = {}) {
  return http.get(URL.SETUP_DOSAGE_URL, data);
}

function postDosageInterval(data = {}) {
  return http.post(URL.SETUP_DOSAGE_URL, data);
}

function getDosageDuration(data = {}) {
  return http.get(URL.SETUP_DOSAGE_DURATION_URL, data);
}

function postDosageDuration(data = {}) {
  return http.post(URL.SETUP_DOSAGE_DURATION_URL, data);
}

function getOpdVisits(data = {}) {
  return http.get(URL.OPD_VISITS, data);
}

function postOpdVisits(data = {}) {
  return http.post(URL.OPD_VISITS, data);
}

function getOpdPayment(data = {}) {
  return http.get(URL.OPD_PAYMENT_URL, data);
}

function postOpdPayment(data = {}) {
  return http.post(URL.OPD_PAYMENT_URL, data);
}

function getOpdTimeline(data = {}) {
  return http.get(URL.OPD_TIMELINE_URL, data);
}

function postOpdTimeline(data = {}) {
  return http.post(URL.OPD_TIMELINE_URL, data);
}

function getOpdMedication(data = {}) {
  return http.get(URL.OPD_MEDICATION_URL, data);
}

function postOpdMedication(data = {}) {
  return http.post(URL.OPD_MEDICATION_URL, data);
}

function getDosage(data = {}) {
  return http.get(URL.OPD_DOSAGE_URL, data);
}

function getMedicineCategory(data = {}) {
  return http.get(URL.OPD_MEDICINE_CATEGORY_URL, data);
}

function getMedicineName(data = {}) {
  return http.get(URL.OPD_MEDICINE_NAME_URL, data);
}

function getOpdOperation(data = {}) {
  return http.get(URL.OPD_OPERATION_URL, data);
}

function postOpdOperation(data = {}) {
  return http.post(URL.OPD_OPERATION_URL, data);
}

function getOperationCategory(data = {}) {
  return http.get(URL.OPD_OPERATION_CATEGORY_URL, data);
}

function getOperationName(data = {}) {
  return http.get(URL.OPD_OPERATION_NAME_URL, data);
}

function getOpdCharges(data = {}) {
  return http.get(URL.OPD_CHARGE_URL, data);
}

function postOpdCharges(data = {}) {
  return http.post(URL.OPD_CHARGE_URL, data);
}

function getChargeName(data = {}) {
  return http.get(URL.OPD_CHARGE_NAME_URL, data);
}

function getChargeType(data = {}) {
  return http3.get(URL.OPD_CHARGE_TYPE_URL, data);
}

function getLabInvest(data = {}) {
  return http.get(URL.OPD_LAB_INVEST_URL, data);
}

function getTreatmentHistory(data = {}) {
  return http.get(URL.OPD_TREATMENT_HISTORY_URL, data);
}

//ipd profile api

function postNurseNote(data) {
  return http.post(URL.NURSE_NOTE_URL, data);
}
function getNurseNote(data = {}) {
  return http.get(URL.NURSE_NOTE_URL, data);
}
function getIpdConsultant(data = {}) {
  return http.get(URL.CONSULTENT_URL);
}
function getPatientId(datas) {
  console.log(datas, "uuuuu");
  const data = { params: { id: datas } };
  return http.get(URL.IPD_DETAILS_URL, data);
}
function postPayment(data) {
  return http.post(URL.POST_PAYMENT, data);
}

function postTimeline(data) {
  return http.post(URL.TIMELINE_URL, data);
}
function getTimeline(data = {}) {
  return http.get(URL.TIMELINE_URL, data);
}
function getPaymet(patient_id, section) {
  const data = { params: { patientId: patient_id, section: section } };
  return http.get(URL.POST_PAYMENT);
}
function getOperationCategorys(data = {}) {
  return http.get(URL.OPERATION_CATEGORY, data);
}
function getIpdOperationName(categoryname) {
  const data = { params: { category: categoryname } };
  return http.get(URL.OPERATION_NAME, data);
}
function postOperation(formData) {
  return http.post(URL.OPERATION_URL, formData);
}
function getOperation() {
  return http.get(URL.OPERATION_URL);
}
function getMedicationCategroy() {
  return http.get(URL.MEDICINE_CATEGORY);
}
function getMedicneName(categoryNAME) {
  const data = { params: { category: categoryNAME } };
  return http.get(URL.MEDICINE_NAME, data);
}
function getMedicineDosage(categoryid) {
  const data = { params: { category: categoryid } };
  return http.get(URL.MEDICINE_DOSAGE, data);
}
function postMedication(data) {
  return http.post(URL.MEDICATION_URL, data);
}
function getMedication(ipdid) {
  const data = { params: { ipd_id: ipdid } };
  return http.get(URL.MEDICATION_URL, data);
}
function getIpdChargeType() {
  return http.get(URL.CHARGE_TYPES_URL);
}
function getIpdChargeCategory(typeid) {
  const data = { params: { search: typeid } };
  return http.get(URL.CHARGE_CATEGORY_URL, data);
}
function getIpdChargeName(categoryid) {
  const data = { params: { search: categoryid } };
  return http.get(URL.CHARGE_NAME_URL, data);
}
function postIpdCharges(formData) {
  return http.post(URL.CHARGE_URL, formData);
}
function getIpdCharges(ipdid) {
  const data = { params: { ipd_id: ipdid } };
  return http.get(URL.CHARGE_URL, data);
}
function postPrescriptionTest(data) {
  return http.post(URL.PRESCRIPTION_TEST_URL, data);
}
function postPrescriptionBasic(data) {
  return http.post(URL.PRESCRIPTION_BASIC_URL, data);
}
function postPrescriptionDetails(data) {
  return http.post(URL.PRESCRIPTION_DETAILS_URL, data);
}
function getIpdDosageDuration() {
  return http.get(URL.DOSAGE_DURATION_URL);
}
function getDosageIntervel() {
  return http.get(URL.DOSAGE_INTERVEL_URL);
}
function getFindingCategory() {
  return http.get(URL.FINDING_CATEGORY_URL);
}
function getFindings(categoryId) {
  const data = { params: { category: categoryId } };
  return http.get(URL.FINDINGS_URL, data);
}
function getRadiologys() {
  return http.get(URL.RADIOLOGYS_URL);
}
function getPathologys() {
  return http.get(URL.PATHOLOGYS_URL);
}
function getPrescription() {
  return http.get(URL.PRESCRIPTION_BASIC_URL);
}
function postDischargePatients(formData) {
  return http.post(URL.DISCHARGE_URL, formData);
}
// function getDischargePatients(){
//  return http.get(URL.DISCHARGE_URL)
// }
function getIpdTreatmentHistory() {
  return http.get(URL.TREATMENT_HISTORY_URL);
}
function getBedHistory() {
  return http.get(URL.BED_HISTORY_URL);
}
function getLabInvestigation() {
  return http.get(URL.LABINVESTIGATION_URL);
}
function getRadiologyCategory() {
  return http.get(URL.RADIOLOGY_CATEGORY_URL);
}
function getRadiologyTestParameters(ids) {
  const data = { params: { id: ids } };
  return http.get(URL.RADIOLOGY_TEST_PARAMETESRS, data);
}
function postRadiologyDetails(data) {
  return http.post(URL.RADIOLOGY_POST, data);
}
function getRadiologyDetails() {
  return http.get(URL.RADIOLOGY_POST);
}

function postRadiologyCatetegory(data) {
  return http.post(URL.RADILOGY_CATEGORY_URL, data);
}
function getRadiologyCategorys() {
  return http.get(URL.RADILOGY_CATEGORY_URL);
}
function postRadiologyUnit(data) {
  return http.post(URL.RADIOLOGY_UNIT_URL, data);
}
function getRadiologyUnit() {
  return http.get(URL.RADIOLOGY_UNIT_URL);
}
function postRadiologyparameter(data) {
  return http.post(URL.RADILOGY_PARAMETER_URL, data);
}
function getRadiologyParameter() {
  return http.get(URL.RADILOGY_PARAMETER_URL);
}

function getRadiologyBillingDetails(data = {}) {
  return http.get(URL.RADIOLOGY_BILLING_URL, data);
}

function postRadiologyBillingDetails(data = {}) {
  return http.post(URL.RADIOLOGY_BILLING_URL, data);
}
function getBloodIssueBillingDetails(data = {}) {
  return http.get(URL.BLOOD_ISSUE_BILLING_URL, data);
}

function postBloodIssueBillingDetails(data = {}) {
  return http.post(URL.BLOOD_ISSUE_BILLING_URL, data);
}

function getRadiologyReportBillingDetails(data = {}) {
  return http.get(URL.RADIOLOGY_REPORT_BILLING_URL, data);
}

function postRadiologyReportBillingDetails(data = {}) {
  return http.post(URL.RADIOLOGY_REPORT_BILLING_URL, data);
}

function getBillingBloodIssueBag(data = {}) {
  return http.get(URL.BLOOD_ISSUE_BILLING_BAG_URL, data);
}

function postTransaction(data = {}) {
  return http.post(URL.TRANSACTION_URL, data);
}

function getBloodIssueComponent(data = {}) {
  return http.get(URL.BLOOD_COMPONENT_ISSUE_BILLING_URL, data);
}

function postBloodIssueComponent(data = {}) {
  return http.post(URL.BLOOD_COMPONENT_ISSUE_BILLING_URL, data);
}

//Ambulance

function getAmbulanceCallReport(data) {
  const params = {};

  if (data.timeDuration) {
    params.timeDuration = data.timeDuration;
  }
  if (data.collectedBy) {
    params.collectedBy = data.collectedBy;
  }
  if (data.vehicleModel) {
    params.vehicleModel = data.vehicleModel;
  }
  if (data.fromDate) {
    params.fromDate = data.fromDate;
  }
  if (data.toDate) {
    params.toDate = data.toDate;
  }
  const datas = { params: Object.keys(params).length > 0 ? params : null };
  return http.get(URL.AMBULANCE_CALL_REPORT, datas);
}
function getAmbulanceCollectedBy() {
  return http.get(URL.AMBULANCE_COLLECTED_BY);
}
function getAmbulanceVahicleModel() {
  return http.get(URL.AMBULANCE_VEHICLE_MODEL);
}

function postInvestmentCategory_setup(data) {
  return http.post(URL.INVENTORY_SETUP_CATEGORY, data);
}
function getInvestmetnCategory_setup(inputValue) {
  const data = { params: { search: inputValue } };
  return http.get(URL.INVENTORY_SETUP_CATEGORY, data);
}
function postInvestmentStore_setup(data) {
  return http.post(URL.INVENTORY_SETUP_STORE, data);
}

function getInvestmentStore_setup(inputValue) {
  const data = { params: { search: inputValue } };
  return http.get(URL.INVENTORY_SETUP_STORE, data);
}
function postInvestmentSupplier_setup(data) {
  return http.post(URL.INVENTORY_SETUP_SUPPLIER, data);
}
function getInvestmentSupplier_setup(inputValue) {
  console.log(inputValue, "q");
  const data = { params: { search: inputValue } };
  return http.get(URL.INVENTORY_SETUP_SUPPLIER, data);
}

//setup Front office

function getFrontofficeSetupVisitorsPurpose() {
  return http.get(URL.FRONT_OFFICE_PURPOSE);
}
function postFrontofficeSetupVisitorsPurpose(data) {
  return http.post(URL.FRONT_OFFICE_PURPOSE, data);
}
function getFrontofficeSetupSource() {
  return http.get(URL.FRONT_OFFICE_SETUP_SOURCE);
}
function postFrontofficeSetupSource(data) {
  return http.post(URL.FRONT_OFFICE_SETUP_SOURCE, data);
}
function getFrontofficeSetupComplainType() {
  return http.get(URL.FRONT_OFFICE_SETUP_COMPLAINTYPE);
}
function postFrontofficeSetupComplainType(data) {
  return http.post(URL.FRONT_OFFICE_SETUP_COMPLAINTYPE, data);
}
function getFrontofficeSetupPriority() {
  return http.get(URL.FRONT_OFFICE_SETUP_PRIORITY);
}
function postFrontofficeSetupPriority(data) {
  return http.post(URL.FRONT_OFFICE_SETUP_PRIORITY, data);
}

function getFrontofficeReceiver() {
  return http.get(URL.FRONT_OFFICE_RECEIVER);
}
function postFrontofficeReceiver(data) {
  return http.post(URL.FRONT_OFFICE_RECEIVER, data);
}
function getFrontofficeDispatch() {
  return http.get(URL.FRONT_OFFICE_DISPATCHl);
}
function postFrontofficeDispatch(data) {
  return http.post(URL.FRONT_OFFICE_DISPATCHl, data);
}

//Radiology

// function getRadiologyCategory(){
//   return http.get(URL.RADIOLOGY_CATEGORY_URL)
// }
// function getRadiologyTestParameters(ids){
//   const data = {params :{id:ids}}
//   return http.get(URL.RADIOLOGY_TEST_PARAMETESRS,data)
// }
// function postRadiologyDetails(data){
//   return http.post(URL.RADIOLOGY_POST,data)
// }
// function getRadiologyDetails(){
//   return http.get(URL.RADIOLOGY_POST)
// }
function getSearchPrescriptionNo(id) {
  const data = { params: { basicId: id } };
  return http.get(URL.SEARCH_BY_PRESCRIPTION, data);
}
function postRadilogyTransactions(data) {
  console.log(data, "end point");
  return http.post(URL.RADIOLOGY_TRANSACTIONS, data);
}
function postRadiologyBill(data) {
  return http.post(URL.RADIOLOGY_BILLING, data);
}
function postRadiologyReport(data) {
  return http.post(URL.RADIOLOGY_REPORT, data);
}
function getRadiologyBill() {
  return http.get(URL.RADIOLOGY_BILLING);
}

function getIpddDischarges(data, toAge, fromAge) {
  const params = {};

  if (data.timeDuration) {
    params.timeDuration = data.timeDuration;
  }
  if (data.doctor) {
    params.doctor = data.doctor;
  }
  if (data.gender) {
    params.gender = data.gender;
  }
  if (data.dischargeStatus) {
    params.dischargeStatus = data.dischargeStatus;
  }
  if (fromAge !== undefined) {
    params.fromAge = fromAge;
  }
  if (toAge !== undefined) {
    params.toAge = toAge;
  }

  const datas = { params: Object.keys(params).length > 0 ? params : null };
  return http.get(URL.IPD_DISCHARGED_REPORT_URL, datas);
}
function getIpdReport(data, toAge, fromAge) {
  const params = {};

  if (data.timeDuration) {
    params.timeDuration = data.timeDuration;
  }
  if (data.doctor) {
    params.doctor = data.doctor;
  }
  if (data.gender) {
    params.gender = data.gender;
  }
  if (data.findings) {
    params.findings = data.findings;
  }
  if (data.symptoms) {
    params.symptoms = data.symptoms;
  }
  if (fromAge !== undefined || "") {
    params.fromAge = fromAge;
  }
  if (toAge !== undefined || "") {
    params.toAge = toAge;
  }

  const datas = { params: Object.keys(params).length > 0 ? params : null };
  return http.get(URL.IPD_REPORTS, datas);
}

function getOpdReport(data, toAge, fromAge) {
  const params = {};

  if (data.timeDuration) {
    params.timeDuration = data.timeDuration;
  }
  if (data.doctor) {
    params.doctor = data.doctor;
  }
  if (data.gender) {
    params.gender = data.gender;
  }
  if (data.findings) {
    params.findings = data.findings;
  }
  if (data.symptoms) {
    params.symptoms = data.symptoms;
  }
  if (fromAge !== undefined) {
    params.fromAge = fromAge;
  }
  if (toAge !== undefined) {
    params.toAge = toAge;
  }

  const datas = { params: Object.keys(params).length > 0 ? params : null };
  return http.get(URL.OPD_REPORTS, datas);
}
function getOpdDischargedReport(data, toAge, fromAge) {
  const params = {};

  if (data.timeDuration) {
    params.timeDuration = data.timeDuration;
  }
  if (data.doctor) {
    params.doctor = data.doctor;
  }
  if (data.gender) {
    params.gender = data.gender;
  }
  if (data.dischargeStatus) {
    params.dischargeStatus = data.dischargeStatus;
  }
  if (fromAge !== undefined) {
    params.fromAge = fromAge;
  }
  if (toAge !== undefined) {
    params.toAge = toAge;
  }

  const datas = { params: Object.keys(params).length > 0 ? params : null };
  return http.get(URL.OPD_DISCHARGED_REPORT_URL, datas);
}
function getOpdBalanceReport(data, toAge, fromAge) {
  const params = {};

  if (data.timeDuration) {
    params.timeDuration = data.timeDuration;
  }
  if (data.fromDate) {
    params.fromDate = data.fromDate;
  }
  if (data.gender) {
    params.gender = data.gender;
  }
  if (data.toDate) {
    params.toDate = data.toDate;
  }
  if (data.status) {
    params.status = data.status;
  }
  if (fromAge !== undefined) {
    params.fromAge = fromAge;
  }
  if (toAge !== undefined) {
    params.toAge = toAge;
  }
  const datas = { params: Object.keys(params).length > 0 ? params : null };
  return http.get(URL.OPD_BALANCED_REPORT, datas);
}

function getIpdBalanceReport(data, toAge, fromAge) {
  const params = {};

  if (data.timeDuration) {
    params.timeDuration = data.timeDuration;
  }
  if (data.fromDate) {
    params.fromDate = data.fromDate;
  }
  if (data.gender) {
    params.gender = data.gender;
  }
  if (data.toDate) {
    params.toDate = data.toDate;
  }
  if (data.status) {
    params.status = data.status;
  }
  if (fromAge !== undefined) {
    params.fromAge = fromAge;
  }
  if (toAge !== undefined) {
    params.toAge = toAge;
  }
  const datas = { params: Object.keys(params).length > 0 ? params : null };
  return http.get(URL.IPD_BALANCE_REPORT, datas);
}
// function postRadiologyCatetegory(data){
//   return http.post(URL.RADILOGY_CATEGORY_URL,data)
// }
// function getRadiologyCategorys(){
//   return http.get(URL.RADILOGY_CATEGORY_URL)
// }
// function postRadiologyUnit(data){
//   return http.post(URL.RADIOLOGY_UNIT_URL,data)
// }
// function getRadiologyUnit(){
//   return http.get(URL.RADIOLOGY_UNIT_URL)
// }
// function postRadiologyparameter(data){
//   return http.post(URL.RADILOGY_PARAMETER_URL,data)
// }
// function getRadiologyParameter(){
//   return http.get(URL.RADILOGY_PARAMETER_URL)
// }

function getFindings_report() {
  return http.get(URL.FINDINGS_URL);
}
function getSymptoms() {
  return http.get(URL.SYMPTOMS_URL);
}

//finance

function getIncomeHead(datas) {
  const data = { params: { search: datas } };
  return http.get(URL.FINANCE_SETUP_INCOMEHEAD, data);
}
function postsIncomeHead(data) {
  return http.post(URL.FINANCE_SETUP_INCOMEHEAD, data);
}
function getExpenceHead(datas) {
  const data = { params: { search: datas } };
  return http.get(URL.FINANCE_SETUP_EXPENCEHEAD, data);
}
function postExpenceHead(data) {
  return http.post(URL.FINANCE_SETUP_EXPENCEHEAD, data);
}
function getFinanceModuleIncome(datas) {
  const data = { params: { search: datas } };
  return http.get(URL.FINANCE_INCOME, data);
}
function postFinanceModuleIncome(data) {
  return http.post(URL.FINANCE_INCOME, data);
}
function getFinanceModuleExpenses(datas) {
  const data = { params: { search: datas } };
  return http.get(URL.FINANCE_EXPENCE, data);
}
function postFinanceModuleExpenses(data) {
  return http.post(URL.FINANCE_EXPENCE, data);
}

//setup appointment

function getAppointmentsetupSlotdoctor() {
  return http.get(URL.APPOINTMENT_SETUP_SLOT_DOCTOR);
}
function getAppointmentsetupSlotshift(doctorid) {
  const data = { params: { id: doctorid } };
  return http.get(URL.APPOINTMENT_SETUP_SLOT_SHIFT, data);
}
function getAppointmentsetupSlotconsultation(shiftid) {
  const data = { params: { id: shiftid } };
  return http.get(URL.APPOINTMETN_SETUP_SLOT_CONSULTATION, data);
}
function getSearchedShifts(doctorid, shiftid, days) {
  const data = { params: { staff: doctorid, shift: shiftid, day: days } };
  return http.get(URL.APPOINTMENT_SETUP_SLOT_GETSEARCH, data);
}
function getAppointmentSlotChargeCategoy() {
  return http.get(URL.APPOINTMENT_SETUP_SLOT_CHARGECATEGORY);
}
function getAppointmentSlotCharges(categoryid) {
  const data = { params: { id: categoryid } };
  return http.get(URL.APPOINTMENT_SETUP_SLOT_CHARGES, data);
}
function getAppointmentdoctorshift() {
  return http.get(URL.APPOINTMENT_SETUP_DOCTORSHIFT);
}
function getAppointmentsetupShifts() {
  return http.get(URL.APPOINTMENT_SETUP_SHIFTS);
}
function postAppointmentsetupShift(data) {
  return http.post(URL.APPOINTMENT_SETUP_SHIFTS, data);
}

//setup HR
function getHrsetup_Leavetype() {
  return http.get(URL.HR_SETUP_LEAVE_TYPE);
}
function postHrsetup_LeaveType(data) {
  return http.post(URL.HR_SETUP_LEAVE_TYPE, data);
}
function getHrsetup_Department() {
  return http.get(URL.HR_SETUP_DEPARTMENT);
}
function postHrsetup_Department(data) {
  return http.post(URL.HR_SETUP_DEPARTMENT, data);
}
function getHrsetup_Designation() {
  return http.get(URL.HR_SETUP_DESIGNATION);
}
function postHrsetup_Designation(data) {
  return http.post(URL.HR_SETUP_DESIGNATION, data);
}
function getHrsetup_Specilist() {
  return http.get(URL.HR_SETUP_SPECIALIST);
}
function postHrsetup_Specialist(data) {
  return http.post(URL.HR_SETUP_SPECIALIST, data);
}

//Setup Bed

function getBedFloorSetup(data = {}) {
  return http.get(URL.SETUP_FLOOR_URL, data);
}

function postBedFloorSetup(data = {}) {
  return http.post(URL.SETUP_FLOOR_URL, data);
}

function getBedGroupSetup(data = {}) {
  return http.get(URL.SETUP_BED_GROUP_URL, data);
}

function postBedGroupSetup(data = {}) {
  return http.post(URL.SETUP_BED_GROUP_URL, data);
}

function getBedTypeSetup(data = {}) {
  return http.get(URL.SETUP_BED_TYPE_URL, data);
}

function postBedTypeSetup(data = {}) {
  return http.post(URL.SETUP_BED_TYPE_URL, data);
}

function getBedSetup(data = {}) {
  return http.get(URL.SETUP_BED_URL, data);
}

function postBedSetup(data = {}) {
  return http.post(URL.SETUP_BED_URL, data);
}

function getBedStatusSetup(data = {}) {
  return http.get(URL.SETUP_BED_STATUS_URL, data);
}

function getPathologyTest(data = {}) {
  return http.get(URL.PATHOLOGY_TEST_URL, data);
}

function postPathologyTest(data = {}) {
  return http.post(URL.PATHOLOGY_TEST_URL, data);
}

function getPathologyBill(data = {}) {
  return http.get(URL.PATHOLOGY_BILL_URL, data);
}

function postPathologyGenerateBill(data = {}) {
  return http.post(URL.PATHOLOGY_GENERATE_BILL_URL, data);
}

function getPathologyCategoryName(data = {}) {
  return http.get(URL.PATHOLOGY_CATEGORY_NAME_URL, data);
}

function getPathologyChargeCategory(data = {}) {
  return http.get(URL.PATHOLOGY_CHARGE_CATEGORY_URL, data);
}

function getPathologyChargeName(data = {}) {
  return http.get(URL.PATHOLOGY_CHARGE_NAME_URL, data);
}

function getPathologyTestParameterName(data = {}) {
  return http.get(URL.PATHOLOGY_TEST_PARAMETER_NAME_URL, data);
}

function getPathologyTestName(data = {}) {
  return http.get(URL.PATHOLOGY_TEST_NAME_URL, data);
}

function getPathologySearchByPrescription(data = {}) {
  return http.get(URL.PATHOLOGY_SEARCH_BY_PRESCRIPTION_URL, data);
}

function postPathologyReport(data = {}) {
  return http.post(URL.PATHOLOGY_REPORT_URL, data);
}

function postPathologyTransaction(data = {}) {
  return http.post(URL.PATHOLOGY_TRANSACTION_URL, data);
}

function getPathologySetupCategory(data = {}) {
  return http.get(URL.PATHOLOGY_SETUP_CATEGORY_URL, data);
}

function postPathologySetupCategory(data = {}) {
  return http.post(URL.PATHOLOGY_SETUP_CATEGORY_URL, data);
}

function getPathologySetupUnit(data = {}) {
  return http.get(URL.PATHOLOGY_SETUP_UNIT_URL, data);
}

function postPathologySetupUnit(data = {}) {
  return http.post(URL.PATHOLOGY_SETUP_UNIT_URL, data);
}

function getPathologySetupParameter(data = {}) {
  return http.get(URL.PATHOLOGY_SETUP_PARAMETER_URL, data);
}

function postPathologySetupParameter(data = {}) {
  return http.post(URL.PATHOLOGY_SETUP_PARAMETER_URL, data);
}

//Inventory

function getInventoryItem(data = {}) {
  return http.get(URL.INVENTORY_ITEM_URL, data);
}

function postInventoryItem(data = {}) {
  return http.post(URL.INVENTORY_ITEM_URL, data);
}

function getInventoryItemCategory(data = {}) {
  return http.get(URL.INVENTORY_ITEM_CATEGORY_URL, data);
}

function getInventoryItemStock(data = {}) {
  return http.get(URL.INVENTORY_ITEM_STOCK_URL, data);
}

function postInventoryItemStock(data = {}) {
  return http.post(URL.INVENTORY_ITEM_STOCK_URL, data);
}

function getInventoryItemSupplier(data = {}) {
  return http.get(URL.INVENTORY_ITEM_SUPPLIER_URL, data);
}

function getInventoryItemStore(data = {}) {
  return http.get(URL.INVENTORY_ITEM_STORE_URL, data);
}

function getInventoryItemIssue(data = {}) {
  return http.get(URL.INVENTORY_ISSUE_ITEM_URL, data);
}

function postInventoryItemIssue(data = {}) {
  return http.post(URL.INVENTORY_ISSUE_ITEM_URL, data);
}

function getInventoryItemIssueto(data = {}) {
  return http.get(URL.INVENTORY_ISSUE_TO_URL, data);
}

function getInventoryItemUserType(data = {}) {
  return http.get(URL.INVENTORY_ISSUE_USER_TYPE_URL, data);
}

//Setup Symptoms

function getSymptomHeadSetup(data = {}) {
  return http.get(URL.SETUP_SYMPTOM_HEAD_URL, data);
}

function postSymptomHeadSetup(data = {}) {
  return http.post(URL.SETUP_SYMPTOM_HEAD_URL, data);
}

function getSymptomTypeSetup(data = {}) {
  return http.get(URL.SETUP_SYMPTOM_TYPE_URL, data);
}

function postSymptomTypeSetup(data = {}) {
  return http.post(URL.SETUP_SYMPTOM_TYPE_URL, data);
}

//settings

function postGeneralSetting(data = {}) {
  return http.post(URL.GENERAL_SETTING_URL, data);
}

function postsmsSetting(data = {}) {
  return http.post(URL.SETUP_SMS_SETTING_URL, data);
}

function postPaymentSetting(data = {}) {
  return http.post(URL.SETUP_PAYMENT_SETTING_URL, data);
}

function getRoleSetting(data = {}) {
  return http.get(URL.SETUP_ROLE_URL, data);
}

function postRoleSetupSetting(data = {}) {
  return http.post(URL.SETUP_ROLE_URL, data);
}

function postEmailSetting(data = {}) {
  return http.post(URL.EMAIL_SETTING_URL, data);
}

function getUserPatientSetting(data = {}) {
  return http.get(URL.USER_PATIENT_SETTING_URL, data);
}

function getUserStaffSetting(data = {}) {
  return http.get(URL.USER_STAFF_SETTING_URL, data);
}

function getPrefixSetting(data = {}) {
  return http.get(URL.PREFIX_SETTING_URL, data);
}

function postPrefixSetting(data = {}) {
  return http.put(URL.PREFIX_SETTING_URL, data);
}

function getPatientCredsReport(data = {}) {
  return http.get(URL.PATIENT_CREDS_URL, data);
}

function getCollectedBy(data = {}) {
  return http.get(URL.COLLECTED_BY_URL, data);
}

function getBirthReport(timeDuration, gender) {
  console.log("timeDuration:", timeDuration);
  console.log("gender:", gender);

  const url = `${URL.BIRTH_REPORT_URL}?timeDuration=${timeDuration}&gender=${gender}`;
  console.log("url:", url);

  return http.get(url);
}

function getDeathReport(timeDuration, gender) {
  console.log("timeDuration:", timeDuration);
  console.log("gender:", gender);

  const url = `${URL.DEATH_REPORT_URL}?timeDuration=${timeDuration}&gender=${gender}`;
  console.log("url:", url);

  return http.get(url);
}

function getIncomeReport(timeDuration) {
  console.log("timeDuration:", timeDuration);

  const url = `${URL.INCOME_REPORT_URL}?timeDuration=${timeDuration}`;
  console.log("url:", url);

  return http.get(url);
}

function getExpenseReport(timeDuration) {
  console.log("timeDuration:", timeDuration);

  const url = `${URL.EXPENSE_REPORT_URL}?timeDuration=${timeDuration}`;
  console.log("url:", url);

  return http.get(url);
}

function getIncomeHeads(data = {}) {
  return http.get(URL.INCOME_GROUP_REPORT_URL, data);
}

function getIncomegroupReport(timeDuration, incomeHead) {
  console.log("timeDuration:", timeDuration);
  console.log("incomeHead:", incomeHead);

  const url = `${URL.INCOME_REPORT_URL}?timeDuration=${timeDuration}&incomeHead=${incomeHead}`;
  console.log("url:", url);

  return http.get(url);
}

function getExpenceHeads(data = {}) {
  return http.get(URL.EXPENSE_GROUP_REPORT_URL, data);
}

function getExpensegroupReport(timeDuration, expenseHead) {
  console.log("timeDuration:", timeDuration);
  console.log("incomeHead:", expenseHead);

  const url = `${URL.EXPENSE_REPORT_URL}?timeDuration=${timeDuration}&expenseHead=${expenseHead}`;
  console.log("url:", url);

  return http.get(url);
}

function getInventoryStockReport(data = {}) {
  return http.get(URL.INVENTORY_ITEM_STOCK_REPORT_URL, data);
}

function getInventoryIssueReport(timeDuration) {
  console.log("timeDuration:", timeDuration);
  const url = `${URL.INVENTORY_ISSUE_REPORT_URL}?timeDuration=${timeDuration}`;
  console.log("url:", url);

  return http.get(url);
}

function getInventoryItemReport(timeDuration) {
  console.log("timeDuration:", timeDuration);
  const url = `${URL.INVENTORY_ITEM_REPORT_URL}?timeDuration=${timeDuration}`;
  console.log("url:", url);

  return http.get(url);
}

// function getPayrollReport(timeDuration){
//   console.log("timeDuration:",timeDuration)
//   const url = `${URL.PAYROLL_REPORT_URL}?timeDuration=${timeDuration}`;
//   console.log("url:", url);

//   return http.get(url);
// }

function getDailyTransactionReport(fromDate, toDate) {
  console.log("fromDate:", fromDate);
  console.log("toDate:", toDate);
  const url = `${URL.DAILY_TRANSACTION_REPORT_URL}?fromDate=${fromDate}&toDate=${toDate}`;
  console.log("url:", url);

  return http.get(url);
}

function getAllTransactionReport(timeDuration, collectedBy, head) {
  console.log("timeDuration:", timeDuration);
  console.log("collectedBy:", collectedBy);
  console.log("head:", head);
  const url = `${URL.TRANSACTION_REPORT_URL}?timeDuration=${timeDuration}&collectedBy=${collectedBy}&head=${head}`;
  console.log("url:", url);

  return http.get(url);
}

function getAuditTrailReport(data = {}) {
  return http.get(URL.AUDIT_TRAIL_REPORT_URL, data);
}

function getPharmacyBillReport(
  timeDuration,
  fromAge,
  toAge,
  gender,
  collectedBy,
  paymentMode
) {
  console.log("timeDuration:", timeDuration);

  console.log("fromAge:", fromAge);
  console.log("toAge:", toAge);
  console.log("gender:", gender);
  console.log("paymentMode:", paymentMode);
  console.log("collectedBy:", collectedBy);
  const url = `${URL.PHARMACY_BILL_REPORT_URL}?timeDuration=${timeDuration}&fromAge=${fromAge}&toAge=${toAge}&gender=${gender}&paymentMode=${paymentMode}&collectedBy=${collectedBy}`;
  console.log("url:", url);

  return http.get(url);
}

function getPatientVisitReport(patient_ID) {
  console.log("patient_ID:", patient_ID);
  const url = `${URL.PATIENT_VISIT_REPORT_URL}?patient_ID=${patient_ID}`;
  console.log("url:", url);

  return http.get(url);
}

function getPatientBillReport(case_ID) {
  console.log("case_ID:", case_ID);
  const url = `${URL.PATIENT_BILL_REPORT_URL}?case_ID=${case_ID}`;
  console.log("url:", url);

  return http.get(url);
}

function getRadiologyReportName(data = {}) {
  return http.get(URL.RADIOLOGY_REPORT_NAME_URL, data);
}

function getRadiologyReportCategory(data = {}) {
  return http.get(URL.RADILOGY_REPORT_CATEGORY_URL, data);
}

function getRadiologyPatientReport(timeDuration, collectedBy, test, category) {
  console.log("timeDuration:", timeDuration);
  console.log("collectedBy:", collectedBy);
  console.log("test:", test);
  console.log("category:", category);

  const url = `${URL.RADIOLOGY_PATIENT_REPORT}?timeDuration=${timeDuration}&collectedBy=${collectedBy}&test=${test}&category=${category}`;
  console.log("url:", url);

  return http.get(url);
}

function getCertificate() {
  console.log("timeDuration:", timeDuration);
  console.log("collectedBy:", collectedBy);
  console.log("test:", test);
  console.log("category:", category);

  const url = `${URL.RADIOLOGY_PATIENT_REPORT}?timeDuration=${timeDuration}&collectedBy=${collectedBy}&test=${test}&category=${category}`;
  console.log("url:", url);

  return http.get(url);
}

function getStaffAttendance(role, month, year) {
  console.log("role:", role);
  console.log("month:", month);
  console.log("year:", year);

  const url = `${URL.STAFF_ATTENDANCE_URL}?role=${role}&month=${month}&year=${year}`;
  return http.get(url);
}

function getPathologyPatientReportDetails(
  timeDuration,
  collectedBy,
  category,
  test
) {
  console.log("timeDuration:", timeDuration);
  console.log("collectedBy:", collectedBy);
  console.log("category:", category);
  console.log("test:", test);

  const url = `${URL.PATHOLOGY_REPORT}?timeDuration=${timeDuration}&collectedBy=${collectedBy}&category=${category}&test=${test}`;
  console.log("url:", url);

  return http.get(url);
}

function getPathologyCategoryDetails(data = {}) {
  return http.get(URL.PATHOLOGY_CATEGORY_REPORT, data);
}

function getPathologyNameDetails(data = {}) {
  return http.get(URL.PATHOLOGY_NAME_REPORT, data);
}

function getPayrollReport(timeDuration) {
  console.log("timeDuration:", timeDuration);

  const url = `${URL.PAYROLL_REPORT}?timeDuration=${timeDuration}`;
  console.log("url:", url);

  return http.get(url);
}

function getAmbulanceReport(timeDuration, collectedBy, vehicleModel) {
  console.log("timeDuration:", timeDuration);
  console.log("collectedBy:", collectedBy);
  console.log("vehicleModel:", vehicleModel);

  const url = `${URL.AMBULANCE_REPORT}?timeDuration=${timeDuration}&collectedBy=${collectedBy}&vehicleModel=${vehicleModel}`;
  console.log("url:", url);

  return http.get(url);
}

function getAmbulanceCollected(data = {}) {
  return http.get(URL.AMBULANCE_COLLECTEDBY_REPORT, data);
}

function getAmbulanceVehicleModel(data = {}) {
  return http.get(URL.AMBULANCE_VEHICLE_MODEL_REPORT, data);
}

function getBloodIssueReport(
  timeDuration,
  bloodCollectedBy,
  amountCollectedBy,
  bloodGroup,
  bloodDonor
) {
  console.log("timeDuration:", timeDuration);
  console.log("bloodCollectedBy:", bloodCollectedBy);
  console.log("amountCollectedBy:", amountCollectedBy);
  console.log("bloodGroup:", bloodGroup);
  console.log("bloodDonor:", bloodDonor);

  const url = `${URL.BLOOD_ISSUE_REPORT}?timeDuration=${timeDuration}&bloodCollectedBy=${bloodCollectedBy}&amountCollectedBy=${amountCollectedBy}&bloodGroup=${bloodGroup}&bloodDonor=${bloodDonor}`;
  console.log("url:", url);

  return http.get(url);
}

function getBloodIssuereports(data = {}) {
  return http.get(URL.BLOOD_ISSUE_REPORT, data);
}

function getBloodDonorReport(timeDuration, bloodGroup, bloodDonor) {
  console.log("timeDuration:", timeDuration);
  console.log("bloodGroup:", bloodGroup);
  console.log("bloodDonor:", bloodDonor);

  const url = `${URL.BLOOD_DONOR_REPORT}?timeDuration=${timeDuration}&bloodGroup=${bloodGroup}&bloodDonor=${bloodDonor}`;
  console.log("url:", url);

  return http.get(url);
}

function getBloodDonorDetail(data = {}) {
  return http.get(URL.BLOOD_DONOR, data);
}

function getOTReport(timeDuration, doctor, category, operation) {
  console.log("timeDuration:", timeDuration);
  console.log("doctor:", doctor);
  console.log("category:", category);
  console.log("operation:", operation);

  const url = `${URL.OT_REPORT}?timeDuration=${timeDuration}&doctor=${doctor}&category=${category}&operation=${operation}`;
  console.log("url:", url);

  return http.get(url);
}

function getComponentIssueReport(
  timeDuration,
  bloodCollectedBy,
  amountCollectedBy,
  bloodGroup,
  components
) {
  console.log("timeDuration:", timeDuration);
  console.log("bloodCollectedBy:", bloodCollectedBy);
  console.log("amountCollectedBy:", amountCollectedBy);
  console.log("bloodGroup:", bloodGroup);
  console.log("components:", components);

  const url = `${URL.COMPONENT_ISSUE_REPORT}?timeDuration=${timeDuration}&bloodCollectedBy=${bloodCollectedBy}&amountCollectedBy=${amountCollectedBy}&bloodGroup=${bloodGroup}&components=${components}`;
  console.log("url:", url);

  return http.get(url);
}

function getComponents(data = {}) {
  return http.get(URL.COMPONENT_REPORT, data);
}

function getReferralReport(payee, patient_type, patient) {
  console.log("payee:", payee);
  console.log("patient_type:", patient_type);
  console.log("patient:", patient);

  const url = `${URL.REFERRAL_PAYMENT_REPORT}?payee=${payee}&patient_type=${patient_type}&patient=${patient}`;
  console.log("url:", url);

  return http.get(url);
}

function getPayeeDetails(data = {}) {
  return http.get(URL.PAYEE_REPORT, data);
}

function getPatientTypeDetails(data = {}) {
  return http.get(URL.PATIENT_TYPE_REPORT, data);
}

function getTPAManagement(data = {}) {
  return http.get(URL.TPA_MANAGEMENT_REPORT, data);
}

function postTPAManagement(data = {}) {
  return http.post(URL.TPA_MANAGEMENT_REPORT, data);
}

function getTPADetails(
  timeDuration,
  doctor,
  tpa,
  caseId,
  chargeCategory,
  charge
) {
  console.log("timeDuration:", timeDuration);
  console.log("doctor:", doctor);
  console.log("tpa:", tpa);
  console.log("caseId:", caseId);
  console.log("chargeCategory:", chargeCategory);
  console.log("charge:", charge);

  const url = `${URL.TPA_REPORT}?timeDuration=${timeDuration}&doctor=${doctor}&tpa=${tpa}&caseId=${caseId}&chargeCategory=${chargeCategory}&charge=${charge}`;
  console.log("url:", url);

  return http.get(url);
}

function getBirthRecord(data = {}) {
  return http.get(URL.BIRTH_RECORD_URL, data);
}

function postBirthRecord(data = {}) {
  return http.post(URL.BIRTH_RECORD_URL, data);
}

function getDeathRecordDetails(data = {}) {
  return http.get(URL.DEATH_RECORD, data);
}

function postDeathRecordDetails(data = {}) {
  return http.post(URL.DEATH_RECORD, data);
}

function getCertificateOverview(module, certificateTemplate, status) {
  console.log("module:", module);
  console.log("certificateTemplate:", certificateTemplate);
  console.log("status:", status);

  const url = `${URL.CERTIFICATE_URL}?module=${module}&certificateTemplate=${certificateTemplate}&status=${status}`;
  console.log("url:", url);

  return http.get(url);
}

function getCertificateTemplate(data = {}) {
  return http.get(URL.CERTIFICATE_TEMP_URL, data);
}

function getSetupApptSlotTime(day, staff_id, shift_id) {
  console.log("day:", day);
  console.log("staff_id:", staff_id);
  console.log("shift_id", shift_id);

  const url = `${URL.SETUP_APPT_SLOT_TIMING}?day=${day}&staff_id=${staff_id}&shift_id=${shift_id}`;
  console.log("url:", url);

  return http3.get(url);
}

function postSetupApptSlotTime(formData, staff_id, global_shift_id, start_time, end_time) {
  const payload = {
    ...formData,
    staff_id: staff_id,
    global_shift_id: global_shift_id,
    start_time,
    end_time
  };

  return http3.post(URL.SETUP_APPT_SLOT_TIMING, payload);
}

function getSetupApptSlotCharge(staff_id) {
  console.log("staff_id:", staff_id);

  const url = `${URL.APPT_SLOT_CHARGE}?staff_id=${staff_id}`;
  console.log("url:", url);

  return http3.get(url);
}

function getSetupApptShift(data = {}){
  return http3.get(URL.SETUP_APPT_SHIFT, data)
}

function postSetupApptShift(data = {}){
  return http3.post(URL.SETUP_APPT_SHIFT, data)
}

function getSetupApptGlobalShift(data = {}){
  return http3.get(URL.SETUP_APPT_GLOBAL_SHIFT, data)
}

function updateSetupApptGlobalShift(updatedId, data={}){
  const url = `${URL.SETUP_APPT_GLOBAL_SHIFT}/${updatedId}`;
  return http3.patch(url, data)
}


// function getPathologyPatientReportDetails(timeDuration,collectedBy,category,test){
//   console.log("timeDuration:", timeDuration);
//   console.log("collectedBy:", collectedBy);
//   console.log("category:", category);
//   console.log("test:", test);

//   const url = `${URL.PATHOLOGY_REPORT}?timeDuration=${timeDuration}&collectedBy=${collectedBy}&category=${category}&test=${test}`;
//   console.log("url:", url);

//   return http.get(url);
// }

// function getPathologyCategoryDetails(data = {}){
//   return http.get(URL.PATHOLOGY_CATEGORY_REPORT, data)
// }

// function getPathologyNameDetails(data = {}){
//   return http.get(URL.PATHOLOGY_NAME_REPORT, data)
// }

function getDownloadCenterDetails(data = {}) {
  return http.get(URL.DOWNLOAD_CENTER, data);
}

function postDownloadCenterDetails(data = {}) {
  return http.post(URL.DOWNLOAD_CENTER, data);
}

function getReferralPaymentDetails(data = {}) {
  return http.get(URL.REFERRAL_PAYMENT, data);
}

function postReferralPaymentDetails(data = {}) {
  return http.post(URL.REFERRAL_PAYMENT, data);
}

function getReferralPersonDetails(data = {}) {
  return http.get(URL.REFERRAL_PERSON, data);
}

function postReferralPersonDetails(data = {}) {
  return http.post(URL.REFERRAL_PERSON, data);
}

function getReferralCategoryDetails(data = {}) {
  return http.get(URL.REFERRAL_CATEGORY, data);
}

function postReferralCategoryDetails(data = {}) {
  return http.post(URL.REFERRAL_CATEGORY, data);
}

function generateAbhaOtp(data = {}) {
  return http2.post(URL.ABHA_GENERATE_OTP, data);
}

function verifyAbhaOtp(data = {}) {
  return http2.post(URL.ABHA_VERIFY_OTP, data);
}

function checkMobileOtp(data = {}) {
  return http2.post(URL.ABHA_CHECK_MOBILE_OTP, data);
}

function verifyMobileOtp(data = {}) {
  return http2.post(URL.ABHA_VERIFY_MOBILE_OTP, data);
}

function creationOfAbhaId(data = {}) {
  return http2.post(URL.ABHA_CREATE_ID, data);
}

function downloadAbhaCard(data = {}) {
  console.log(data, "dattttttt");
  return http2.post(URL.ABHA_DOWNLOAD_CARD, data);
}

function downloadQR(data = {}) {
  console.log(data, "dattttttt");
  return http2.post(URL.ABHA_QR_CODE, data);
}

function donwloadPng(data = {}) {
  console.log(data, "dattttttt");
  return http2.post(URL.ABHA_PNG_CARD, data);
}

function downloadSvg(data = {}) {
  return http2.post(URL.ABHA_SVG_CARD, data);
}

function getAbhaProfile(data = {}) {
  return http2.post(URL.ABHA_GET_PROFILE, data);
}

function postAbhaProfile(refreshToken, data) {
  console.log(data, "dataaaa");
  return http2.post(URL.ABHA_UPDATE_PROFILE, { refreshToken, data: data });
}

function postAbhaNumber(healthIdNumber, refreshToken) {
  // console.log(data,'dtttt')
  console.log(healthIdNumber, "hid");
  return http2.post(URL.ABHA_ADDRESS_CREATION, healthIdNumber, refreshToken);
}

function postAbhaOtp(transactionId, values) {
  const { value } = values;
  return http2.post(URL.ABHA_ADDRESS_MOBILE_OTP, { transactionId, value });
}

function postAbhaMobileAuth(data) {
  return http2.post(URL.ABHA_MOBILE_AUTH, data);
}

function getLinkAddress(transactionId) {
  return http2.post(URL.ABHA_PHR_ADDRESS_SUGGESTION, { transactionId });
}
////////

function postSetupRadiologyCategory(data){
  return http4.post(URL.SETUP_RADIOLOGY_CATEGORY,data)
}
function patchSetupRadiologyCategory(data){
console.log(data,"ccc")
  const url = `${URL.SETUP_RADIOLOGY_CATEGORY}/${data.id}`
  return http4.patch(url,data)
}
function getSetupRadiologyCategory(){
  return http4.get(URL.SETUP_RADIOLOGY_CATEGORY)
}
function deleteSetupRadiologyCategory(data){
  const url = `${URL.SETUP_RADIOLOGY_CATEGORY}/${data}`
  return http4.delete(url);
}
function postSetupRadiologyUnit(data){
  return http4.post(URL.SETUP_RADIOLOGY_UNIT,data)
}
function getSetupRadiologyUnit(){
  return http4.get(URL.SETUP_RADIOLOGY_UNIT)
}
function deleteSetupRadiologyUnit(data){
  const url = `${URL.SETUP_RADIOLOGY_UNIT}/${data}`
  return http4.delete(url);
}
function patchSetupRadiologyUnit(data){
  console.log(data,"ccc")
    const url = `${URL.SETUP_RADIOLOGY_UNIT}/${data.id}`
    return http4.patch(url,data)
  }
function postSetupRadiologyParameter(data){
  return http4.post(URL.SETUP_RADIOLOGY_PARAMETER,data)
}
function getSetupRadiologyParameter(){
  return http4.get(URL.SETUP_RADIOLOGY_PARAMETER)
}
function patchSetupRadiologyParameter(data){
  console.log(data,"ccc")
    const url = `${URL.SETUP_RADIOLOGY_PARAMETER}/${data.id}`
    return http4.patch(url,data)
  }
  function deleteSetupRadiologyParameter(data){
    const url = `${URL.SETUP_RADIOLOGY_PARAMETER}/${data}`
    return http4.delete(url);
  }
  function postSetupPathologyCategory(data) {
    return http4.post(URL.SETUP_PATHOLOGY_CATEGORY,data)
  }
  function getSetupPathologyCategory() {
    return http4.get(URL.SETUP_PATHOLOGY_CATEGORY)
  }
  function patchSetupPathologyCategory(data) {
    const url = `${URL.SETUP_PATHOLOGY_CATEGORY}/${data.id}`
    return http4.patch(url,data)
  }
  function deleteSetupPathologyCategory(id) {
    const url = `${URL.SETUP_PATHOLOGY_CATEGORY}/${id}`

    return http4.delete(url)
  }
  function getSetupPathologyUnit(){
    return http4.get(URL.SETUP_PATHOLOGY_UNIT)  
  }
  function postSetupPathologyUnit(data){
    return http4.post(URL.SETUP_PATHOLOGY_UNIT,data)
  }
  function deleteetupPathologyUnit(id){
    const url = `${URL.SETUP_PATHOLOGY_UNIT}/${id}`
    return http4.delete(url)
  }
  function updateStupPathologyUnit(data){
    const url = `${URL.SETUP_PATHOLOGY_UNIT}/${data?.id}`
    return http4.patch(url,data)
  }
  function getSetupPathologyParameter(){
    return http4.get(URL.SETUP_PATHOLOGY_PARMETER)
  }
  function postSetupPathologyParameter(data){
    return http4.post(URL.SETUP_PATHOLOGY_PARMETER,data)
  }
  function deleteSetupPathologyParameter(id){
    const url =`${URL.SETUP_PATHOLOGY_PARMETER}/${id}`
    return http4.delete(url)
  }
  function updateSetupPathologyParameter(data){
    const url =`${URL.SETUP_PATHOLOGY_PARMETER}/${data?.id}`
    return http4.patch(url,data)
  }
  function getSetup_Findings(){
    return http4.get(URL.SETUP_FINDINGS)
  }
  function postSetup_Findings(data){
    return http4.post(URL.SETUP_FINDINGS,data)
  }
  function updateSetup_Findings(data){
    console.log(data,"patching");
    const url = `${URL.SETUP_FINDINGS}/${data?.id}`
    http4.patch(url,data)
  }
  function deleteSetup_Findings(id){
    const url = `${URL.SETUP_FINDINGS}/${id}`
    http4.delete(url)
  }
  function getSetup_Finding_Category(){
    return http4.get(URL.SETUP_FINDING_CATEGORY)
  }
  function postSetup_Finding_Category(data){
    return http4.post(URL.SETUP_FINDING_CATEGORY,data)
  }
  function patchSetup_Finding_Category(data){
    const url = `${URL.SETUP_FINDING_CATEGORY}/${data?.id}`
    return http4.patch(url,data)
  }
  function deleteSetup_Finding_Category(id){
    const url = `${URL.SETUP_FINDING_CATEGORY}/${id}`
    return http4.delete(url)
  }
  function getSetup_chargeType_setup(){
    return http4.get(URL.SETUP_CHARGE_TYPE_MASTER)
  }
  function postSetup_chargeType_setup(data){
    return http4.post(URL.SETUP_CHARGE_TYPE_MASTER,data)
  }
  function patchSetup_chargeType_setup(data){
    const url = `${URL.SETUP_CHARGE_TYPE_MASTER}/${data.id}`
    return http4.patch(URL.SETUP_CHARGE_TYPE_MASTER,data)
  }
  function deleteSetup_chargeType_setup(id){
    const url = `${URL.SETUP_CHARGE_TYPE_MASTER}/${id}`
    return http4.delete(url)
  }

  function getSetup_ChargeType_module(){
    return http4.get(URL.SETUP_CHARGE_TYPE_MODULE)
  }

  
////////

function createPhrAddress(
  transactionId,
  phrAddress,
  password,
  alreadyExistedPHR
) {
  console.log(transactionId, phrAddress, password, "ddddddd");
  return http2.post(URL.ABHA_PHR_ADDRESS_CREATION, {
    transactionId,
    phrAddress,
    password,
    alreadyExistedPHR,
  });
}

function linkAbhabyOtp(abhaAddress, purpose, type, typeId) {
  return http2.post(URL.ABHA_M1_LINK, abhaAddress, purpose, type, typeId);
}

function initAbhaOtp(authMode, abhaAddress, purpose, type, typeId) {
  return http2.post(
    URL.ABHA_M1_OTP,
    authMode,
    abhaAddress,
    purpose,
    type,
    typeId
  );
}

function verifyM1AbhaOtp(txnId, authcode) {
  return http2.post(URL.ABHA_VERIFY_M1_OTP, txnId, authcode);
}

http.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("accessToken");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status } = error.response;
    if (status === 401) {
      toast.error("Unauthorized");
    } else if (status === 200) {
      toast.success("success!");
      console.log("success");
    } else {
      toast.error("An error occurred");
    }
    return Promise.reject(error);
  }
);

const api = {
  getUser,
  postUser,
  postLogin,
  http,
  postIpdUser,
  getIpdUser,
  postVisitor,
  getVisitor,
  postRadiologyDetails,
  postComplaint,
  getComplaint,
  postAppointment,
  getAppointment,
  postPatient,
  getRadiologyTestParameters,
  getPatient,
  getRadiologyCategory,
  getOpd,
  postOpd,
  getRadiologyDetails,
  getIpd,
  postIpd,
  getBloodgroups,
  getConsultant,
  postCallLog,
  getCallLog,
  getPharmacyBill,
  getPharmacyMeds,
  postPharmacyMeds,
  postPharmacyBill,
  postPharmacyBillDetails,
  postPharmacyBillTransaction,
  getPharmacyPurchase,
  postPharmacyPurchase,
  getDoctor,
  getDoctorwiseAppoinment,
  getShiftdatas,
  getSlotdatas,
  postConstant,
  getPatients,
  postPatients,
  getAllPatients,
  getCharges,
  postCharges,
  getChargeCategory,
  postChargeCategory,
  getChargetype,
  getSetupChargeCategory,
  getSetupChargeName,
  getTaxCategory,
  postTaxCategory,
  getUnitType,
  postUnitType,
  getPharmacyCtgry,
  postPharmacyCtgry,
  getMedDosage,
  postMedDosage,
  getMedSupplier,
  postMedSupplier,
  getDosageInterval,
  postDosageInterval,
  getDosageDuration,
  postDosageDuration,
  getOpdVisits,
  postOpdVisits,
  getOpdPayment,
  postOpdPayment,
  getOpdTimeline,
  postOpdTimeline,
  getOpdMedication,
  postOpdMedication,
  getDosage,
  getMedicineCategory,
  getMedicineName,
  getOpdOperation,
  postOpdOperation,
  getOperationCategory,
  getOperationName,
  getOpdCharges,
  postOpdCharges,
  getChargeName,
  getChargeType,
  getLabInvest,
  getTreatmentHistory,
  getDischargePatients,
  postNurseNote,
  getNurseNote,
  getIpdConsultant,
  getPatientId,
  postPayment,
  postTimeline,
  getTimeline,
  getPaymet,
  getOperationCategorys,
  getIpdOperationName,
  postOperation,
  getOperation,
  getMedicationCategroy,
  getMedicneName,
  getMedicineDosage,
  postMedication,
  getMedication,
  getIpdChargeType,
  getIpdChargeCategory,
  getIpdChargeName,
  postIpdCharges,
  getIpdCharges,
  postPrescriptionTest,
  postPrescriptionBasic,
  postPrescriptionDetails,
  getIpdDosageDuration,
  getDosageIntervel,
  getFindingCategory,
  getFindings,
  getRadiologys,
  getPathologys,
  getPrescription,
  postDischargePatients,
  getDischargePatients,
  getIpdTreatmentHistory,
  getBedHistory,
  getLabInvestigation,
  getNurses,
  getIpdDischargedReport,
  postStaff,
  getRole,
  getSpecialist,
  getDesignation,
  postStaffrole,
  postAuthUsers,
  postSetupChargeType,
  postRadiologyCatetegory,
  getRadiologyCategorys,
  postRadiologyUnit,
  getRadiologyUnit,
  getRadiologyParameter,
  getRoleBased,

  getAmbulanceCallReport,
  getAmbulanceCollectedBy,
  getAmbulanceVahicleModel,

  getSearchPrescriptionNo,
  postRadilogyTransactions,
  postRadiologyBill,
  postRadiologyReport,
  getRadiologyBill,
  postRadiologyparameter,

  postInvestmentCategory_setup,
  getInvestmetnCategory_setup,
  postInvestmentStore_setup,
  getInvestmentStore_setup,
  postInvestmentSupplier_setup,
  getInvestmentSupplier_setup,
  getIpddDischarges,
  getIpdReport,
  getOpdReport,
  getOpdDischargedReport,
  getOpdBalanceReport,
  getIpdBalanceReport,
  getFindings_report,
  getSymptoms,

  //finance
  getIncomeHead,
  postsIncomeHead,
  getExpenceHead,
  postExpenceHead,
  getFinanceModuleIncome,
  postFinanceModuleIncome,
  getFinanceModuleExpenses,
  postFinanceModuleExpenses,
  getAppointmentsetupSlotdoctor,
  getAppointmentsetupSlotshift,
  getAppointmentsetupSlotconsultation,
  getSearchedShifts,
  getAppointmentSlotChargeCategoy,
  getAppointmentSlotCharges,
  getAppointmentdoctorshift,
  getAppointmentsetupShifts,
  postAppointmentsetupShift,

  //setup HR
  getHrsetup_Leavetype,
  postHrsetup_LeaveType,
  getHrsetup_Department,
  postHrsetup_Department,
  getHrsetup_Designation,
  postHrsetup_Designation,
  getHrsetup_Specilist,
  postHrsetup_Specialist,
  getFrontofficeSetupVisitorsPurpose,
  postFrontofficeSetupVisitorsPurpose,
  getFrontofficeSetupSource,
  postFrontofficeSetupSource,
  getFrontofficeSetupComplainType,
  postFrontofficeSetupComplainType,
  getFrontofficeSetupPriority,
  postFrontofficeSetupPriority,
  getFrontofficeReceiver,
  postFrontofficeReceiver,
  getFrontofficeDispatch,
  postFrontofficeDispatch,

  getBedFloorSetup,
  postBedFloorSetup,
  getBedGroupSetup,
  postBedGroupSetup,
  getBedTypeSetup,
  postBedTypeSetup,
  getBedSetup,
  postBedSetup,
  getBedStatusSetup,

  getPathologyTest,
  postPathologyTest,
  getPathologyBill,
  postPathologyGenerateBill,
  getPathologyCategoryName,
  getPathologyChargeCategory,
  getPathologyChargeName,
  getPathologyTestParameterName,
  getPathologyTestName,
  getPathologySearchByPrescription,
  postPathologyReport,
  postPathologyTransaction,
  getPathologySetupCategory,
  postPathologySetupCategory,
  getPathologySetupUnit,
  postPathologySetupUnit,
  getPathologySetupParameter,
  postPathologySetupParameter,

  getInventoryItem,
  postInventoryItem,
  getInventoryItemCategory,
  getInventoryItemStock,
  postInventoryItemStock,
  getInventoryItemSupplier,
  getInventoryItemStore,
  getInventoryItemIssue,
  postInventoryItemIssue,
  getInventoryItemIssueto,
  getInventoryItemUserType,

  //symptoms
  getSymptomHeadSetup,
  postSymptomHeadSetup,
  getSymptomTypeSetup,
  postSymptomTypeSetup,

  //settings
  postGeneralSetting,
  postsmsSetting,
  postPaymentSetting,
  getRoleSetting,
  postRoleSetupSetting,
  postEmailSetting,
  getUserPatientSetting,
  getUserStaffSetting,
  getPrefixSetting,
  postPrefixSetting,
  //reports
  getPatientCredsReport,
  getBirthReport,
  getDeathReport,
  getIncomeReport,
  getExpenseReport,
  getIncomeHeads,
  getIncomegroupReport,
  getExpenceHeads,
  getExpensegroupReport,
  getInventoryStockReport,
  getInventoryIssueReport,
  getInventoryItemReport,
  getDailyTransactionReport,
  getAllTransactionReport,
  getCollectedBy,
  getBloodBank,
  getAuditTrailReport,
  getPharmacyBillReport,
  getPayrollReport,
  getPatientVisitReport,
  getPatientBillReport,
  getRadiologyReportCategory,
  getRadiologyReportName,
  getRadiologyPatientReport,
  getCertificate,
  getStaffAttendance,
  getPathologyPatientReportDetails,
  getPathologyCategoryDetails,
  getPathologyNameDetails,
  getPayrollReport,
  getAmbulanceReport,
  getAmbulanceCollected,
  getAmbulanceVehicleModel,
  getBloodIssueReport,
  getBloodDonorReport,
  getBloodIssuereports,
  getBloodDonorDetail,
  getOTReport,
  getComponentIssueReport,
  getComponents,
  getReferralReport,
  getPayeeDetails,
  getPatientTypeDetails,
  getTPAManagement,
  getTPADetails,
  getBirthRecord,
  postBirthRecord,
  getCertificateOverview,
  getCertificateTemplate,
  getDeathRecordDetails,
  postDeathRecordDetails,
  getDownloadCenterDetails,
  postDownloadCenterDetails,
  getReferralPaymentDetails,
  postReferralPaymentDetails,
  getReferralPersonDetails,
  postReferralPersonDetails,
  getReferralCategoryDetails,
  postReferralCategoryDetails,
  getTPAManagement,
  postTPAManagement,
  getSetupBloodBank,
  postSetupBloodBank,
  getOpdBillingDetails,
  getRadiologyBillingDetails,
  postRadiologyBillingDetails,
  getBloodIssueBillingDetails,
  postBloodIssueBillingDetails,
  getRadiologyReportBillingDetails,
  postRadiologyReportBillingDetails,
  getBillingBloodIssueBag,
  postTransaction,
  getBloodIssueComponent,
  postBloodIssueComponent,
  getDashboardData,
  getStaffcountData,
  getGraphData,
  generateAbhaOtp,
  verifyAbhaOtp,
  checkMobileOtp,
  verifyMobileOtp,
  creationOfAbhaId,
  downloadAbhaCard,
  downloadQR,
  donwloadPng,
  downloadSvg,
  getAbhaProfile,
  postAbhaProfile,
  postAbhaNumber,
  postAbhaOtp,
  postAbhaMobileAuth,
  getLinkAddress,
  createPhrAddress,
  linkAbhabyOtp,
  initAbhaOtp,
  verifyM1AbhaOtp,

  getSetupApptSlotTime,
  getSetupApptSlotCharge,
  postSetupApptSlotTime,
  getSetupApptShift,
  postSetupApptShift,
  getSetupApptGlobalShift,
  updateSetupApptGlobalShift,
  getApptDoctor,
  getApptShift, 
  getApptSlot,
  postSetupRadiologyCategory,
  getSetupRadiologyCategory,
  patchSetupRadiologyCategory,
  deleteSetupRadiologyCategory,
  postSetupRadiologyUnit,
  getSetupRadiologyUnit,
  patchSetupRadiologyUnit,
  deleteSetupRadiologyUnit,
  postSetupRadiologyParameter,
  getSetupRadiologyParameter,
  patchSetupRadiologyParameter,
  deleteSetupRadiologyParameter,
  getSetupPathologyCategory,
  postSetupPathologyCategory,
  patchSetupPathologyCategory,
  deleteSetupPathologyCategory,
  getSetupPathologyUnit,
  postSetupPathologyUnit,
  updateStupPathologyUnit,
  deleteetupPathologyUnit,
  getSetupPathologyParameter,
  postSetupPathologyParameter,
  updateSetupPathologyParameter,
  deleteSetupPathologyParameter,
  getSetup_Finding_Category,
  postSetup_Finding_Category,
  patchSetup_Finding_Category,
  deleteSetup_Finding_Category,
  getSetup_Findings,
  postSetup_Findings,
  updateSetup_Findings,
  deleteSetup_Findings,
  postSetup_chargeType_setup,
  getSetup_chargeType_setup,
  patchSetup_chargeType_setup,
  deleteSetup_chargeType_setup,
  getSetup_ChargeType_module
};

export default api;
