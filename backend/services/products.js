const express = require("express");
var serviceRouter = express.Router();
const productsDao = require("../dao/productsDao.js");
const jwt = require("jsonwebtoken");
const { response } = require("express");
const jwtKey = "my_secret_key"
const helper = require("../../helper.js");


serviceRouter.get("/shop/aktuelleAngebote", function (req, res) {

  var aktuelleAngebote = new productsDao(req.app.locals.dbConnection)
  try {
    var products = aktuelleAngebote.getAktuelleAngebote();
    res.send(products).status(200)
  } catch (error) {
    return res.status(400).end()
  }
})


serviceRouter.get("/shop/kinder", function (req, res) {

  var kinder = new productsDao(req.app.locals.dbConnection)
  try {
    var products = kinder.getKinder();
    res.send(products).status(200)
  } catch (error) {
    return res.status(400).end()
  }
})

serviceRouter.get("/shop/frauen", function (req, res) {

  var frauen = new productsDao(req.app.locals.dbConnection)
  try {
    var products = frauen.getFrauen();
    res.send(products).status(200)
  } catch (error) {
    return res.status(400).end()
  }
})

serviceRouter.get("/shop/maenner", function (req, res) {

  var maenner = new productsDao(req.app.locals.dbConnection)
  try {
    var products = maenner.getMaenner();
    res.send(products).status(200)
  } catch (error) {
    return res.status(400).end()
  }
})

serviceRouter.get("/shop", function (req, res) {

  var alleArtikel = new productsDao(req.app.locals.dbConnection)
  try {
    var products = alleArtikel.getAlleArtikel();
    res.send(products).status(200)
  } catch (error) {
    return res.status(400).end()
  }
})

serviceRouter.get("/shop/gib/:id", function (req, res) {

  var selectedProduct = new productsDao(req.app.locals.dbConnection)

  try{
    var products = selectedProduct.loadById(req.params.id);
    res.send(products).status(200)
    
  }catch(error){
      console.log(error)
      return res.status(400).end()
      
     }

});

serviceRouter.post("/warenkorb", function(req, res) {
  console.log("Service Warenkorb: Client reqed creation of new record");

  var errorMsgs=[];
  if (helper.isUndefined(req.body.SortID)) 
      errorMsgs.push("SortID fehlt");

  if (helper.isUndefined(req.body.Beschreibung)) 
    errorMsgs.push("Beschreibung fehlt");

  if (helper.isUndefined(req.body.Preis))
    errorMsgs.push("Preis fehlt");

  if (helper.isUndefined(req.body.BildPfad))
    errorMsgs.push("BildPfad fehlt");

  if (errorMsgs.length > 0) {
      helper.log("Service Warenkorb: Creation not possible, data missing");
      res.status(400).json(helper.jsonMsgError("Hinzufügen nicht möglich. Fehlende Daten: " + helper.concatArray(errorMsgs)));
      return;
  }

  const productsDaoo = new productsDao(req.app.locals.dbConnection);
  try {
      var result = productsDaoo.create(req.body.SortID, req.body.Beschreibung, req.body.Preis, req.body.BildPfad);
      helper.log("Service Warenkorb: Record inserted");
      res.status(200).json(helper.jsonMsgOK(result));
  } catch (ex) {
      helper.logError("Service Warenkorb: Error creating new record. Exception occured: " + ex.message);
      res.status(400).json(helper.jsonMsgError(ex.message));
  }    
});





  

module.exports = serviceRouter;