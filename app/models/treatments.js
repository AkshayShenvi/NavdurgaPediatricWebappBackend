
exports.getTreatments = (results) => {
  var connection = require('./db.js');

  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM navdurga.treatment;', function (error, results, fields) {
      if (error || !results) {
        reject(error);
      } else {
        resolve(results);
      }

    });
  })

};


exports.save = (treatment) => {
  var connection = require('./db.js');
  return new Promise((resolve, reject) => {
    var sql = "Insert into navdurga.treatment(name, description, charges) values ('" + treatment.name + "', '" + treatment.description + "', '" + treatment.charges + "') ;";
    connection.query(sql, function (error, results, fields) {
      if (error || !results) {
        reject(error);
      } else {
        resolve(results);
      }

    });
  })

};



exports.findById = (treatmentId) => {
  var connection = require('./db.js');
  return new Promise((resolve, reject) => {
    var sql = "Select * from navdurga.treatment where id = '" + treatmentId + "' ;";
    connection.query(sql, function (error, results, fields) {

      if (error || !results) {
        reject(error);

      } else {

        resolve(results);
      }

    });
  })

};



exports.findByIdAndUpdate = (treatmentId, treatment) => {
  var connection = require('./db.js');
  return new Promise((resolve, reject) => {
    var sql = "update navdurga.treatment set name = '" + treatment.name + "', description = '" + treatment.description + "', charges = '" + treatment.charges + "' where id = '" + treatmentId + "' ;";
    connection.query(sql, function (error, results, fields) {

      if (error || !results) {
        reject(error);

      } else {

        resolve(results);
      }

    });
  })

};

exports.findByIdAndRemove = (treatmentId) => {
  var connection = require('./db.js');
  return new Promise((resolve, reject) => {
    var sql = "delete from navdurga.treatment where id = '" + treatmentId + "' ;";
    connection.query(sql, function (error, results, fields) {

      if (error || !results) {
        reject(error);

      } else {

        resolve(results);
      }

    });
  })

};
