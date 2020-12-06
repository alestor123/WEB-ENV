#!/usr/bin/env node

require('dotenv').config()
var express = require('express'),
app = express(),
path = require('path'),
JSONdb = require('simple-json-db'),
db = new JSONdb('./store.json'),
key = process.env.KEY || process.argv[3] || 'key';
chalk = require('chalk'),
argv = process.argv[2],
port = process.env.PORT || argv || 3000;
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get('/api/v1', (req, res) => {
    res.json(db.storage)
})
app.post('/api/v1', (req, res) => {
    db.set(req.body.key, req.body.value);
    console.logDate() +req.ip +(chalk.green(req.ip + ' Created : '+req.body.key + ' : ' + req.body.value ))
    res.send(req.ip +' Created : '+req.body.key + ' : ' + req.body.value )
})
app.delete('/api/:key', (req, res) => {
    db.delete(req.params.key);
    console.log(chalk.red(Date() +req.ip + ' Deleted : ' + req.params.key))
    res.send('Sucess')
})
app.put('/api/v1', (req, res) => {
    db.set(req.body.key, req.body.value);
    console.log(chalk.yellow(Date() +req.ip +'Updated : '+req.body.key + ' : ' + req.body.value) )
    res.send(Date() +req.ip +'Updated : '+req.body.key + ' : ' + req.body.value )
})
app.listen(port, () => console.log(chalk.greenBright(`Server running at ${port}`)))
