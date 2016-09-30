/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	onload = () => {
	
		const fs = __webpack_require__(1);
	
		const webview = document.getElementById('resume-document');
		const indicator = document.querySelector('.indicator');
		const webContents = webview.getWebContents();
	
		const loadstart = () => {
			indicator.innerText = 'Loading Resume...';
		};
	
		const loadstop = () => {
			indicator.innerText = '';
	
			// TODO: Insert / Enable PDF Download Button
	
			downloadResumePDF();
	
			console.log("Resume Loaded!");
		};
	
		const downloadResumePDF = () => {
	
			webContents.printToPDF({
				marginsType: 1,
				printBackground: true,
				pageSize: 'Letter',
				printSelectionOnly: false,
				landscape: false
			}, (error, data) => {
				if (error) throw error;
				fs.writeFile('resume_' + getDateTime() + '.pdf', data, error => {
					if (error) throw error;
					console.log('Write PDF successfully.');
	
					// TODO:
				});
			});
	
			webContents.session.on('will-download', (event, item, webContents) => {
	
				// // Set the save path, making Electron not to prompt a save dialog.
				// item.setSavePath('/tmp/save.pdf')
	
				item.on('updated', (event, state) => {
					if (state === 'interrupted') {
						console.log('Download is interrupted but can be resumed');
					} else if (state === 'progressing') {
						if (item.isPaused()) {
							console.log('Download is paused');
						} else {
							console.log(`Received bytes: ${ item.getReceivedBytes() }`);
						}
					}
				});
				item.once('done', (event, state) => {
					if (state === 'completed') {
						console.log('Download successfully');
					} else {
						console.log(`Download failed: ${ state }`);
					}
				});
			});
	
			webview.addEventListener('did-start-loading', loadstart);
			webview.addEventListener('did-stop-loading', loadstop);
		};
	};
	
	const getDateTime = () => {
		var now = new Date();
		var year = now.getFullYear();
		var month = now.getMonth() + 1;
		var day = now.getDate();
		var hour = now.getHours();
		var minute = now.getMinutes();
		var second = now.getSeconds();
		if (month.toString().length == 1) {
			var month = '0' + month;
		}
		if (day.toString().length == 1) {
			var day = '0' + day;
		}
		if (hour.toString().length == 1) {
			var hour = '0' + hour;
		}
		if (minute.toString().length == 1) {
			var minute = '0' + minute;
		}
		if (second.toString().length == 1) {
			var second = '0' + second;
		}
		var dateTime = year + '-' + month + '-' + day + '_' + hour + '-' + minute + '-' + second;
		return dateTime;
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOGQ3OTcwMmFhYzMxNzRmNWVhZDEiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZnNcIiJdLCJuYW1lcyI6WyJvbmxvYWQiLCJmcyIsInJlcXVpcmUiLCJ3ZWJ2aWV3IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImluZGljYXRvciIsInF1ZXJ5U2VsZWN0b3IiLCJ3ZWJDb250ZW50cyIsImdldFdlYkNvbnRlbnRzIiwibG9hZHN0YXJ0IiwiaW5uZXJUZXh0IiwibG9hZHN0b3AiLCJkb3dubG9hZFJlc3VtZVBERiIsImNvbnNvbGUiLCJsb2ciLCJwcmludFRvUERGIiwibWFyZ2luc1R5cGUiLCJwcmludEJhY2tncm91bmQiLCJwYWdlU2l6ZSIsInByaW50U2VsZWN0aW9uT25seSIsImxhbmRzY2FwZSIsImVycm9yIiwiZGF0YSIsIndyaXRlRmlsZSIsImdldERhdGVUaW1lIiwic2Vzc2lvbiIsIm9uIiwiZXZlbnQiLCJpdGVtIiwic3RhdGUiLCJpc1BhdXNlZCIsImdldFJlY2VpdmVkQnl0ZXMiLCJvbmNlIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm5vdyIsIkRhdGUiLCJ5ZWFyIiwiZ2V0RnVsbFllYXIiLCJtb250aCIsImdldE1vbnRoIiwiZGF5IiwiZ2V0RGF0ZSIsImhvdXIiLCJnZXRIb3VycyIsIm1pbnV0ZSIsImdldE1pbnV0ZXMiLCJzZWNvbmQiLCJnZXRTZWNvbmRzIiwidG9TdHJpbmciLCJsZW5ndGgiLCJkYXRlVGltZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0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QUNBO0FBQ0QsTUFBSUUsSUFBSVEsUUFBSixHQUFlQyxNQUFmLElBQXlCLENBQTdCLEVBQWdDO0FBQy9CLE9BQUlULE1BQU0sTUFBTUEsR0FBaEI7QUFDQTtBQUNELE1BQUlFLEtBQUtNLFFBQUwsR0FBZ0JDLE1BQWhCLElBQTBCLENBQTlCLEVBQWlDO0FBQ2hDLE9BQUlQLE9BQU8sTUFBTUEsSUFBakI7QUFDQTtBQUNELE1BQUlFLE9BQU9JLFFBQVAsR0FBa0JDLE1BQWxCLElBQTRCLENBQWhDLEVBQW1DO0FBQ2xDLE9BQUlMLFNBQVMsTUFBTUEsTUFBbkI7QUFDQTtBQUNELE1BQUlFLE9BQU9FLFFBQVAsR0FBa0JDLE1BQWxCLElBQTRCLENBQWhDLEVBQW1DO0FBQ2xDLE9BQUlILFNBQVMsTUFBTUEsTUFBbkI7QUFDQTtBQUNELE1BQUlJLFdBQVdkLE9BQU8sR0FBUCxHQUFhRSxLQUFiLEdBQXFCLEdBQXJCLEdBQTJCRSxHQUEzQixHQUFpQyxHQUFqQyxHQUF1Q0UsSUFBdkMsR0FBOEMsR0FBOUMsR0FBb0RFLE1BQXBELEdBQTZELEdBQTdELEdBQW1FRSxNQUFsRjtBQUNBLFNBQU9JLFFBQVA7QUFDQSxFQXpCRCxDOzs7Ozs7QUN4RUEsZ0MiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgOGQ3OTcwMmFhYzMxNzRmNWVhZDFcbiAqKi8iLCJvbmxvYWQgPSAoKSA9PiB7XG5cblx0Y29uc3QgZnMgPSByZXF1aXJlKCdmcycpXG5cblx0Y29uc3Qgd2VidmlldyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN1bWUtZG9jdW1lbnQnKVxuXHRjb25zdCBpbmRpY2F0b3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5kaWNhdG9yJylcblx0Y29uc3Qgd2ViQ29udGVudHMgPSB3ZWJ2aWV3LmdldFdlYkNvbnRlbnRzKClcblxuXHRjb25zdCBsb2Fkc3RhcnQgPSAoKSA9PiB7XG5cdFx0aW5kaWNhdG9yLmlubmVyVGV4dCA9ICdMb2FkaW5nIFJlc3VtZS4uLidcblx0fVxuXG5cdGNvbnN0IGxvYWRzdG9wID0gKCkgPT4ge1xuXHRcdGluZGljYXRvci5pbm5lclRleHQgPSAnJ1xuXG5cdFx0Ly8gVE9ETzogSW5zZXJ0IC8gRW5hYmxlIFBERiBEb3dubG9hZCBCdXR0b25cblxuICAgICAgICBkb3dubG9hZFJlc3VtZVBERigpO1xuXG5cdFx0Y29uc29sZS5sb2coXCJSZXN1bWUgTG9hZGVkIVwiKVxuXHR9XG5cblx0Y29uc3QgZG93bmxvYWRSZXN1bWVQREYgPSAoKSA9PiB7XG5cblx0XHR3ZWJDb250ZW50cy5wcmludFRvUERGKHtcblx0XHRcdG1hcmdpbnNUeXBlOiAxLFxuXHRcdFx0cHJpbnRCYWNrZ3JvdW5kOiB0cnVlLFxuXHRcdFx0cGFnZVNpemU6ICdMZXR0ZXInLFxuXHRcdFx0cHJpbnRTZWxlY3Rpb25Pbmx5OiBmYWxzZSxcblx0XHRcdGxhbmRzY2FwZTogZmFsc2Vcblx0XHR9LCAoZXJyb3IsIGRhdGEpID0+IHtcblx0XHRcdGlmIChlcnJvcikgdGhyb3cgZXJyb3Jcblx0XHRcdGZzLndyaXRlRmlsZSgncmVzdW1lXycgKyBnZXREYXRlVGltZSgpICsgJy5wZGYnLCBkYXRhLCAoZXJyb3IpID0+IHtcblx0XHRcdFx0aWYgKGVycm9yKSB0aHJvdyBlcnJvclxuXHRcdFx0XHRjb25zb2xlLmxvZygnV3JpdGUgUERGIHN1Y2Nlc3NmdWxseS4nKVxuXG5cdFx0XHRcdC8vIFRPRE86XG5cblx0XHRcdH0pXG5cdFx0fSlcblxuXHRcdHdlYkNvbnRlbnRzLnNlc3Npb24ub24oJ3dpbGwtZG93bmxvYWQnLCAoZXZlbnQsIGl0ZW0sIHdlYkNvbnRlbnRzKSA9PiB7XG5cblx0XHRcdC8vIC8vIFNldCB0aGUgc2F2ZSBwYXRoLCBtYWtpbmcgRWxlY3Ryb24gbm90IHRvIHByb21wdCBhIHNhdmUgZGlhbG9nLlxuXHRcdFx0Ly8gaXRlbS5zZXRTYXZlUGF0aCgnL3RtcC9zYXZlLnBkZicpXG5cblx0XHRcdGl0ZW0ub24oJ3VwZGF0ZWQnLCAoZXZlbnQsIHN0YXRlKSA9PiB7XG5cdFx0XHRcdGlmIChzdGF0ZSA9PT0gJ2ludGVycnVwdGVkJykge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCdEb3dubG9hZCBpcyBpbnRlcnJ1cHRlZCBidXQgY2FuIGJlIHJlc3VtZWQnKVxuXHRcdFx0XHR9IGVsc2UgaWYgKHN0YXRlID09PSAncHJvZ3Jlc3NpbmcnKSB7XG5cdFx0XHRcdFx0aWYgKGl0ZW0uaXNQYXVzZWQoKSkge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ0Rvd25sb2FkIGlzIHBhdXNlZCcpXG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKGBSZWNlaXZlZCBieXRlczogJHtpdGVtLmdldFJlY2VpdmVkQnl0ZXMoKX1gKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0XHRcdGl0ZW0ub25jZSgnZG9uZScsIChldmVudCwgc3RhdGUpID0+IHtcblx0XHRcdFx0aWYgKHN0YXRlID09PSAnY29tcGxldGVkJykge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCdEb3dubG9hZCBzdWNjZXNzZnVsbHknKVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKGBEb3dubG9hZCBmYWlsZWQ6ICR7c3RhdGV9YClcblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0XHR9KVxuXG5cdFx0d2Vidmlldy5hZGRFdmVudExpc3RlbmVyKCdkaWQtc3RhcnQtbG9hZGluZycsIGxvYWRzdGFydClcblx0XHR3ZWJ2aWV3LmFkZEV2ZW50TGlzdGVuZXIoJ2RpZC1zdG9wLWxvYWRpbmcnLCBsb2Fkc3RvcClcblx0fVxufVxuXG5cbmNvbnN0IGdldERhdGVUaW1lID0gKCkgPT4ge1xuXHR2YXIgbm93ID0gbmV3IERhdGUoKTtcblx0dmFyIHllYXIgPSBub3cuZ2V0RnVsbFllYXIoKTtcblx0dmFyIG1vbnRoID0gbm93LmdldE1vbnRoKCkgKyAxO1xuXHR2YXIgZGF5ID0gbm93LmdldERhdGUoKTtcblx0dmFyIGhvdXIgPSBub3cuZ2V0SG91cnMoKTtcblx0dmFyIG1pbnV0ZSA9IG5vdy5nZXRNaW51dGVzKCk7XG5cdHZhciBzZWNvbmQgPSBub3cuZ2V0U2Vjb25kcygpO1xuXHRpZiAobW9udGgudG9TdHJpbmcoKS5sZW5ndGggPT0gMSkge1xuXHRcdHZhciBtb250aCA9ICcwJyArIG1vbnRoO1xuXHR9XG5cdGlmIChkYXkudG9TdHJpbmcoKS5sZW5ndGggPT0gMSkge1xuXHRcdHZhciBkYXkgPSAnMCcgKyBkYXk7XG5cdH1cblx0aWYgKGhvdXIudG9TdHJpbmcoKS5sZW5ndGggPT0gMSkge1xuXHRcdHZhciBob3VyID0gJzAnICsgaG91cjtcblx0fVxuXHRpZiAobWludXRlLnRvU3RyaW5nKCkubGVuZ3RoID09IDEpIHtcblx0XHR2YXIgbWludXRlID0gJzAnICsgbWludXRlO1xuXHR9XG5cdGlmIChzZWNvbmQudG9TdHJpbmcoKS5sZW5ndGggPT0gMSkge1xuXHRcdHZhciBzZWNvbmQgPSAnMCcgKyBzZWNvbmQ7XG5cdH1cblx0dmFyIGRhdGVUaW1lID0geWVhciArICctJyArIG1vbnRoICsgJy0nICsgZGF5ICsgJ18nICsgaG91ciArICctJyArIG1pbnV0ZSArICctJyArIHNlY29uZDtcblx0cmV0dXJuIGRhdGVUaW1lO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvbWFpbi5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJmc1wiXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==