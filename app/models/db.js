var mysql = require('mysql');
process.env.NODE_ENV = 'production';
const config = require('../../config.json');


var connection = mysql.createConnection({
  host: config.production.host,
  user: config.production.user,
  password: config.production.password
});


exports.getConnection = (req, res) => {
  connection.connect(function (error) {
    if (!!error) {
      res.status(500).send({
        message: error.message || "Some error occurred while connecting to database!."
      });
    } else {

      res.send({
        message: "Connected"
      });
    }
  });
};

module.exports = connection;
