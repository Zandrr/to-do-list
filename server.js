// server.js

	var express  = require('express');
	var app = express(); 						// create our app w/ express
	var port = process.env.PORT || 3000;		

	// config
	app.configure(function() {
		app.use(express.static(__dirname + '/public')); 		// app listens in public folder
		//app.use(express.logger('dev')); 						// log every request to the console for debugging	
	});


// listen (start todoapp with server.js) 
app.listen(port, function() {
  console.log("Listening on " + port);
});


