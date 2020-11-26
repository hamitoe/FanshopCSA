

const express = require("express");
var serviceRouter = express.Router()
const usersDao = require("../dao/usersDao.js");

const jwt = require("jsonwebtoken");
const { timers } = require("jquery");
const jwtKey = "my_secret_key"
const jwtExpirySeconds = 20000

function setToken(username) {

  const token = jwt.sign({ username }, jwtKey, {
    algorithm: "HS256",
    expiresIn: jwtExpirySeconds,
  })
  return token

}
serviceRouter.get("/profile", function(req, res){
  var header = req.headers.token
  if (header == "null") {
    res.status(401).end()
  }
  jwt.verify(header, jwtKey, function (err, decoded) {
    if (err) {
      res.status(401).end();
    }
    else{
      var usersDa = new usersDao(req.app.locals.dbConnection);
      var userInformation = usersDa.getProfile(req.query.Id);
      res.status(200).send(userInformation);
    }

  })
})

serviceRouter.post("/updateProfil",function(req,res){

    var userID = req.body.user.UserID;
    var name = req.body.user.Name;
    var lastname = req.body.user.Nachname;
    var nickname = req.body.user.Nutzername;
    var email = req.body.user.Email;
    var street = req.body.user.Strasse;
    var housenumber = req.body.user.Hausnummer;
    var postcode = req.body.user.PLZ;
    var city = req.body.user.Ort;
    var paytype = req.body.user.Zahlungsart;
  
    if (userID == undefined) {
      res.status(401).end()
    } else {
      var usersDa = new usersDao(req.app.locals.dbConnection);
    usersDa.updateProfileInformationDao(userID,name,lastname,nickname,email,street,housenumber,postcode,city,paytype);
    res.status(200).send("Profilinformationen erfolgreich geändert!")
  }
  })
  
  serviceRouter.post("/updatePassword",function(req,res){
    var usersDa = new usersDao(req.app.locals.dbConnection);
    var userID = req.body.user.UserID;
    var password = req.body.user.Passwort;
  
    if (userID == undefined) {
      res.status(401).end()
    } else {
    usersDa.updatePasswordDao(userID,password);
    res.status(200).send("Passwort geändert!") 
  }
  
  
  })
  

serviceRouter.post("/login", function (req, res) {
  var usersDa = new usersDao(req.app.locals.dbConnection);
  var rowID = usersDa.userLogIn(req.body.nutzer.Email, req.body.nutzer.Password)
  if (rowID == undefined) {
    res.status(401).end()
  } else {
    var token = setToken(req.body.rowID)
    console.log("token von Login:", token)

    var user = {
      result: token,
      rowid: rowID
    }
    res.send(user).status(200).end()

  }


})


serviceRouter.get("/loggedIn", function (req, res) {
  var header = req.headers.token
  if (header == "null") {
    res.status(401).end()
  }
  jwt.verify(header, jwtKey, function (err, decoded) {
    if (err) {
      res.status(401).end();
    }
    else {
      var usersDa = new usersDao(req.app.locals.dbConnection);
      console.log(req.query.Id)
      var rowID = usersDa.userLogged(req.query.Id)
      if (rowID!= undefined) {
        res.status(200).end();  
      }
      else{
        res.status(401).end();
      }
      
    }
  })
})

serviceRouter.get("/dropdown", function(req,res){
  var usersDa = new usersDao(req.app.locals.dbConnection);
  var drops = usersDa.getDropdown()
  res.send(drops)
  res.status(200).end()
})


serviceRouter.post("/registrieren", function (req, res) {
  var usersDa = new usersDao(req.app.locals.dbConnection);
  var rowID = usersDa.insert(req.body.nutzer.Vorname, req.body.nutzer.Nachname,
    req.body.nutzer.Nutzername, req.body.nutzer.Email, req.body.nutzer.Passwort, req.body.nutzer.Straße,
    req.body.nutzer.Hausnummer, req.body.nutzer.Postleitzahl, req.body.nutzer.Wohnort,
    req.body.nutzer.Zahlungsart)
  if (rowID > 0) {
    var tok = setToken(req.body.nutzer.Vorname)
    res.status(200).send({ rowID: rowID, token: tok })
  }
  else {
    return res.status(400).end()
  }

})





module.exports = serviceRouter;