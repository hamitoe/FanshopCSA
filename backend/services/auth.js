
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

    Database.query('SELECT email from Person WHERE Email = ?', [email], (error, results) =>{
        if(error){
            console.log(error);
        }
        if (results.length > 0 ){
            return res.render('register', {
               message: 'Email adresse wurde bereits registriert' 
            })

        }else if (password !== passwordConfirm){
            return res.render('register', {
                message: 'Passwörter stimmen nicht überein'
            });
        }
        
    })




    res.send("Form Submitted")
}