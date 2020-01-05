
var connection = require('./db.js');
exports.save = (treatment) => {
  
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



exports.findById = (req) => {
  return new Promise((resolve,reject) => {
    var sql = "Select * from navdurga.users where userid = '" + req.body.userId + "' ;";
    connection.query(sql,req,  function (error, results, fields) {
      console.log(results);
      var data = JSON.parse(JSON.stringify(results)); 
      var valid = false; 
      console.log(data);
      if( data.length !=0 && req.body.userId === data[0].userid && req.body.password === data[0].password)
        valid = true; 
     
      if(valid) {
          resolve({message : "success"});
      }else{
        reject({ message :"fail"});

      }

    });
  })

};
