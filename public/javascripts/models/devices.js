define([
	],function (){
		var devicesModel = Backbone.Model.extend({
			url:'/model/device/new',
			defaults:{
				nombre: 'Aca va el nombre',
				descripcion: 'Ingresa la descripcion',
			},
			schema:{
				nombre: 	'Text',
				descripcion: 	'Text',
			},			
		});
		return devicesModel;
	});