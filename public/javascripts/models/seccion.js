define([
	],function (){
		var seccionModel = Backbone.Model.extend({
			url:'/model/seccion',
			defaults:{
				nombre: 'Ingrese el nombre',
				descripcion: 'Ingrese la descripcion',
				padre:false
			},
			schema:{
				nombre: 	'Text',
				descripcion: 	'Text'
			}	
		});
		return seccionModel;
	});