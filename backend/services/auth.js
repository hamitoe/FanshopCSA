
const { existsSync } = require('fs');
const path = require('path');
const util = require('util');

// DB-Connection
const express = require('express');
const app = express();
const Database = require("better-sqlite3");
const dbOptions = { verbose: console.log };

const dbFile = "./Backend/db/sortiment.sqlite";
const dbFilePath = path.resolve(dbFile);
console.log('###### dbFilePath: ' + dbFilePath);
console.log('###### dbFilePath: exists=' + existsSync(dbFilePath));

const dbConnection = new Database(dbFile, dbOptions);
app.locals.dbConnection = dbConnection;
const sqlite = require('sqlite3').verbose()
let db = new sqlite.Database(dbFile)
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')


// existsSync(dbFilePath)

const helper = require('../../helper');
const { rejects } = require('assert');


function findUser(email) {
    return new Promise((resolve, reject) => {
        db.all('SELECT * from Person WHERE Email=?', [email], (error, results) => {
            console.log('error: ', error);
            console.log('results: ', results);
            if (error !== undefined && error !== null) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email) {
        return res.status(400).json(helper.jsonMsgError('NO_EMAIL'));
    }
    if (!password) {
        return res.status(400).json(helper.jsonMsgError('NO_PASSWORD'));
    }
    try {
        let results = await findUser(email);
        if (results.length === 0) {
            return res.status(401).json(helper.jsonMsgError('EMAIL_INVALID'));
        }
        if (!results || !(await bcrypt.compare(password, results[0].Passwort))) {
            return res.status(401).json(helper.jsonMsgError('PASSWORD_INVALID'));
        }
        const id = results[0].PersonID;
        const payload = {id};
        console.log('jwt: ', payload)
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });        
        console.log("Token: "+token);
        const cookieOptions = {
            expires: new Date(
                Date.now + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
            ),
            //httpOnly: true
            httpOnly: false
        }
        res.cookie('jwt', token, cookieOptions);
        return res.status(200).json();

    } catch (error) {
        return res.status(500).json();
    }

}

exports.register = (req, res) => {
    console.log(req.body);

    const required = [];
    const { vorname, nachname, email, password, street, housenumber, postcode, city, paymentOption } = req.body;

    if (vorname === '') {
        required.push('vorname');
    }
    if (nachname === '') {
        required.push('nachname');
    }
    if (email === '') {
        required.push('email');
    }
    if (password === '') {
        required.push('password');
    }
    if (street === '') {
        required.push('street');
    }
    if (housenumber === '') {
        required.push('housenumber');
    }
    if (postcode === '') {
        required.push('postcode');
    }
    if (city === '') {
        required.push('city');
    }
    if (paymentOption === '') {
        required.push('paymentOption');
    }
    if (required.length > 0) {
        return res.status(400).json(helper.jsonMsgError('REQUIRED_FIELDS_MISSING', required));
    }
    db.all('SELECT Email from Person where email = ?', [email], async function (error, results) {
        if (error) {
            return res.status(409).json(helper.jsonMsgError('CHECK_EMAIL_FAILED'));
        } if (results.length > 0) {
            return res.status(409).json(helper.jsonMsgError('EMAIL_ALREADY_IN_USED'));
        }
        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword)
        db.run('INSERT INTO Adresse (Strasse, Hausnummer, PLZ, Ort)VALUES(?,?,?,?)', [street, housenumber, postcode, city], function (error, results) {
            if (error) {
                console.log(error);
                return res.status(409).json(helper.jsonMsgError('CREATE_ADRESS_FAILED'));
            } else {
                console.log(results)
            }
            var lastInsertedRowId = this.lastID
            db.run('INSERT INTO Person (Vorname, Nachname, AdressID, Email, Passwort)VALUES(?,?,?,?,?)', [vorname, nachname, lastInsertedRowId, email, hashedPassword], (error, results) => {
                if (error) {
                    console.log(error);
                    return res.status(409).json(helper.jsonMsgError('CREATE_PERSON_FAILED'));
                } else {
                    return res.status(200).json();
                }
            })
        })
    })

}



exports.getProfile = async (req, res) => {
    console.log('coooke from frontend: ' + req.cookies['jwt']);
    const accessToken = req.cookies['jwt']
    if (accessToken === undefined || accessToken === null) {
        return res.status(401).json(helper.jsonMsgError('ACCESS_TOKEN_NOT_FOUND'));
    }
    const decodedAccessToken = jwt.decode(accessToken, {complete: true});
    const personID = decodedAccessToken.payload.id;
    console.log('#### Decoded access token: ', decodedAccessToken.payload);
    db.all('SELECT p.PersonID, p.Vorname, p.Nachname, p.Email, a.PLZ, a.Ort, a.Strasse, a.Hausnummer, z.ZahlungsartID FROM Person p LEFT JOIN Adresse a on p.AdressID = a.AdressID LEFT JOIN Zahlungsart z  on p.ZahlungsartID = z.ZahlungsartID WHERE p.PersonID = ?', [personID], async function (error, results) {
        console.log('####results: ', results);
        const profile = {
            personID: results[0].PersonID,
            vorname: results[0].Vorname,
            nachname: results[0].Nachname,
            email: results[0].Email,
            plz: results[0].PLZ,
            ort: results[0].Ort,
            strasse: results[0].Strasse,
            hausnummer: results[0].Hausnummer,
            zahlungsartID: results[0].ZahlungsartID,
        };
        console.log('profile: ', profile);
        return res.status(200).json(profile);
    });
}


exports.updateProfile = async (req, res) => {
    console.log('coooke from frontend: ' + req.cookies['jwt']);
    console.log('Update user profile data');
}

