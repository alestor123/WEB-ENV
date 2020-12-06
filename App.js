#!/usr/bin/env node

require('dotenv').config()
var express = require('express'),
app = express(),
argv = process.argv[2],
port = process.env.PORT || argv || 3000;
