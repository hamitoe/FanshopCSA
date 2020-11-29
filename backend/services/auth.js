
// DB-Connection
const express = require('express');
const app = express();
const Database = require("better-sqlite3");
const dbOptions = { verbose: console.log };
const dbFile = "./backend/db/sortiment.sqlite";
const dbConnection = new Database(dbFile, dbOptions);
app.locals.dbConnection = dbConnection;
const sqlite = require('sqlite3').verbose()
let db = new sqlite.Database('./backend/db/sortiment.sqlite')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')




exports.login = async (req, res) => {

    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).render('login', {
                message: 'Bitte Email und Passwort eingeben'

            })
        }
        db.all('SELECT * from Person WHERE Email=?', [email], async (error, results) => {
            console.log(results)
            if (!results || !(await bcrypt.compare(password, results[0].password))) {
                res.status(401).render('login', {
                    message: 'Email oder Passwort falsch'
                })
            }else{
                const id = results[0].id;
                const token = jwt.sign({id}, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });
                console.log("Token: "+token);

                const cookieOptions = {
                    expires: new Date(
                        Date.now + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }
                res.cookie('jwt', token, cookieOptions);
                res.status(200).redirect("/");
            }
        });

    } catch (error) {
        console.log(error);
    }

}
















exports.register = (req, res) => {
    console.log(req.body);

    const { vorname, nachname, email, password, passwordConfirm, street, housnumber, postcode, city, paymentOption } = req.body;

    db.all('SELECT Email from Person where email = ?', [email], async function (error, results) {
        if (error) {
            console.log(error);
        } if (results.length > 0) {
            return res.render('register', {
                message: 'Email Adresse wird bereits verwendet! '
            })
        } else if (password !== passwordConfirm) {
            return res.render('register', {
                message: 'Passwörter stimmen nicht überein'
            })
        }
        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword)




        db.run('INSERT INTO Adresse (Strasse, Hausnummer, PLZ, Ort)VALUES(?,?,?,?)', [street, housnumber, postcode, city], function (error, results) {
            if (error) {
                console.log(error)
            } else {
                console.log(results)

            }
            var lastInsertedRowId = this.lastID



            db.run('INSERT INTO Person (Vorname, Nachname, AdressID, Email, Passwort)VALUES(?,?,?,?,?)', [vorname, nachname, lastInsertedRowId, email, hashedPassword], (error, results) => {
                if (error) {
                    console.log(error)
                } else {
                    console.log(results);
                    return res.render('register', {
                        message: 'Benutzer erfolgreich registriert'
                    });
                }
            })



        })


    })





}


