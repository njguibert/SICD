// Filename: views/home/main
define([
  'text!templates/home/main.html'
], function(mainHomeTemplate){

  var mainHomeView = Backbone.View.extend({
    el: $("#page"),
    render: function(){
      $("#page").html(mainHomeTemplate);
    }
  });
  return new mainHomeView;
});
