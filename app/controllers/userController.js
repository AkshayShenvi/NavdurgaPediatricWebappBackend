var treat = require('../models/user.js');


// add new treatment
exports.add = (req, res) => {
    if (!req.body) {
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


// Check for valid user
exports.search = (req, res) => {
    console.log('search');
    treat.findById(req)
        .then(success => {
            if (!success) {
                return res.status(404).send({
                    message: "Entered userid or password is wrong!!"
                });
            }
            res.send(success);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found !!" 
                });
            }
            return res.status(500).send({
                message: "Error while validating user!!" 
            });
        });
};
