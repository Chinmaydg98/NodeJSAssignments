const express = require("express");

const app = express();

//PART A
app.use('/middlewareA', (req, res, next) => {
    console.log("Reached Middleware-A");
    next();
});

app.use('/middlewareA', (req, res, next) => {
    console.log("Reached Middleware-B");
    next();
});

app.use('/middlewareA', (req, res, next) => {
    console.log("Reached Middleware-C");
    res.send('<h1>Reached end of middleware</h1>');
});

//PART B
app.use('/routeA', (req, res, next) =>{
    res.send('This is Route A<br><a href="/routeB">Route B</a><br><a href="/routeC">Route C</a><br><a href="/">Home</a>');
});

app.use('/routeB', (req, res, next) =>{
    res.send('<a href="/routeA">Route A</a><br>This is Route B<br><a href="/routeC">Route C</a><br><a href="/">Home</a>');
});

app.use('/routeC', (req, res, next) =>{
    res.send('<a href="/routeA">Route A</a><br><a href="/routeB">Route B</a><br>This is Route C<br><a href="/">Home</a>');
});

app.use('/', (req, res, next) => {
    res.send('<a href="/routeA">Route A</a><br><a href="/routeB">Route B</a><br><a href="/routeC">Route C</a>');
})

app.listen(8080);