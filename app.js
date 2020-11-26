const express = require('express')
const app = express()
const port = 3001
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./backend/db/sortiment.sqlite');
const router = express.Router();
var path = require('path');

// db.serialize(function() {

//   db.run('CREATE TABLE lorem (info TEXT)');
//   var stmt = db.prepare('INSERT INTO lorem VALUES (?)');

//   for (var i = 0; i < 10; i++) {
//     stmt.run('Ipsum ' + i);
//   }

//   stmt.finalize();

//   db.each('SELECT rowid AS id, info FROM lorem', function(err, row) {
//     console.log(row.id + ': ' + row.info);
//   });
// });

// db.close();



app.use(express.static(__dirname + '/frontend'));

app.get('/gsstore/agb', function(req, res) {
  res.sendFile(path.join(__dirname + '/frontend/agb.html'));
});
app.get('/gsstore/bestellbestaedigung', function(req, res) {
  res.sendFile(path.join(__dirname + '/frontend/Bestellbestätigung.html'));
});
app.get('/gsstore/shop/frauen', function(req, res) {
  res.sendFile(path.join(__dirname + '/frontend/frauen.html'));
});
app.get('/gsstore/impressum', function(req, res) {
  res.sendFile(path.join(__dirname + '/frontend/impressum.html'));
});
app.get('/gsstore/kader', function(req, res) {
  res.sendFile(path.join(__dirname + '/frontend/kader.html'));
});
app.get('/gsstore', function(req, res) {
  res.sendFile(path.join(__dirname + '/frontend/index.html'));
});
app.get('/gsstore/shop/kinder', function(req, res) {
  res.sendFile(path.join(__dirname + '/frontend/kinder.html'));
});
app.get('/gsstore/kontakt', function(req, res) {
  res.sendFile(path.join(__dirname + '/frontend/kontakt.html'));
});
app.get('/gsstore/login', function(req, res) {
  res.sendFile(path.join(__dirname + '/frontend/login.html'));
});
app.get('/gsstore/shop/maenner', function(req, res) {
  res.sendFile(path.join(__dirname + '/frontend/maenner.html'));
});
app.get('/gsstore/registration', function(req, res) {
  res.sendFile(path.join(__dirname + '/frontend/registration.html'));
});
app.get('/gsstore/shop', function(req, res) {
  res.sendFile(path.join(__dirname + '/frontend/shop.html'));
});
app.get('/gsstore/shop2', function(req, res) {
  res.sendFile(path.join(__dirname + '/frontend/shop2.html'));
});
app.get('/gsstore/ueberuns', function(req, res) {
  res.sendFile(path.join(__dirname + '/frontend/ueberuns.html'));
});
app.get('/gsstore/warenkorb', function(req, res) {
  res.sendFile(path.join(__dirname + '/frontend/warenkorb.html'));
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports =  router;

