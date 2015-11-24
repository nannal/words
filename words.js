Tasks = new Mongo.Collection(new Date().toISOString().slice(0,10).replace(/-/g,""));
if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    tasks: function () {
      return Tasks.find({});
    }
  });
  Template.body.events({
    "submit .new-task": function (event) {
      event.preventDefault();
      var text = event.target.text.value;
      Tasks.insert({
        text: text,
        createdAt: new Date()
      });
      event.target.text.value = "";
    }});


  Template.click.events({
    "click .delete": function () {
      Meteor.call('removeAllPosts');
    }
  });

}

if (Meteor.isServer) {
 Meteor.startup(function() {
    return Meteor.methods({
      removeAllPosts: function() {
       return Tasks.remove({});
      }
    });
  });


}
