'use strict';

var electron = require('electron');
var app = electron.app;
var ipcMain = electron.ipcMain;
var BrowserWindow = electron.BrowserWindow;

var inputTypes = {
  range: {
    width: 200,
    height: 100,
    eventNames: ['change', 'input']
  },
  color: {
    width: 250,
    height: 70,
    eventNames: ['change']
  }
};

var log = (type, data) => {
  console.log('event[' + type + ']: ' + JSON.stringify(data));
}


var run = (type, program) => {
  var title = program.title || type;
  var win = null;
  var inputTypeName = type;
  var inputType = inputTypes[inputTypeName];

  if (typeof inputType === 'undefined') {
    log('error', { message: 'unknown type: ' + inputTypeName });
    app.quit();
    return;
  }

  app.on('window-all-closed', function() {
    app.quit();
  });

  var onReady = function() {
    win = new BrowserWindow({
      width: inputType.width,
      height: inputType.height
    });
    win.loadURL('file://' + __dirname + '/html/' + inputTypeName + '.html');
    win.setTitle(title);

    win.on('closed', function() {
      log('closed', {});
    });

    inputType.eventNames.forEach(eventName => {
      ipcMain.on(eventName, (event, arg) => {
        log(eventName, { value: arg });
      });
    });
  };

  if (app.isReady()) {
    onReady();
  } else {
    app.on('ready', onReady);
  }
};

module.exports = run;
