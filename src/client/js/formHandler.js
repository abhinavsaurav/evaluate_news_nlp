const postData = async (url = "", data = {}) => {
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
};

function handleSubmit(event) {
	event.preventDefault();

	// check what text was put into the form field
	let formText = document.getElementById("name").value;
	Client.checkForName(formText);

	console.log("::: Form Submitted :::");
	// fetch("http://localhost:3000/test")
	// 	.then((res) => res.json())
	// 	.then(function (res) {
	// 		document.getElementById("results").innerHTML = res.message;
	// 	});

	const urlData = { url: formText };
	console.log(urlData);
	postData("/addData", urlData).then(async (d) => {
		console.log("after add data");
		console.log(d.msg);
		const response = await fetch("/apiData");
		try {
			const dataReceived = await response.json();
			// console.log(`In getStoredData ${dataReceived}`);
			//return dataReceived;
			document.getElementById("results2").innerHTML =
				"Polarity:" +
				dataReceived.polarity +
				"<br>" +
				"Text:" +
				dataReceived.text +
				"<br/>" +
				"Polarity Confidence:" +
				dataReceived.confidence +
				"<br/>";
		} catch (error) {
			console.log("error3", error);
		}
	});
}

export { handleSubmit };
