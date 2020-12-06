#!/usr/bin/env node

require('dotenv').config()
var express = require('express'),
app = express(),
chalk = require('chalk'),
argv = process.argv[2],
port = process.env.PORT || argv || 3000;
app.listen(port, () => console.log(chalk.green(`Server running at ${port}`)))
