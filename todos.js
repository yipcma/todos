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
      var confirm = window.confirm("Delete this task?");
      if(confirm){
        Todos.remove({_id: documentId});
      }
    },
    'keyup [name=todoItem]': function(event){
      var documentId = this._id;
      var todoItem = $(event.target).val();
      Todos.update({_id: documentId}, {$set: {name: todoItem}});
      console.log(documentId, " changed to ",  todoItem);
    }
  });
}

if (Meteor.isServer) {

}