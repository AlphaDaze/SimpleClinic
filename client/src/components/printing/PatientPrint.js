import React from 'react'
import convertToDate from '../../utils/convertToDate'

import "../../assets/css/PatientPrint.css";

const PatientPrint = React.forwardRef(({patient, prescriptions, visits}, ref) => {
    const dob = convertToDate(patient.birthdate);
    var currDate = new Date();
    const today = convertToDate(currDate);

    

    const noVisits = (visits === undefined || visits.length === 0);
    const noPrescriptions= (prescriptions === undefined || prescriptions.length === 0);

    let prescriptionStartDate = null;
    let prescriptionEndDate = null;
    let followUpDate = null;

    if (!noVisits) {
        followUpDate = convertToDate(visits[visits.length - 1].followup);
    }
    if (!noPrescriptions) {
        prescriptionStartDate = convertToDate(prescriptions[prescriptions.length - 1].startDate);
        prescriptionEndDate = convertToDate(prescriptions[prescriptions.length - 1].endDate);
    }
    
    return (
        <div>
            <div className="header-info"> 
                <ul className="ul-horizontal">
                    <li className="li-horizontal"><div style={{marginLeft: "130px", fontSize: "20px"}}>{patient.firstName} {patient.lastName}</div></li>
                    <li className="li-horizontal"><div style={{marginLeft: "220px", marginTop: "5px", fontSize: "14px"}}>{dob}</div></li>
                    <li className="li-horizontal"><div style={{marginLeft: "57px", fontSize: "20px"}}>{patient.gender}</div></li>
                    <li className="li-horizontal"><div style={{marginLeft: "86px", fontSize: "20px"}}>{today}</div></li>
                    {/* <li><div style={{marginLeft: "75px", marginTop: "10px", fontSize: "11px"}}>{patient._id}</div></li> */}
                </ul>
            </div>
        
            <div id="first" className="container">
                <div className="column-info">  
                    <ul className="ul-vertical">
                        
                        { noVisits ?  <li><div style={{marginLeft: "15px", fontSize: "15px"}}>No Visit</div></li>
                            :
                            <div>
                                <li><b style={{fontSize: "20px"}}>Complaining Of:</b></li>
                                <li><div style={{marginLeft: "15px", fontSize: "15px"}}>{visits[visits.length - 1].patientIssue}</div></li>

                                <li><b style={{fontSize: "20px"}}>On Examination:</b></li>
                                <li><div style={{marginLeft: "15px", fontSize: "15px"}}>{visits[visits.length - 1].examination}</div></li>

                                <li><b style={{fontSize: "20px"}}>Diagnosis:</b></li>
                                <li><div style={{marginLeft: "15px", fontSize: "15px"}}>{visits[visits.length - 1].diagnosis}</div></li>

                                <li><b style={{fontSize: "20px"}}>Investigation:</b></li>
                                <li><div style={{marginLeft: "15px", fontSize: "15px"}}><b>WBC:</b> {visits[visits.length - 1].vitals.whiteBlood}</div></li>
                                <li><div style={{marginLeft: "15px", fontSize: "15px"}}><b>Haemoglobin:</b> {visits[visits.length - 1].vitals.haemoglobin}</div></li>
                                <li><div style={{marginLeft: "15px", fontSize: "15px"}}><b>Creatinine:</b> {visits[visits.length - 1].vitals.creatinine}</div></li>
                                <li><div style={{marginLeft: "15px", fontSize: "15px"}}><b>Urea:</b> {visits[visits.length - 1].vitals.urea}</div></li>
                            </div>
                        }
                    </ul>
                </div>
            </div>

            <div id="second" className="container">
                <div className="main-info">  
                    <ul className="ul-vertical">
                        
                        { noPrescriptions ?  <li><div style={{marginLeft: "15px", fontSize: "15px"}}>No Prescriptions</div></li>
                            :
                            <div>
                                <li><b style={{fontSize: "20px"}}>Prescription 1:</b></li>
                                <li><div style={{marginLeft: "15px", fontSize: "15px"}}><b>Drug:</b> {prescriptions[prescriptions.length - 1].drug}</div></li>
                                <li><div style={{marginLeft: "15px", fontSize: "15px"}}><b>Units:</b> {prescriptions[prescriptions.length - 1].units}</div></li>
                                <li><div style={{marginLeft: "15px", fontSize: "15px"}}><b>Directions:</b> {prescriptions[prescriptions.length - 1].directions}</div></li>
                                <li><div style={{marginLeft: "15px", fontSize: "15px"}}><b>Notes:</b> {prescriptions[prescriptions.length - 1].notes}</div></li>
                                <li><div style={{marginLeft: "15px", fontSize: "15px"}}><b>Start Date:</b> {prescriptionStartDate}</div></li>
                                <li><div style={{marginLeft: "15px", fontSize: "15px"}}><b>End Date:</b> {prescriptionEndDate}</div></li>

                                <li><div style={{marginTop: "700px", marginLeft: "500px", fontSize: "22px"}}><b>Followup Date:</b> {followUpDate}</div></li>
                            </div>
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
});


export default PatientPrint;