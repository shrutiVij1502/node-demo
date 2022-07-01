var express = require('express');
var app = express();
app.get('/will', function (req, res) {
    res.send('{ "response": "Hello World1" }');
});
app.get('/ready', function (req, res) {
    res.send('{ "response": "It works!" }');
});
app.listen(process.env.PORT || 3000);
module.exports = app;
