#!/usr/bin/env node

require('dotenv').config()
var express = require('express'),
app = express(),
path = require('path'),
fs = require('fs'),
JSONdb = require('simple-json-db'),
db = new JSONdb('./store.json'),
store = JSON.stringify(db.storage),
key = process.env.KEY || process.argv[3] || 'key';
chalk = require('chalk'),
argv = process.argv[2],
pkg = require('./package.json'),
port = process.env.PORT || argv || 3000;
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
updateEnv()
app.get('/api', (req, res) => {
    res.json(db.storage)
})
app.get('/github', (req, res) => {
    res.redirect(pkg.homepage)
})
app.post('/api/v1', (req, res) => {
    db.set(req.body.key, req.body.value);
    console.log(chalk.green(Date() + req.ip + ' Created : '+req.body.key + ' : ' + req.body.value ))
    res.send(req.ip +' Created : '+req.body.key + ' : ' + req.body.value )
    updateEnv()
})
app.delete('/api/:key', (req, res) => {
    res.header('"Content-Type": "application/json;charset=utf-8 ')
    db.delete(req.params.key);
    console.log(chalk.red(Date() +req.ip + ' Deleted : ' + req.params.key))
    res.send('Sucess')
    updateEnv()

}
)
app.put('/api/v1', (req, res) => {
    if(req.body.authKey==key){
    db.set(req.body.key, req.body.value);
    console.log(chalk.yellow(Date() +req.ip +'Updated : '+req.body.key + ' : ' + req.body.value) )
    res.send(Date() +req.ip +'Updated : '+req.body.key + ' : ' + req.body.value )
    updateEnv()
    }
    else{
        authErr(res,req)
    }    
    })
    
    
app.listen(port, () => console.log(chalk.greenBright(`Server running at ${port}`)))
function updateEnv(){
store = JSON.stringify(db.storage)
        fs.writeFile('./.env', store.replace(/{|}|"/g,'').replace(/:|"/g,'=').replace(/,/g,'\n'), (err) => {
            if (err) throw err;
            console.log(chalk.green(Date()+'Updated Env!'));
          });

        }
    function authErr(res,req){
    res.status(401).send('Auth Error')
        console.log(chalk.red(Date() + ':' + req.ip + ' Auth Error 401'))
}
