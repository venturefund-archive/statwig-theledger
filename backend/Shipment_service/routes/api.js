var express = require("express");
var authRouter = require("./Shipment");

var app = express();

app.use("/Shipment/", authRouter);

module.exports = app;