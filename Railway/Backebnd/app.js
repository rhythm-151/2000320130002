const express = require("express");

const app = express();

const cookieParser = require("cookie-parser");



const bodyParser = require('body-parser');



app.use(cookieParser());

app.use(express.json());

app.use(bodyParser.json())

const userRegistration = require("./routes/userRegistration");
 app.use("/api/v1/", userRegistration);



module.exports = app ;
