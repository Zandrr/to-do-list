
function TodoCtrl() {
    var cur = this; //for some reason my app does not work if i don't use this as a global variable
this.app_title = "Todo List App";

        this.todos = [
           {text: 'learn angular', done:false},
           {text: 'build an angular app', done:false}
         ];

        this.addtodo = function(){
            this.todos.push({
                text: this.todotext,
                done: false
            });
            this.todotext = ''; //after i add something clear the text box
        };

        this.removetodo = function(){
            var todos = cur.todos;
                cur.todos = [];

            angular.forEach(todos, function(todo){
                if(!todo.done){ //if an object in my todos is !done then push it onto scope.todos
                    cur.todos.push(todo);
                    console.log(cur.todos); 

                }
            });
        };
        this.removeAll = function(){
            var todos = cur.todos;
                cur.todos = [];

            angular.forEach(todos, function(todo){
                if(todo.done){
                    cur.todos.push(todo);
                    console.log(cur.todos);

                }
            });
        };

}