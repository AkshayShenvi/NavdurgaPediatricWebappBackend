const express = require('express');
const app = express();
process.env.NODE_ENV = 'production';
var bodyParser = require('body-parser');
app.use(bodyParser.json());

const treatment = require('../controllers/treatment.js');
var connection = require('../../app/models/db.js');

// add treatment
app.post('/treatment', function (req, res) {
    treatment.add(req, res);
});

// list all treatments
app.get('/treatments', treatment.findAll);

//search for treatment with id
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

app.get('/', (req, res) => {
    connection.getConnection(req, res);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
