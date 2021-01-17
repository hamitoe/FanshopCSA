
const { existsSync } = require('fs');
const path = require('path');
const util = require('util');

// DB-Connection
const express = require('express');
const app = express();
const Database = require("better-sqlite3");
const dbOptions = { verbose: console.log };

const dbFile = "./Backend/db/sortiment.sqlite";
const dbConnection = new Database(dbFile, dbOptions);
app.locals.dbConnection = dbConnection;
const sqlite = require('sqlite3').verbose()
let db = new sqlite.Database(dbFile)
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const helper = require('../../helper');

exports.getPaymentOptions = async (req, res) => {
    const accessToken = req.cookies['jwt']
    if (accessToken === undefined || accessToken === null) {
        return res.status(401).json(helper.jsonMsgError('ACCESS_TOKEN_NOT_FOUND'));
    }
    db.all('SELECT * FROM Zahlungsart', [], async function (error, results) {
        if (error !== undefined) {
            console.log(error);
        }
        const paymentOptions = [];        
        results.forEach((result) => {
            paymentOptions.push({
                id: result.ZahlungsartID,
                name: result.Bezeichnung,
            });
        })
        console.log('results: ', paymentOptions);
        return res.status(200).json(paymentOptions);
    });
}

exports.getProfile = async (req, res) => {
    const accessToken = req.cookies['jwt']
    if (accessToken === undefined || accessToken === null) {
        return res.status(401).json(helper.jsonMsgError('ACCESS_TOKEN_NOT_FOUND'));
    }
    const decodedAccessToken = jwt.decode(accessToken, {complete: true});
    const personID = decodedAccessToken.payload.id;
    db.all('SELECT p.PersonID, p.Vorname, p.Nachname, p.Email, a.PLZ, a.Ort, a.Strasse, a.Hausnummer, z.ZahlungsartID FROM Person p LEFT JOIN Adresse a on p.AdressID = a.AdressID LEFT JOIN Zahlungsart z  on p.ZahlungsartID = z.ZahlungsartID WHERE p.PersonID = ?', [personID], async function (error, results) {
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
        return res.status(200).json(profile);
    });
}

exports.updatePaymentOption = async(req, res) => {
    const accessToken = req.cookies['jwt']
    if (accessToken === undefined || accessToken === null) {
        return res.status(401).json(helper.jsonMsgError('ACCESS_TOKEN_NOT_FOUND'));
    }
    const { paymentOption } = req.body;
    const decodedAccessToken = jwt.decode(accessToken, {complete: true});
    const personID = decodedAccessToken.payload.id;
    db.run('UPDATE Person SET ZahlungsartID=? where PersonID=?', [paymentOption, personID], (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json(helper.jsonMsgError('UPDATE_PAYMENT_OPTION_FAILED'));
        } else {
            return res.status(200).json();
        }
    })
}

exports.updateUserData = async (req, res) => {
    console.log('### updateUserData');
    const accessToken = req.cookies['jwt']
    if (accessToken === undefined || accessToken === null) {
        return res.status(401).json(helper.jsonMsgError('ACCESS_TOKEN_NOT_FOUND'));
    }
    const { vorname, nachname, email } = req.body;
    const decodedAccessToken = jwt.decode(accessToken, {complete: true});
    const personID = decodedAccessToken.payload.id;
    db.run('UPDATE Person SET Vorname=?, Nachname=?, Email=? where PersonID=?', [vorname, nachname, email, personID], (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json(helper.jsonMsgError('UPDATE_USER_DATA_FAILED'));
        } else {
            return res.status(200).json();
        }
    })
}

exports.updateUserAddress = async (req, res) => {
    console.log('### updateUserAddress');
    const accessToken = req.cookies['jwt']
    if (accessToken === undefined || accessToken === null) {
        return res.status(401).json(helper.jsonMsgError('ACCESS_TOKEN_NOT_FOUND'));
    }
    const { strasse, hausnummer, plz, ort } = req.body;
    const decodedAccessToken = jwt.decode(accessToken, {complete: true});
    const personID = decodedAccessToken.payload.id;

    db.get('SELECT AdressID FROM Person where PersonID=?', [personID], async function(error, row) {
        if (error) {
            console.log(error);
            return res.status(500).json(helper.jsonMsgError('CANNOT_FIND_USER_ADDRESS'));
        }
        db.run('UPDATE Adresse SET strasse=?, hausnummer=?, plz=?, ort=? where AdressID=?', [strasse, hausnummer, plz, ort, row.AdressID], (error2) => {
            if (error2) {
                console.log(error2);
                return res.status(500).json(helper.jsonMsgError('UPDATE_USER_ADDRESS_FAILED'));
            } else {
                return res.status(200).json();
            }
        });
    });
}

exports.updatePassword = async (req, res) => {
    console.log('### updatePassword');
    const accessToken = req.cookies['jwt']
    if (accessToken === undefined || accessToken === null) {
        return res.status(401).json(helper.jsonMsgError('ACCESS_TOKEN_NOT_FOUND'));
    }
    const { passwort } = req.body;
    const decodedAccessToken = jwt.decode(accessToken, {complete: true});
    const personID = decodedAccessToken.payload.id;
    let hashedPassword = await bcrypt.hash(passwort, 8);

    db.run('UPDATE Person SET Passwort=? where PersonID=?', [hashedPassword, personID], (error) => {
        if (error) {
            console.log(error);
            return res.status(500).json(helper.jsonMsgError('UPDATE_PASSWORD_FAILED'));
        } else {
            return res.status(200).json();
        }
    });
}