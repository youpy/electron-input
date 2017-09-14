#!/usr/bin/env electron

'use strict';

var run = require('./');
var program = require('commander');
var typeValue;

program
  .arguments('<type>')
  .option('-t, --title <title>', 'specify window title')
  .action(function(type) {
    typeValue = type;
  });

program.parse(process.argv);

if (typeof typeValue === 'undefined') {
  console.log('no type given');
  process.exit(1);
}

run(typeValue, program);
