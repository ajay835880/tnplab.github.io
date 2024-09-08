const mysql = require("mysql");

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    port:"3306",
    database:"mailer",
});

db.connect((error) => {
    if(error){
        console.error("error connecting to the dadabases:", error);
        return;
    }
    console.log("Database connection");
})

module.exports = db;