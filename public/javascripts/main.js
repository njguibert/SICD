require.config({
	//waitSeconds: 15,
	paths:{
      text: 'libs/require/text',
      async: 'libs/require/async',
      templates: '../templates',
      bootstrap:'libs/bootstrap/bootstrap',
      'bootstrap-modal':'libs/bootstrap/bootstrap-modal',
      jquery:'libs/jquery/jquery-min',
      underscore:'libs/underscore/underscore',
      Backbone:'libs/backbone/backbone',
      //'Form':'libs/backbone/list'
	}
});

require([
	'order!jquery',
	'order!underscore',
	'order!Backbone',
	'order!app'
], function($,_,Backbone,App) {
		App.initialize();
});