var doctor = require('../models/doctor');
const lodash = require('lodash');
const isEmpty= lodash.isEmpty


//Get list of all Doctors
exports.getAll=(req,res)=>{
    doctor.getDoctors()
    .then(results=>{
        res.send(results);
    }).catch(err=>{
        res.status(500).send({
            message: err.message || "Some error occured while retrieving Doctor Information"

        })
    })
}

exports.addDoctor=(req,res)=>{
    if(isEmpty(req.body)){
        return res.status(400).send({
            message: "Please provide valid input!"
        })
    }
    const doctorinfo={  Firstname:req.body.firstname,
                        Lastname:req.body.lastname, 
                        emailid:req.body.email,
                        Phone:req.body.phone};

    doctor.addDoctor(doctorinfo)
    .then(data=>{
        res.send(data);
    }).catch(err=>{
        res.status(500).send({
            message: err.message || "Some error occured while adding Doctor Information"
        })
    })
}

exports.searchDoctor=(req,res)=>{
    if(isEmpty(req.body)){
        return res.status(400).send({
            message: "Please provide valid input!"
        })
    }
    const doctorinfo={name:req.body.name};
    doctor.searchDoc(doctorinfo)
    .then(data=>{
        res.send(data);
    }).catch(err=>{
        res.status(500).send({
            message: err.message || "Some error occured while Searching Doctors"
        })
    })
}

exports.updateDoctor=(req,res)=>{
    if(isEmpty(req.body)){
        return res.status(400).send({
            message: "Please provide valid data!"
        })
    }
    doctor.update(req.params.doctorId,{
        firstname:req.body.firstname,
        lastname: req.body.lastname,
        emailid:req.body.email,
        phno:req.body.phone
    },{new: true})
    .then(data=>{
        if(!data){
            return res.status(404).send({
                message: "Treatment not found with id"+req.params.doctorId
            })
        }
        res.send(data);
    }).catch(err=>{
        if(err.kind=='ObjectId'){
            return res.status(404).send({
                message: "Doctor not found with id " + req.params.doctorId
            });
        }
        return res.status(500).send({
            message: "Error updating doctor with id " + req.params.doctorId
        });
    })
}

exports.deleteDoctor=(req,res)=>{
    doctor.delete(req.params.doctorId)
    .then(data=>{
        if(!data){
            return res.status(404).send({
                message: "Doctor not found with id"+req.params.doctorId
            })
            
        }
        res.send({ message: "Doctor deleted successfully!", id: req.params.doctorId });
    }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Doctor not found with id " + req.params.doctorId
            });
        }
        return res.status(500).send({
            message: "Could not delete doctor with id " + req.params.doctorId
        });
    });
}