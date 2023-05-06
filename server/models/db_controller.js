var mysql = require("mysql");
var express = require("express");
var router = express.Router();

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Viky2019",
  database: "hospital",
});


// module.exports.last_index = (async function (){
      
//       var query = "SELECT `AUTO_INCREMENT` FROM  INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'hospital' AND   TABLE_NAME = 'users';";
      
//       con.query(query,await function(err, results){  
//           const res = results[0];
//           console.log("Auto_id ",res);
//           return res;
//       });
// });

module.exports.signup = ( function (key,username, email, password, status, callback) {
    
  return new Promise((resolve, reject) => {
    var query =
      "INSERT INTO `users`(`id`,`username`,`email`,`password`,`user_class`) VALUES ('" +
      key +
      "','" +
      username +
      "','" +
      email +
      "','" +
      password +
      "','" +
      status +
      "')";

    
      con.query(query, callback);
      console.log(query);
    }).then(() => process.exit());
    

  });
  
// module.exports.patient_signup = function (username, email, password, status, callback) {
//   var query =
//     "INSERT INTO `users`(`username`,`email`,`password`,`user_class`) VALUES ('" +
//     username +
//     "','" +
//     email +
//     "','" +
//     password +
//     "','" +
//     status +
//     "')";
//   con.query(query, callback);
//   console.log(query);
// };

module.exports.patient_signup = async function (key, fname, lname, dob, age, gender, address, phone, callback) {
  var query =
    "INSERT INTO `patient`(`user_id`,`p_fname`,`p_lname`,`gender`, `Dob`,`age`,`address`, `phone`) VALUES ('" +
    key +
    "','" +
    fname +
    "','" +
    lname +
    "','" +
    gender +
    "','" +
    dob +
    "'," +
    age +
    ",'" +
    address +
    "'," +
    phone +
    ")";
    console.log(query);
  con.query(await query, callback);
  console.log(query);
};


module.exports.doctor_signup = async function (user_id,fname, lname,email, dob, age, gender, address,phone,qual, dept, callback) {
  var query =
    "INSERT INTO `doctor`(`user_id`,`first_name`,`last_name`,`email`,`Dob`, `gender`,`address`,`phone`, `department`,`Qualification`, `age`) VALUES (" +
    user_id +
    ",'" +
    fname +
    "','" +
    lname +
    "','" +
    email+
    "','" +
    dob+
    "','" +
    gender +
    "','" +
    address +
    "'," +
    phone +
    ",'" +
    dept +
    "','" +
    qual +
    "'," +
    age +
    ")";
  con.query(query, callback);
  console.log(query);
};

module.exports.login = async function (username, password, callback) {
    con.query('select * from users where username = ? and password = ?' , [username, password], function(error , results , fields){
    if(results){
        if (results.length > 0){
          console.log(true);
          return true;
        }else{
          console.log(false);
          return false;
        }
    }
    else{
        console.log(false);
        return false;
    }
  });
};

module.exports.symptoms = async function (callback) {
  
  const symptom = [];
  con.query('select * from symptoms', function(error , results , fields){
    results.forEach((row) => {
      const symptom_name = row.name;
      symptom.push({value: symptom_name, label:symptom_name});
    });
    return symptom;
  });
};

