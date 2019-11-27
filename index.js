const express = require('express');
const app = express();
var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'navdurga1991'
});

app.get('/',(req,res)=>{
  
  connection.connect(function(err) {
    if (err) throw err;
    res.send({Msg:'Connected'});
  });
  
  connection.end();
  
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
