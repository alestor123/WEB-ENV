#!/usr/bin/env node

require('dotenv').config()
var express = require('express'),
app = express(),
JSONdb = require('simple-json-db'),
db = new JSONdb('./store.json'),
chalk = require('chalk'),
argv = process.argv[2],
port = process.env.PORT || argv || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post('/api/v1', (req, res) => {
    db.set(req.body.key, req.body.value);
    console.log('Created : '+req.body.key + ' : ' + req.body.value )
    res.send('Created : '+req.body.key + ' : ' + req.body.value )
})
app.delete('/api/:key', (req, res) => {
    db.delete(req.params.key);
    console.log('Deleted : ' + req.params.key)
    res.send('Sucess')
})
app.listen(port, () => console.log(chalk.green(`Server running at ${port}`)))
