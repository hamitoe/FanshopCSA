const express = require("express");
var serviceRouter = express.Router()
const productsDao = require("../dao/productsDao.js");





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



  

module.exports = serviceRouter;