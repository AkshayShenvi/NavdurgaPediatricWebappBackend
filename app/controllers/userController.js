var treat = require('../models/user.js');
const lodash = require('lodash');
const isEmpty = lodash.isEmpty
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

// add new user
exports.add = (req, res) => {
    if (isEmpty(req.body) || (req.body.userId == '' && req.body.password == '')) {
        return res.status(400).send({
            message: "Please provide valid input!"
        });
    }

    if (req.body.confirmPassword != req.body.password) {
        return res.status(400).send({
            message: "Password and Confirm password does not match!!"
        });
    }

    var hashPassword = bcrypt.hashSync(req.body.password, salt);
    // Create a user
    const user = { userId: req.body.userId, password: hashPassword };

    // Save in the database
    treat.save(user)
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a user."
            });
        });
};


// Check for valid user
exports.search = (req, res) => {

    treat.findById(req)
        .then(success => {
            if (!success || success.message == "fail") {
                return res.status(404).send({
                    message: "Entered userid or password is wrong!!"
                });
            }

            bcrypt.compare(req.body.password, success[0].password).then((result) => {
                if (result) {
                    res.send({ message: "success" });
                } else {
                    return res.status(404).send({
                        message: "Entered userid or password is wrong!!"
                    });
                }
            });


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
