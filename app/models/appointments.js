
exports.getDoctorNameAndAppointmentCount=(dates)=>{
    var start=dates.startDate;
    var end=dates.endDate;
    var connection = require ('./db');
    return new Promise((resolve,reject)=>{
        var sql="SELECT COUNT(*) AS count, CONCAT(Doctor.firstname ,' ', Doctor.lastname) AS 'DoctorName' FROM navdurga.Appointments LEFT JOIN navdurga.Doctor ON Appointments.doctorId = Doctor.doctorId WHERE Appointments.startDate BETWEEN '"+start+"' AND '"+end+"' GROUP BY Appointments.doctorId;";
        connection.query(sql,(error,rows)=>{
            if(error || !rows){
                reject(error);
            }
            else{
                resolve(rows);
            }
         });
    })

};

exports.getAllAppointments=(dates)=>{
    var start=dates.startDate;
    var end=dates.endDate;
    var connection = require ('./db');
    return new Promise((resolve,reject)=>{
        var sql="SELECT Appointments.appointmentId AS Appointmentid, CONCAT(PatientDetails.firstName, ' ', PatientDetails.middleName, ' ', PatientDetails.lastName) AS PatientName, CONCAT(Doctor.firstname ,' ', Doctor.lastname) AS 'DoctorName', Appointments.startDate AS startDate, Appointments.endDate  AS endDate FROM navdurga.Appointments LEFT JOIN navdurga.Doctor ON Appointments.doctorId = Doctor.doctorId LEFT JOIN navdurga.PatientDetails ON Appointments.patientId = PatientDetails.patientId WHERE Appointments.startDate BETWEEN '"+start+"' AND '"+end+"';";
        connection.query(sql,(error,rows)=>{
            if(error || !rows){
                reject(error);
            }
            else{
                resolve(rows);
            }
         });
    })

};

exports.addAppointmentForExistingPatient=(body)=>{
    const patientId=body.patientId;
    const doctorId=body.doctorId;
    const startDate=body.startDate;
    const endDate=body.endDate;
    const appointmentDone=body.appointmentDone;
    console.log(patientId);
    var connection = require ('./db');
    return new Promise((resolve,reject)=>{
        var sql="INSERT INTO navdurga.Appointments(patientId,doctorId ,startDate ,endDate,appointmentDone ) VALUES ("+patientId+","+doctorId+",'"+startDate+"','"+endDate+"',"+appointmentDone+");";
        connection.query(sql,(error,rows)=>{
            if(error || !rows){
                reject(error);
            }
            else{
                resolve(rows);
            }
         });
    })

};