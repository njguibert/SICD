define([
	'models/direccion'
	],function (modelDireccion){
		var clientModel = Backbone.Model.extend({
			url:'/model/client/new',
			defaults:{
				nombre: 'Cliente'
			},
			schema:{
				nombre: 	'Text',
				telefono: 	'Number',
				//direccion:{type:'NestedModel',model:modelDireccion}
			},			
		});
		return clientModel;
	});