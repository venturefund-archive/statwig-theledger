var express = require("express");
var authRouter = require("./auth");
var queryRouter = require("./inventory")
var app = express();

app.use("/auth/", authRouter);
app.use("/inventory",queryRouter);

module.exports = app;
