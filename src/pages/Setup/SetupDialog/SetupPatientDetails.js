import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import api from "services/Api";

export default function SetupPatientDetails({
  open,
  handleClose,
  patientDetail,
  getSetup_Patient,
  location
}) {
  console.log(patientDetail, "patientdetails");
  const handleDisable = async () =>{
    const userConfirmed = window.confirm('Are you sure you want to disable it?');
    console.log(userConfirmed,"disable");
if(userConfirmed){
    const newData = {
      id:patientDetail[0].id,
      is_active:'no'
    }
   const response = await api.updateDisable_Patient(newData)
   getSetup_Patient()
  handleClose()
}
  }
  const handleEnable = async () =>{
    const userConfirmed = window.confirm('Are you sure you want to enable it?');
    console.log(userConfirmed,"enable");
if(userConfirmed){
    const newData = {
      id:patientDetail[0].id,
      is_active:'yes'
    }
   const response = await api.updateDisable_Patient(newData)
   getSetup_Patient()
  handleClose()
}else{
  console.log("error");
}
  }
  return (
    // <div style={{width:'100px',height:'200px',backgroundColor:'black'}}>SetupPatientDetails</div>
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-end",
      }}
    >
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg"
        PaperProps={{
          style: {
            width: "95%", // adjust the width as needed
            height: "100%", // adjust the height as needed
            maxHeight: "auto", // adjust the max height as needed
          },
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          className="bg-primary bg-soft text-primary"
        >
          Patient Details
        {location === 'enable' ?
        <div style={{display:'flex', flexDirection:'row-reverse',marginleft:'200px'}}>
          <button className="btn-mod bg-soft btn-md" onClick={()=>handleEnable()} style={{padding:'7px'}}>enable</button>
        </div> :
        <div style={{display:'flex', flexDirection:'row-reverse',marginleft:'200px'}}>
        <button className="btn-mod bg-soft btn-md" onClick={()=>handleDisable()} style={{padding:'7px'}}>disable</button>
      </div>
        }
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">
          <h2>{patientDetail[0]?.patient_name}</h2>
          <br/>
          <div style={{display:'flex',width:'100%',height:'50%'}}>
            <div style={{width:'50%'}}>
            <div style={{  display: "flex" }}>
            <h5 style={{ marginRight: "10px",display:'flex', justifyContent:'space-between' }} >Guardian</h5>
              
              {/* <img   style={{ marginRight: "10px" }}  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFXUlEQVR4nO1YbWwURRheKmLEQLt7VAtiVT40LdK7mW0UidLAzVyL1E+8aPjovbPUKhpo0ET9xYExGCTwoxGNGotBE41SNSQEEQiiAsUPAu2V7hVJud1ajQURglbFdMzs7Z1Ybnt3ZC9cYp9kkqY77+3zzMz7Pu+sJA1jGMP4/8I7p+56ROAFROEQovArIvAbptCBCWzwzWHlUj4DE2jEhJ3DlPFUA1E4jyhbFwwGr5DyDYjAyzbRAUzY+2pAm62ShkK1tmG0StkdiMAriMJflhACH0nhcIGUL8ABbWF8hVk/puxBp3lCCCbwsz13lZQPUGsbRiPKfoyvvgbp5uNquFscJUzgD5UsLpUuN1AANHtFD2QcQ9jbdk68JF1uYApbBBmVQH2mMYhqs2zRbblllwEQgXZBxltdN03KEOXB4Cg72f+UJGmEdDmBKfwQryzahGziEGFnRNztNQvH5o5dFjtQSbXbpAwxpWbZVfmzAwQ+tCoQCT2WbQ5gCkcuehgOF4jCgCh8iQictYb1N2M58Q7xw7Y5tWYagynbnKoKieOEKdvl5OSYws6Z92lj3PcBAr0WoQBo6eb7CKtChP0tfKAyADdc8GgEJmyrTbZHJbDAcnLSUIgoW5R4B6bsE1cFWCIILEg4MfJr853mIb92J6LQFz9yEL7wGQ6wWntX+rzVoZsGx1bQ+psRgVN2yb4nl72QEPIBIiH/9HkL5Aq66BpMQjMwhdcsB3bohRBhH9vCGh3fQdkK+x0tUi6gUrY8XTeKCaxN1Y0m2hF1iPZC7Iy9AL05EZC8D1BYjQj7DlN22hJEWAQTth6RJWVOcaKkWgLUhivTGCC3y29+IbEDaLZ2o9MckQc534FLhciL9DkAT9vldIuUb1CJNs8uACfFSg9+XulnkxJVyEfZXNcJFEZjk5RoDGTd3CRHzW8U3YjJUeOcrJv9sm6Yim4cVnTzPY9uPCUfNVK2HaLGY/uIIBJaLDzAWxUq8vlZXfKIiQrmGiKRUYreE5R1Y6eiGwNK1OSZDjlqdMq6+VxhW0xO/JxwWUTYZ45VjMAO15zYo/f4BYlsSDuMU0qn2ShxHveFcLhApRBChH0hOlarayWwV+yCK72QfPx4oawbLS4QHzSMfUUdvY4VyBWM7YpNlnWzw33ySRF9RVFjVk7IK10nypWocTJ35E0+YftXfNK65vPeB55swwRMRNnv1iDMwBQ+xxRe9AVgZtbkiyPdJUrU7M4Jcd3gpe9u49PrnnVoodnFg7AIoqFHM7sM7eEjZd1ozQX5a1sjvHzpqiQxb7CRT177Fp/YspsXH2jvLX2nZfyMGcGrRdstfCLeMMavsLbp7Z1eUz9xSP5y1HgmF+THb9/PfQ8tixOfv4yXbt7KPZ2xwbvzxmA+VVXhkeISlfQFCj+JbjcleVEVhBm5Tb5kz7fcd/9Si3xZ4xo+7nCX0/EakPXYXam4iVYdUfapfaR+SXknl3WzyW3y4458zyseWWGRv/X5DVYODDVf1s0dTqdDtOXi7mH3Ryf+Y3Kezr4xsm6ecVvA1NWvWuSnNazknqMnMknyASXaXTbUFw5E4GDcqdnGC1Y/ttT1pN3fzlH1Eo7m1vPr9h7KOE7WzSZpCIiPauKOIO7ayeuoEjW3uy1gypo3rdW/ZWVTtrHdUhogApvsfFgfFyC6R5cFeB9ebgko2XUwqzhZN/vTCVCrASe+aNhHyGx2WwCa93hcwO6vs4w19qUTUOnXkN2xnrX+UXzMmKLo5mk3BYijk7Hb0ksd0PxvIh+LTVN0Y5tbXuBpP86nrtrIffc+4TpxFG+7Xxcf2tLt1jCGMQwpv/EPsel6EXLE5hEAAAAASUVORK5CYII=" /> */}
              <h6>: {patientDetail[0]?.guardian_name}</h6>
            </div>
            <div style={{ display: "flex",marginTop:'20px' }}>  
            {/* <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACwUlEQVR4nO2YzU8TURTFjwa/SCTGf4ANEdN7KwsssjCpO9eyMbJSognoVvz4A9C40QURNmh0hVs1JgpVTGRhtEsJWO5rDQSKC2K1iYk05ZnXtEALlX7Mm05jT3KSZprMPb957955GaChhhqyJmGcM0Y9KtKGFkVYFMZyrANHUG9SjBHF0MbCeIh6kvKhSxjpLQBpcw31IA3sFcbHXPgNE8LmP3hditG3LfzmSlyC1xtXGMvFABThu6cbWjEeFA2fWwXCfXhRER98irC2G4AipJQffnhNwni9a/hNv4WXJISeMsLntlIPvKCpIJqEMFcugGJEwp3YV+v8UISBCsLnxmp/TcMvdOOQOe9UAbC81InmmgEoxu1Kw2/xrZqEn23HYWGsVgsgjFVzL9cBhDDowNPXxlHCdVfDR9pwQBhLTgEIIx5rxUHXAKI+XHEqvMqZcNmV8BrYU+Hc//cqEObMva0DzBPOOP70OdsLjKB1ACE8sgUgjDGr4U2jCeGHLQDF+Gn1xTZPOG8xvDY2NawBKMJj2wBicxspxkxhwXjvKZ2aHM84fqHLCYgZmwDJwoImuA6HMk5NjDsBkLQJ8KuwYHr6xQaAcSzQXHUjw5aE8LWw4J/nY3kAKxdPV9cDhFlrAIoQKiyYGBrIA1h79UR/626pBmDCGoD4cbOw4OLZVq0/T+RBpCaf6ZW+YEXbKWrzZBpjHN+paOLutTyAfJgyp9MJHINNKcbUtqfW0aR/P71XHKLU6UQIWQ2fASAEhLG+E0TizlW9/ulNRQDCWBc/Oq0DZCFGiwUxPZEY6s9Mp/T0y0z4eG+glOYdhlsy33MU412V836rP3zxYT/c1IIPR4Xw3oHwU+ZeqIWyKzGyU0+UtOcJw574OieMk+aDbckAhJBrDVuOon60C+GGeZuaI0H28Jc0v7PXBq3P+YYa+s/0F+n31kpuyf6RAAAAAElFTkSuQmCC"/>  */}
            <h5 style={{ marginRight: "10px" }} >Abha No</h5>
            <h6>: {patientDetail[0]?.ABHA_number ? patientDetail[0]?.ABHA_number : 'nan'}</h6>
            </div>
            {/* <div style={{  display: "flex" }}>  
            <h5 style={{ marginRight: "10px" }} >bloodgroup</h5>
            <h6>: {patientDetail[0]?.guardian_name}</h6>
            </div> */}
            <div style={{  display: "flex",marginTop:'20px' }}>  
            {/* <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACwUlEQVR4nO2YzU8TURTFjwa/SCTGf4ANEdN7KwsssjCpO9eyMbJSognoVvz4A9C40QURNmh0hVs1JgpVTGRhtEsJWO5rDQSKC2K1iYk05ZnXtEALlX7Mm05jT3KSZprMPb957955GaChhhqyJmGcM0Y9KtKGFkVYFMZyrANHUG9SjBHF0MbCeIh6kvKhSxjpLQBpcw31IA3sFcbHXPgNE8LmP3hditG3LfzmSlyC1xtXGMvFABThu6cbWjEeFA2fWwXCfXhRER98irC2G4AipJQffnhNwni9a/hNv4WXJISeMsLntlIPvKCpIJqEMFcugGJEwp3YV+v8UISBCsLnxmp/TcMvdOOQOe9UAbC81InmmgEoxu1Kw2/xrZqEn23HYWGsVgsgjFVzL9cBhDDowNPXxlHCdVfDR9pwQBhLTgEIIx5rxUHXAKI+XHEqvMqZcNmV8BrYU+Hc//cqEObMva0DzBPOOP70OdsLjKB1ACE8sgUgjDGr4U2jCeGHLQDF+Gn1xTZPOG8xvDY2NawBKMJj2wBicxspxkxhwXjvKZ2aHM84fqHLCYgZmwDJwoImuA6HMk5NjDsBkLQJ8KuwYHr6xQaAcSzQXHUjw5aE8LWw4J/nY3kAKxdPV9cDhFlrAIoQKiyYGBrIA1h79UR/626pBmDCGoD4cbOw4OLZVq0/T+RBpCaf6ZW+YEXbKWrzZBpjHN+paOLutTyAfJgyp9MJHINNKcbUtqfW0aR/P71XHKLU6UQIWQ2fASAEhLG+E0TizlW9/ulNRQDCWBc/Oq0DZCFGiwUxPZEY6s9Mp/T0y0z4eG+glOYdhlsy33MU412V836rP3zxYT/c1IIPR4Xw3oHwU+ZeqIWyKzGyU0+UtOcJw574OieMk+aDbckAhJBrDVuOon60C+GGeZuaI0H28Jc0v7PXBq3P+YYa+s/0F+n31kpuyf6RAAAAAElFTkSuQmCC"/>  */}
            <h5 style={{ marginRight: "10px" }} >gender</h5>
            <h6>  : {patientDetail[0]?.gender}</h6>
            </div>
            <div style={{  display: "flex",marginTop:'20px' }}>  
            {/* <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACwUlEQVR4nO2YzU8TURTFjwa/SCTGf4ANEdN7KwsssjCpO9eyMbJSognoVvz4A9C40QURNmh0hVs1JgpVTGRhtEsJWO5rDQSKC2K1iYk05ZnXtEALlX7Mm05jT3KSZprMPb957955GaChhhqyJmGcM0Y9KtKGFkVYFMZyrANHUG9SjBHF0MbCeIh6kvKhSxjpLQBpcw31IA3sFcbHXPgNE8LmP3hditG3LfzmSlyC1xtXGMvFABThu6cbWjEeFA2fWwXCfXhRER98irC2G4AipJQffnhNwni9a/hNv4WXJISeMsLntlIPvKCpIJqEMFcugGJEwp3YV+v8UISBCsLnxmp/TcMvdOOQOe9UAbC81InmmgEoxu1Kw2/xrZqEn23HYWGsVgsgjFVzL9cBhDDowNPXxlHCdVfDR9pwQBhLTgEIIx5rxUHXAKI+XHEqvMqZcNmV8BrYU+Hc//cqEObMva0DzBPOOP70OdsLjKB1ACE8sgUgjDGr4U2jCeGHLQDF+Gn1xTZPOG8xvDY2NawBKMJj2wBicxspxkxhwXjvKZ2aHM84fqHLCYgZmwDJwoImuA6HMk5NjDsBkLQJ8KuwYHr6xQaAcSzQXHUjw5aE8LWw4J/nY3kAKxdPV9cDhFlrAIoQKiyYGBrIA1h79UR/626pBmDCGoD4cbOw4OLZVq0/T+RBpCaf6ZW+YEXbKWrzZBpjHN+paOLutTyAfJgyp9MJHINNKcbUtqfW0aR/P71XHKLU6UQIWQ2fASAEhLG+E0TizlW9/ulNRQDCWBc/Oq0DZCFGiwUxPZEY6s9Mp/T0y0z4eG+glOYdhlsy33MU412V836rP3zxYT/c1IIPR4Xw3oHwU+ZeqIWyKzGyU0+UtOcJw574OieMk+aDbckAhJBrDVuOon60C+GGeZuaI0H28Jc0v7PXBq3P+YYa+s/0F+n31kpuyf6RAAAAAElFTkSuQmCC"/>  */}
            <h5 style={{ marginRight: "10px" }} >Address</h5>
            <h6>  : {patientDetail[0]?.address}</h6>
            </div>
            <div style={{  display: "flex",marginTop:'20px' }}>  
            {/* <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACwUlEQVR4nO2YzU8TURTFjwa/SCTGf4ANEdN7KwsssjCpO9eyMbJSognoVvz4A9C40QURNmh0hVs1JgpVTGRhtEsJWO5rDQSKC2K1iYk05ZnXtEALlX7Mm05jT3KSZprMPb957955GaChhhqyJmGcM0Y9KtKGFkVYFMZyrANHUG9SjBHF0MbCeIh6kvKhSxjpLQBpcw31IA3sFcbHXPgNE8LmP3hditG3LfzmSlyC1xtXGMvFABThu6cbWjEeFA2fWwXCfXhRER98irC2G4AipJQffnhNwni9a/hNv4WXJISeMsLntlIPvKCpIJqEMFcugGJEwp3YV+v8UISBCsLnxmp/TcMvdOOQOe9UAbC81InmmgEoxu1Kw2/xrZqEn23HYWGsVgsgjFVzL9cBhDDowNPXxlHCdVfDR9pwQBhLTgEIIx5rxUHXAKI+XHEqvMqZcNmV8BrYU+Hc//cqEObMva0DzBPOOP70OdsLjKB1ACE8sgUgjDGr4U2jCeGHLQDF+Gn1xTZPOG8xvDY2NawBKMJj2wBicxspxkxhwXjvKZ2aHM84fqHLCYgZmwDJwoImuA6HMk5NjDsBkLQJ8KuwYHr6xQaAcSzQXHUjw5aE8LWw4J/nY3kAKxdPV9cDhFlrAIoQKiyYGBrIA1h79UR/626pBmDCGoD4cbOw4OLZVq0/T+RBpCaf6ZW+YEXbKWrzZBpjHN+paOLutTyAfJgyp9MJHINNKcbUtqfW0aR/P71XHKLU6UQIWQ2fASAEhLG+E0TizlW9/ulNRQDCWBc/Oq0DZCFGiwUxPZEY6s9Mp/T0y0z4eG+glOYdhlsy33MU412V836rP3zxYT/c1IIPR4Xw3oHwU+ZeqIWyKzGyU0+UtOcJw574OieMk+aDbckAhJBrDVuOon60C+GGeZuaI0H28Jc0v7PXBq3P+YYa+s/0F+n31kpuyf6RAAAAAElFTkSuQmCC"/>  */}
            <h5 style={{ marginRight: "10px" }} >known allergies</h5>
            <h6>  : {patientDetail[0]?.known_allergies}</h6>
            </div>
            </div>


       <div style={{height:'50%',marginBottom:'160px'}}>
            <div style={{ display: "flex",marginTop:'20px' }}>  
            {/* <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACwUlEQVR4nO2YzU8TURTFjwa/SCTGf4ANEdN7KwsssjCpO9eyMbJSognoVvz4A9C40QURNmh0hVs1JgpVTGRhtEsJWO5rDQSKC2K1iYk05ZnXtEALlX7Mm05jT3KSZprMPb957955GaChhhqyJmGcM0Y9KtKGFkVYFMZyrANHUG9SjBHF0MbCeIh6kvKhSxjpLQBpcw31IA3sFcbHXPgNE8LmP3hditG3LfzmSlyC1xtXGMvFABThu6cbWjEeFA2fWwXCfXhRER98irC2G4AipJQffnhNwni9a/hNv4WXJISeMsLntlIPvKCpIJqEMFcugGJEwp3YV+v8UISBCsLnxmp/TcMvdOOQOe9UAbC81InmmgEoxu1Kw2/xrZqEn23HYWGsVgsgjFVzL9cBhDDowNPXxlHCdVfDR9pwQBhLTgEIIx5rxUHXAKI+XHEqvMqZcNmV8BrYU+Hc//cqEObMva0DzBPOOP70OdsLjKB1ACE8sgUgjDGr4U2jCeGHLQDF+Gn1xTZPOG8xvDY2NawBKMJj2wBicxspxkxhwXjvKZ2aHM84fqHLCYgZmwDJwoImuA6HMk5NjDsBkLQJ8KuwYHr6xQaAcSzQXHUjw5aE8LWw4J/nY3kAKxdPV9cDhFlrAIoQKiyYGBrIA1h79UR/626pBmDCGoD4cbOw4OLZVq0/T+RBpCaf6ZW+YEXbKWrzZBpjHN+paOLutTyAfJgyp9MJHINNKcbUtqfW0aR/P71XHKLU6UQIWQ2fASAEhLG+E0TizlW9/ulNRQDCWBc/Oq0DZCFGiwUxPZEY6s9Mp/T0y0z4eG+glOYdhlsy33MU412V836rP3zxYT/c1IIPR4Xw3oHwU+ZeqIWyKzGyU0+UtOcJw574OieMk+aDbckAhJBrDVuOon60C+GGeZuaI0H28Jc0v7PXBq3P+YYa+s/0F+n31kpuyf6RAAAAAElFTkSuQmCC"/>  */}
            <h5 style={{ marginRight: "10px" }} >mobile No</h5>
            <h6>: {patientDetail[0]?.mobileno}</h6>
            </div>
            <div style={{ display: "flex",marginTop:'20px' }}>  
            {/* <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACwUlEQVR4nO2YzU8TURTFjwa/SCTGf4ANEdN7KwsssjCpO9eyMbJSognoVvz4A9C40QURNmh0hVs1JgpVTGRhtEsJWO5rDQSKC2K1iYk05ZnXtEALlX7Mm05jT3KSZprMPb957955GaChhhqyJmGcM0Y9KtKGFkVYFMZyrANHUG9SjBHF0MbCeIh6kvKhSxjpLQBpcw31IA3sFcbHXPgNE8LmP3hditG3LfzmSlyC1xtXGMvFABThu6cbWjEeFA2fWwXCfXhRER98irC2G4AipJQffnhNwni9a/hNv4WXJISeMsLntlIPvKCpIJqEMFcugGJEwp3YV+v8UISBCsLnxmp/TcMvdOOQOe9UAbC81InmmgEoxu1Kw2/xrZqEn23HYWGsVgsgjFVzL9cBhDDowNPXxlHCdVfDR9pwQBhLTgEIIx5rxUHXAKI+XHEqvMqZcNmV8BrYU+Hc//cqEObMva0DzBPOOP70OdsLjKB1ACE8sgUgjDGr4U2jCeGHLQDF+Gn1xTZPOG8xvDY2NawBKMJj2wBicxspxkxhwXjvKZ2aHM84fqHLCYgZmwDJwoImuA6HMk5NjDsBkLQJ8KuwYHr6xQaAcSzQXHUjw5aE8LWw4J/nY3kAKxdPV9cDhFlrAIoQKiyYGBrIA1h79UR/626pBmDCGoD4cbOw4OLZVq0/T+RBpCaf6ZW+YEXbKWrzZBpjHN+paOLutTyAfJgyp9MJHINNKcbUtqfW0aR/P71XHKLU6UQIWQ2fASAEhLG+E0TizlW9/ulNRQDCWBc/Oq0DZCFGiwUxPZEY6s9Mp/T0y0z4eG+glOYdhlsy33MU412V836rP3zxYT/c1IIPR4Xw3oHwU+ZeqIWyKzGyU0+UtOcJw574OieMk+aDbckAhJBrDVuOon60C+GGeZuaI0H28Jc0v7PXBq3P+YYa+s/0F+n31kpuyf6RAAAAAElFTkSuQmCC"/>  */}
            <h5 style={{ marginRight: "10px" }} >Age</h5>
            <h6>: {patientDetail[0]?.age}</h6>
            </div>
            <div style={{ display: "flex",marginTop:'20px' }}>  
            {/* <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACwUlEQVR4nO2YzU8TURTFjwa/SCTGf4ANEdN7KwsssjCpO9eyMbJSognoVvz4A9C40QURNmh0hVs1JgpVTGRhtEsJWO5rDQSKC2K1iYk05ZnXtEALlX7Mm05jT3KSZprMPb957955GaChhhqyJmGcM0Y9KtKGFkVYFMZyrANHUG9SjBHF0MbCeIh6kvKhSxjpLQBpcw31IA3sFcbHXPgNE8LmP3hditG3LfzmSlyC1xtXGMvFABThu6cbWjEeFA2fWwXCfXhRER98irC2G4AipJQffnhNwni9a/hNv4WXJISeMsLntlIPvKCpIJqEMFcugGJEwp3YV+v8UISBCsLnxmp/TcMvdOOQOe9UAbC81InmmgEoxu1Kw2/xrZqEn23HYWGsVgsgjFVzL9cBhDDowNPXxlHCdVfDR9pwQBhLTgEIIx5rxUHXAKI+XHEqvMqZcNmV8BrYU+Hc//cqEObMva0DzBPOOP70OdsLjKB1ACE8sgUgjDGr4U2jCeGHLQDF+Gn1xTZPOG8xvDY2NawBKMJj2wBicxspxkxhwXjvKZ2aHM84fqHLCYgZmwDJwoImuA6HMk5NjDsBkLQJ8KuwYHr6xQaAcSzQXHUjw5aE8LWw4J/nY3kAKxdPV9cDhFlrAIoQKiyYGBrIA1h79UR/626pBmDCGoD4cbOw4OLZVq0/T+RBpCaf6ZW+YEXbKWrzZBpjHN+paOLutTyAfJgyp9MJHINNKcbUtqfW0aR/P71XHKLU6UQIWQ2fASAEhLG+E0TizlW9/ulNRQDCWBc/Oq0DZCFGiwUxPZEY6s9Mp/T0y0z4eG+glOYdhlsy33MU412V836rP3zxYT/c1IIPR4Xw3oHwU+ZeqIWyKzGyU0+UtOcJw574OieMk+aDbckAhJBrDVuOon60C+GGeZuaI0H28Jc0v7PXBq3P+YYa+s/0F+n31kpuyf6RAAAAAElFTkSuQmCC"/>  */}
            <h5 style={{ marginRight: "10px" }} >Date of birth</h5>
            <h6>: {patientDetail[0]?.dob}</h6>
            </div>
            <div style={{ display: "flex",marginTop:'20px' }}>  
            {/* <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACwUlEQVR4nO2YzU8TURTFjwa/SCTGf4ANEdN7KwsssjCpO9eyMbJSognoVvz4A9C40QURNmh0hVs1JgpVTGRhtEsJWO5rDQSKC2K1iYk05ZnXtEALlX7Mm05jT3KSZprMPb957955GaChhhqyJmGcM0Y9KtKGFkVYFMZyrANHUG9SjBHF0MbCeIh6kvKhSxjpLQBpcw31IA3sFcbHXPgNE8LmP3hditG3LfzmSlyC1xtXGMvFABThu6cbWjEeFA2fWwXCfXhRER98irC2G4AipJQffnhNwni9a/hNv4WXJISeMsLntlIPvKCpIJqEMFcugGJEwp3YV+v8UISBCsLnxmp/TcMvdOOQOe9UAbC81InmmgEoxu1Kw2/xrZqEn23HYWGsVgsgjFVzL9cBhDDowNPXxlHCdVfDR9pwQBhLTgEIIx5rxUHXAKI+XHEqvMqZcNmV8BrYU+Hc//cqEObMva0DzBPOOP70OdsLjKB1ACE8sgUgjDGr4U2jCeGHLQDF+Gn1xTZPOG8xvDY2NawBKMJj2wBicxspxkxhwXjvKZ2aHM84fqHLCYgZmwDJwoImuA6HMk5NjDsBkLQJ8KuwYHr6xQaAcSzQXHUjw5aE8LWw4J/nY3kAKxdPV9cDhFlrAIoQKiyYGBrIA1h79UR/626pBmDCGoD4cbOw4OLZVq0/T+RBpCaf6ZW+YEXbKWrzZBpjHN+paOLutTyAfJgyp9MJHINNKcbUtqfW0aR/P71XHKLU6UQIWQ2fASAEhLG+E0TizlW9/ulNRQDCWBc/Oq0DZCFGiwUxPZEY6s9Mp/T0y0z4eG+glOYdhlsy33MU412V836rP3zxYT/c1IIPR4Xw3oHwU+ZeqIWyKzGyU0+UtOcJw574OieMk+aDbckAhJBrDVuOon60C+GGeZuaI0H28Jc0v7PXBq3P+YYa+s/0F+n31kpuyf6RAAAAAElFTkSuQmCC"/>  */}
            <h5 style={{ marginRight: "10px" }} >TPA Id</h5>
            <h6>: {patientDetail[0]?.insurance_id ? patientDetail[0]?.insurance_id : 'nan'}</h6>
            </div>
            <div style={{ display: "flex",marginTop:'20px' }}>  
            {/* <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACwUlEQVR4nO2YzU8TURTFjwa/SCTGf4ANEdN7KwsssjCpO9eyMbJSognoVvz4A9C40QURNmh0hVs1JgpVTGRhtEsJWO5rDQSKC2K1iYk05ZnXtEALlX7Mm05jT3KSZprMPb957955GaChhhqyJmGcM0Y9KtKGFkVYFMZyrANHUG9SjBHF0MbCeIh6kvKhSxjpLQBpcw31IA3sFcbHXPgNE8LmP3hditG3LfzmSlyC1xtXGMvFABThu6cbWjEeFA2fWwXCfXhRER98irC2G4AipJQffnhNwni9a/hNv4WXJISeMsLntlIPvKCpIJqEMFcugGJEwp3YV+v8UISBCsLnxmp/TcMvdOOQOe9UAbC81InmmgEoxu1Kw2/xrZqEn23HYWGsVgsgjFVzL9cBhDDowNPXxlHCdVfDR9pwQBhLTgEIIx5rxUHXAKI+XHEqvMqZcNmV8BrYU+Hc//cqEObMva0DzBPOOP70OdsLjKB1ACE8sgUgjDGr4U2jCeGHLQDF+Gn1xTZPOG8xvDY2NawBKMJj2wBicxspxkxhwXjvKZ2aHM84fqHLCYgZmwDJwoImuA6HMk5NjDsBkLQJ8KuwYHr6xQaAcSzQXHUjw5aE8LWw4J/nY3kAKxdPV9cDhFlrAIoQKiyYGBrIA1h79UR/626pBmDCGoD4cbOw4OLZVq0/T+RBpCaf6ZW+YEXbKWrzZBpjHN+paOLutTyAfJgyp9MJHINNKcbUtqfW0aR/P71XHKLU6UQIWQ2fASAEhLG+E0TizlW9/ulNRQDCWBc/Oq0DZCFGiwUxPZEY6s9Mp/T0y0z4eG+glOYdhlsy33MU412V836rP3zxYT/c1IIPR4Xw3oHwU+ZeqIWyKzGyU0+UtOcJw574OieMk+aDbckAhJBrDVuOon60C+GGeZuaI0H28Jc0v7PXBq3P+YYa+s/0F+n31kpuyf6RAAAAAElFTkSuQmCC"/>  */}
            <h5 style={{ marginRight: "10px" }} >TPA Validity</h5>
            <h6>: {patientDetail[0]?.insurance_validity ? patientDetail[0]?.insurance_validity:'nan'}</h6>
            </div>
            <div style={{  display: "flex",marginTop:'20px' }}>  
            {/* <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACwUlEQVR4nO2YzU8TURTFjwa/SCTGf4ANEdN7KwsssjCpO9eyMbJSognoVvz4A9C40QURNmh0hVs1JgpVTGRhtEsJWO5rDQSKC2K1iYk05ZnXtEALlX7Mm05jT3KSZprMPb957955GaChhhqyJmGcM0Y9KtKGFkVYFMZyrANHUG9SjBHF0MbCeIh6kvKhSxjpLQBpcw31IA3sFcbHXPgNE8LmP3hditG3LfzmSlyC1xtXGMvFABThu6cbWjEeFA2fWwXCfXhRER98irC2G4AipJQffnhNwni9a/hNv4WXJISeMsLntlIPvKCpIJqEMFcugGJEwp3YV+v8UISBCsLnxmp/TcMvdOOQOe9UAbC81InmmgEoxu1Kw2/xrZqEn23HYWGsVgsgjFVzL9cBhDDowNPXxlHCdVfDR9pwQBhLTgEIIx5rxUHXAKI+XHEqvMqZcNmV8BrYU+Hc//cqEObMva0DzBPOOP70OdsLjKB1ACE8sgUgjDGr4U2jCeGHLQDF+Gn1xTZPOG8xvDY2NawBKMJj2wBicxspxkxhwXjvKZ2aHM84fqHLCYgZmwDJwoImuA6HMk5NjDsBkLQJ8KuwYHr6xQaAcSzQXHUjw5aE8LWw4J/nY3kAKxdPV9cDhFlrAIoQKiyYGBrIA1h79UR/626pBmDCGoD4cbOw4OLZVq0/T+RBpCaf6ZW+YEXbKWrzZBpjHN+paOLutTyAfJgyp9MJHINNKcbUtqfW0aR/P71XHKLU6UQIWQ2fASAEhLG+E0TizlW9/ulNRQDCWBc/Oq0DZCFGiwUxPZEY6s9Mp/T0y0z4eG+glOYdhlsy33MU412V836rP3zxYT/c1IIPR4Xw3oHwU+ZeqIWyKzGyU0+UtOcJw574OieMk+aDbckAhJBrDVuOon60C+GGeZuaI0H28Jc0v7PXBq3P+YYa+s/0F+n31kpuyf6RAAAAAElFTkSuQmCC"/>  */}
            <h5 style={{ marginRight: "10px" }} >Remarks</h5>
            <h6>  : {patientDetail[0]?.note}</h6> 
            </div>
        </div>
           
           
          </div>
          <div>
            <h4>Patient Visit Report</h4>
          </div>
        </DialogContent>
        <DialogActions>
          {/* {selectedData?.specialist_name ? */}
          <button
            className="btn-mod bg-soft btn-md"
            // onClick={() => handleSubmit()}
            style={{ marginRight: "3%" }}
          >
            Save
          </button>
          {/* :<button className="btn-mod bg-soft btn-md" onClick={()=>handleSubmit()} style={{marginRight: '3%'}}>
          Save
        </button>
           } */}
        </DialogActions>
      </Dialog>
    </div>
  );
}

// export default SetupPatientDetails
