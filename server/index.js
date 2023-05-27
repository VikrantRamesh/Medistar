const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const jwt = require("jsonwebtoken");
var db_control = require.main.require("./models/db_controller");
const cookieParser = require("cookie-parser");
const { Console } = require("console");


//var router = express.Router();

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Viky2019",
  database: "hospital",
});



const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));


const db = mysql.createConnection({
    use: "root",
    host: "localhost",
    password: "Viky2019",
    database: "hospital"
});


app.get('/', (req, res) => {
    res.send("HAPPY HOME");
});

app.post("/patient_signup", (req, res) =>{

    const timestamp = new Date().toISOString();
    const primaryKey = timestamp.replace(/[-T:]/g, '').slice(0, -5);

    db_control.signup(
        primaryKey,
        req.body.username,
        req.body.email,
        req.body.password,
        req.body.class
    );

    //console.log(req.body.age.slice(0,4));
    const patAge = 2023 - req.body.age.slice(0,4);
    db_control.patient_signup(
        primaryKey,
        req.body.fname,
        req.body.lname,
        req.body.age,
        patAge,
        req.body.gender,
        req.body.address,
        req.body.phone
    );
})

app.post("/doctor_signup", async (req, res) =>{
    const timestamp = new Date().toISOString();
    const primaryKey = timestamp.replace(/[-T:]/g, '').slice(0, -5);

    db_control.signup(
            primaryKey,
            req.body.username,
            req.body.email,
            req.body.password,
            req.body.class
        ).then(() => process.exit());

    //console.log(req.body.dob.slice(0,4), primaryKey);
    const docAge = 2023 - req.body.dob.slice(0,4);

    db_control.doctor_signup(
        primaryKey,
        req.body.fname,
        req.body.lname,
        req.body.email,
        req.body.dob,
        docAge,
        req.body.gender,
        req.body.address,
        req.body.phone,
        req.body.qual,
        req.body.dept
    );

})

app.post("/admin_signup", async (req, res) =>{
    const timestamp = new Date().toISOString();
    const primaryKey = timestamp.replace(/[-T:]/g, '').slice(0, -5);

    db_control.signup(
            primaryKey,
            req.body.username,
            req.body.email,
            req.body.password,
            req.body.class
        ).then(() => process.exit());

    db_control.admin_signup(
        primaryKey
    );
});


app.post("/login", async (req, res) =>{

    con.query('select * from users where username = ? and password = ?' , [req.body.username, req.body.password], function(error , results , fields){
        if(results){
            if (results.length > 0){

              const token = jwt.sign({ id: results[0].id, class: results[0].user_class }, "YOUR_SECRET_KEY");
              return res
                .cookie("access_token", token)
                .status(200)
                .json({login: true, userName: results[0].username, id: results[0].id, class: results[0].user_class});
            }else{
              res.json({login: false})
            }
        }
        else{
            res.json({login: false})
        }
      });

    // const token = jwt.sign({ id: 7, class: "captain" }, "YOUR_SECRET_KEY");
    // return res
    //     .cookie("access_token", token, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === "production",
    //     })
    //     .status(200)
    //     .json({ login:true});

});



app.post("/get_patient_id", async (req, res) =>{
    con.query('select p.pid , p.p_fname from patient p inner join users u on p.user_id = u.id where u.id = ?' , [req.body.userId], function(error , results , fields){

        if(results){
            if (results.length > 0){

              //const token = jwt.sign({ pid: results[0].pid }, "YOUR_SECRET_KEY");
              //return res
                //.cookie("patient_token", token)
                //.status(200)
                return res.json({pid: results[0].pid, p_fname: results[0].p_fname });
            }else{
              res.json({login: false})
            }
        }
        else{
            res.json({login: false})
        }
      });

    // const token = jwt.sign({ id: 7, class: "captain" }, "YOUR_SECRET_KEY");
    // return res
    //     .cookie("access_token", token, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === "production",
    //     })
    //     .status(200)
    //     .json({ login:true});

});

app.post("/get_doctor_id", async (req, res) =>{

    con.query('select p.doc_id , p.first_name from doctor p inner join users u on p.user_id = u.id where u.id = ?' , [req.body.userId], function(error , results , fields){
        if(results){
            if (results.length > 0){
                return res.json({doc_id: results[0].doc_id, d_fname: results[0].first_name });
            }else{
              res.json({login: false})
            }
        }
        else{
            res.json({login: false})
        }
      });
});

app.post("/get_admin_id", async (req, res) =>{

    con.query('select a.admin_id from admin a where a.user_id = ?' , [req.body.userId], function(error , results , fields){
        if(results){
            if (results.length > 0){
                return res.json({admin_id: results[0].admin_id});
            }else{
              res.json({login: false})
            }
        }
        else{
            res.json({login: false})
        }
      });
});


app.post("/get_doc_details", async (req, res) =>{
    con.query('select * from doctor d where d.doc_id = ?' , [req.body.doc_id], function(error , results , fields){

        if(results){
            if (results.length > 0){

                const fname = results[0].first_name;
                const lname = results[0].last_name;
                const email = results[0].email;
                const age = results[0].age;
                const gender = results[0].gender;
                const address = results[0].address;
                const phone = results[0].phone;
                const dept = results[0].department;
                const qual = results[0].Qualification;
                return res.json({
                fname:fname,
                lname: lname,
                email:email,
                age:age,
                gender:gender,
                address:address,
                phone: phone,
                dept: dept,
                qual: qual
                });
            }else{
              return res.json({login: false})
            }
        }
        else{
            return res.json({login: false})
        }
      });
});


app.post("/get_admin_details", async (req, res) =>{
    con.query('select * from users u where u.id = ?' , [req.body.user_id], function(error , results , fields){

        if(results){
            if (results.length > 0){

                const user_name = results[0].username;
                const email = results[0].email;

                return res.json({
                    user_name:user_name,
                    email:email,
                });
            }else{
              return res.json({login: false})
            }
        }
        else{
            return res.json({login: false})
        }
      });
});

const authorization = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        console.log("Key is not found!!!");
      return res.sendStatus(403);
    }
    try {
      const data = jwt.verify(token, "YOUR_SECRET_KEY");

      req.userId = data.id;
      req.userClass = data.class;
      return next();
    } catch {
        console.log(2);
        return res.sendStatus(403);
    }
};


app.get("/protected", authorization, (req, res) => {
    return res.json({ id: req.userId, class: req.userClass } );
});

app.get("/logout",authorization, async (req, res) =>{
    return res
    .clearCookie("access_token")
    .status(200)
    .json({ logout: true });
});

app.post("/get_symptoms", async (req, res) =>{
    const symptom = [];
    con.query('select * from symptoms', function(error , results , fields){
    results.forEach((row) => {
        const symptom_name = row.name;
        symptom.push({value: symptom_name, label:symptom_name});
    });
    res.json({symptoms: symptom});
  });

});

app.post("/get_disease_symptoms", async (req, res) =>{

    con.query('SELECT Symptoms.symptom_name, Diseases.disease_name FROM Symptoms JOIN Disease_Symptoms ON Symptoms.symptom_id = Disease_Symptoms.symptom_id JOIN Diseases ON Diseases.disease_id = Disease_Symptoms.disease_id', function(error , results , fields){
        const symptomToDisease = {};

        results.forEach((row) => {
            const symptom = row.symptom_name;
            const disease = row.disease_name;

            if (!symptomToDisease[disease]) {
            symptomToDisease[disease] = [symptom];
            } else {
            symptomToDisease[disease].push(symptom);
            }
        });
        res.json({disease_symptom: symptomToDisease});
    });
});


app.post("/get_appointments", async (req, res) =>{

    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();

    const app_date = year + "-" + month + "-" + date;

    con.query('select * from appointment where doc_id = ? and date = ?',[req.body.doc_id,app_date], function(error , results , fields){
        const Appointments = [];

        results.forEach((row) => {
            const app = {}
            const appno = row.id;
            const pname = row.patient_name;
            const date = row.date;
            const time = row.time;
            const pid = row.pid;

            app["appno"] =(appno);
            app["pname"] =(pname);
            app["date"] = (date);
            app["time"] =(time);
            app["pid"] = (pid);
            Appointments.push(app);
        });
        //console.log(doctors);
        res.json({appointments: Appointments});
    });
});

app.post("/get_doctors", async (req, res) =>{

    con.query('SELECT d.doc_id , d.first_name, d.last_name, d.department, d.qualification from doctor d inner join departments dp on d.department = dp.department_name inner join disease_department dd  on dp.id = dd.department_id inner join diseases di on di.disease_id = dd.disease_id Where di.name = ?', [req.body.disease], function(error , results , fields){
        const doc = [];

        results.forEach((row) => {
            const doctors = {}
            const id = row.doc_id;
            const fname = row.first_name;
            const lname = row.last_name;
            const qualification = row.qualification;
            const department = row.department;

            doctors["id"] =(id);
            doctors["fname"] =(fname);
            doctors["lname"] = (lname);
            doctors["qualification"] =(qualification);
            doctors["department"] = (department);
            doc.push(doctors);
        });

        res.json({doctors: doc});
    });
});


app.post("/get_doctor_appointments", async (req, res) =>{

    con.query(`
    SELECT COUNT(*) as app_count
    FROM appointment
    WHERE doc_id = ?
    AND time = ?
    AND date = ?;
    `,[req.body.doc_id,req.body.time,req.body.date], function(error , results , fields){
        if(results){
            if (results.length > 0){
                res.json({count: results[0].app_count});
            }
        }
    });
});

app.post("/get_doctors_dept", async (req, res) =>{
    //console.log(req.body.disease);
    con.query('SELECT d.doc_id , d.first_name, d.last_name, d.department, d.qualification from doctor d inner join departments dp on d.department = dp.department_name where dp.department_name = ?', [req.body.dept], function(error , results , fields){

        const doc = [];

        results.forEach((row) => {
            const doctors = {}
            const id = row.doc_id;
            const fname = row.first_name;
            const lname = row.last_name;
            const qualification = row.qualification;
            const department = row.department;

            doctors["id"] =(id);
            doctors["fname"] =(fname);
            doctors["lname"] = (lname);
            doctors["qualification"] =(qualification);
            doctors["department"] = (department);
            doc.push(doctors);
        });
        //console.log(doctors);
        res.json({doctors: doc});
    });
});

app.post('/get_images', (req, res) => {
        con.query(`SELECT img FROM images WHERE id = ?`, [req.body.user_id], function(error , results , fields){
            if(results.length > 0){
                res.set('Content-Type', 'image/jpg')
                    .send(results[0].img);
                }else{
                    res.send();
                }
        });
});



app.post("/detect_disease", async(req, res)=>{
    let query = `SELECT diseases.name FROM diseases
                JOIN symptoms_diseases ON diseases.disease_id = symptoms_diseases.disease_id
                JOIN symptoms ON symptoms_diseases.symptom_id = symptoms.symptom_id
                WHERE symptoms.name IN (${req.body.symptoms.map(() => '?').join(',')})
                GROUP BY diseases.disease_id
                HAVING COUNT(*) >= 3`;
    con.query(query, req.body.symptoms, (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            // Return array of possible diseases

            const disease = [];
            results.forEach((row) => {
                disease.push(row.name)
            });
            const die = disease[0];

            res.cookie("disease",die);


            res.json({diseases:disease});
        } else {
            res.cookie("disease",[]);
            res.json({diseases:[]});
        }
        });

});


app.post("/appointment", async(req, res)=>{
    let query = "INSERT INTO `appointment`(`pid`, `doc_id`,`patient_name`,`department`,`doctor_name`,`date`,`time`) VALUES (" +
    req.body.pid +
    "," +
    req.body.doc_id +
    ",'" +
    req.body.pfname +
    "','" +
    req.body.department  +
    "','" +
    req.body.doc_name  +
    "','" +
    req.body.date +
    "','" +
    req.body.time +
    "')";
    con.query(query, req.body.symptoms, (err, results) => {
        res.send();
    });

});

app.post("/insert_prescription", async(req, res)=>{
    let query = "INSERT INTO `prescriptions`(`app_id`,`pid`, `doc_id`,`doc_name`,`pname`,`date`,`time`,`prescription`, `disease`) VALUES (" +
    req.body.appno +
    "," +
    req.body.pid +
    "," +
    req.body.doc_id +
    ",'" +
    req.body.doc_name  +
    "','" +
    req.body.pname  +
    "','" +
    req.body.date +
    "','" +
    req.body.time +
    "','" +
    req.body.pres +
    "','" +
    req.body.disease +
    "')";
    con.query(query, (err, results) => {
        con.query("DELETE FROM `appointment` where id = ?", [req.body.appno], (err, results)=>{
            res.send();
        }) ;
    });

});






// ---ADMIN DASHBOARD QUERIES---

app.post("/get_website_stats", async (req, res) =>{
    con.query('SELECT count(*) as cnt from users u group by user_class order by user_class', function(error , results , fields){

        if(results){
            if (results.length > 0){
                res.json({admins: results[0]["cnt"],
                        doctors: results[1]["cnt"],
                        patients: results[2]["cnt"],
                        total: results[0]["cnt"]+results[1]["cnt"]+results[2]["cnt"]});
            }
        }
    });
});

app.post("/dept_appointment_data", async (req, res) =>{


    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();

    const app_date = year + "-" + month + "-" + date;

    con.query('SELECT department,count(*) as dept_cnt from appointment where date = ? group by department;',[app_date], function(error , results , fields){
        app_data = {}
        if(results){
            if (results.length > 0){

                results.forEach((row)=>{
                    app_data[row.department] = row.dept_cnt;
                });
            }
        }
        return res.json(app_data);
    });
});

app.post("/time_appointment_data", async (req, res) =>{


    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();

    const app_date = year + "-" + month + "-" + date;

    con.query('SELECT time,count(*) as time_cnt from appointment where date = ? group by time order by time',[app_date], function(error , results , fields){

        if(results){
            if (results.length > 0){
                app_data = {"00:00":0, "10:00 AM":0, "11:00 AM":0,"12:00 PM":0,"01:00 PM":0,"02:00 PM":0,"03:00 PM":0,"04:00 PM":0,"05:00 PM":0}
                results.forEach((row)=>{
                    app_data[row.time] = row.time_cnt;
                });
            }
        }
        return res.json(app_data);
    });
});

app.post("/gender_data", async (req, res) =>{



    con.query('SELECT gender,count(*) as gender_cnt from patient group by gender', function(error , results , fields){
        let total = 0;
        let app_data = {"Male":0, "Female":0, "Other":0};
        if(results){
            if (results.length > 0){

                results.forEach((row)=>{
                    total+=row.gender_cnt;
                    app_data[row.gender] = row.gender_cnt;
                });
            }
        }
        app_data["total"] = total;
        return res.json(app_data);
    });
});


app.post("/age_data", async (req, res) =>{
    con.query(`
    SELECT
        CASE
            WHEN age < 10 THEN '0-10'
            WHEN age BETWEEN 10 AND 20 THEN '10-20'
            WHEN age BETWEEN 20 AND 30 THEN '20-30'
            WHEN age BETWEEN 30 AND 40 THEN '30-40'
            WHEN age BETWEEN 40 AND 50 THEN '40-50'
            WHEN age BETWEEN 50 AND 60 THEN '50-60'
            WHEN age BETWEEN 60 AND 70 THEN '60-70'
            WHEN age BETWEEN 70 AND 80 THEN '70-80'
            WHEN age BETWEEN 80 AND 90 THEN '80-90'
            WHEN age BETWEEN 90 AND 100 THEN '90-100'

            ELSE 'Over 100'
        END AS age_group,
        COUNT(*) AS num_people
        FROM patient
        GROUP BY age_group;
    `, function(error , results , fields){
        let app_data = {"0-10":0, "10-20":0, "20-30":0, "30-40":0,"40-50":0, "50-60":0,"60-70":0, "70-80":0,"80-90":0, "90-100":0,"100+":0};
        if(results){
            if (results.length > 0){

                results.forEach((row)=>{
                    app_data[row.age_group] = row.num_people;
                });
            }
        }
        return res.json(app_data);
    });
});


app.post("/top_docs", async (req, res) =>{

    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();

    const app_date = year + "-" + month + "-" + date;
    con.query(`
        SELECT d.doc_id , d.first_name, d.last_name, d.department, d.qualification, COUNT(*) AS num_appointments
        FROM appointment p
        INNER JOIN doctor d ON p.doc_id = d.doc_id
        WHERE date = ?
        GROUP BY p.doc_id
        ORDER BY num_appointments DESC
        LIMIT 3;
    `,[app_date], function(error , results , fields){

        if(results){
            if (results.length > 0){
                const doc = [];
                results.forEach((row) => {
                    const doctors = {}
                    const id = row.doc_id;
                    const fname = row.first_name;
                    const lname = row.last_name;
                    const qualification = row.qualification;
                    const department = row.department;
                    const num_appointments =row.num_appointments

                    doctors["id"] =(id);
                    doctors["fname"] =(fname);
                    doctors["lname"] = (lname);
                    doctors["qualification"] =(qualification);
                    doctors["department"] = (department);
                    doctors["num_appointments"] = (num_appointments);
                    doc.push(doctors);
                });
                res.json({doctors: doc});
            }
        }
    });
});


app.post("/top_diseases", async (req, res) =>{

    con.query(`
    select disease,COUNT(*) AS total_cases from prescriptions group by disease order by total_cases desc LIMIT 5;
    `, function(error , results , fields){
        if(results){
            if (results.length > 0){
                const diseases = {};
                results.forEach((row) => {
                    const disease = row.disease;
                    const total_cases = row.total_cases;

                    diseases[disease] =(total_cases);
                });

                res.json({diseases: diseases});
            }
        }
    });
});

app.post("/get_patient_details", (req, res)=>{
    con.query("SELECT * FROM patient where user_id = ?",[req.body.user_id], (err, results) => {
        if(err){
            console.log(err);
        }else{
            if(results){
                res.json({
                    pid:results[0].pid,
                    fname:results[0].p_fname,
                    lname:results[0].p_lname,
                    gender:results[0].gender,
                    dob:results[0].Dob,
                    address:results[0].address,
                    phone:results[0].phone,
                    age:results[0].age,
                });
            }
        }
    });
});


app.post("/get_patient_appointment", (req, res)=>{
    con.query("SELECT appointment.id,appointment.doc_id, appointment.date,appointment.department, appointment.time, doctor.first_name FROM appointment JOIN doctor ON appointment.doc_id = doctor.doc_id WHERE appointment.date > '2023-05-13' AND appointment.pid = (select pid from patient where user_id= ?) ;",[req.body.user_id], (err, results) => {
        if(err){
            console.log(err);
        }else{
            if(results){
                const Appointments = []
        results.forEach((row) => {
            
            const app = {}
            app["appid"] =( row.id);
            app["docid"] =( row.doc_id);
            app["name"] = ( row.first_name);
            app["date"] =( row.date);
            app["time"] = ( row.time);
            app["dept"] = ( row.department);
            Appointments.push(app);
        });
        res.json({appoinment_details: Appointments});
            }

        }

    });
});

app.post("/get_past_appointment", (req, res)=>{
    con.query("SELECT prescriptions.doc_name,prescriptions.disease,prescriptions.prescription, prescriptions.date FROM hospital.prescriptions where pid = (select pid from patient where user_id= ?) ;",[req.body.user_id], (err, results) => {
        if(err){
            console.log(err);
        }else{
            if(results){
                const Past_appointments = []
        results.forEach((row) => {
            const app = {}
            app["name"] = ( row.doc_name);
            app["disease"] =( row.disease);
            app["prescription"] = ( row.prescription);
            app["date"] = ( row.date);
            Past_appointments.push(app);
        });
        res.json({past_appoinment_details:Past_appointments});
            }

        }

    });
});



app.listen(5000, ()=>{
    console.log("running server");
})