// server.js

//var host = location.origin.replace(/^http/, 'ws');
//this.connection = new WebSocket(host);
	// set up
	var express  = require('express');
	var app = express(); 						// create our app w/ express
	var mongoose = require('mongoose'); 		// mongoose for mongodb
	var port = process.env.PORT || 3000;

	// config

	mongoose.connect('mongodb://alex:oma@mongo.onmodulus.net:27017/oZ2yxipi'); 	// connect to mongoDB database on modulus.io

	app.configure(function() {
		app.use(express.static(__dirname + '/public')); 		// app listens in public folder
		app.use(express.logger('dev')); 						// log every request to the console for debugging
		app.use(express.bodyParser()); 							// pull info from html request in post
		
	});


//CREATING API ****	

	// define model
	var Todo = mongoose.model('Todo', {  //creates a Todo model that will serve to create instances that can be saved and retrieved from mongodb (i think)
		text : String
	});

		// get all todos.  This is how we get our posts.
	app.get('/api/todos', function(req, res) { //whenever we want to $https get on front end we should use /api/todos as parameter

		// use mongoose to get all todos in the database
		Todo.find(function(err, todoData) { //find is a mongoose method to retrieve documents executed by models todoData is all todo documents in db

			// if there is an error retrieving, send the error
			if (err)
				res.send(err)  //nothing after response.send(err) will execute

			res.json(todoData); // return all todos in JSON format because that's how mongodb reads data, in JSON format..
		});
	});
		//How can i reuse this? ^ both post and delete use it...


	// create todo and send back all todos after creation
	app.post('/api/todos/post', function(req, res) { //each todo is text and mongo will create an _id for each

		// create a todo
		Todo.create({ //creates a new document ro be saved to db
			text : req.body.text, //request body of text of JSON document 

		}, function(err, todoData) {
			if (err)
				res.send(err);

			// get and return all the todos 
			Todo.find(function(err, todoData) {
				if (err)
					res.send(err)
				res.json(todoData);
			});
		});

	});



	// delete a todo
	app.delete('/api/todos/:doc_id', function(req, res) { //http server request for delete is now handled by /api/todos/:todo_id
		Todo.remove({ //removes a Todo document
			_id : req.params.doc_id  //_id is current id of selected document
		}, function(err, todoData) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			Todo.find(function(err, todoData) {
				if (err)
					res.send(err)
				res.json(todoData);
			});
		});
	});
//API CREATED ***

	// application 
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); //get all information and send it to index to be displayed on front end
	});



	// listen (start todoapp with server.js) 
app.listen(port, function() {
  console.log("Listening on " + port);
});


