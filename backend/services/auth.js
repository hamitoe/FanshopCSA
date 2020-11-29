
// DB-Connection
const express = require('express');
const app = express();
const Database = require("better-sqlite3");
const dbOptions = { verbose: console.log };
const dbFile = "./backend/db/sortiment.sqlite";
const dbConnection = new Database(dbFile, dbOptions);
app.locals.dbConnection = dbConnection;


exports.register = (req, res) =>{
    console.log(req.body);

    const {vorname, nachname, email, password, passwordConfirm, street, housnumber, postcode, city, paymentOption} = req.body;

  




    res.send("Form Submitted")
}