
var connection = require('./db.js');


exports.save = (user) => {

  return new Promise((resolve, reject) => {
    var sql = "Insert into navdurga.users(userid, password) values ('" + user.userId + "', '" + user.password + "') ;";
    connection.query(sql, function (error, results, fields) {
      if (error || !results) {
        reject(error);
      } else {
        resolve(results);
      }

    });
  })

};



exports.findById = (req) => {
  return new Promise((resolve,reject) => {
    var sql = "Select * from navdurga.users where userid = '" + req.body.userId + "' ;";
    connection.query(sql, req, function (error, results, fields) {

      var data = JSON.parse(JSON.stringify(results));
      var valid = false;

      if (data.length != 0) {
        resolve(data);
      } else {
        resolve({ message: "fail" });

      }

    });
  })

};
