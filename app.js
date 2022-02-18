const http = require('http');

const express = require("express")

const app = express();

app.use((req, res, next) => {
    console.log("Middleware 1");
    next();
});

app.use((req, res, next) => {
    console.log("Middleware 2");
    res.status(404);
});

http.createServer(app).listen(8000);
