const express = require('express');
const app = express();
process.env.NODE_ENV = 'production';
var bodyParser = require('body-parser');
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors()) 

const treatment = require('../controllers/treatment.js');
const connection = require('../../app/models/db.js');
const user = require('../controllers/userController.js');

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



// ------------User Routing-----------
app.post('/login', (req, res) => {
    // connection.getConnection(req, res);
   // res.json('signin')
    console.log('loginUser');
    user.search(req, res);
});

app.get('/', (req, res) => {
    // res.send('working, connected');
    
    if(connection)
        res.json('conhhhhhnected');
    else
        res.status(500).send('error');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
