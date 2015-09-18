Todos = new Mongo.Collection('todos');

if (Meteor.isClient) {
  Template.todos.helpers({
    'todo': function() {
      return Todos.find({}, {
        sort: {
          createdAt: -1
        }
      });
    }
  });
  
  Template.todos.events({
    'submit form': function(event){
      event.preventDefault();
      var todoName = $('[name="todoName"]').val(); // note the use of jQuery here
      Todos.insert({
        name: todoName,
        completed: false,
        createdAt: new Date()
      });
      $('[name="todoName"]').val('');
    }
  });
  
  Template.todoItem.events({
    'click .delete-todo': function(event){
      event.preventDefault();
      var documentId = this._id;
      var confirm = window.confirm("Detlete this task?");
      if(confirm){
        Todos.remove({_id: documentId});
      }
    }
  });
}

if (Meteor.isServer) {

}