

//Get Treatment list
exports.getDoctors=(results)=>{
    var connection= require('./db.js');
    return new Promise((resolve,reject)=>{
        var sql="SELECT * FROM navdurga.Doctor;"
        connection.query(sql,function(error,result,fields){
            if(error|| !result){
                reject(error);
            }else{
                resolve(result);
            }
        })
    })
}

exports.addDoctor=(doctor)=>{
    var connection = require('./db.js');
    return new Promise((resolve,reject)=>{
        var sql = "INSERT INTO navdurga.Doctor (firstname, lastname , email ,phoneno ) VALUES ('"+doctor.Firstname+"','"+doctor.Lastname+"','"+doctor.emailid+"', '"+doctor.Phone+"');";
        connection.query(sql,function (error,results,fields){
            if (error || !results){
                reject(error);
            }else{
                resolve(results);
            }
        })
    })
}

exports.searchDoc=(doctor)=>{
    var connection = require('./db.js');
    return new Promise((resolve, reject)=>{
        var sql= "SELECT * FROM navdurga.Doctor Where firstname like '%"+doctor.name+"%' or lastname like '%"+doctor.name+"%';"
        connection.query(sql,function (error,result,fields){
            if (error || !result){
                reject(error);
            }
            else{
                resolve(result);
            }
        })
    })
}

exports.update=(doctorId,doctor)=>{
    var connection =require('./db.js');
    return new Promise((resolve,reject)=>{
        var sql ="UPDATE navdurga.Doctor SET firstname= '"+doctor.firstname+"',lastname ='"+doctor.lastname+"',email = '"+doctor.emailid+"',phoneno ='"+doctor.phno+"' WHERE doctorId = '"+doctorId+"' ;"
        connection.query(sql,function(error,results,fields){
            if (error || !results){
                reject(error);
            }
            else{
                resolve(results);
            }
        })
    })
}
exports.delete=(doctorId)=>{
    var connection = require('./db.js');
    return new Promise((resolve,reject)=>{
        var sql ="DELETE FROM navdurga.Doctor where doctorId = '"+doctorId+"';"
        connection.query(sql,function (error,results,fields){
            if (error || !results) {
                reject(error);
        
              } else {
        
                resolve(results);
              }
        })
    })
}