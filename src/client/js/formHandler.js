/**
 * @description Handles the submit call
 *
 */

function handleSubmit(event) {
	event.preventDefault();

	// check what text was put into the form field
	let formText = document.getElementById("name").value.trim();
	let isUrl = Client.checkForURL(formText);
	if (!isUrl) {
		let err = document.getElementById("error");
		err.innerHTML =
			"Wait! Did you enter correct URL (eg:- check for http(s) it should be present)</br>";
		err.style.cssText = "color:red; padding: 10px 0";
		document.getElementById("results2").innerHTML = "";
	} else {
		console.log("::: Form Submitted :::");
		const urlData = { url: formText };
		console.log(urlData);
		postData("/addData", urlData).then(async (d) => {
			console.log("after add data");
			console.log(d.msg);
			const response = await fetch("/apiData");
			try {
				const dataReceived = await response.json();
				document.getElementById("error").innerHTML = "";
				const result = document.getElementById("results2");
				result.innerHTML =
					"<b>Polarity:</b>" +
					dataReceived.polarity +
					"<br/>" +
					"<b>Polarity Confidence: </b>" +
					dataReceived.confidence +
					"<br/>" +
					"<b>Text:</b> " +
					dataReceived.text +
					"<br/>";
				result.style.cssText =
					"background:#D3D3D3; letter-spacing:1px; padding:8px";
			} catch (error) {
				console.log("error3", error);
			}
		});
	}
}

/**
 * @description Function to Asynchronously send the data to server
 *
 */

async function postData(url = "", data = {}) {
	console.log(`url: ${url} , data: ${data}`);
	console.log(data);
	const response = await fetch(url, {
		method: "POST",
		credentials: "same-origin",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	try {
		const newData = await response.json();
		console.log(newData);
		return newData;
	} catch (error) {
		console.log("error", error);
	}
}

export { handleSubmit };
export { postData };
