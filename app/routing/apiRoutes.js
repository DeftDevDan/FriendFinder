

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