import React from "react";
import { Redirect } from "react-router-dom";

// Profile
import UserProfile from "../pages/Authentication/Profile/userProfile";

// Authentication related pages
import Login from "pages/Authentication/LoginOld";
import Logout from "../pages/Authentication/Logout";
import RegisterStaff from "pages/Authentication/RegisterStaff";
import ForgetPwd from "../pages/Authentication/ForgetPassword";
import SignupActivation from "../pages/Authentication/SignupActivation";

// Dashboard
import Dashboard from "../pages/Dashboard/index";

//Billing
import Billing from "../pages/Billing/Billing";
import Appointment from "../pages/Appointment/Appointment";
import Opd from "../pages/OutPatient/Opd";
import Ipd from "../pages/InPatient/Ipd";
import Pharmacy from "../pages/Pharmacy/Pharmacy";
import Pathology from "../pages/Pathology/Pathology";
import Radiology from "../pages/Radiology/Radiology";
import Bloodbank from "../pages/BloodBank/Bloodbank";
import Ambulance from "../pages/Ambulance/Ambulance";
import Frontoffice from "../pages/FrontOffice/Frontoffice";
import BirthRecord from "../pages/Records/BirthRecord";
import DeathRecord from "../pages/Records/DeathRecord";
import Hr from "../pages/HumanResource/Hr";
import Income from "../pages/Finance/Income";
import Expenses from "../pages/Finance/Expenses";
import LiveMeeting from "../pages/Consultation/LiveMeeting";
import LiveConsult from "../pages/Consultation/LiveConsult";
import Inventory from "../pages/Inventory/Inventory";
import Frontcms from "../pages/Frontcms/Frontcms";
import Message from "../pages/Messaging/Message";
import Certificate from "../pages/Certificate/Certificate";
import OpdReport from "../pages/Reports/OpdReport";
import IpdReport from "../pages/Reports/IpdReport";
import PathologyReport from "../pages/Reports/PathologyReport";
import BloodReport from "../pages/Reports/BloodReport";
import RadiologyReport from "../pages/Reports/RadiologyReport";
import Settings from "../pages/Settings/Settings";
import General from "../pages/Settings/SettingPages/General";
import EmailSetting from "pages/Settings/SettingPages/EmailSetting";
import Medicines from "../pages/Pharmacy/Medicines";
import PathologyTest from "pages/Pathology/PathologyTest";
import Item from "../pages/Inventory/Item";
import CallLog from "../pages/FrontOffice/CallLog";
import Complain from "../pages/FrontOffice/Complain";
import RadioTest from "pages/Radiology/RadioTest";
import Downloads from "pages/Download/Downloads";
import Doctorwise from "pages/Appointment/Pages/Doctorwise";
import Patientqueue from "pages/Appointment/Pages/Patientqueue";
import Medicinepage from "pages/Pharmacy/Medicinepage";
import Medicinepurchase from "pages/Pharmacy/Medicinepurchase";
import Bill from "pages/Pharmacy/Bill";
import Billgeneration from "pages/Pharmacy/Billgeneration";
import IpdPatientProfile from "pages/InPatient/IpdPatientProfile";
import OpdProfile from "pages/OutPatient/OpdProfile";
import OutPatientProfile from "pages/OutPatient/OpdProfile/OutPatientProfile";
import IpdDischargeReport from "pages/Reports/IpdDischargeReport";
import OpdDischargedReport from "pages/Reports/OpdDischargedReport";
import AddStaff from "pages/HumanResource/AddStaff";
import StaffAttendance from "pages/HumanResource/StaffAttendance";
import Payroll from "pages/HumanResource/Payroll";
import Leaves from "pages/HumanResource/Leaves";
import Dailytransactionreport from "pages/Reports/Dailytransactionreport";
import AlltransactionReport from "pages/Reports/AlltransactionReport";
//setup
import SetupBloodBank from "pages/Setup/SetupComponents/SetupBloodBank";
import SetupCharge from "pages/Setup/SetupComponents/SetupCharge";
import SetupChargeCategory from "pages/Setup/SetupComponents/SetupChargeCategory";
import SetupTaxCategory from "pages/Setup/SetupComponents/SetupTaxCategory";
import SetupUnitType from "pages/Setup/SetupComponents/SetupUnitType";
import SetupBed from "pages/Setup/SetupComponents/SetupBed";
import SetupBedList from "pages/Setup/SetupComponents/SetupBedList";
import SetupBedType from "pages/Setup/SetupComponents/SetupBedType";
import SetupBedGroup from "pages/Setup/SetupComponents/SetupBedGroup";
import SetupFloor from "pages/Setup/SetupComponents/SetupFloor";
import SetupFindings from "pages/Setup/SetupComponents/SetupFindings";
import SetupFindingCategory from "pages/Setup/SetupComponents/SetupFindingCategory";
import SetupPharmacy from "pages/Setup/SetupComponents/SetupPharmacy";
import SetupSupplier from "pages/Setup/SetupComponents/SetupSupplier";
import SetupMedDosage from "pages/Setup/SetupComponents/SetupMedDosage";
import SetupDoseInterval from "pages/Setup/SetupComponents/SetupDoseInterval";
import SetupMedDoseDuration from "pages/Setup/SetupComponents/SetupMedDoseDuration";
import SetupOperationCategory from "pages/Setup/SetupComponents/SetupOperationCategory";
import SetupOperations from "pages/Setup/SetupComponents/SetupOperations";
import dischargedPatient from "pages/InPatient/DischargedPatient";
import SetupPathology from "pages/Setup/SetupComponents/SetupPathology";
import SetupPathologyUnit from "pages/Setup/SetupComponents/SetupPathologyUnit";
import SetupChargeType from "pages/Setup/SetupComponents/SetupChargeType";
import SetupSymptomsHead from "pages/Setup/SetupComponents/SetupSymptomsHead";
import SetupSymptomsType from "pages/Setup/SetupComponents/SetupSymptomsType";
//Tpa
import TpaManagement from "pages/Tpa/TpaManagement";
import SetupPathologyParameter from "pages/Setup/SetupComponents/SetupPathologyParameter";
import OpdBilling from "pages/Billing/BillingPages/OpdBilling";
import PathologyBilling from "pages/Billing/BillingPages/PathologyBilling";
import AppointmentBilling from "pages/Billing/BillingPages/AppointmentBilling";
import RadiologyBillDialog from "pages/Radiology/RadiologyBillDialog";
import RadiologyBilling from "pages/Billing/BillingPages/RadiologyBilling";
import BloodIssueBilling from "pages/Billing/BillingPages/BloodIssueBilling";
import BloodComponentIssueBilling from "pages/Billing/BillingPages/BloodComponentIssueBilling";
import AmbulanceList from "pages/Ambulance/AmbulanceList";

import InventoryCategory from "pages/Setup/SetupComponents/InventoryCategory";
import InventorySupplier from "pages/Setup/SetupComponents/InventorySupplier";
import InventoryStore from "pages/Setup/SetupComponents/InventoryStore";

import SetupRadiology from "pages/Setup/SetupComponents/SetupRadiology";
import SetupRadiologyParameter from "pages/Setup/SetupComponents/SetupRadiologyParameter";
import SetupRadiologyUnit from "pages/Setup/SetupComponents/SetupRadiologyUnit";
import OpdBalanceReport from "pages/Reports/OpdBalanceReport";
import IpdBalanceReport from "pages/Reports/IpdBalanceReport";
import PharmacybillReport from "pages/Reports/PharmacybillReport";
import PatientbillReport from "pages/Reports/PatientbillReport";
import Incomereport from "pages/Reports/Incomereport";

import Shift_setupAppointment from "pages/Setup/SetupComponents/Shift_setupAppointment";
import DoctorShift_setupAppointment from "pages/Setup/SetupComponents/DoctorShift_setupAppointment";
import Slots_setupAppointment from "pages/Setup/SetupComponents/Slots_setupAppointment";

import SetupLeavetype from "pages/Setup/SetupComponents/SetupLeavetype";
import SetupDepartment from "pages/Setup/SetupComponents/SetupDepartment";
import SetupDesignation from "pages/Setup/SetupComponents/SetupDesignation";
import SetupSpecialist from "pages/Setup/SetupComponents/SetupSpecialist";

import SetupFrontOffice from "pages/Setup/SetupComponents/SetupFrontOffice";
import SetupComplaintype from "pages/Setup/SetupComponents/SetupComplaintype";
import SetupSource from "pages/Setup/SetupComponents/SetupSource";
import SetupPriority from "pages/Setup/SetupComponents/SetupPriority";

import PostalReceive from "pages/FrontOffice/PostalReceive";
import PostalDispatch from "pages/FrontOffice/PostalDispatch";

import IssueItem from "pages/Inventory/IssueItem";
import Expensereport from "pages/Reports/Expensereport";
import PayrollReport from "pages/Reports/PayrollReport";
import BirthReport from "pages/Reports/BirthReport";
import DeathReport from "pages/Reports/DeathReport";
import OtReport from "pages/Reports/OtReport";
import BlooddonorReport from "pages/Reports/BlooddonorReport";
import BloodIssueReport from "pages/Reports/BloodIssueReport";
import StaffAttendanceReport from "pages/Reports/StaffAttendanceReport";
import ComponentIssueReport from "pages/Reports/ComponentIssueReport";
import InventorystockReport from "pages/Reports/InventorystockReport";
import InventoryissueReport from "pages/Reports/InventoryissueReport";
import InventoryItemReport from "pages/Reports/InventoryItemReport";
import AuditTrailReport from "pages/Reports/AuditTrailReport";
import IncomeGroupReport from "pages/Reports/IncomeGroupReport";
import ExpenseGroupReport from "pages/Reports/ExpenseGroupReport";
import TpaReport from "pages/Reports/TpaReport";
import ReferralReport from "pages/Reports/ReferralReport";
import PatientVisitReport from "pages/Reports/PatientVisitReport";
import PatientLoginCreds from "pages/Reports/PatientLoginCreds";
import AmbulanceCallReport from "pages/Reports/AmbulanceCallReport";
import PatientID from "pages/Certificate/PatientID";
import StaffID from "pages/Certificate/StaffID";
import Referral from "pages/Referral/Referral";
import ReferralPerson from "pages/Referral/ReferralPerson";
import LeaveRequest from "pages/HumanResource/LeaveRequest";
import Notifications from "components/CommonForBoth/TopbarDropdown/Notifications";
import Aadhar from "pages/ABHA/Aadhar";
import Verifyotp from "pages/ABHA/Verifyotp";
import Carecontext from "pages/ABHA/Carecontext";
import Userrecord from "pages/ABHA/Userrecord";
import Checkmobileotp from "pages/ABHA/Checkmobileotp";
import Verifymobileotp from "pages/ABHA/Verifymobileotp";
import Profile from "pages/ABHA/Profile";
import DownloadAbha from "pages/ABHA/DownloadAbha";
import AbhaAddress from "pages/ABHA/AbhaAddress";
import AbhaAddressMobileOtp from "pages/ABHA/AbhaAddressMobileOtp";
import AbhaMobileAuth from "pages/ABHA/AbhaMobileAuth";
import LinkPhrAddress from "pages/ABHA/LinkPhrAddress";
import LinkPhrPage from "pages/ABHA/LinkPhrPage";
import AbhaOtpVerification from "pages/ABHA/AbhaOtpVerification";
import Verifyabhaotp from "pages/ABHA/VerifyAbhaotp";
import AbhaGenerateOtp from "pages/ABHA/AbhaGenerateOtp";
import Generateqr from "pages/ABHA/GenerateQr";
import Linkcarecontext from "pages/Carecontext/Linkcarecontext";
import Discovercontext from "pages/Carecontext/Discovercontext";
import Consentrequest from "pages/Carecontext/Consentrequest";
import SetupSlotAppt from "pages/Setup/SetupComponents/SetupSlotTimeAppt";
import SetupDoctorShift from "pages/Setup/SetupComponents/SetupDoctorShift";
import SetupPatient from "pages/Setup/SetupComponents/SetupPatient";
import SetupDisablePatient from "pages/Setup/SetupComponents/SetupDisablePatient";
import SetupPatientImport from "pages/Setup/SetupComponents/SetupPatientImport";
import SetupExample from "pages/Setup/SetupComponents/SetupBedLisNew";
import SetupBedLisNew from "pages/Setup/SetupComponents/SetupBedLisNew";
import ModuleSettingsPage from "pages/Settings/SettingPages/ModuleToggleSettings";
import ForgotPassword from "pages/Authentication/ForgotPassword";
import AppointmetnReport from "pages/Reports/AppointmetnReport";

const authProtectedRoutes = [
  { path: "/", component: Dashboard },
  { path: "/dashboard", component: Dashboard },
  { path: "/billing", component: Billing },
  { path: "/appointment", component: Appointment },
  { path: "/opd", component: Opd },
  { path: "/ipd", component: Ipd },
  { path: "/pharmacy", component: Pharmacy },
  { path: "/pathology", component: Pathology },
  { path: "/radiology", component: Radiology },
  { path: "/bloodbank", component: Bloodbank },
  { path: "/ambulance", component: Ambulance },
  { path: "/frontoffice", component: Frontoffice },
  { path: "/birthrecord", component: BirthRecord },
  { path: "/deathrecord", component: DeathRecord },
  { path: "/hr", component: Hr },
  { path: "/income", component: Income },
  { path: "/expenses", component: Expenses },
  { path: "/livemeeting", component: LiveMeeting },
  { path: "/liveconsult", component: LiveConsult },
  { path: "/inventory", component: Inventory },
  { path: "/frontcms", component: Frontcms },
  { path: "/message", component: Message },
  { path: "/opdreport", component: OpdReport },
  { path: "/ipdreport", component: IpdReport },
  { path: "/pathologyreport", component: PathologyReport },
  { path: "/bloodreport", component: BloodReport },
  { path: "/radiologyreport", component: RadiologyReport },
  { path: "/certificate", component: Certificate },
  {path: "/settings", component: Settings},
  {path: "/general", component: General},
  {path: '/medicines', component: Medicines},
  {path: '/pathologytest', component: PathologyTest},
  {path: '/items',component: Item},
  {path: '/calls', component: CallLog},
  {path: '/complain', component: Complain},
  {path: '/radiotest', component: RadioTest},
  {path: '/download', component: Downloads},
  {path: '/ambulancelist', component: AmbulanceList},
  // //profile
  { path: "/profile", component: UserProfile },
  {path: "/doctorwise", component: Doctorwise},
  {path:"/patientqueue", component: Patientqueue},
  {path: "/medicinepage", component: Medicinepage},
  {path: "/medicinepurchase", component: Medicinepurchase},
  {path: "/bill", component: Bill},
  {path: "/billgenerate", component: Billgeneration},
  {path: "/ipdprofile/:ipdno", component: IpdPatientProfile},
  {path: "/opdprofile/:pid", component: OpdProfile},
  {path: "/opdprofileview", component: OutPatientProfile},
  {path: "/ipddischargedreport", component: IpdDischargeReport},
  {path: "/opddischargedreport", component: OpdDischargedReport},
  {path: "/addstaff", component: AddStaff},
  {path: "/attendance", component: StaffAttendance},
  {path: "/payroll", component: Payroll},
  {path: "/leaves", component: Leaves},
  {path: "/setupbloodbank", component: SetupBloodBank},
  {path: "/tpa", component: TpaManagement},
  {path: "/setupcharges", component: SetupCharge},
  {path: "/chargecategory", component: SetupChargeCategory},
  {path: "/taxcategory", component: SetupTaxCategory},
  {path: "/unittype", component: SetupUnitType},
  {path: "/setupbed", component: SetupBed},
  {path: "/bed", component: SetupBedLisNew},
  {path: "/bedtype", component:SetupBedType},
  {path: "/bedgroup", component: SetupBedGroup},
  {path: "/floor", component: SetupFloor},
  {path: "/findings", component: SetupFindings},
  {path: "/findingcategory", component: SetupFindingCategory},
  {path: "/medicinecategory", component: SetupPharmacy},
  {path: "/supplier", component: SetupSupplier},
  {path: "/medicinedosage",component: SetupMedDosage},
  {path: "/doseinterval", component: SetupDoseInterval},
  {path: "/doseduration", component: SetupMedDoseDuration},
  {path: "/setupPatient", component: SetupPatient},
  {path: "/setupPatient/import", component: SetupPatientImport},
  {path:'/setupDisablePatient',component:SetupDisablePatient},
  {path: "/setupoperation", component: SetupOperationCategory},
  {path: "/operations", component: SetupOperations},
  {path: "/discharged", component: dischargedPatient},
  {path: "/pathologysetup", component: SetupPathology},
  {path: "/pathologysetupunit", component: SetupPathologyUnit},
  {path: "/pathologyparameter", component: SetupPathologyParameter},
  {path: "/billing/opdbilling", component: OpdBilling},
  {path: "/billing/pathologybilling", component: PathologyBilling},
  {path: "/billing/appointmentbilling", component: AppointmentBilling},
  {path: "/billing/radiologybilling", component: RadiologyBilling},
  {path: "/billing/bloodissuebilling", component: BloodIssueBilling},
  {path: "/billing/bloodcomponentbilling", component: BloodComponentIssueBilling},
  {path: "/charges/chargetype", component: SetupChargeType},
  {path: "/setup/symptomshead", component: SetupSymptomsHead },
  {path: "/setup/symptomstype", component: SetupSymptomsType},
  {path:'/setupinventorycategory',component:InventoryCategory},
  {path:'/setupinventorysupplier',component:InventorySupplier},
  {path:'/setupinventorystore',component:InventoryStore},

  {path: "/setting/email", component: EmailSetting},
  {path: "/", component: ModuleSettingsPage},
{path:'/opdbalancereport',component:OpdBalanceReport},
  {path:'/ipdbalancereport',component:IpdBalanceReport},
  {path: '/dailytransactionreport', component: Dailytransactionreport},
  {path: '/ambulancereport', component: AmbulanceCallReport},
  {path: '/patient_id_card', component: PatientID},
  {path: '/staff_id_card', component: StaffID},
  {path: '/hr/leaverequest', component: LeaveRequest},
  //SetupRadiology
  {path:"/setupradiology",component:SetupRadiology},
  {path:"/setupradiologyparameter",component:SetupRadiologyParameter},
  {path:"/setupradiologyunit",component:SetupRadiologyUnit},

  //setup appointment
  {path:"/onlineappointment/globalshift",component:Shift_setupAppointment},
  {path:"/setupdoctorglobalshift",component:DoctorShift_setupAppointment},
  {path:"/admin/onlineappointment",component:Slots_setupAppointment},
  {path: "/alltransactionreport", component: AlltransactionReport},
  {path: "/pharmacybillreport", component: PharmacybillReport},
  {path: "/patientbillreport", component: PatientbillReport},
  {path: "/incomereport", component: Incomereport},
  {path: "/expensereport", component: Expensereport},
  {path: "/payrollreport", component: PayrollReport},
  {path: "/birthreport", component: BirthReport},
  {path: "/deathreport", component: DeathReport},
  {path: "/otreport", component: OtReport},
  {path: "/blooddonorreport", component: BlooddonorReport},
  {path: "/bloodissuereport", component: BloodIssueReport},
  {path: "/staffattendancereport", component: StaffAttendanceReport},
  {path: "/componentissuereport", component: ComponentIssueReport},
  {path: "/inventorystockreport", component: InventorystockReport},
  {path: "/inventoryissuereport", component: InventoryissueReport},
  {path: "/inventoryitemreport", component: InventoryItemReport},
  {path: "/audittrailreport", component: AuditTrailReport},
  {path: "/incomegroupreport", component: IncomeGroupReport},
  {path: "/expensegroupreport", component: ExpenseGroupReport},
  {path: "/tpareport", component: TpaReport},
  {path: "/referralreport", component: ReferralReport},
  {path: "/patientvisitreport", component: PatientVisitReport},
  {path: "/patientlogincreds", component: PatientLoginCreds},
  {path: "/setupslotappointment", component: SetupSlotAppt},
  //Setup HR
  {path:'/human-resource-setup/leave-type',component:SetupLeavetype},
   {path:'/human-resource-setup/department',component:SetupDepartment},
   {path:'/human-resource-setup/designation',component:SetupDesignation},
   {path:'/human-resource-setup/specialist',component:SetupSpecialist},

   //Setup Front Office
   {path:'/frontoffice-setup/purpose-list',component:SetupFrontOffice},
  {path:'/frontoffice-setup/complain-type',component:SetupComplaintype},
  {path:'/frontoffice-setup/source',component:SetupSource},
  {path:'/frontoffice-setup/appointment-priority',component:SetupPriority},
  {path:"/frontoffice/postal-recive",component:PostalReceive},
  {path:'/frontoffice/postal-dispatch',component:PostalDispatch},

  {path: "/inventory/issueitem", component: IssueItem},
  {path: "/referral", component: Referral},
  {path: "/referralperson", component: ReferralPerson},
  {path: "/notifications", component: Notifications},
  {path: "/carecontext", component: Carecontext},
  {path: "/userrecord", component: Userrecord},
  {path: "/linkcarecontext", component: Linkcarecontext},
  {path: "/discovercarecontext", component: Discovercontext},
  {path: "/consentrequest", component: Consentrequest},
  {path: "/appointmentreport", component: AppointmetnReport},
  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
];

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/account/login", component: Login },
  { path: "/account/forgot-password", component: ForgetPwd },
  { path: "/account/registerstaff", component: RegisterStaff},
  { path: "/account/activation", component: SignupActivation},
  {path: "/account/aadhar", component: Aadhar},
  {path: "/account/verifyotp/:txnId", component: Verifyotp},
  {path: "/account/abha/checkmobile/:txnId", component: Checkmobileotp},
  {path: "/account/abha/verifymobileotp/:txnId", component: Verifymobileotp},
  {path: "/account/abha/profile/:responseData", component: Profile},
  {path: "/account/downloadabha/:responseData", component: DownloadAbha},
  {path: "/account/abhaaddress", component: AbhaAddress},
  {path: "/account/abhamobileotp", component: AbhaAddressMobileOtp},
  {path: "/account/abhamobileauth", component: AbhaMobileAuth},
  {path: "/account/abhaphrsuggestion", component: LinkPhrAddress},
  {path: "/account/abhaphrpage", component: LinkPhrPage},
  {path: "/account/abhaverifyotp", component: AbhaOtpVerification},
  {path: "/account/abham1verifyotp", component: Verifyabhaotp},
  {path: "/account/abhagenerateotp", component: AbhaGenerateOtp},
  {path: "/account/generateqr", component: Generateqr},
  {path: "/account/forgotpassword", component: ForgotPassword},
];

export { authProtectedRoutes, publicRoutes };