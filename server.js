/////////////////
// workaround / bugfix for linux systems
Object.fromEntries = l => l.reduce((a, [k,v]) => ({...a, [k]: v}), {})
/////////////////
var cors = require('cors');
require('dotenv').config();
var cookieParser = require('cookie-parser');
const helper = require("./helper.js");
const auth = require("./Backend/services/auth");
helper.log("Starting server...");

try {
    // connect database
    helper.log("Connect database...");
    const Database = require("better-sqlite3");
    const dbOptions = { verbose: console.log };
    const dbFile = "./backend/db/sortiment.sqlite";
    const dbConnection = new Database(dbFile, dbOptions);

    // create server
    helper.log("Creating Web Server...");
    const HTTP_PORT = 7000;
    var express = require("express");
    var app = express();
    app.use(cors())    
    app.use(function(req, res, next) {  
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
   });

   app.use(express.static('./frontend'));
   app.use(cookieParser());

    // provide service router with database connection / store the database connection in global server environment
    helper.log("Setup Web Server...");
    app.locals.dbConnection = dbConnection; 


    // setup server for post data
    const bodyParser = require("body-parser");
    app.use(bodyParser.urlencoded({ extended: true}));
    app.use(bodyParser.json());
    app.use(function(request, response, next){
        response.setHeader("Access-Control-Allow-Origin", "*"); 
        response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    // start server
    app.listen(HTTP_PORT, () => {
        helper.log("Start Web Server...");
        helper.log("Server running at localhost on port %PORT%".replace("%PORT%", HTTP_PORT));
        helper.log("\n\n-----------------------------------------");
        helper.log("exit / stop Server by pressing 2 x CTRL-C");
        helper.log("-----------------------------------------\n\n");
    });

    // define endpoints for services
    console.log("Binding enpoints...");

    // bind root endpoint
    app.get("/", (request, response) => {
        helper.log("Server called without any specification");
        response.status(200).json(helper.jsonMsg("Server API arbeitet an Port " + HTTP_PORT));
    });

    app.post("/login", auth.login);
    app.post("/register", auth.register);
    app.get("/profile", auth.getProfile);
    app.put("/profile", auth.updateProfile);

    // bind services endpoints
    const TOPLEVELPATH = "/";
    
    var serviceRouter = require("./backend/services/products.js");
    
    
    app.use(TOPLEVELPATH, serviceRouter);
    

     
} catch (ex) {
    helper.logError(ex);
}