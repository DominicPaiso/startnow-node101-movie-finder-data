const express = require('express');
const app = express();
const axios = require('axios');
const url = require('url');

var domain = 'http://www.omdbapi.com';
var apikey = '&apikey=8730e0e';
var data;
var cache = { };

app.get('/', function (req, res) {
    if (req.query.i) {
        var iKey = req.query.i;
        var url = domain + '/?i=' + iKey + apikey;
        var objFound = cache[iKey];

        if (objFound) {
            res.json(objFound.data);
        }
        else {
            axios
            .get(url)
            .then(response => {
                var obj = {i: iKey, data: response.data};
                res.send(response.data);
                cache[iKey] = obj;
            })
            .catch(function (error){
                console.log(error);
            });
            return;
        }
    }
    if (req.query.t) {
        var tKey = req.query.t.replace(' ', '%20');
        var url = domain + '/?t=' + tKey + apikey;
        var objFound = cache[tKey];

        if (objFound) {
            res.json(objFound.data);
        }
        else {
            axios
            .get(url)
            .then(response => {
                var obj = {t: tKey, data: response.data};
                res.send(response.data);
                cache[tKey] = obj;
            })
            .catch(function (error) {
                console.log(error);
            });
            return;
        }
    }
});

module.exports = app;
