var express = require ('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
var home = express();
var PORT = 3000;

var friends = ["Something"];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.listen(PORT, function() {
	console.log("App listening on PORT " + PORT);
});

app.use("/home", home);

app.get("/", function(req, res) {
	home.mountpath;
	res.sendFile(path.join(__dirname, "app/public/home.html"));
});

app.get("/survey", function(req, res) {
	res.sendFile(path.join(__dirname, "app/public/survey.html"));
});

app.post("/api/friends", function(req, res) {
	var me = req.body;
	var bestMatch = [];

	//compare all friends data to my data

	friends.push(me);

	res.json(bestMatch);
});	

app.get("/api/friends", function(req, res) {
	res.sendFile(path.join(__dirname, "app/data/friends.json"));
});