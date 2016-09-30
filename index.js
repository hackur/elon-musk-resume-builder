'use strict';
const {
	app,
	BrowserWindow,
	crashReporter
} = require('electron')
const fs = require('fs')

// report crashes to the Electron project
crashReporter.start({
	productName: 'elon-musk-resume-builder',
	companyName: 'JeremySarda.com',
	submitURL: 'https://resume.jeremysarda.com/crash-report',
	autoSubmit: true
});

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

var indexFile = `${__dirname}/index.html`;

if (process.env['NODE_ENV'] == 'dev') {
	indexFile = "http://localhost:9999";
}

// prevent window being garbage collected
let mainWindow;

function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
	mainWindow = null;
}

function createMainWindow() {
	const win = new BrowserWindow({
		width: 850,
		height: 1100,
		minWidth: 425,
		minHeight: 550,
		titleBarStyle: 'hidden-inset'
	});

	if (process.env['NODE_ENV'] == 'dev') {
		// we need to wait until browsersync is ready
		setTimeout(function() {
			win.loadURL(indexFile);
		}, 5000);
	} else {
		win.loadURL(`file:${indexFile}`);
	}

	win.on('closed', onClosed);

	// Only works on OS X
	win.setAspectRatio(8.5 / 11, []);

	return win;
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate-with-no-open-windows', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {
	mainWindow = createMainWindow();
});
