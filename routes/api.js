module.exports = function (req, res) {
	var request = req.params.request.toString(),
		answer = null,
		a;

	//Database
	var	db = {
			"hi": "Hi",
			"how are you": "I'm fine. Thanks for asking.",
			"random number": String(Math.random()),
			"what's your name": 'My name is Sophia and it means wisdom.',
			"test": 'Yeah!'
		};


	//Compare with database
	for (a in db) {
		if (db.hasOwnProperty(a)) {

			var reg = new RegExp("^" + a + "\\??$", "ig");

			if (reg.test(request)) {
				answer = db[a];
				break;
			}
		}
	}

	setTimeout(function () {
		res.json({
			request: request,
			answer: answer,
			type: 'string'
		});
	}, 1000);
};