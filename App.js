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
pathtoEnv = process.argv[4] || process.argv.PATH || './.env',
chalk = require('chalk'),
argv = process.argv[2],
pck = require('./package.json'),
port = process.env.PORT || argv || 3000;
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
if(argv== '-v' ||argv == '--version'){
    console.log( `${pck.version}`)
  process.exit(1);
}
else if (argv =='-h'|| argv == '--help') { // checking undifined args
    console.log(`
    Usage: ${pck.name} <Port> <Key>
`);
}
else if (argv =='-i'|| argv == '--issue') { // checking undifined args
  console.log(`
  Issues at ${pck.bugs.url} 
`);
}

else if (argv =='-a'|| argv == '--author') { // checking undifined args
  console.log(`
  Author: ${pck.author} 
`);
}

else if (argv =='-d'|| argv == '--docs') { // checking undifined args
  console.log(`
  Docs at ${pck.homepage} 
`);}
else{
updateEnv()
console.log(chalk.greenBright(`Key : ${key}`))
app.listen(port, () => console.log(chalk.greenBright(`Server running at ${port}`)))
}
app.get('/api', (req, res) => {
    res.json(db.storage)
})
app.get('/github', (req, res) => {
    res.redirect(pck.homepage)
})
app.post('/api/v1', (req, res) => {
  if(store.includes(req.body.key)) {
    res.status(409).send('Already Exist')
  
  } 
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
    
    
function updateEnv(){
store = JSON.stringify(db.storage)
        fs.writeFile(pathtoEnv, store.replace(/{|}|"/g,'').replace(/:|"/g,'=').replace(/,/g,'\n'), (err) => {
            if (err) throw err;
            console.log(chalk.green(Date()+'Updated Env!'));
          });

        }
    function authErr(res,req){
    res.status(401).send('Auth Error')
        console.log(chalk.red(Date() + ':' + req.ip + ' Auth Error 401'))
}
