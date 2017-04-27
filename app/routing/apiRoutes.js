var friendJSON = require('../data/friends.json');
friends = friendJSON.friends;
var path = require('path');
var fs = require('fs');

module.exports = function(app) {
	app.post("/api/friends", function(req, res) {
		var me = req.body;
		var totalDifferences = [];
		var bestMatch = 9000;
		var bestMatchVar = [];

		for (var i = 0; i < friends.length; i++) {
			if(me.name != friends[i].name) {
				var total = 0;
				for(var j = 0; j < friends[i].scores.length; j++) {
					total += Math.abs(parseInt(friends[i].scores[j]) - parseInt(me.scores[j]));
				}

				if(total <= bestMatch) {
					if(total < bestMatch) {
						bestMatchVar = [i];
						bestMatch = total;
					} else if(total === bestMatch) {
						bestMatchVar.push(i);
					}
				}
			}
			totalDifferences.push(total);
		}

		updateJSON(me);
		var rand = Math.floor(Math.random() * bestMatchVar.length);
		res.json(friends[bestMatchVar[rand]]);
	});	

	app.get("/api/friends", function(req, res) {
		res.sendFile(path.join(__dirname, "../data/friends.json"));
	});
}

function updateJSON(add) {
	friendJSON.friends.push(add);
	var data = JSON.stringify(friendJSON);

	fs.writeFile('./app/data/friends.json', data, function(err) {
		if(err) {
			console.log(err);
		}
	});
}