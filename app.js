const express = require('express')
const app = express()
const port = 3001
const router = express.Router();

const Database = require("better-sqlite3");
const dbOptions = { verbose: console.log };

const dbFile = "./backend/db/sortiment.sqlite";
const dbConnection = new Database(dbFile, dbOptions);

app.locals.dbConnection = dbConnection; 



const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(function(request, response, next){
  response.setHeader("Access-Control-Allow-Origin", "*"); 
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  response.setHeader("Access-Control-Allow-Headers", "*");
  next();
});
// db.serialize(function() {

//  db.run('CREATE TABLE lorem (info TEXT)');

//  var stmt = db.prepare('INSERT INTO lorem VALUES (?)');

//  for (var i = 0; i < 10; i++) {

//   stmt.run('Ipsum ' + i);

//  }

//  stmt.finalize();



//  db.each('SELECT rowid AS id, info FROM lorem', function(err, row) {

//   console.log(row.id + ': ' + row.info);

//  });

// });



//db.close();



const TOPLEVELPATH = "/gs";
var serviceRouter = require("./backend/services/products.js");
app.use(TOPLEVELPATH, serviceRouter);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports =  router;

