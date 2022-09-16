const express=require("express");
const morgan=require("morgan");

const app=express();
app.use(express.json());
app.use(morgan('dev'));


// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    // Pass to next layer of middleware
    next();
});

app.use(require("../routes/index"));
app.use(require("../Users/AdminPlatfom"));
app.use(require("../Users/AdminSys"));
app.use(require("../Users/Auxiliar"));
app.use(require("../Users/Inspector"));


module.exports=app;
