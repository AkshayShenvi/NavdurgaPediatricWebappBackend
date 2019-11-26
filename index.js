const express = require('express');
const app = express();
var con = require('mssql')
var config ={
  user:'',
  password:'',
  server:'LAPTOP-4409GM8C\SQLEXPRESS',
  database:'navdurga'
}
con.connect(config,err=>{
  if(err){
    console.log(err)
  } 
})
app.get('/',(req,res)=>{
  
  res.send({hi:'there'});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
