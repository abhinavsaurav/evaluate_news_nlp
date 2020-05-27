function handleSubmit(event) {
	event.preventDefault();

	// check what text was put into the form field
	let formText = document.getElementById("name").value;
	Client.checkForName(formText);

	console.log("::: Form Submitted :::");
	fetch("http://localhost:3000/test")
		.then((res) => res.json())
		.then(function (res) {
			document.getElementById("results").innerHTML = res.message;
		});

	// postData("/addData", { message: formText }).then();
}

const postData = async (url = "", data = {}) => {
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

export { handleSubmit };
