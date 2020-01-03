--############   DATABASE CREATION   ################
create database navdurga;
use navdurga; 

--############   INITIAL TABLES CREATION   ################
CREATE TABLE users(userid varchar(50), password varchar(255), PRIMARY KEY(userid));
ALTER TABLE users MODIFY userid varchar(50) NOT NULL;

Create Table treatment(id int NOT NULL AUTO_INCREMENT,  name varchar(100) NOT NULL,  description varchar(200), charges int(5), PRIMARY KEY(id));

Create table Doctor (doctorId int NOT NULL AUTO_INCREMENT, firstname varchar(50), lastname varchar(50), email varchar(100), phoneno varchar(12), PRIMARY KEY(doctorId) );

Create table Appointments(patientId int NOT NULL, doctorId int, appointmentId int NOT NULL AUTO_INCREMENT, startDate DATETIME, endDate DATETIME, appointmentDone BOOLEAN, PRIMARY KEY(appointmentId ) , FOREIGN KEY(patientId) REFERENCES PatientDetails(patientId), FOREIGN KEY(doctorId) REFERENCES Doctor(doctorId));
	
Create table Treatment (treatmentId int NOT NULL AUTO_INCREMENT, name varchar(50), description varchar(1000), charges int), PRIMARY KEY(treatmentId);

Create table Users (userId int NOT NULL AUTO_INCREMENT, username varchar(50), password varchar(50), PRIMARY KEY(userId));

Create table PatientDetails(patientId int NOT NULL AUTO_INCREMENT, firstName varchar(50), middleName varchar(50), lastName varchar(50), age int, emailAddress varchar(100), address varchar(300), dateOfBirth TIMESTAMP, placeOfBirth varchar(50), bloodGroup varchar(3), refferedBy int, foundUs varchar(10), PRIMARY KEY(patientId),FOREIGN KEY(refferedBy) REFERENCES Doctor(doctorId));

Create table PatientMedicalHistory(patientId int NOT NULL, asthma BOOLEAN, aids BOOLEAN, fits_faints BOOLEAN, drugAllergies BOOLEAN, hepatitis_liverDisease BOOLEAN, infectiousDisease BOOLEAN, heartProblems BOOLEAN, abnormalBleeding BOOLEAN, pregnancy BOOLEAN, hypertension BOOLEAN, kidneyDisease BOOLEAN, thyroid BOOLEAN, diabetes BOOLEAN, anemia BOOLEAN, majorSurgery BOOLEAN, onGoingMedication varchar(250), others varchar(100), FOREIGN KEY(patientId) REFERENCES PatientDetails(patientId));

Create table PatientTreatment(appointmentId int NOT NULL, treatmentId int, tooth varchar(100), FOREIGN KEY(appointmentId) REFERENCES Appointments(appointme
ntId), FOREIGN KEY(treatmentId) REFERENCES  treatment(id) );



-----------------------------------------------------------------------------------------------



