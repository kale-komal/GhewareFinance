const mysql = require("mysql2");


const connection = mysql.createConnection(
    {
        user:"root",
        host:"localhost",
        password:"intellect@123",
        database:"gheware",
    }
)

connection.connect((err)=>{
    if(err){
        console.warn("error");
    }else{
        console.warn("connecting");
    }

})

module.exports = connection;