var appointment = require('../models/appointments');
const lodash = require('lodash');
const isEmpty= lodash.isEmpty

exports.getDoctorCount=(req,res)=>{
    
    if(isEmpty(req.body)){
        return res.status(400).json({message:'Please provide valid input!'});
    }
    else{
        // res.json(req.body.startDate);
        appointment.getDoctorNameAndAppointmentCount(req.body).then(data=>{
            res.send(data);
        }).catch(err=>{
            res.status(500).send({
                message:err.message || "Some error occurred while retriving the data."
            });
        });
    }
}

exports.getAppointmentDetails=(req,res)=>{
    
    if(isEmpty(req.body)){
        return res.status(400).json({message:'Please provide valid input!'});
    }
    else{
        // res.json(req.body.startDate);
        appointment.getAllAppointments(req.body).then(data=>{
            res.send(data);
        }).catch(err=>{
            res.status(500).send({
                message:err.message || "Some error occurred while retriving the Appointment data."
            });
        });
    }
}

exports.addAppointmentExistingPatient=(req,res)=>{
    
    if(isEmpty(req.body)){
        return res.status(400).json({message:'Please provide valid input!'});
    }
    else{
        // res.json(req.body.startDate);
        appointment.addAppointmentForExistingPatient(req.body).then(data=>{
            res.send(data);
        }).catch(err=>{
            res.status(500).send({
                message:err.message || "Some error occurred while retriving the Appointment data."
            });
        });
    }
}