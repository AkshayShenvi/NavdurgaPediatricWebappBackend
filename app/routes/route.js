const express = require('express');
const app = express();
process.env.NODE_ENV = 'production';
var bodyParser = require('body-parser');
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors())

const treatment = require('../controllers/treatmentController.js');
const connection = require('../../app/models/db.js');
const user = require('../controllers/userController.js');
const appointmentController = require('../controllers/appointmentController');
const doctorController = require('../controllers/doctorController');

//**************Doctors****************
//Get all doctors
app.get('/getalldoctors', doctorController.getAll)

// Add Doctor 
app.post('/adddoctors',function (req,res){
    doctorController.addDoctor(req,res);
})

// Search Doctors
app.post('/searchdoctors',function(req,res){
    doctorController.searchDoctor(req,res);
})

// Update Doctors
app.put('/doctor/:doctorId',function (req,res){
    doctorController.updateDoctor(req,res);
})

// Delete Doctors
app.delete('/doctors/:doctorId', function (req,res){
    doctorController.deleteDoctor(req,res);
})



// ******************Appointments**********************
// Get doctors with appointment count- inp{startDate,endDate}, opt{DoctorName,Count}
app.post('/appointmentcount',(req,res)=>{
    appointmentController.getDoctorCount(req,res);
});
// Get Details of Appointments
app.post('/appointmentdetails',(req,res)=>{
    appointmentController.getAppointmentDetails(req,res);
});

// Add New Appointment
app.post('/addappointment',(req,res)=>{
    appointmentController.addAppointmentExistingPatient(req,res);
});


//********************Treatments*************************
// Add new treatment
app.post('/treatment', function (req, res) {
    treatment.add(req, res);
});

// List all treatments
app.get('/treatments', treatment.findAll);

//Search for treatment with id
app.get('/treatments/search/:treatmentId', function (req, res) {
    treatment.search(req, res);
});

//update for treatment with id
app.put('/treatment/:treatmentId', function (req, res) {
    treatment.update(req, res);    
});

//delete for treatment with id
app.delete('/treatment/:treatmentId', function (req, res) {
    treatment.delete(req, res);
});




// *************User Routing**************
app.post('/login', (req, res) => {
    user.search(req, res);
});

app.post('/signup', (req, res) => {
    user.add(req, res);
});

app.get('/', (req, res) => {
    if (connection)
        res.json('connected');
    else
        res.status(500).send('error');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
