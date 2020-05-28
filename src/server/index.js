var path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

const dotenv = require("dotenv");
dotenv.config();

const mockAPIResponse = require("./mockAPI.js");

var aylien = require("aylien_textapi");

//console.log(`Your API key is ${process.env.API_KEY}`);

var textapi = new aylien({
	application_id: process.env.API_ID,
	application_key: process.env.API_KEY,
});

app.use(express.static("dist"));

console.log(__dirname);

app.get("/", function (req, res) {
	res.sendFile("dist/index.html");
	// res.sendFile(path.resolve("src/client/views/index.html"));
});

// designates what port the app will listen to for incoming requests
const port = 3000;
app.listen(port, function () {
	console.log(`Example app listening on port ${port}!`);
});

app.get("/test", function (req, res) {
	res.send(mockAPIResponse);
});

let data = {};
app.post("/addData", function (req, res) {
	console.log(req.body);
	data = { url: req.body.url };
	res.send({ msg: "data sent" });
});

let val = {};
app.get("/apiData", apiFunctionCall);
function apiFunctionCall(req, res) {
	console.log("reaching here in apiData");
	textapi.sentiment(data, function (error, response) {
		if (error === null) {
			val = {
				polarity: response.polarity,
				text: response.text,
				confidence: response.polarity_confidence,
			};
			console.log(response);
			console.log("sending data");
			res.send(val);
		} else {
			console.log("Error At api call");
		}
	});
}
