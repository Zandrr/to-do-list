// public/core.js
var TodoCtrl = angular.module('TodoCtrl', []);

function mainController($scope, $http) {
	$scope.curData = {}; 

	// when landing on the page, get all todos and show them
	$http.get('/api/todos').success(function(data) { //return data if function call is success
			$scope.todos = data; //todos will include every todo with mongo's _id mapped to our input
			console.log(data); //print all of the things on my todo list
		})
		.error(function(data) {  //if we get an error then print error to term
			console.log('Error: ' + data);
		});

	// when submitting the add form, send the text to the node API
	$scope.createTodo = function() { //a function to create todo list items
		$http.post('/api/todos/post', $scope.curData).success(function(data) { //angular will take curData.text as input for text box
				$scope.todos = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	// delete a todo after checking it
	$scope.deleteTodo = function(id) {
		$http.delete('/api/todos/' + id).success(function(data) {
				$scope.todos = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

}

