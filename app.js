const express = require('express')
const app = express()
const port = 3001
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const path = require("path");
const cookieParser = require('cookie-parser');

const Database = require("better-sqlite3");
const dbOptions = { verbose: console.log };

const dbFile = "./backend/db/sortiment.sqlite";
const dbConnection = new Database(dbFile, dbOptions);

app.locals.dbConnection = dbConnection;
const publicDirectory = path.join(__dirname, './frontend');
app.use(express.static(publicDirectory));

app.set('views', path.join(__dirname, './frontend'));
app.set('view engine', 'hbs');
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(function (request, response, next) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  response.setHeader("Access-Control-Allow-Headers", "*");
  next();
});
// Parse URL-Encoded bodies (as sent by HTML Forms)
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());

// Define Routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'))


const TOPLEVELPATH = "/gs";
var serviceRouter = require("./backend/services/products.js");
app.use(TOPLEVELPATH, serviceRouter);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = router;

