const express = require("express");
var serviceRouter = express.Router()
const productsDao = require("../dao/productsDao.js");

const jwt = require("jsonwebtoken");
const { response } = require("express");
const jwtKey = "my_secret_key"



serviceRouter.get("/speisekarte/alle", function (req, res) {

  var productsDa = new productsDao(req.app.locals.dbConnection)
  try {
    var products = productsDa.getAllProducts();
    res.send(products).status(200)
  } catch (error) {
    return res.status(400).end()
  }
})


serviceRouter.get("/speisekarte/speiseart/:speiseartId", function (req, res) {

  var productsDa = new productsDao(req.app.locals.dbConnection)
  try {
    var products = productsDa.getSpeiseBySpeiseart(req.params.speiseartId);
    res.send(products)
  } catch (error) {
    return res.status(400).end()
  }

})


serviceRouter.get("/speisekarte/details", function (req, res) {

  var productsDa = new productsDao(req.app.locals.dbConnection)
  var param = req.query.Id
  try {
    var details = productsDa.getDetails(param)
    res.send(details)
  } catch (error) {
    return res.status(400).end()
  }

})

serviceRouter.post("/speisekarte/addItem", function (req, res) {
  var header = req.headers.token
  if (header == "null") {
    res.status(401).end()
  }
  jwt.verify(header, jwtKey, function (err, decoded) {
    if (err) {
      res.status(401).end(); 
    }
    else {
      var productsDa = new productsDao(req.app.locals.dbConnection);
      var GerichtID = req.body.produkt.GerichtID;
      var UserID = req.body.produkt.UserID;
      var menge =  productsDa.exist(GerichtID, UserID);
      if (menge != undefined) {
        menge.Menge = menge.Menge + 1
        productsDa.updateMenge(GerichtID, UserID, menge)
       
      res.status(200).send("hat geklappt");
      }
      else{
      var response = productsDa.addToSpeisekorb(GerichtID, UserID)
      res.status(200).send("hat geklappt")
      }
    }
  })
})

serviceRouter.get("/speisekorb", function (req, res) {

  var header = req.headers.token
  if (header == "null") {
    res.status(401).end()
  }
  jwt.verify(header, jwtKey, function (err, decoded) {
    if (err) {
      res.status(401).end();
    }
    else {
      var gerichteSql = []
      var productsDa = new productsDao(req.app.locals.dbConnection);
      var products = productsDa.getSpeisekorb(req.query.Id)
      products.forEach(element => {
        gerichteSql.push(productsDa.getGericht(element.GerichtID))
      });
      res.status(200).send(gerichteSql)
    }
  })
})

serviceRouter.delete("/speisekorb/deleteItem", function (req, res) {
  var header = req.headers.token
  if (header == "null") {
    res.status(401).end()
  }
  jwt.verify(header, jwtKey, function (err, decoded) {
    if (err) {
      res.status(401).end();
    }
    else {
      var productsDa = new productsDao(req.app.locals.dbConnection);
      var response = productsDa.deleteItem(req.body.id)
      return res.status(200).end()
    }
  })
})

serviceRouter.get("/bestellung/alleLieferzeiten", function (req, res) {

  var a = [];
  var tId =1;
  var stunde = 13;
  var minute = 0;
  var tmp = "";
  var date = new Date();
  var hours = date.getHours();
  var mins = date.getMinutes();
  var time = "" + hours + ":" + mins;
  console.log("Uhrzeit:",time);
  do{
      tmp = "" + stunde + ":";
      if (minute < 10 )
      tmp += "0";
      tmp += "" + minute;
      var obj = {
        'TerminID': tId++,
        'Uhrzeit': tmp, 
        'Frei': true
      };
      if (obj.Uhrzeit < time ) {
        obj.Frei = false;
      }
      a.push(obj);
      if (minute == 45 ){
        stunde++;
        minute=0;
      }
      else{
        minute += 15;
      }
     
      if (stunde == 19 && minute == 15)
      break;
  } while ( true);
  var productsDa = new productsDao(req.app.locals.dbConnection);
      var uhrzeitID = productsDa.uhrzeitFrei();
    for (let index = 0; index < uhrzeitID.length; index++) {
        if (uhrzeitID[index].TerminID != null){
          
        a[uhrzeitID[index].TerminID -1].Frei = false;
        }
    }
  res.send(a);
})

serviceRouter.post("/bestellung/addBestellung", function (req, res)
{
  
      var productsDa = new productsDao(req.app.locals.dbConnection);
      var userID = req.body.bestellung.UserID;
      var terminID = req.body.bestellung.TerminID;
      var lieferartID = req.body.bestellung.LieferartID;

      var response = productsDa.addToBestellung(userID, terminID,lieferartID)
      res.status(200).send("hat geklappt")

});

serviceRouter.get("/bestellung/zahlungsart", function (req,res)
{


  var productsDa = new productsDao(req.app.locals.dbConnection)
  var zahlungsartAllgemein = productsDa.getZahlungsart();   
  var zahlungsartUser = productsDa.getZahlungsartUser(req.query.Id);
  console.log(zahlungsartAllgemein, zahlungsartUser);

  zahlungsartUser.ZahlungsartID = 2;

      var alterWert
    for (let i = 0; i < zahlungsartAllgemein.length; i++) {
    const zahlungsart = zahlungsartAllgemein[i];
    if (zahlungsart.ZahlungsartID==zahlungsartUser.ZahlungsartID) {
      alterWert = zahlungsartAllgemein[0]
      zahlungsartAllgemein[0]= zahlungsart  
      zahlungsartAllgemein[i]= alterWert
    }
  }
  console.log(zahlungsartAllgemein);
  res.send(zahlungsartAllgemein);
  res.status(200).end()
});



serviceRouter.get("/kassenzettel", function (req, res){            


  var gerichteSql = [] 
  var productsDa = new productsDao(req.app.locals.dbConnection)

  var products = productsDa.getSpeisekorb(req.query.Id);            
  console.log(products[0].GerichtId);                             
  products.forEach(element => {
  gerichteSql.push(productsDa.getGericht(element.GerichtID));  
    
  });

  var zeit = productsDa.getZeit(req.query.Id);
  var kunde = productsDa.getKunde(req.query.Id);
  var zahlung = productsDa.getZahlungsartKassenzettel(req.query.Id);
  var bestellart = productsDa.getBestellart(req.query.Id);
   

  var gesamt = {
    "Gerichte": gerichteSql,
    "Zeit": zeit,
    "Kunde": kunde,
    "Zahlung": zahlung,
    "Bestellart": bestellart
  }
                   
  res.status(200).send(gesamt)                                         
  });


module.exports = serviceRouter;