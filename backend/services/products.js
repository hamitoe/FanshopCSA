

const helper = require("../helper.js");
const express = require("express");
var serviceRouter = express.Router()
const usersDao = require("../dao/usersDao.js");


serviceRouter.get("/sortiment", function (req, res) {

  var sortiment = new usersDao(req.app.locals.dbConnection)
  try {
    var products = sortiment.getSortiment();
    res.send(products).status(200)
  } catch (error) {
    return res.status(400).end()
  }
});

serviceRouter.post("/insert", function (request, response) {
  helper.log("Service Land: Client requested creation of new record");

  var errorMsgs = [];
  if (helper.isUndefined(request.body.Vorname))
    errorMsgs.push("Vorname fehlt");
  if (helper.isUndefined(request.body.Nachname))
    errorMsgs.push("Nachname fehlt");
  if (helper.isUndefined(request.body.AdressID))
    errorMsgs.push("AdressID fehlt");
  if (helper.isUndefined(request.body.Email))
    errorMsgs.push("Email fehlt");
  if (helper.isUndefined(request.body.Passwort))
    errorMsgs.push("Passwort fehlt");


  if (errorMsgs.length > 0) {
    helper.log("Service Land: Creation not possible, data missing");
    response.status(400).json(helper.jsonMsgError("Hinzufügen nicht möglich. Fehlende Daten: " + helper.concatArray(errorMsgs)));
    return;
  }


  const landDao = new usersDao(request.app.locals.dbConnection);
  try {
    var result = landDao.create(req.body.Vorname, req.body.Nachname, req.body.AdressID, req.body.Email, req.body.Passwort);
    helper.log("Service Land: Record inserted");
    response.status(200).json(helper.jsonMsgOK(result));
  } catch (ex) {
    helper.logError("Service Land: Error creating new record. Exception occured: " + ex.message);
    response.status(400).json(helper.jsonMsgError(ex.message));
  }
});




module.exports = serviceRouter;