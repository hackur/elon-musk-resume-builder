onload = () => {

	const fs = require('fs')

	const webview = document.getElementById('resume-document')
	const indicator = document.querySelector('.indicator')
	const webContents = webview.getWebContents()

	const loadstart = () => {
		indicator.innerText = 'Loading Resume...'
	}

	const loadstop = () => {
		indicator.innerText = ''

		// TODO: Insert / Enable PDF Download Button

        downloadResumePDF();

		console.log("Resume Loaded!")
	}

	const downloadResumePDF = () => {

		webContents.printToPDF({
			marginsType: 1,
			printBackground: true,
			pageSize: 'Letter',
			printSelectionOnly: false,
			landscape: false
		}, (error, data) => {
			if (error) throw error
			fs.writeFile('resume_' + getDateTime() + '.pdf', data, (error) => {
				if (error) throw error
				console.log('Write PDF successfully.')

				// TODO:

			})
		})

		webContents.session.on('will-download', (event, item, webContents) => {

			// // Set the save path, making Electron not to prompt a save dialog.
			// item.setSavePath('/tmp/save.pdf')

			item.on('updated', (event, state) => {
				if (state === 'interrupted') {
					console.log('Download is interrupted but can be resumed')
				} else if (state === 'progressing') {
					if (item.isPaused()) {
						console.log('Download is paused')
					} else {
						console.log(`Received bytes: ${item.getReceivedBytes()}`)
					}
				}
			})
			item.once('done', (event, state) => {
				if (state === 'completed') {
					console.log('Download successfully')
				} else {
					console.log(`Download failed: ${state}`)
				}
			})
		})

		webview.addEventListener('did-start-loading', loadstart)
		webview.addEventListener('did-stop-loading', loadstop)
	}
}


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
}
