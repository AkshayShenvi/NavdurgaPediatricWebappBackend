var treat = require('../models/treatment.js');
const lodash = require('lodash');
const isEmpty = lodash.isEmpty

// add new treatment
exports.add = (req, res) => {
    if (isEmpty(req.body)) {
        return res.status(400).send({
            message: "Please provide valid input!"
        });
    }
    // Create a treatment
    const treatment = { name: req.body.name, description: req.body.description, charges: req.body.charges };

    // Save in the database
    treat.save(treatment)
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the treatment."
            });
        });
};

// Retrieve and return all treatments from the database.
exports.findAll = (req, res) => {
    treat.getTreatments().then(results => {
        res.send(results);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving treatments."
        });
    });
};

// Find a treatment with a treatmentId
exports.search = (req, res) => {
    treat.findById(req.params.treatmentId)
        .then(treatment => {
            if (!treatment) {
                return res.status(404).send({
                    message: "Treatment not found with id " + req.params.treatmentId
                });
            }
            res.send(treatment);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Treatment not found with id " + req.params.treatmentId
                });
            }
            return res.status(500).send({
                message: "Error retrieving treatment with id " + req.params.treatmentId
            });
        });
};

// Update a treatment with treatmentId
exports.update = (req, res) => {

    if (isEmpty(req.body)) {
        return res.status(400).send({
            message: "Please provide valid data!"
        });
    }

    treat.findByIdAndUpdate(req.params.treatmentId, {
        name: req.body.name,
        description: req.body.description,
        charges: req.body.charges
    }, { new: true })
        .then(treatment => {
            if (!treatment) {
                return res.status(404).send({
                    message: "Treatment not found with id " + req.params.treatmentId
                });
            }
            res.send(treatment);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Treatment not found with id " + req.params.treatmentId
                });
            }
            return res.status(500).send({
                message: "Error updating treatment with id " + req.params.treatmentId
            });
        });
};

// Delete a treatment 
exports.delete = (req, res) => {
    treat.findByIdAndRemove(req.params.treatmentId)
        .then(treatment => {
            if (!treatment) {
                return res.status(404).send({
                    message: "Treatment not found with id " + req.params.treatmentId
                });
            }
            res.send({ message: "Treatment deleted successfully!", id: req.params.treatmentId });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Treatment not found with id " + req.params.treatmentId
                });
            }
            return res.status(500).send({
                message: "Could not delete treatment with id " + req.params.treatmentId
            });
        });
};