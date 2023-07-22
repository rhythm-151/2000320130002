const express = require("express");

const app = express();

const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');


const bodyParser = require('body-parser');



app.use(cookieParser());

app.use(express.json());

app.use(bodyParser.json())

const companyRegistration = require("./route/companyRoute")
 app.use("/api/v1/", companyRegistration);



module.exports = app ;
