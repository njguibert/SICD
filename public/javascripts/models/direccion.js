define([
	],function (){
	  var direccionModel=Backbone.Model.extend({
	    schema:{
	      latitud: 	'Text',
	      longitud: 	'Text',
	    },
	    initialize:function(){
	      //alert("Creada direccion");
	    }
	  });
		return direccionModel;
	});