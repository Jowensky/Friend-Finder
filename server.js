// NPM Package
var express = require("express");
// Creating "express" server
var app = express();

var path = require("path");

var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

app.listen(PORT, function() {
    console.log(`App listening on PORT: ${PORT}`)
});