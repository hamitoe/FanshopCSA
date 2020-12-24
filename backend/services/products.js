const express = require("express");
var serviceRouter = express.Router();

const productsDao = require("../dao/productsDao.js");

const jwt = require("jsonwebtoken");
const { response } = require("express");
const jwtKey = "my_secret_key"



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

// serviceRouter.get("/produkt/gib/:sortID", function(req, res) {
//   helper.log("Service Produkt: Client reqed one record, sortID=" + req.params.sortID);

//   const produktDao = new productsDao(req.app.locals.dbConnection);
//   try {
//       var result = produktDao.loadById(req.params.sortID);
//       helper.log("Service Produkt: Record loaded");
//       res.status(200).json(helper.jsonMsgOK(result));
//   } catch (ex) {
//       helper.logError("Service Produkt: Error loading record by sortID. Exception occured: " + ex.message);
//       res.status(400).json(helper.jsonMsgError(ex.message));
//   }
// });

// serviceRouter.get("/shop/gib/:id", function(req, res) {
//   helper.log("Service Product: Client reqed one record, id=" + req.params.id);

//   const produktDao = new productsDao(req.app.locals.dbConnection);
//   try {
//       var result = produktDao.loadById(req.params.id);
//       helper.log("Service Product: Record loaded");
//       res.status(200).json(helper.jsonMsgOK(result));
//   } catch (ex) {
//       helper.logError("Exception occured: " + ex.message);
//       res.status(400).json(helper.jsonMsgError(ex.message));
//   }
// });



// serviceRouter.get("/produkt/gib/sortID", function(req,res){

//   var loadID = new productsDao(req.app.locals.dbConnection);
//   try {
//     var products = loadID.loadById(req.params.sortID);
//     res.send(products).status(200)
    
//   } catch (error) {
//     return res.status(400).end
    
//   }


// });



  

module.exports = serviceRouter;